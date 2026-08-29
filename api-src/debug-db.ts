import { createClient as createKVClient } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  
  let tcpUrlVal = '';
  let parsedHost = '';
  let parsedSuccess = false;
  let startsWithRedis = false;

  const tcpUrl = getRedisTcpUrl();
  if (tcpUrl) {
    tcpUrlVal = tcpUrl.substring(0, 15) + '... (len: ' + tcpUrl.length + ')';
    startsWithRedis = tcpUrl.startsWith('redis');
    if (startsWithRedis) {
      try {
        const cleanUrl = tcpUrl.replace(/^rediss?:\/\//, '');
        const parts = cleanUrl.split('@');
        
        if (parts.length === 2) {
          const credentials = parts[0].split(':');
          const hostPort = parts[1].split(':');
          
          const password = credentials[1] || credentials[0];
          const host = hostPort[0];
          
          parsedHost = host;
          if (host && password) {
            parsedSuccess = true;
          }
        }
      } catch (e: any) {
        restError = 'Parser error: ' + e.message;
      }
    }
  }

  // Test Postgres connection
  let postgresStatus = 'Not Checked';
  let postgresError = '';
  let postgresColumns: any[] = [];
  let postgresRowsCount = 0;
  let sampleRows: any[] = [];

  try {
    const { sql } = require('@vercel/postgres');
    postgresStatus = 'Checking...';
    
    // Check if table exists and describe columns
    const columnsQuery = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'assessments';
    `;
    postgresColumns = columnsQuery.rows;
    postgresStatus = 'Table found';

    // Count rows
    const countQuery = await sql`SELECT count(*) FROM assessments;`;
    postgresRowsCount = parseInt(countQuery.rows[0].count, 10);

    // Get sample rows (only name and email to avoid large output)
    const sampleQuery = await sql`SELECT id, first_name, last_name, email, payment_status, created_at FROM assessments LIMIT 20;`;
    sampleRows = sampleQuery.rows;
  } catch (e: any) {
    postgresStatus = 'ERROR';
    postgresError = e.message || String(e);
  }

  return res.status(200).json({
    message: 'Postgres Database Diagnostics',
    postgres: {
      status: postgresStatus,
      error: postgresError,
      columns: postgresColumns,
      rowsCount: postgresRowsCount,
      sampleRows
    },
    nodeEnv: process.env.NODE_ENV
  });
}
