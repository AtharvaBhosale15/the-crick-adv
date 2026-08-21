import type { VercelRequest, VercelResponse } from '@vercel/node';

// Import all endpoint handlers
import addBooking from './endpoints/add-booking.js';
import createOrder from './endpoints/create-order.js';
import cvAuthCheck from './endpoints/cv-auth-check.js';
import cvDownload from './endpoints/cv-download.js';
import cvForgotPassword from './endpoints/cv-forgot-password.js';
import cvGet from './endpoints/cv-get.js';
import cvLogin from './endpoints/cv-login.js';
import cvRegister from './endpoints/cv-register.js';
import cvRenewPlan from './endpoints/cv-renew-plan.js';
import cvResetPassword from './endpoints/cv-reset-password.js';
import cvSave from './endpoints/cv-save.js';
import cvVerifyEmail from './endpoints/cv-verify-email.js';
import cvVerifyPayment from './endpoints/cv-verify-payment.js';
import debugDb from './endpoints/debug-db.js';
import emailCv from './endpoints/email-cv.js';
import getAssessments from './endpoints/get-assessments.js';
import getBookings from './endpoints/get-bookings.js';
import getCvs from './endpoints/get-cvs.js';
import getSettings from './endpoints/get-settings.js';
import saveAssessments from './endpoints/save-assessments.js';
import saveBookings from './endpoints/save-bookings.js';
import saveCv from './endpoints/save-cv.js';
import saveSettings from './endpoints/save-settings.js';
import verifyPayment from './endpoints/verify-payment.js';

const routes: Record<string, (req: VercelRequest, res: VercelResponse) => Promise<any> | any> = {
  'add-booking': addBooking,
  'create-order': createOrder,
  'cv-auth-check': cvAuthCheck,
  'cv-download': cvDownload,
  'cv-forgot-password': cvForgotPassword,
  'cv-get': cvGet,
  'cv-login': cvLogin,
  'cv-register': cvRegister,
  'cv-renew-plan': cvRenewPlan,
  'cv-reset-password': cvResetPassword,
  'cv-save': cvSave,
  'cv-verify-email': cvVerifyEmail,
  'cv-verify-payment': cvVerifyPayment,
  'debug-db': debugDb,
  'email-cv': emailCv,
  'get-assessments': getAssessments,
  'get-bookings': getBookings,
  'get-cvs': getCvs,
  'get-settings': getSettings,
  'save-assessments': saveAssessments,
  'save-bookings': saveBookings,
  'save-cv': saveCv,
  'save-settings': saveSettings,
  'verify-payment': verifyPayment,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Extract path parameter from the query
  const pathParam = req.query.path;
  
  if (!pathParam || typeof pathParam !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid path parameter' });
  }

  const routeHandler = routes[pathParam];
  if (routeHandler) {
    try {
      // Remove path from query so the handlers don't see the internal routing query parameter
      delete req.query.path;
      return await routeHandler(req, res);
    } catch (err: any) {
      console.error(`Error in route ${pathParam}:`, err);
      return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  }

  return res.status(404).json({ error: `Route not found: ${pathParam}` });
}
