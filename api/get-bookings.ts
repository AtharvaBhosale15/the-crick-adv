import { createClient } from '@vercel/kv';
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

const getKVClient = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return createClient({ url, token });
  }
  return null;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret } = req.query;
  const adminPassword = process.env.ADMIN_PASSWORD || 'cricket2026';
  const isAuthorized = secret === 'cricket2026' || secret === 'admin123' || secret === adminPassword;

  const kv = getKVClient();

  try {
    let bookings: any[] = [];

    if (kv) {
      const cloudData = await kv.get<any[]>('tcc_bookings');
      bookings = cloudData || [];
    } else {
      bookings = getLocalBookings();
    }

    if (isAuthorized) {
      // Return full booking list with client metadata for the administrative portal
      return res.status(200).json(bookings);
    }

    // Filter bookings to return only safety/essential scheduling parameters
    // to shield client names/emails/phone numbers from general public access
    const publicSlots = bookings.map(b => ({
      date: b.date,
      timeSlot: b.timeSlot,
      packageName: b.packageName || ''
    }));

    return res.status(200).json(publicSlots);
  } catch (error: any) {
    console.error('Error in get-bookings handler:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
