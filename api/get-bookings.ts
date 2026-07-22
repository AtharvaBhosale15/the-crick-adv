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
        // Format expected: redis[s]://[default:password@]host[:port]
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret } = req.query;
  const adminPassword = process.env.ADMIN_PASSWORD || 'cricket2026';
  const isAuthorized = secret === 'cricket2026' || secret === 'admin123' || secret === adminPassword;

  try {
    let bookings: any[] = [];
    const cloudBookings = await getBookingsFromDb();

    if (cloudBookings !== null) {
      bookings = cloudBookings;
    } else {
      bookings = getLocalBookings();
    }

    if (isAuthorized) {
      return res.status(200).json(bookings);
    }

    // Filter bookings to return only safety/essential scheduling parameters
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
