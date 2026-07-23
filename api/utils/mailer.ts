import nodemailer from 'nodemailer';

const getTransporter = () => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  // Clean password (remove spaces)
  const cleanPass = pass.replace(/\s/g, '');

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user.trim(),
      pass: cleanPass,
    },
  });
};

export const sendBookingEmail = async (booking: any): Promise<boolean> => {
  const user = process.env.GMAIL_USER;
  const transporter = getTransporter();

  if (!transporter || !user) {
    console.warn('[Mailer] Gmail SMTP credentials (GMAIL_USER, GMAIL_APP_PASSWORD) not found. Skipping automatic booking email dispatch.');
    return false;
  }

  const mailOptions = {
    from: `"The Cricket Advisor" <${user.trim()}>`,
    to: booking.email,
    subject: `Consultation Booking Confirmed - BK-${booking.id}`,
    text: `Dear ${booking.fullName},

Your consultation booking has been confirmed!

Booking Details:
------------------------------------------
Booking ID: ${booking.id}
Package: ${booking.packageName}
Price: ${booking.price} INR
Date: ${booking.date}
Time Slot: ${booking.timeSlot}

Zoom Meeting Details:
------------------------------------------
Zoom Meeting Link: ${booking.zoomLink}
Meeting ID: ${booking.meetingId}
Passcode: TCC2026

If you need to reschedule or have any questions, please reply directly to this email.

Best regards,
The Cricket Advisor Team
https://thecricketadvisor.com`,
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
    console.log(`[Mailer] Automatic booking confirmation email successfully sent to ${booking.email}`);
    return true;
  } catch (err) {
    console.error('[Mailer] Failed to send automatic booking confirmation email:', err);
    return false;
  }
};
