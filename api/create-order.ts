import Razorpay from 'razorpay';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid or missing amount parameter' });
  }

  try {
    const options = {
      amount: Math.round(amount), // Amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
