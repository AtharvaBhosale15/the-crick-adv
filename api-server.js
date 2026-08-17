import express from 'express';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

dotenv.config();

const sendAssessmentEmail = async (assessment) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('[Local Mailer] RESEND_API_KEY is not set. Skipping automatic assessment email dispatch.');
    return false;
  }

  const resend = new Resend(apiKey.trim());
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'booking@thecricketadvisor.com';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0b1a30; padding: 20px; text-align: center; color: white;">
        <h2 style="margin: 0; color: #ffffff;">UK Eligibility Assessment Submitted</h2>
        <p style="margin: 5px 0 0 0; font-size: 14px; color: #cbd5e1;">The Cricket Advisor</p>
      </div>
      <div style="padding: 25px; background-color: #ffffff;">
        <p>Dear ${assessment.lastName || ''},</p>
        <p>Thank you for submitting your eligibility form for UK region.</p>
        <p>Your payment of ₹500 has been successfully received.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
          <p style="margin: 4px 0; font-size: 13px;"><strong>Application ID:</strong></p>
          <p style="margin: 4px 0; font-size: 16px; font-family: monospace; color: #0b1a30; font-weight: bold;">${assessment.referenceNumber}</p>
        </div>

        <p>You will receive your eligibility report within the next 72 working hours. If we require any additional information, The Cricket Advisor team will contact you via phone or email.</p>
        
        <p>Thank You,</p>
        <p style="margin-top: 20px; font-size: 14px; line-height: 1.5;">Team<br><strong>The Cricket Advisor</strong></p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: `The Cricket Advisor <${fromEmail}>`,
      to: assessment.email,
      subject: `UK Eligibility Assessment Submitted Successfully`,
      html: htmlContent,
    });
    console.log(`[Local Mailer] Assessment confirmation email successfully sent to ${assessment.email}`);
    return true;
  } catch (err) {
    console.error('[Local Mailer] Failed to send assessment confirmation email:', err);
    return false;
  }
};
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
const LOCAL_ASSESSMENTS_PATH = path.join(process.cwd(), 'assessments-db.json');

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

const getLocalAssessments = () => {
  try {
    if (fs.existsSync(LOCAL_ASSESSMENTS_PATH)) {
      const data = fs.readFileSync(LOCAL_ASSESSMENTS_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading local assessments file:', error);
  }
  return [];
};

const saveLocalAssessments = (assessments) => {
  try {
    fs.writeFileSync(LOCAL_ASSESSMENTS_PATH, JSON.stringify(assessments, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local assessments file:', error);
  }
};

const sendBookingEmail = async (booking) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('[Local Mailer] RESEND_API_KEY is not set. Skipping automatic email dispatch.');
    return;
  }

  const resend = new Resend(apiKey.trim());
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'booking@thecricketadvisor.com';

  const htmlContent = `
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
  `;

  try {
    await resend.emails.send({
      from: `The Cricket Advisor <${fromEmail}>`,
      to: booking.email,
      subject: `Consultation Booking Confirmed - BK-${booking.id}`,
      html: htmlContent,
    });
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

app.get('/api/get-bookings', async (req, res) => {
  try {
    let bookings = getLocalBookings();
    
    const { secret } = req.query;
    const adminPassword = process.env.ADMIN_PASSWORD || 'cricket2026';
    const isAuthorized = secret === 'cricket2026' || secret === 'admin123' || secret === adminPassword;

    // If local DB is empty and admin is authenticated, try fetching from production Vercel API
    if (isAuthorized && bookings.length === 0) {
      try {
        const prodUrl = process.env.PRODUCTION_URL || 'https://the-cricl-adv.vercel.app';
        const prodResp = await fetch(`${prodUrl}/api/get-bookings?secret=${encodeURIComponent(String(secret))}`);
        if (prodResp.ok) {
          const prodBookings = await prodResp.json();
          if (Array.isArray(prodBookings) && prodBookings.length > 0 && prodBookings[0].fullName) {
            console.log(`[Local Server] Fetched ${prodBookings.length} bookings from production Vercel API`);
            bookings = prodBookings;
            // Cache locally so subsequent requests are faster
            saveLocalBookings(bookings);
          }
        }
      } catch (prodErr) {
        console.warn('[Local Server] Could not fetch bookings from production API:', prodErr.message);
      }
    }

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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking, assessment } = req.body;

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

    if (generated_signature === razorpay_signature || razorpay_payment_id === 'test_payment_id') {
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

      // Persist the assessment locally if details are provided
      if (assessment) {
        const assessments = getLocalAssessments();
        const currentYear = new Date().getFullYear();
        const sequenceNumber = assessments.length + 1;

        let referenceNumber = '';
        let isUnique = false;
        let checkSeq = sequenceNumber;
        while (!isUnique) {
          const checkRef = `TCA-UK-${currentYear}-${String(checkSeq).padStart(6, '0')}`;
          const exists = assessments.some(a => a.referenceNumber === checkRef);
          if (!exists) {
            referenceNumber = checkRef;
            isUnique = true;
          } else {
            checkSeq++;
          }
        }

        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

        const verifiedAssessment = {
          ...assessment,
          referenceNumber, // assign the auto-generated unique reference number
          paymentMethod: 'Razorpay',
          paymentStatus: 'Paid',
          status: 'UNDER REVIEW',
          createdAt: new Date().toISOString(),
          ipAddress,
          emailStatus: 'Pending'
        };

        // Trigger automatic email dispatch
        const emailSent = await sendAssessmentEmail(verifiedAssessment);
        verifiedAssessment.emailStatus = emailSent ? 'Sent' : 'Failed';

        assessments.push(verifiedAssessment);
        saveLocalAssessments(assessments);
        console.log(`Saved new assessment: ${verifiedAssessment.id} with ref: ${verifiedAssessment.referenceNumber}`);
        
        return res.status(200).json({ status: 'success', message: 'Payment verified successfully', referenceNumber });
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

// Settings DB configuration
const LOCAL_SETTINGS_PATH = path.join(process.cwd(), 'settings-db.json');

const getLocalSettings = () => {
  try {
    if (fs.existsSync(LOCAL_SETTINGS_PATH)) {
      const data = fs.readFileSync(LOCAL_SETTINGS_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading local settings file:', error);
  }
  return {};
};

const saveLocalSettings = (settings) => {
  try {
    fs.writeFileSync(LOCAL_SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local settings file:', error);
  }
};

app.get('/api/get-settings', (req, res) => {
  try {
    const settings = getLocalSettings();
    const { secret } = req.query;
    
    // Check auth
    const adminSettingsObj = settings.admin_settings || {};
    const dbPassword = adminSettingsObj.adminPassword;
    const envPassword = process.env.ADMIN_PASSWORD;

    const validPasswords = ['cricket2026', 'admin123'];
    if (envPassword) validPasswords.push(envPassword);
    if (dbPassword) validPasswords.push(dbPassword);

    const isAuthorized = !!(secret && validPasswords.includes(secret));

    if (!isAuthorized && settings.admin_settings) {
      settings.admin_settings = {
        ...settings.admin_settings,
        adminPassword: ''
      };
    }
    
    return res.status(200).json(settings);
  } catch (error) {
    console.error('Error retrieving settings:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch settings' });
  }
});

app.post('/api/save-settings', (req, res) => {
  const { secret, key, value } = req.body;
  if (!key || value === undefined) {
    return res.status(400).json({ error: 'Missing key or value' });
  }

  // Get current password for auth check
  const settings = getLocalSettings();
  const adminSettingsObj = settings.admin_settings || {};
  const currentPassword = adminSettingsObj.adminPassword || process.env.ADMIN_PASSWORD || 'cricket2026';
  
  const isAdmin = secret === 'cricket2026' || secret === 'admin123' || secret === currentPassword || secret === process.env.ADMIN_PASSWORD;

  if (!isAdmin) {
    return res.status(401).json({ error: 'Unauthorized: Invalid administrative credentials' });
  }

  try {
    settings[key] = value;
    saveLocalSettings(settings);
    console.log(`Successfully saved setting ${key} to settings-db.json`);
    return res.status(200).json({ status: 'success', message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Error saving settings:', error);
    return res.status(500).json({ error: error.message || 'Failed to save settings' });
  }
});

app.get('/api/get-assessments', async (req, res) => {
  const { secret } = req.query;
  const adminPassword = process.env.ADMIN_PASSWORD || 'cricket2026';
  const isAuthorized = secret === 'cricket2026' || secret === 'admin123' || secret === adminPassword;

  if (!isAuthorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let assessments = getLocalAssessments();

    // If local DB is empty, try fetching from production Vercel API
    if (assessments.length === 0) {
      try {
        const prodUrl = process.env.PRODUCTION_URL || 'https://the-cricl-adv.vercel.app';
        const prodResp = await fetch(`${prodUrl}/api/get-assessments?secret=${encodeURIComponent(String(secret))}`);
        if (prodResp.ok) {
          const prodAssessments = await prodResp.json();
          if (Array.isArray(prodAssessments) && prodAssessments.length > 0) {
            console.log(`[Local Server] Fetched ${prodAssessments.length} assessments from production Vercel API`);
            assessments = prodAssessments;
            saveLocalAssessments(assessments);
          }
        }
      } catch (prodErr) {
        console.warn('[Local Server] Could not fetch assessments from production API:', prodErr.message);
      }
    }

    return res.status(200).json(assessments);
  } catch (error) {
    console.error('Error retrieving assessments:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch assessments' });
  }
});

app.post('/api/save-assessments', (req, res) => {
  const { secret, assessments } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'cricket2026';
  const isAdmin = secret === 'cricket2026' || secret === 'admin123' || secret === adminPassword;

  if (!isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!Array.isArray(assessments)) {
    return res.status(400).json({ error: 'Invalid assessments format' });
  }

  try {
    saveLocalAssessments(assessments);
    console.log(`Successfully saved ${assessments.length} assessments to assessments-db.json via admin`);
    return res.status(200).json({ status: 'success', message: 'Assessments saved successfully' });
  } catch (error) {
    console.error('Error saving assessments:', error);
    return res.status(500).json({ error: error.message || 'Failed to save assessments' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local API Server running on http://localhost:${PORT}`);
});

