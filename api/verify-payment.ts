import crypto from 'crypto';
import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendBookingEmail } from './utils/mailer.js';

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

const saveLocalBookings = (bookings: any[]) => {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local bookings file:', error);
  }
};

const hasPostgres = () => {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL);
};

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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking } = req.body;

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
      if (booking) {
        const verifiedBooking = {
          ...booking,
          paymentMethod: 'Razorpay',
          paymentStatus: 'Paid',
          bookingStatus: 'Approved',
          createdAt: new Date().toISOString()
        };

        if (hasPostgres()) {
          try {
            // Check if already booked
            const { rows } = await sql`
              SELECT id FROM bookings 
              WHERE booking_date = ${verifiedBooking.date} AND time_slot = ${verifiedBooking.timeSlot}
              LIMIT 1
            `;

            if (rows.length === 0) {
              await sql`
                INSERT INTO bookings (
                  id, full_name, email, whatsapp, country, playing_level,
                  package_id, package_name, price, booking_date, time_slot,
                  purpose, payment_method, payment_status, booking_status,
                  zoom_link, meeting_id, created_at
                ) VALUES (
                  ${verifiedBooking.id}, ${verifiedBooking.fullName}, ${verifiedBooking.email}, ${verifiedBooking.whatsApp}, ${verifiedBooking.country}, ${verifiedBooking.playingLevel},
                  ${verifiedBooking.packageId}, ${verifiedBooking.packageName}, ${verifiedBooking.price}, ${verifiedBooking.date}, ${verifiedBooking.timeSlot},
                  ${verifiedBooking.purpose || ''}, ${verifiedBooking.paymentMethod}, ${verifiedBooking.paymentStatus}, ${verifiedBooking.bookingStatus},
                  ${verifiedBooking.zoomLink || ''}, ${verifiedBooking.meetingId || ''}, ${verifiedBooking.createdAt}
                )
              `;
            }
          } catch (dbError) {
            console.error('Postgres write failed in verify-payment, falling back to local file:', dbError);
            const bookings = getLocalBookings();
            const isAlreadyBooked = bookings.some(
              b => b.date === verifiedBooking.date && b.timeSlot === verifiedBooking.timeSlot
            );
            if (!isAlreadyBooked) {
              bookings.push(verifiedBooking);
              saveLocalBookings(bookings);
            }
          }
        } else {
          const bookings = getLocalBookings();
          const isAlreadyBooked = bookings.some(
            b => b.date === verifiedBooking.date && b.timeSlot === verifiedBooking.timeSlot
          );
          if (!isAlreadyBooked) {
            bookings.push(verifiedBooking);
            saveLocalBookings(bookings);
          }
        }

        // Send automatic booking confirmation email via Gmail SMTP
        await sendBookingEmail(verifiedBooking);
      }

      return res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ status: 'failed', message: 'Signature verification failed' });
    }
  } catch (error: any) {
    console.error('Error during signature verification:', error);
    return res.status(500).json({ error: error.message || 'Internal verification error' });
  }
}
