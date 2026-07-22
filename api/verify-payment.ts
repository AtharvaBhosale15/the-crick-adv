import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

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
      return res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ status: 'failed', message: 'Signature verification failed' });
    }
  } catch (error: any) {
    console.error('Error during signature verification:', error);
    return res.status(500).json({ error: error.message || 'Internal verification error' });
  }
}
