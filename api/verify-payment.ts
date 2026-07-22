import crypto from 'crypto';
import { createClient as createKVClient } from '@vercel/kv';
import { createClient as createRedisClient } from 'redis';
import fs from 'fs';
import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const LOCAL_DB_PATH = path.join(process.cwd(), 'bookings-db.json');

const getLocalBookings = (): any[] => {
  try {
    if (fs.existsSync(LOCAL_DB_PATH)) {
      const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading local bookings file:', error);
  }
  return [];
};

const saveLocalBookings = (bookings: any[]) => {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local bookings file:', error);
  }
};

const getKVClient = () => {
  let url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  let token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    const keys = Object.keys(process.env);
    const urlKey = keys.find(k => k.endsWith('_REST_API_URL') || k.endsWith('_REST_URL'));
    const tokenKey = keys.find(k => k.endsWith('_REST_API_TOKEN') || k.endsWith('_REST_TOKEN'));
    if (urlKey && tokenKey) {
      url = process.env[urlKey];
      token = process.env[tokenKey];
    }
  }

  if (url && token) {
    return createKVClient({ url, token });
  }
  return null;
};

const getRedisTcpUrl = () => {
  let url = process.env.KV_URL || process.env.REDIS_URL;
  if (!url) {
    const keys = Object.keys(process.env);
    const urlKey = keys.find(k => k.endsWith('_REDIS_URL') || (k.endsWith('_URL') && !k.includes('REST')));
    if (urlKey) {
      url = process.env[urlKey];
    }
  }
  return url;
};

const getBookingsFromDb = async (): Promise<any[] | null> => {
  const kv = getKVClient();
  if (kv) {
    try {
      const cloudData = await kv.get<any[]>('tcc_bookings');
      return cloudData || [];
    } catch (e) {
      console.error('REST Vercel KV read failed, attempting TCP fallback...', e);
    }
  }

  const tcpUrl = getRedisTcpUrl();
  if (tcpUrl) {
    const client = createRedisClient({ url: tcpUrl as string });
    try {
      await client.connect();
      const rawData = (await client.get('tcc_bookings')) as string | null;
      await client.disconnect();
      return rawData ? JSON.parse(rawData) : [];
    } catch (e) {
      console.error('Standard TCP Redis retrieval failed:', e);
      try { await client.disconnect(); } catch {}
    }
  }

  return null;
};

const saveBookingsToDb = async (bookings: any[]): Promise<boolean> => {
  const kv = getKVClient();
  if (kv) {
    try {
      await kv.set('tcc_bookings', bookings);
      return true;
    } catch (e) {
      console.error('REST Vercel KV write failed, attempting TCP fallback...', e);
    }
  }

  const tcpUrl = getRedisTcpUrl();
  if (tcpUrl) {
    const client = createRedisClient({ url: tcpUrl as string });
    try {
      await client.connect();
      await client.set('tcc_bookings', JSON.stringify(bookings));
      await client.disconnect();
      return true;
    } catch (e) {
      console.error('Standard TCP Redis write failed:', e);
      try { await client.disconnect(); } catch {}
    }
  }

  return false;
};

const cleanEnvVar = (val?: string) => {
  if (!val) return '';
  let cleaned = val.trim();
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.slice(1, -1);
  }
  if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
    cleaned = cleaned.slice(1, -1);
  }
  return cleaned.trim();
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required parameters for verification' });
  }

  const key_secret = cleanEnvVar(process.env.RAZORPAY_KEY_SECRET);
  if (!key_secret) {
    console.error('RAZORPAY_KEY_SECRET is not configured.');
    return res.status(500).json({ error: 'Server configuration error: missing Razorpay secret' });
  }

  try {
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      if (booking) {
        let bookings: any[] = [];
        const cloudBookings = await getBookingsFromDb();

        if (cloudBookings !== null) {
          bookings = cloudBookings;
        } else {
          bookings = getLocalBookings();
        }

        const isAlreadyBooked = bookings.some(
          b => b.date === booking.date && b.timeSlot === booking.timeSlot
        );

        if (!isAlreadyBooked) {
          const newBooking = {
            ...booking,
            paymentMethod: 'Razorpay',
            paymentStatus: 'Paid',
            bookingStatus: 'Approved',
            createdAt: new Date().toISOString()
          };
          bookings.push(newBooking);

          const savedInCloud = await saveBookingsToDb(bookings);
          if (!savedInCloud) {
            saveLocalBookings(bookings);
          }
        }
      }

      return res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ status: 'failed', message: 'Signature verification failed' });
    }
  } catch (error: any) {
    console.error('Error during signature verification:', error);
    return res.status(500).json({ error: error.message || 'Internal verification error' });
  }
}
