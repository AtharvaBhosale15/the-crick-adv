import express from 'express';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for frontend cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

app.post('/api/create-order', async (req, res) => {
  const { amount } = req.body;
  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid or missing amount parameter' });
  }
  
  // Validate minimum amount is 100 paise
  if (amount < 100) {
    return res.status(400).json({ error: 'Amount must be at least 100 paise' });
  }

  try {
    const options = {
      amount: Math.round(amount), // Amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    // If auth credentials fail
    if (error.statusCode === 401) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Razorpay API credentials' });
    }
    return res.status(500).json({ error: error.message || 'Failed to create order' });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required parameters for verification' });
  }

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_secret) {
    console.error('RAZORPAY_KEY_SECRET is not configured on the server.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      console.log(`Payment successfully verified for Order: ${razorpay_order_id}`);
      return res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      console.warn(`Signature mismatch for Order: ${razorpay_order_id}`);
      return res.status(400).json({ status: 'failed', message: 'Signature verification failed' });
    }
  } catch (error) {
    console.error('Error during signature verification:', error);
    return res.status(500).json({ error: error.message || 'Internal verification error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local API Server running on http://localhost:${PORT}`);
});
