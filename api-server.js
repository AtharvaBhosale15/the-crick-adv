import express from 'express';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

const LOCAL_DB_PATH = path.join(process.cwd(), 'bookings-db.json');

const getLocalBookings = () => {
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

const saveLocalBookings = (bookings) => {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local bookings file:', error);
  }
};

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

const cleanEnvVar = (val) => {
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

app.get('/api/get-bookings', (req, res) => {
  try {
    const bookings = getLocalBookings();
    
    const { secret } = req.query;
    const adminPassword = process.env.ADMIN_PASSWORD || 'cricket2026';
    const isAuthorized = secret === 'cricket2026' || secret === 'admin123' || secret === adminPassword;

    if (isAuthorized) {
      return res.status(200).json(bookings);
    }

    // Shield user contact info in calendar response
    const publicSlots = bookings.map(b => ({
      date: b.date,
      timeSlot: b.timeSlot,
      packageName: b.packageName || ''
    }));

    return res.status(200).json(publicSlots);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch bookings' });
  }
});

app.post('/api/create-order', async (req, res) => {
  const { amount } = req.body;
  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid or missing amount parameter' });
  }
  
  if (amount < 100) {
    return res.status(400).json({ error: 'Amount must be at least 100 paise' });
  }

  const key_id = cleanEnvVar(process.env.RAZORPAY_KEY_ID);
  const key_secret = cleanEnvVar(process.env.RAZORPAY_KEY_SECRET);

  if (!key_id || !key_secret) {
    console.error('Razorpay credentials are not configured.');
    return res.status(500).json({ error: 'Server configuration error: missing Razorpay credentials' });
  }

  try {
    const razorpay = new Razorpay({ key_id, key_secret });
    const options = {
      amount: Math.round(amount),
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    if (error.statusCode === 401) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Razorpay API credentials' });
    }
    return res.status(500).json({ error: error.message || 'Failed to create order' });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required parameters for verification' });
  }

  const key_secret = cleanEnvVar(process.env.RAZORPAY_KEY_SECRET);
  if (!key_secret) {
    console.error('RAZORPAY_KEY_SECRET is not configured on the server.');
    return res.status(500).json({ error: 'Server configuration error: missing Razorpay secret' });
  }

  try {
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      console.log(`Payment successfully verified for Order: ${razorpay_order_id}`);

      // Persist the booking locally if details are provided
      if (booking) {
        const bookings = getLocalBookings();
        const isAlreadyBooked = bookings.some(
          b => b.date === booking.date && b.timeSlot === booking.timeSlot
        );

        if (!isAlreadyBooked) {
          const newBooking = {
            ...booking,
            paymentMethod: 'Razorpay',
            paymentStatus: 'Paid',
            bookingStatus: 'Approved',
            createdAt: new Date().toISOString()
          };
          bookings.push(newBooking);
          saveLocalBookings(bookings);
          console.log(`Saved new booking: ${booking.id} for slot: ${booking.date} ${booking.timeSlot}`);
        }
      }

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

app.post('/api/save-bookings', (req, res) => {
  const { secret, bookings } = req.body;
  const isAdmin = secret === 'cricket2026' || secret === 'admin123' || secret === process.env.ADMIN_PASSWORD;

  if (!isAdmin) {
    return res.status(401).json({ error: 'Unauthorized: Invalid administrative credentials' });
  }

  if (!Array.isArray(bookings)) {
    return res.status(400).json({ error: 'Invalid bookings format' });
  }

  try {
    saveLocalBookings(bookings);
    console.log(`Successfully saved ${bookings.length} bookings to bookings-db.json via admin`);
    return res.status(200).json({ status: 'success', message: 'Bookings saved successfully' });
  } catch (error) {
    console.error('Error saving admin bookings:', error);
    return res.status(500).json({ error: error.message || 'Failed to save bookings' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local API Server running on http://localhost:${PORT}`);
});
