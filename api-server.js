import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

dotenv.config();
 
// Fallback to load Vercel pulled development environment variables locally
const devEnvPath = path.join(process.cwd(), '.env.development.local');
if (fs.existsSync(devEnvPath)) {
  try {
    const envConfig = dotenv.parse(fs.readFileSync(devEnvPath));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
    console.log('Successfully loaded environment variables from .env.development.local');
  } catch (e) {
    console.warn('Could not parse .env.development.local:', e);
  }
}

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

const sendBookingEmail = async (booking) => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn('[Local Mailer] GMAIL_USER or GMAIL_APP_PASSWORD is not set. Skipping email dispatch.');
    return;
  }

  const cleanPass = pass.replace(/\s/g, '');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user.trim(),
      pass: cleanPass,
    },
  });

  const mailOptions = {
    from: `"The Cricket Advisor" <${user.trim()}>`,
    to: booking.email,
    subject: `Consultation Booking Confirmed - BK-${booking.id}`,
    text: `Dear ${booking.fullName},\n\nYour consultation booking has been confirmed!\n\nBooking Details:\n------------------------------------------\nBooking ID: ${booking.id}\nPackage: ${booking.packageName}\nPrice: ${booking.price} INR\nDate: ${booking.date}\nTime Slot: ${booking.timeSlot}\n\nZoom Meeting Details:\n------------------------------------------\nZoom Meeting Link: ${booking.zoomLink}\nMeeting ID: ${booking.meetingId}\nPasscode: TCC2026\n\nIf you need to reschedule or have any questions, please reply directly to this email.\n\nBest regards,\nThe Cricket Advisor Team\nhttps://thecricketadvisor.com`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0b1a30; padding: 20px; text-align: center; color: white;">
          <h2 style="margin: 0; color: #d4af37;">Booking Confirmed!</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #cbd5e1;">The Cricket Advisor</p>
        </div>
        <div style="padding: 25px; background-color: #ffffff;">
          <p>Dear <strong>${booking.fullName}</strong>,</p>
          <p>Thank you for scheduling a consultation with us. Your booking has been successfully processed and confirmed.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #0b1a30; font-size: 15px;">Booking Information</h3>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Booking ID:</strong> ${booking.id}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Package:</strong> ${booking.packageName}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Price:</strong> ${booking.price} INR</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Date:</strong> ${booking.date}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Time Slot:</strong> ${booking.timeSlot}</p>
          </div>

          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0b1a30; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #0b1a30; font-size: 15px;">Zoom Meeting Details</h3>
            <p style="margin: 6px 0; font-size: 13px;"><strong>Zoom Link:</strong> <a href="${booking.zoomLink}" style="color: #2563eb; font-weight: bold; text-decoration: underline;">Join Meeting</a></p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Meeting ID:</strong> ${booking.meetingId}</p>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Passcode:</strong> TCC2026</p>
          </div>

          <p style="font-size: 13px; color: #64748b; margin-top: 20px;">If you need to reschedule or have any questions, please reply directly to this email.</p>
          <p style="margin-top: 30px; font-size: 14px;">Best regards,<br><strong style="color: #0b1a30;">The Cricket Advisor Team</strong></p>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          This is an automated booking confirmation email from <a href="https://thecricketadvisor.com" style="color: #2563eb; text-decoration: none;">TheCricketAdvisor.com</a>.
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Local Mailer] Automatic booking confirmation email successfully sent to ${booking.email}`);
  } catch (err) {
    console.error('[Local Mailer] Failed to send automatic booking confirmation email:', err);
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

app.get('/api/debug-db', (req, res) => {
  const envKeys = Object.keys(process.env).filter(key => 
    key.includes('KV') || key.includes('REDIS') || key.includes('UPSTASH')
  );
  
  const envStatus = {};
  envKeys.forEach(key => {
    envStatus[key] = !!process.env[key];
  });

  return res.status(200).json({
    message: 'Local Database Environment Diagnostics',
    envStatus,
    nodeEnv: process.env.NODE_ENV,
    processCwd: process.cwd()
  });
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
          
          // Trigger automatic email dispatch
          sendBookingEmail(newBooking);
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

app.post('/api/add-booking', (req, res) => {
  const { booking } = req.body;

  if (!booking || !booking.date || !booking.timeSlot) {
    return res.status(400).json({ error: 'Missing booking details' });
  }

  try {
    const bookings = getLocalBookings();
    const isAlreadyBooked = bookings.some(
      b => b.date === booking.date && b.timeSlot === booking.timeSlot
    );

    if (!isAlreadyBooked) {
      bookings.push(booking);
      saveLocalBookings(bookings);
      console.log(`Saved new booking: ${booking.id} for slot: ${booking.date} ${booking.timeSlot}`);
      
      // Trigger automatic email dispatch
      sendBookingEmail(booking);

      return res.status(200).json({ status: 'success', message: 'Booking saved successfully' });
    } else {
      return res.status(400).json({ error: 'Slot is already booked' });
    }
  } catch (error) {
    console.error('Error adding booking:', error);
    return res.status(500).json({ error: error.message || 'Failed to save booking' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local API Server running on http://localhost:${PORT}`);
});
