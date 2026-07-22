import crypto from 'crypto';
import { createClient as createKVClient } from '@vercel/kv';
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
  // 1. Direct standard checks
  let url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  let token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // 2. Scan fallback for REST prefixed variables (e.g. tcc_kv_db_REST_API_URL)
  if (!url || !token) {
    const keys = Object.keys(process.env);
    const urlKey = keys.find(k => k.endsWith('_REST_API_URL') || k.endsWith('_REST_URL'));
    const tokenKey = keys.find(k => k.endsWith('_REST_API_TOKEN') || k.endsWith('_REST_TOKEN'));
    if (urlKey && tokenKey) {
      url = process.env[urlKey];
      token = process.env[tokenKey];
    }
  }

  // 3. Fallback: Parse Redis TCP URL to REST credentials
  if (!url || !token) {
    let tcpUrl = process.env.KV_URL || process.env.REDIS_URL;
    if (!tcpUrl) {
      const keys = Object.keys(process.env);
      const urlKey = keys.find(k => k.endsWith('_REDIS_URL') || (k.endsWith('_URL') && !k.includes('REST')));
      if (urlKey) {
        tcpUrl = process.env[urlKey];
      }
    }

    if (tcpUrl && tcpUrl.startsWith('redis')) {
      try {
        const cleanUrl = tcpUrl.replace(/^rediss?:\/\//, '');
        const parts = cleanUrl.split('@');
        
        if (parts.length === 2) {
          const credentials = parts[0].split(':');
          const hostPort = parts[1].split(':');
          
          const password = credentials[1] || credentials[0];
          const host = hostPort[0];
          
          if (host && password) {
            url = `https://${host}`;
            token = password;
          }
        }
      } catch (e) {
        console.error('Failed to parse TCP Redis URL to REST credentials:', e);
      }
    }
  }

  if (url && token) {
    return createKVClient({ url, token });
  }
  return null;
};

const getBookingsFromDb = async (): Promise<any[] | null> => {
  const kv = getKVClient();
  if (kv) {
    try {
      const cloudData = await kv.get<any[]>('tcc_bookings');
      return cloudData || [];
    } catch (e) {
      console.error('REST Vercel KV read failed:', e);
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
      console.error('REST Vercel KV write failed:', e);
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
