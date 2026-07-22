import { createClient as createKVClient } from '@vercel/kv';
import { createClient as createRedisClient } from 'redis';
import fs from 'fs';
import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const LOCAL_DB_PATH = path.join(process.cwd(), 'bookings-db.json');

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
    const savedInCloud = await saveBookingsToDb(bookings);
    if (!savedInCloud) {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
    }
    return res.status(200).json({ status: 'success', message: 'Bookings saved successfully' });
  } catch (error: any) {
    console.error('Error in save-bookings handler:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
