import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const envKeys = Object.keys(process.env).filter(key => 
    key.includes('KV') || key.includes('REDIS') || key.includes('UPSTASH')
  );
  
  const envStatus: Record<string, boolean> = {};
  envKeys.forEach(key => {
    envStatus[key] = !!process.env[key];
  });

  return res.status(200).json({
    message: 'Database Environment Diagnostics',
    envStatus,
    nodeEnv: process.env.NODE_ENV,
    processCwd: process.cwd()
  });
}
