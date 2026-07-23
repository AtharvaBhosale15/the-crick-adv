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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { booking } = req.body;

  if (!booking || !booking.date || !booking.timeSlot) {
    return res.status(400).json({ error: 'Missing booking details' });
  }

  try {
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
      bookings.push(booking);
      const savedInCloud = await saveBookingsToDb(bookings);
      if (!savedInCloud) {
        saveLocalBookings(bookings);
      }
      return res.status(200).json({ status: 'success', message: 'Booking saved successfully' });
    } else {
      return res.status(400).json({ error: 'Slot is already booked' });
    }
  } catch (error: any) {
    console.error('Error in add-booking handler:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
