import { createClient as createKVClient } from '@vercel/kv';
import { createClient as createRedisClient } from 'redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const envKeys = Object.keys(process.env).filter(key => 
    key.toLowerCase().includes('kv') || 
    key.toLowerCase().includes('redis') || 
    key.toLowerCase().includes('upstash')
  );
  
  const envStatus: Record<string, boolean> = {};
  envKeys.forEach(key => {
    envStatus[key] = !!process.env[key];
  });

  let restConnectionStatus = 'Not Configured';
  let restError = '';
  let tcpConnectionStatus = 'Not Configured';
  let tcpError = '';

  // 1. Test REST client
  const kv = getKVClient();
  if (kv) {
    try {
      await kv.set('tcc_debug_test', 'working_rest');
      const val = await kv.get('tcc_debug_test');
      restConnectionStatus = val === 'working_rest' ? 'SUCCESS' : 'FAILED_VALUE_MISMATCH';
    } catch (e: any) {
      restConnectionStatus = 'ERROR';
      restError = e.message || String(e);
    }
  }

  // 2. Test TCP client
  const tcpUrl = getRedisTcpUrl();
  if (tcpUrl) {
    const client = createRedisClient({ url: tcpUrl as string });
    try {
      await client.connect();
      await client.set('tcc_debug_test', 'working_tcp');
      const val = await client.get('tcc_debug_test');
      await client.disconnect();
      tcpConnectionStatus = val === 'working_tcp' ? 'SUCCESS' : 'FAILED_VALUE_MISMATCH';
    } catch (e: any) {
      tcpConnectionStatus = 'ERROR';
      tcpError = e.message || String(e);
      try { await client.disconnect(); } catch {}
    }
  }

  return res.status(200).json({
    message: 'Database Environment & Connection Diagnostics',
    envStatus,
    connectionTests: {
      rest: { status: restConnectionStatus, error: restError },
      tcp: { status: tcpConnectionStatus, error: tcpError }
    },
    nodeEnv: process.env.NODE_ENV,
    processCwd: process.cwd()
  });
}
