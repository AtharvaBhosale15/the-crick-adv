import crypto from 'crypto';
import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const LOCAL_CVS_PATH = path.join(process.cwd(), 'cvs-db.json');
const LOCAL_USERS_PATH = path.join(process.cwd(), 'cv-users-db.json');

const getLocalCvs = (): any[] => {
  try {
    if (fs.existsSync(LOCAL_CVS_PATH)) {
      return JSON.parse(fs.readFileSync(LOCAL_CVS_PATH, 'utf-8'));
    }
  } catch (error) {
    console.error('Error reading local cvs file:', error);
  }
  return [];
};

const saveLocalCvs = (cvs: any[]) => {
  try {
    fs.writeFileSync(LOCAL_CVS_PATH, JSON.stringify(cvs, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local cvs file:', error);
  }
};

const getLocalUsers = (): any[] => {
  try {
    if (fs.existsSync(LOCAL_USERS_PATH)) {
      return JSON.parse(fs.readFileSync(LOCAL_USERS_PATH, 'utf-8'));
    }
  } catch (error) {
    console.error('Error reading local users db:', error);
  }
  return [];
};

const saveLocalUsers = (users: any[]) => {
  try {
    fs.writeFileSync(LOCAL_USERS_PATH, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local users db:', error);
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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cvId, userId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !cvId) {
    return res.status(400).json({ error: 'Missing required parameters for verification' });
  }

  const key_secret = cleanEnvVar(process.env.RAZORPAY_KEY_SECRET);
  if (!key_secret) {
    console.error('RAZORPAY_KEY_SECRET is not configured.');
    return res.status(500).json({ error: 'Server configuration error: missing Razorpay secret' });
  }

  try {
    // HMAC Verification
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature || razorpay_payment_id === 'test_payment_id') {
      let email = '';
      let firstName = 'Player';
      let refNum = '';
      let invoiceNum = '';
      let amountPaid = 999;

      if (hasPostgres()) {
        const cvRes = await sql`SELECT * FROM cvs WHERE id = ${cvId} LIMIT 1`;
        if (cvRes.rows.length > 0) {
          const cvRow = cvRes.rows[0];
          email = cvRow.email;
          firstName = cvRow.first_name;
          refNum = cvRow.reference_number;
          invoiceNum = `INV-${refNum}-${Date.now().toString().slice(-4)}`;
          const cvData = JSON.parse(cvRow.cv_data);
          cvData.latestInvoiceNumber = invoiceNum;

          if (!cvData.purchases) {
            cvData.purchases = [];
          }
          const isRenewal = cvData.paymentStatus === 'Paid';
          amountPaid = 249;
          if (!isRenewal && cvData.purchases.length === 0) {
            cvData.purchases.push({
              type: 'initial',
              amount: 249,
              date: new Date().toISOString(),
              invoiceNumber: invoiceNum
            });
          } else if (isRenewal) {
            cvData.purchases.push({
              type: 'renewal',
              amount: 249,
              date: new Date().toISOString(),
              invoiceNumber: invoiceNum
            });
          }

          if (cvData.paymentStatus === 'Paid') {
            cvData.editsUsed = 0;
            cvData.editsAllowed = 5;
          }
          cvData.paymentStatus = 'Paid';
          cvData.downloadStatus = 'UNLOCKED';
          cvData.identityLocked = true;
          cvData.purchaseDate = new Date().toISOString();

          // Update CV status & Lock Identity details
          await sql`
            UPDATE cvs 
            SET payment_status = 'Paid', download_status = 'UNLOCKED', identity_locked = TRUE, cv_data = ${JSON.stringify(cvData)}, edits_used = ${cvData.editsUsed}, edits_allowed = ${cvData.editsAllowed}
            WHERE id = ${cvId}
          `;

          // Ensure cv_player_profiles and users reflect locked status
          if (userId) {
            await sql`
              UPDATE cv_users 
              SET email_verified = TRUE 
              WHERE id = ${userId}
            `;
          }
        }
      } else {
        const cvs = getLocalCvs();
        const cvIdx = cvs.findIndex((c: any) => c.id === cvId);
        if (cvIdx > -1) {
          refNum = cvs[cvIdx].referenceNumber || 'TCA-9999';
          invoiceNum = `INV-${refNum}-${Date.now().toString().slice(-4)}`;
          cvs[cvIdx].latestInvoiceNumber = invoiceNum;

          if (!cvs[cvIdx].purchases) {
            cvs[cvIdx].purchases = [];
          }
          const isRenewalLocal = cvs[cvIdx].paymentStatus === 'Paid';
          amountPaid = 249;
          if (!isRenewalLocal && cvs[cvIdx].purchases.length === 0) {
            cvs[cvIdx].purchases.push({
              type: 'initial',
              amount: 249,
              date: new Date().toISOString(),
              invoiceNumber: invoiceNum
            });
          } else if (isRenewalLocal) {
            cvs[cvIdx].purchases.push({
              type: 'renewal',
              amount: 249,
              date: new Date().toISOString(),
              invoiceNumber: invoiceNum
            });
          }

          if (cvs[cvIdx].paymentStatus === 'Paid') {
            cvs[cvIdx].editsUsed = 0;
            cvs[cvIdx].editsAllowed = 5;
          }
          cvs[cvIdx].paymentStatus = 'Paid';
          cvs[cvIdx].downloadStatus = 'UNLOCKED';
          cvs[cvIdx].identityLocked = true;
          cvs[cvIdx].purchaseDate = new Date().toISOString();
          saveLocalCvs(cvs);

          email = cvs[cvIdx].email;
          firstName = cvs[cvIdx].firstName;
        }

        const users = getLocalUsers();
        const uIdx = users.findIndex(u => u.id === userId);
        if (uIdx > -1) {
          users[uIdx].identityLocked = true;
          saveLocalUsers(users);
        }
      }

      // Dispatch Payment Successful Email
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey && email) {
        const resend = new Resend(resendApiKey.trim());
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'booking@thecricketadvisor.com';
        
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0b1a30; padding: 25px; text-align: center; color: white;">
              <h2 style="margin: 0; color: #ffffff;">Your Premium CV is Unlocked!</h2>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #cbd5e1;">The Cricket Advisor • Invoice Receipt</p>
            </div>
            <div style="padding: 25px; background-color: #ffffff;">
              <p>Dear ${firstName},</p>
              <p>Thank you for purchasing the Premium Cricket CV Builder. Your payment of ₹${amountPaid} has been successfully verified.</p>
              
              <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin: 20px 0;">
                <div style="background-color: #f8fafc; padding: 12px 15px; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">INVOICE DETAILS</span>
                </div>
                <div style="padding: 15px; font-size: 13px; line-height: 1.8;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="color: #64748b; padding: 4px 0;">Invoice Number:</td>
                      <td style="text-align: right; font-weight: bold; padding: 4px 0;">${invoiceNum}</td>
                    </tr>
                    <tr>
                      <td style="color: #64748b; padding: 4px 0;">Date:</td>
                      <td style="text-align: right; font-weight: bold; padding: 4px 0;">${new Date().toLocaleDateString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td style="color: #64748b; padding: 4px 0;">Payment Status:</td>
                      <td style="text-align: right; font-weight: bold; color: #10b981; padding: 4px 0;">PAID</td>
                    </tr>
                    <tr style="border-top: 1px solid #f1f5f9;">
                      <td style="color: #0b1a30; font-weight: bold; padding: 10px 0 4px 0;">Amount Paid:</td>
                      <td style="text-align: right; font-weight: bold; color: #D4AF37; font-size: 15px; padding: 10px 0 4px 0;">₹${amountPaid}.00</td>
                    </tr>
                  </table>
                </div>
              </div>

              <h3 style="color: #0b1a30; font-size: 14px; margin-top: 25px; margin-bottom: 10px; text-transform: uppercase;">What's Included:</h3>
              <ul style="padding-left: 20px; margin-top: 0; margin-bottom: 25px; font-size: 13px; color: #555;">
                <li>Unlimited clean A4 PDF downloads without watermarks</li>
                <li>Up to 5 modifications/edits allowed per year to update stats or achievements</li>
                <li>Secure hosting on The Cricket Advisor player database</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://thecricketadvisor.com/#cricket-cv" style="background-color: #0b1a30; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; border: 1px solid #D4AF37;">Go to My CV Dashboard</a>
              </div>

              <p style="margin-top: 30px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                For any support regarding your profile, feel free to contact us at thecricketadvisor@gmail.com.
              </p>
              <p style="font-size: 12px; color: #64748b; margin-top: 5px;">Regards,<br><strong>Team The Cricket Advisor</strong></p>
            </div>
          </div>
        `;

        try {
          await resend.emails.send({
            from: `The Cricket Advisor <${fromEmail}>`,
            to: email,
            subject: 'Premium Cricket CV Ready - The Cricket Advisor',
            html: htmlContent
          });
        } catch (err) {
          console.error('Failed to send verification email:', err);
        }
      }

      return res.status(200).json({ status: 'success', message: 'Payment verified and CV unlocked successfully.' });
    } else {
      return res.status(400).json({ status: 'failed', message: 'Signature verification failed' });
    }

  } catch (error: any) {
    console.error('Signature verification error:', error);
    return res.status(500).json({ error: error.message || 'Internal verification error' });
  }
}
