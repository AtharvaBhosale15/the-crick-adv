import { createClient } from '@vercel/kv';
import fs from 'fs';
import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const LOCAL_DB_PATH = path.join(process.cwd(), 'bookings-db.json');

const getKVClient = () => {
  // 1. Direct standard checks
  let url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  let token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // 2. Scan fallback for prefixed variables (e.g., tcc_kv_db_REST_API_URL)
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
    return createClient({ url, token });
  }
  return null;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret, bookings } = req.body;
  const isAdmin = secret === 'cricket2026' || secret === 'admin123' || secret === process.env.ADMIN_PASSWORD;

  if (!isAdmin) {
    return res.status(401).json({ error: 'Unauthorized: Invalid administrative credentials' });
  }

  if (!Array.isArray(bookings)) {
    return res.status(400).json({ error: 'Invalid bookings format' });
  }

  try {
    const kv = getKVClient();
    if (kv) {
      await kv.set('tcc_bookings', bookings);
    } else {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
    }
    return res.status(200).json({ status: 'success', message: 'Bookings saved successfully' });
  } catch (error: any) {
    console.error('Error in save-bookings handler:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
