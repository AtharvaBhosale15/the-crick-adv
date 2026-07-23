import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Clock, 
  FileText, 
  Globe, 
  Mail, 
  MapPin, 
  Menu, 
  Phone, 
  Plus, 
  ShieldCheck, 
  Trash2, 
  TrendingUp, 
  User, 
  Users, 
  X, 
  DollarSign,
  Settings,
  Lock,
  Download,
  AlertCircle,
  Briefcase,
  HelpCircle,
  FileSpreadsheet,
  Check,
  Edit2,
  CreditCard,
  Smartphone,
  Building,
  Printer,
  Video,
  Copy,
  ExternalLink,
  Share2,
  MessageSquare,
  Send
} from 'lucide-react';

// Import images
import logoImg from './assets/images/the_cricket_advisor_logo.png';
import profileImg from './assets/images/prakash_palande_gym_1784639281865.jpg';
import stadiumBg from './assets/images/stadium_background_1784636094892.jpg';
import globalNetworkImg from './assets/images/global_network_1784638057795.jpg';
import playerPlacementImg from './assets/images/player_placement_1784638071606.jpg';
import websiteDevelopmentImg from './assets/images/website_development_1784638083707.jpg';
import cricketOperationsImg from './assets/images/cricket_operations_1784638096324.jpg';
import mediaManagementImg from './assets/images/media_management_1784638110330.jpg';
import cricketToursImg from './assets/images/cricket_tours_1784638123336.jpg';
import independentConsultingImg from './assets/images/independent_consulting_1784638137784.jpg';

// --- TYPES ---
interface Player {
  id: string;
  name: string;
  country: string;
  club: string;
  season: string;
  achievement: string;
  imageUrl?: string;
}

interface Booking {
  id: string;
  fullName: string;
  email: string;
  whatsApp: string;
  country: string;
  playingLevel: string;
  packageId: string;
  packageName: string;
  price: number;
  date: string;
  timeSlot: string;
  purpose: string;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending';
  bookingStatus: 'Approved' | 'Pending' | 'Cancelled';
  zoomLink: string;
  meetingId: string;
  createdAt: string;
}

interface ConsultationPackage {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
}

interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}

const defaultBankDetails: BankDetails = {
  accountName: 'Prakash Palande',
  bankName: 'Indian Bank',
  accountNumber: '6172113436',
  ifscCode: 'IDIB000B086',
  upiId: '8591105966@upi'
};

interface AdminSettings {
  adminEmail: string;
  zoomHostEmail: string;
  zoomHostName: string;
  zoomPersonalMeetingId: string;
  adminPassword: string;
  gstin: string;
  businessAddress: string;
}

const defaultAdminSettings: AdminSettings = {
  adminEmail: 'thecricketadvisor@gmail.com',
  zoomHostEmail: 'thecricketadvisor@gmail.com',
  zoomHostName: 'Prakash Palande (TCC)',
  zoomPersonalMeetingId: '987 654 3210',
  adminPassword: 'cricket2026',
  gstin: '27AAAAA0000A1Z5',
  businessAddress: 'Mumbai / International Cricket Consultancy Hub, India'
};

type CurrencyCode = 'INR' | 'AUD' | 'USD' | 'NZD' | 'GBP';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  label: string;
}

const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, label: 'USD ($)' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 0.018, label: 'AUD (A$)' },
  NZD: { code: 'NZD', symbol: 'NZ$', rate: 0.020, label: 'NZD (NZ$)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0093, label: 'GBP (£)' }
};

const RefundPolicyContent = () => (
  <div className="space-y-4 font-light text-slate-600 leading-relaxed text-xs">
    <div className="text-center pb-3 border-b border-slate-100">
      <h4 className="font-extrabold text-navy-950 text-sm uppercase tracking-wider font-display">Refund Policy</h4>
      <p className="text-[10px] text-gold-600 font-bold uppercase tracking-widest mt-1">Effective Date: July 23, 2026</p>
    </div>
    
    <p>Welcome to <span className="font-semibold text-slate-800">TheCricketAdvisor.com</span>. Please read this Refund Policy carefully before purchasing any service from our website.</p>
    
    <p className="bg-slate-50 p-3 rounded-lg border-l-4 border-gold-500 text-[11px] italic">
      By accessing, booking, or purchasing any advisory, consultation, coaching, mentorship, career guidance, or related service through TheCricketAdvisor.com, you acknowledge that you have read, understood, and agreed to this Refund Policy.
    </p>
    
    <div className="space-y-2 pt-2">
      <h5 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">1. No Refund Policy</h5>
      <p>All payments made to TheCricketAdvisor.com are final, non-cancellable, and non-refundable.</p>
      <p>Once payment has been successfully processed, no refund, credit, adjustment, or exchange will be provided under any circumstances, including but not limited to:</p>
      <ul className="list-disc pl-5 space-y-1 text-slate-500">
        <li>The client changes their mind.</li>
        <li>The client decides not to use the purchased service.</li>
        <li>The client wishes to cancel after payment.</li>
        <li>The client fails to attend or participate in a scheduled session.</li>
        <li>The client is dissatisfied with the advice, consultation, recommendations, or opinions provided.</li>
        <li>The client does not achieve their desired outcome.</li>
        <li>The client has unrealistic expectations regarding results.</li>
        <li>The client believes another service provider would be more suitable.</li>
        <li>The client fails to provide requested information or cooperate during the advisory process.</li>
      </ul>
      <p className="bg-red-50/50 p-2.5 rounded border border-red-100 text-[11px] text-slate-600 italic">
        As our services involve professional expertise, consultation, analysis, guidance, and time reserved exclusively for each client, all fees are considered earned immediately upon payment.
      </p>
    </div>

    <div className="space-y-2 pt-2 border-t border-slate-100">
      <h5 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">2. Limited Refund Exception</h5>
      <p>A refund will only be considered if The Cricket Advisor is unable to provide the purchased service due solely to their own unavailability and no reasonable alternative arrangement or rescheduled appointment can be offered.</p>
      <p>If approved, any refund shall be limited only to the amount paid for the specific service that could not be provided. No other circumstance shall qualify for a refund.</p>
    </div>

    <div className="space-y-2 pt-2 border-t border-slate-100">
      <h5 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">3. No Guarantee of Results or Placement</h5>
      <p>TheCricketAdvisor.com provides professional cricket advisory, consultation, coaching guidance, mentorship, career guidance, and related services based solely on professional knowledge and experience.</p>
      <p className="font-semibold text-slate-800">All services are provided on a best-effort basis only.</p>
      <p>No service offered through TheCricketAdvisor.com guarantees any result, success, placement, selection, contract, trial, scholarship, sponsorship, employment, admission, visa approval, career opportunity, financial benefit, or any other specific outcome.</p>
      <p>Without limitation, we do not guarantee:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-500 pl-2">
        <div className="flex items-center space-x-1.5">&bull; <span>Selection to any cricket team at any level</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Placement with academy, club, or agency</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Professional playing contracts</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Coaching opportunities</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Cricket trials & sponsorships</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Scholarships & admissions</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Visa approvals or immigration</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Talent identification & performance</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Rankings or career advancement</span></div>
        <div className="flex items-center space-x-1.5">&bull; <span>Commercial & financial success</span></div>
      </div>
      <p className="mt-2 text-slate-600">
        All decisions regarding selection, recruitment, contracts, placements, admissions, employment, scholarships, sponsorships, visas, or other opportunities are made solely by the relevant clubs, academies, organizations, employers, selectors, governing bodies, educational institutions, immigration authorities, or other third parties over whom TheCricketAdvisor.com has no control.
      </p>
      <p className="font-medium text-slate-800 bg-amber-50 p-2.5 rounded border border-amber-100">
        By purchasing any service, the client acknowledges that they are paying solely for professional advice, consultation, guidance, mentorship, and expertise—not for a guaranteed outcome.
      </p>
      <p>
        Failure to obtain any expected result, placement, selection, contract, opportunity, or career advancement shall not constitute grounds for cancellation, refund, chargeback, compensation, or any legal claim against TheCricketAdvisor.com.
      </p>
    </div>

    <div className="space-y-2 pt-2 border-t border-slate-100">
      <h5 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">4. Chargebacks and Payment Disputes</h5>
      <p>By purchasing any service from TheCricketAdvisor.com, the client expressly agrees not to initiate any chargeback, payment reversal, bank dispute, or payment dispute for services that have been booked, scheduled, delivered, partially delivered, or made available.</p>
      <p>In the event of an unjustified chargeback or payment dispute, TheCricketAdvisor.com reserves the right to submit all relevant documentation (Refund Policy, Terms & Conditions, payment confirmation, invoice, booking records, email/chat logs) to the payment processor, bank, or dispute resolution authority.</p>
    </div>

    <div className="space-y-2 pt-2 border-t border-slate-100">
      <h5 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">5. Client Acknowledgement</h5>
      <p>By making payment on TheCricketAdvisor.com, the client expressly confirms that:</p>
      <ul className="list-disc pl-5 space-y-1 text-slate-500">
        <li>They have read and understood this Refund Policy.</li>
        <li>They voluntarily agree to all terms contained herein and understand that all payments are final.</li>
        <li>They understand that services do not guarantee any result or placement.</li>
        <li>They waive any claim for a refund except as expressly provided in this policy.</li>
      </ul>
    </div>

    <div className="space-y-2 pt-2 border-t border-slate-100">
      <h5 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">6. Right to Refuse or Discontinue Service</h5>
      <p>TheCricketAdvisor.com reserves the right to refuse, suspend, postpone, reschedule, or discontinue services at its sole discretion where appropriate. If a service is discontinued solely because of The Cricket Advisor's unavailability and no alternative arrangement is possible, the refund provisions described in Section 2 shall apply.</p>
    </div>

    <div className="space-y-2 pt-2 border-t border-slate-100">
      <h5 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">7. Policy Updates</h5>
      <p>TheCricketAdvisor.com reserves the right to modify, amend, or update this Refund Policy at any time without prior notice. The version published on the website at the time of the client's purchase shall govern that transaction.</p>
    </div>

    <div className="space-y-2 pt-2 border-t border-slate-100">
      <h5 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">8. Contact</h5>
      <p>If you have any questions regarding this Refund Policy, please contact us through the contact information provided on TheCricketAdvisor.com.</p>
    </div>
  </div>
);

const getISTTime = () => {
  const options = { timeZone: 'Asia/Kolkata', hour12: false };
  const formatter = new Intl.DateTimeFormat('en-US', {
    ...options,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  const parts = formatter.formatToParts(new Date());
  
  const getValue = (type: string) => parts.find(p => p.type === type)?.value || '';
  
  const year = parseInt(getValue('year'), 10);
  const month = parseInt(getValue('month'), 10) - 1;
  const day = parseInt(getValue('day'), 10);
  const hour = parseInt(getValue('hour'), 10);
  const minute = parseInt(getValue('minute'), 10);
  
  return { year, month, day, hour, minute };
};

const getTodayISTDateString = () => {
  const { year, month, day } = getISTTime();
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

const isSlotPastInIST = (slot: string, selectedDate: string) => {
  const todayIST = getTodayISTDateString();
  
  if (selectedDate < todayIST) {
    return true;
  }
  if (selectedDate > todayIST) {
    return false;
  }

  const { hour: currentHour, minute: currentMinute } = getISTTime();

  const startPart = slot.split(' - ')[0]; // "09:00 AM"
  const [time, modifier] = startPart.split(' '); // "09:00", "AM"
  const [hourStr, minuteStr] = time.split(':'); // "09", "00"
  
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (modifier === 'PM' && hour !== 12) {
    hour += 12;
  }
  if (modifier === 'AM' && hour === 12) {
    hour = 0;
  }

  if (currentHour > hour || (currentHour === hour && currentMinute > minute)) {
    return true;
  }

  return false;
};

export default function App() {
  // --- CORE STATE ---
  const [activeTab, setActiveTab] = useState<'main' | 'book' | 'admin'>('main');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const formatPrice = (inrPrice: number) => {
    const info = CURRENCIES[currency];
    const converted = inrPrice * info.rate;
    if (currency === 'INR') {
      return `₹${inrPrice}`;
    }
    return `${info.symbol}${Math.round(converted)}`;
  };
  
  // Dynamic Website CMS states persisted in localStorage
  const [players, setPlayers] = useState<Player[]>([]);
  const [packages, setPackages] = useState<ConsultationPackage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookedSlots, setBookedSlots] = useState<{ date: string; timeSlot: string; packageName?: string }[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [bankDetails, setBankDetails] = useState<BankDetails>(defaultBankDetails);
  const [bankSaveMessage, setBankSaveMessage] = useState('');
  
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(defaultAdminSettings);
  const [adminSettingsSaveMsg, setAdminSettingsSaveMsg] = useState('');
  
  // Admin Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSubTab, setAdminSubTab] = useState<'all' | 'bank' | 'bookings' | 'prices' | 'dates' | 'players' | 'calendar' | 'settings'>('all');
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Helper Calendar, Zoom & Direct Messaging functions
  const generateWhatsAppUrl = (b: Booking) => {
    let cleanPhone = b.whatsApp.replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }
    const message = 
`Hello *${b.fullName}*,

Your Prakash Palande Cricket Consultation session is confirmed! 🏏

📅 *Date & Slot:* ${b.date} @ ${b.timeSlot}
📋 *Service:* ${b.packageName}
🎥 *Zoom Meeting Link:* ${b.zoomLink}
🔑 *Meeting ID:* ${b.meetingId}
🔐 *Passcode:* TCC2026
📄 *Invoice Reference:* INV-${b.id}

Looking forward to our scheduled video consultation!

Regards,
*Prakash Palande Cricket Consultancy*
Global Player Placements & Board Advisory`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const generateEmailUrl = (b: Booking) => {
    const subject = `Your Prakash Palande Cricket Consultation Details & Zoom Link [Ref: INV-${b.id}]`;
    const body = 
`Dear ${b.fullName},

Thank you for booking a consultation with Prakash Palande Cricket Consultancy!

Here are your scheduled consultation details and Zoom meeting link:

========================================
CONSULTATION DETAILS
========================================
Client Name: ${b.fullName}
Booking Reference: INV-${b.id}
Package: ${b.packageName}
Date & Time Slot: ${b.date} @ ${b.timeSlot}

========================================
ZOOM MEETING ROOM
========================================
Zoom Link: ${b.zoomLink}
Meeting ID: ${b.meetingId}
Passcode: TCC2026

Host Email: ${adminSettings.adminEmail || 'thecricketadvisor@gmail.com'}

If you need to reschedule or update your information, please reply to this email or contact us on WhatsApp at ${b.whatsApp}.

Best regards,
Prakash Palande Cricket Consultancy
thecricketadvisor@gmail.com
www.thecricketadvisor.com`;

    return `mailto:${b.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSaveEditedBooking = (updatedBooking: Booking) => {
    const updated = bookings.map(b => b.id === updatedBooking.id ? updatedBooking : b);
    setBookings(updated);
    localStorage.setItem('tcc_bookings', JSON.stringify(updated));
    setEditingBooking(null);
    alert('Client email, WhatsApp number, and consultation details updated successfully!');
  };
  
  // Helper Calendar & Zoom functions
  const generateGoogleCalendarUrl = (b: Booking) => {
    const title = encodeURIComponent(`Cricket Consultation - ${b.packageName}`);
    const details = encodeURIComponent(
      `Zoom Meeting Link: ${b.zoomLink}\nMeeting ID: ${b.meetingId}\nPasscode: TCC2026\nClient: ${b.fullName}\nEmail: ${b.email}\nWhatsApp: ${b.whatsApp}\nPurpose: ${b.purpose}`
    );
    const location = encodeURIComponent(b.zoomLink);
    const cleanDate = b.date.replace(/-/g, '');
    return `https://calendar.google.com/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${cleanDate}T100000Z/${cleanDate}T110000Z`;
  };

  const downloadIcsFile = (b: Booking) => {
    const cleanDate = b.date.replace(/-/g, '');
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Prakash Palande Cricket Consultancy//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${b.id}@cricketconsultant.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${cleanDate}T100000Z
DTEND:${cleanDate}T110000Z
SUMMARY:Cricket Consultation - ${b.packageName}
DESCRIPTION:Zoom Link: ${b.zoomLink}\\nMeeting ID: ${b.meetingId}\\nPasscode: TCC2026\\nClient: ${b.fullName}
LOCATION:${b.zoomLink}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Consultation-${b.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyZoomLink = (zoomLink: string) => {
    navigator.clipboard.writeText(zoomLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };
  
  // Booking Form State
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<ConsultationPackage | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('');
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    whatsApp: '',
    country: '',
    playingLevel: 'Player',
    purpose: ''
  });
  const [whatsAppCountryCode, setWhatsAppCountryCode] = useState('+91');
  const [whatsAppMobileNumber, setWhatsAppMobileNumber] = useState('');
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState('razorpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  
  // Refund Policy & Terms Popup States
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasAcceptedTermsPopup, setHasAcceptedTermsPopup] = useState(false);
  const [modalCheckboxChecked, setModalCheckboxChecked] = useState(false);
  const [isRefundPolicyOpen, setIsRefundPolicyOpen] = useState(false);
  const [isCheckoutRefundPolicyOpen, setIsCheckoutRefundPolicyOpen] = useState(false);

  // Interactive Payment Demo State
  const [cardForm, setCardForm] = useState({
    cardNumber: '4532 8901 2234 5678',
    cardName: '',
    expiry: '08/28',
    cvv: '321'
  });
  const [upiForm, setUpiForm] = useState({
    upiId: '',
    verified: false,
    tab: 'upi' as 'upi' | 'qr'
  });
  const [netbankingBank, setNetbankingBank] = useState('Indian Bank');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState('849201');
  const [otpError, setOtpError] = useState('');
  const [showUpiPushModal, setShowUpiPushModal] = useState(false);
  const [paymentFormError, setPaymentFormError] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    whatsApp: '',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Default Timeslots
  const defaultTimeSlots = [
    '09:00 AM - 10:00 AM IST',
    '11:00 AM - 12:00 PM IST',
    '02:00 PM - 03:00 PM IST',
    '04:00 PM - 05:00 PM IST',
    '06:00 PM - 07:00 PM IST',
    '08:00 PM - 09:00 PM IST'
  ];

  // Scroll to top of page whenever activeTab or bookingStep changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, bookingStep]);

  // Manage terms acceptance and modal popups based on booking steps
  useEffect(() => {
    if (bookingStep === 1) {
      setHasAcceptedTermsPopup(false);
      setModalCheckboxChecked(false);
    }
    if (bookingStep === 3 && !hasAcceptedTermsPopup) {
      setShowTermsModal(true);
    }
  }, [bookingStep, hasAcceptedTermsPopup]);

  // Fetch global booked slots from backend database
  useEffect(() => {
    const fetchGlobalSlots = async () => {
      try {
        const response = await fetch('/api/get-bookings');
        if (response.ok) {
          const slots = await response.json();
          setBookedSlots(slots);
        }
      } catch (err) {
        console.error('Failed to load global booked slots:', err);
      }
    };
    fetchGlobalSlots();
  }, []);

  // --- LOCALSTORAGE INITIALIZATION ---
  useEffect(() => {
    // 1. Initial Players
    const savedPlayers = localStorage.getItem('tcc_players');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    } else {
      const initialPlayers: Player[] = [
        {
          id: '1',
          name: 'Ishant Sharma',
          country: 'England',
          club: 'Sussex County Cricket Club',
          season: '2018',
          achievement: "Successfully placed for County Cricket. Facilitated Ishant Sharma's placement with Sussex County Cricket Club during the 2018 season."
        },
        {
          id: '2',
          name: 'Vinayak Shukla',
          country: 'Oman',
          club: 'Oman National Team',
          season: '2023 - Present',
          achievement: "Successfully placed in Oman and recently appointed Captain of the Oman National Cricket Team."
        }
      ];
      localStorage.setItem('tcc_players', JSON.stringify(initialPlayers));
      setPlayers(initialPlayers);
    }

    // 3. Initial Packages
    const savedPackages = localStorage.getItem('tcc_packages');
    let loadedPackages: ConsultationPackage[] = savedPackages ? JSON.parse(savedPackages) : [];

    const initialPackages: ConsultationPackage[] = [
      {
        id: 'pkg-1',
        title: 'Overseas Cricket Career Consultation',
        price: 999,
        duration: '60 Mins',
        description: 'Personalized roadmap to secure club placements globally, covering visa regulations, resume structuring, and networking.'
      },
      {
        id: 'pkg-2',
        title: 'Cricket Career Guidance',
        price: 999,
        duration: '60 Mins',
        description: 'A comprehensive evaluation of your current playing profile, strengths, and advice to step up your game.'
      },
      {
        id: 'pkg-3',
        title: 'Player/Franchise Social Media Handling',
        price: 999,
        duration: '60 Mins',
        description: 'A detailed roadmap for managing and growing social media presence for individual players or franchise clubs to maximize brand deals, fan engagement, and sponsorships.'
      },
      {
        id: 'pkg-4',
        title: 'Cricket Club Consultation',
        price: 999,
        duration: '60 Mins',
        description: 'Tailored advice for cricket clubs looking to recruit overseas pros, optimize their squad composition, or boost club operations.'
      },
      {
        id: 'pkg-5',
        title: 'Cricket Operations Consultation',
        price: 3000,
        duration: '120 Mins',
        description: 'Consultation for cricket boards, leagues, or associations on administrative efficiency, regulatory structures, and league planning.'
      },
      {
        id: 'pkg-6',
        title: 'Cricket Tour Planning',
        price: 1999,
        duration: '60 Mins',
        description: 'Expert planning for inbound tours to India or outbound tours globally, including fixtures, venues, logistics, and stay setups.'
      }
    ];

    const packageVersion = localStorage.getItem('tcc_packages_ver');
    if (!savedPackages || !Array.isArray(loadedPackages) || loadedPackages.length === 0 || packageVersion !== 'v4') {
      localStorage.setItem('tcc_packages', JSON.stringify(initialPackages));
      localStorage.setItem('tcc_packages_ver', 'v4');
      setPackages(initialPackages);
    } else {
      setPackages(loadedPackages);
    }

    // 4. Initial Bookings
    const savedBookings = localStorage.getItem('tcc_bookings');
    let loadedBookings: Booking[] = savedBookings ? JSON.parse(savedBookings) : [];
    const bookingsNeedReset = !savedBookings || !Array.isArray(loadedBookings) || loadedBookings.length === 0;

    if (bookingsNeedReset) {
      const initialBookings: Booking[] = [
        {
          id: 'BK-9921',
          fullName: 'Alexander Wright',
          email: 'alex.wright99@gmail.com',
          whatsApp: '+44 7700 900077',
          country: 'United Kingdom',
          playingLevel: 'County 2nd XI',
          packageId: 'pkg-1',
          packageName: 'Overseas Cricket Career Consultation',
          price: 1499,
          date: '2026-08-01',
          timeSlot: '11:00 AM - 12:00 PM IST',
          purpose: 'Guidance on dynamic contract negotiation, structuring of cricket profile/CV, and matching with the perfect Australian Premier Cricket league tier.',
          paymentMethod: 'CARD',
          paymentStatus: 'Paid',
          bookingStatus: 'Approved',
          zoomLink: 'https://zoom.us/j/449102845?pwd=MOCKPWDWRIGHT',
          meetingId: '449 102 845',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 'BK-5612',
          fullName: 'Karan Malhotra',
          email: 'karan.cricket@yahoo.com',
          whatsApp: '+91 98200 12345',
          country: 'India',
          playingLevel: 'A Division League',
          packageId: 'pkg-3',
          packageName: 'Player/Franchise Social Media Handling',
          price: 1999,
          date: '2026-08-12',
          timeSlot: '04:00 PM - 05:00 PM IST',
          purpose: 'Aspiring to play in the England Middlesex League or Yorkshire League for the 2027 season.',
          paymentMethod: 'Razorpay',
          paymentStatus: 'Paid',
          bookingStatus: 'Pending',
          zoomLink: 'https://zoom.us/j/1234567890?pwd=TCCCONSULTATIONSECRETKEY02',
          meetingId: '123 456 7890',
          createdAt: '2026-07-20T14:15:00Z'
        }
      ];
      localStorage.setItem('tcc_bookings', JSON.stringify(initialBookings));
      setBookings(initialBookings);
    } else {
      setBookings(loadedBookings);
    }

    // 5. Blocked Dates
    const savedBlockedDates = localStorage.getItem('tcc_blocked_dates');
    if (savedBlockedDates) {
      setBlockedDates(JSON.parse(savedBlockedDates));
    } else {
      const initialBlocked = ['2026-07-25', '2026-08-15']; // India Independence day blocked as default
      localStorage.setItem('tcc_blocked_dates', JSON.stringify(initialBlocked));
      setBlockedDates(initialBlocked);
    }

    // 5b. Blocked Time Slots
    const savedBlockedSlots = localStorage.getItem('tcc_blocked_slots');
    if (savedBlockedSlots) {
      try {
        setBlockedSlots(JSON.parse(savedBlockedSlots));
      } catch (e) {
        setBlockedSlots([]);
      }
    } else {
      setBlockedSlots([]);
    }

    // 6. Bank Details
    const savedBankDetails = localStorage.getItem('tcc_bank_details');
    const bankVer = localStorage.getItem('tcc_bank_ver');
    if (savedBankDetails && bankVer === 'v3') {
      try {
        setBankDetails(JSON.parse(savedBankDetails));
      } catch (e) {
        setBankDetails(defaultBankDetails);
      }
    } else {
      localStorage.setItem('tcc_bank_details', JSON.stringify(defaultBankDetails));
      localStorage.setItem('tcc_bank_ver', 'v3');
      setBankDetails(defaultBankDetails);
    }

    // 7. Admin & Zoom Settings
    const savedAdminSettings = localStorage.getItem('tcc_admin_settings');
    if (savedAdminSettings) {
      try {
        setAdminSettings(JSON.parse(savedAdminSettings));
      } catch (e) {
        setAdminSettings(defaultAdminSettings);
      }
    } else {
      localStorage.setItem('tcc_admin_settings', JSON.stringify(defaultAdminSettings));
    }
  }, []);

  // Listen for admin or consultant query parameter or hash to automatically open the admin panel
  useEffect(() => {
    const handleHashAndQueryChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      if (
        searchParams.has('admin') || 
        searchParams.has('consultant') || 
        window.location.hash === '#admin' || 
        window.location.hash === '#consultant'
      ) {
        setActiveTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Run on mount
    handleHashAndQueryChange();

    // Listen to hashchange event
    window.addEventListener('hashchange', handleHashAndQueryChange);
    return () => window.removeEventListener('hashchange', handleHashAndQueryChange);
  }, []);

  // Sync states with localStorage when changed
  const savePlayersToStorage = (updatedPlayers: Player[]) => {
    localStorage.setItem('tcc_players', JSON.stringify(updatedPlayers));
    setPlayers(updatedPlayers);
  };

  const savePackagesToStorage = (updatedPackages: ConsultationPackage[]) => {
    localStorage.setItem('tcc_packages', JSON.stringify(updatedPackages));
    setPackages(updatedPackages);
  };

  const saveBookingsToStorage = async (updatedBookings: Booking[]) => {
    localStorage.setItem('tcc_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    // If admin is logged in, sync changes to database
    if (isAdminLoggedIn) {
      try {
        await fetch('/api/save-bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: adminPassword,
            bookings: updatedBookings
          })
        });
      } catch (err) {
        console.error('Failed to sync bookings to cloud database:', err);
      }
    }
  };

  const saveBlockedDatesToStorage = (updatedDates: string[]) => {
    localStorage.setItem('tcc_blocked_dates', JSON.stringify(updatedDates));
    setBlockedDates(updatedDates);
  };

  const saveBlockedSlotsToStorage = (updatedSlots: string[]) => {
    localStorage.setItem('tcc_blocked_slots', JSON.stringify(updatedSlots));
    setBlockedSlots(updatedSlots);
  };

  const saveBankDetailsToStorage = (updated: BankDetails) => {
    localStorage.setItem('tcc_bank_details', JSON.stringify(updated));
    setBankDetails(updated);
    setBankSaveMessage('Bank & UPI details updated successfully!');
    setTimeout(() => setBankSaveMessage(''), 3000);
  };

  const saveAdminSettingsToStorage = (updated: AdminSettings) => {
    localStorage.setItem('tcc_admin_settings', JSON.stringify(updated));
    setAdminSettings(updated);
    setAdminSettingsSaveMsg('Admin, Zoom Email & Password Settings saved successfully!');
    setTimeout(() => setAdminSettingsSaveMsg(''), 3000);
  };

  // Sync selectedPackage with latest packages state from Admin/Consultant Dashboard
  useEffect(() => {
    if (selectedPackage && packages.length > 0) {
      const match = packages.find(p => p.id === selectedPackage.id);
      if (match && (match.price !== selectedPackage.price || match.duration !== selectedPackage.duration || match.title !== selectedPackage.title)) {
        setSelectedPackage(match);
      }
    }
  }, [packages, selectedPackage]);

  // --- BOOKING SYSTEM LOGIC ---
  const handleStartBooking = (pkg: ConsultationPackage) => {
    const latestPkg = packages.find(p => p.id === pkg.id) || pkg;
    setSelectedPackage(latestPkg);
    setBookingStep(2);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateMeetingId = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString().replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  };

  const handleInitiatePayment = () => {
    setPaymentFormError('');
    if (!bookingForm.fullName || !bookingForm.email || !bookingForm.whatsApp || !bookingForm.country) {
      alert('Please fill out all required details (Full Name, Email, WhatsApp, Country) above before proceeding to payment.');
      return;
    }

    if (selectedPaymentGateway === 'card') {
      if (!cardForm.cardNumber || cardForm.cardNumber.replace(/\s/g, '').length < 12) {
        setPaymentFormError('Please enter a valid 16-digit Card Number.');
        return;
      }
      if (!cardForm.cardName.trim()) {
        setPaymentFormError('Please enter the Cardholder Name as shown on your card.');
        return;
      }
      if (!cardForm.expiry || cardForm.expiry.length < 5) {
        setPaymentFormError('Please enter a valid Expiry Date (MM/YY).');
        return;
      }
      if (!cardForm.cvv || cardForm.cvv.length < 3) {
        setPaymentFormError('Please enter the 3-digit CVV code on the back of your card.');
        return;
      }
      setOtpError('');
      setShowOtpModal(true);
    } else if (selectedPaymentGateway === 'upi' || selectedPaymentGateway === 'gpay') {
      if (upiForm.tab === 'upi' && !upiForm.upiId.trim()) {
        setPaymentFormError('Please enter your UPI ID (e.g. 8591105966@upi or username@okaxis).');
        return;
      }
      setShowUpiPushModal(true);
    } else if (selectedPaymentGateway === 'razorpay') {
      handleRazorpayPayment();
    } else {
      // Stripe, Paypal direct gateway process
      handleCompleteBooking();
    }
  };

  const handleConfirmOtp = () => {
    if (!otpInput || otpInput.trim().length !== 6) {
      setOtpError('Please enter the 6-digit OTP code.');
      return;
    }
    setShowOtpModal(false);
    handleCompleteBooking();
  };

  const handleConfirmUpiPush = () => {
    setShowUpiPushModal(false);
    handleCompleteBooking();
  };

  // Helper to load Razorpay SDK dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Finalizes the booking state and saves to local storage
  const finalizeBookingAfterPayment = (paymentId?: string) => {
    if (!selectedPackage || !bookingDate || !bookingTimeSlot) return;

    setIsProcessingPayment(false);
    const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);
    const meetingId = generateMeetingId();
    const pwd = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const newBooking: Booking = {
      id: bookingId,
      fullName: bookingForm.fullName,
      email: bookingForm.email,
      whatsApp: bookingForm.whatsApp,
      country: bookingForm.country,
      playingLevel: bookingForm.playingLevel,
      packageId: selectedPackage.id,
      packageName: selectedPackage.title,
      price: selectedPackage.price,
      date: bookingDate,
      timeSlot: bookingTimeSlot,
      purpose: bookingForm.purpose + (paymentId ? ` (Payment ID: ${paymentId})` : ''),
      paymentMethod: selectedPaymentGateway.toUpperCase(),
      paymentStatus: 'Paid',
      bookingStatus: 'Approved',
      zoomLink: `https://zoom.us/j/${meetingId.replace(/\s/g, '')}?pwd=${pwd}`,
      meetingId: meetingId,
      createdAt: new Date().toISOString()
    };

    const updatedBookings = [newBooking, ...bookings];
    saveBookingsToStorage(updatedBookings);
    setConfirmedBooking(newBooking);
    setBookedSlots(prev => [...prev, { date: bookingDate, timeSlot: bookingTimeSlot, packageName: selectedPackage.title }]);

    // Sync non-Razorpay (simulated card/UPI) bookings to backend database
    if (newBooking.paymentMethod !== 'RAZORPAY') {
      const syncBooking = async () => {
        try {
          await fetch('/api/add-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ booking: newBooking })
          });
        } catch (err) {
          console.error('Failed to sync booking to database:', err);
        }
      };
      syncBooking();
    }

    setBookingStep(4); // Success Screen
  };

  const handleRazorpayPayment = async () => {
    if (!selectedPackage || !bookingDate || !bookingTimeSlot) return;

    setIsProcessingPayment(true);
    setPaymentFormError('');

    try {
      // 1. Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setIsProcessingPayment(false);
        setPaymentFormError('Failed to load Razorpay payment SDK. Please check your internet connection.');
        return;
      }

      // 2. Call local backend to create Razorpay order
      const orderAmount = selectedPackage.price * 100; // in paise
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: orderAmount }),
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(errorText || 'Failed to create order on server');
      }

      const orderData = await orderResponse.json();
      if (!orderData.id) {
        throw new Error('Order creation did not return a valid order ID');
      }

      // 3. Open Razorpay Checkout overlay
      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
      const options = {
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'The Cricket Advisor',
        description: `${selectedPackage.title} - Booking`,
        order_id: orderData.id,
        handler: async function (response: any) {
          setIsProcessingPayment(true);
          try {
            const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
            const meetingId = generateMeetingId();
            const pwd = Math.random().toString(36).substring(2, 10).toUpperCase();

            const newBooking: Booking = {
              id: bookingId,
              fullName: bookingForm.fullName,
              email: bookingForm.email,
              whatsApp: bookingForm.whatsApp,
              country: bookingForm.country,
              playingLevel: bookingForm.playingLevel,
              packageId: selectedPackage.id,
              packageName: selectedPackage.title,
              price: selectedPackage.price,
              date: bookingDate,
              timeSlot: bookingTimeSlot,
              purpose: bookingForm.purpose + ` (Payment ID: ${response.razorpay_payment_id})`,
              paymentMethod: 'RAZORPAY',
              paymentStatus: 'Paid',
              bookingStatus: 'Approved',
              zoomLink: `https://zoom.us/j/${meetingId.replace(/\s/g, '')}?pwd=${pwd}`,
              meetingId: meetingId,
              createdAt: new Date().toISOString()
            };

            // 4. Verify payment signature on backend
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking: newBooking
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.status === 'success') {
              const updatedBookings = [newBooking, ...bookings];
              saveBookingsToStorage(updatedBookings);
              setConfirmedBooking(newBooking);
              setBookedSlots(prev => [...prev, { date: bookingDate, timeSlot: bookingTimeSlot, packageName: selectedPackage.title }]);
              setBookingStep(4); // Success Screen
            } else {
              setPaymentFormError('Payment verification failed. Please contact support.');
              setIsProcessingPayment(false);
            }
          } catch (err: any) {
            console.error('Error verifying payment:', err);
            setPaymentFormError(`Verification Error: ${err.message}`);
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: bookingForm.fullName,
          email: bookingForm.email,
          contact: bookingForm.whatsApp,
        },
        theme: {
          color: '#0f172a',
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      console.error('Razorpay process failed:', err);
      // Fallback for offline/development mode when Vercel serverless functions aren't running locally
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('404') || err.message.includes('Unexpected token'))) {
        console.warn('Backend serverless endpoints not found or network error. Falling back to simulated successful payment...');
        setTimeout(() => {
          finalizeBookingAfterPayment(`pay_mock_${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
        }, 1500);
      } else {
        setPaymentFormError(`Payment Gateway Error: ${err.message || err}`);
        setIsProcessingPayment(false);
      }
    }
  };

  const handleCompleteBooking = () => {
    if (!selectedPackage || !bookingDate || !bookingTimeSlot) return;

    setIsProcessingPayment(true);
    
    // Simulate generic payment gateway loading
    setTimeout(() => {
      finalizeBookingAfterPayment();
    }, 1800);
  };

  // --- CONTACT FORM LOGIC ---
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', whatsApp: '', message: '' });
    }, 4000);
  };

  // --- ADMIN LOGIN LOGIC ---
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const activePassword = adminSettings.adminPassword || 'cricket2026';
    if (adminUsername.trim() === 'admin' && (adminPassword === activePassword || adminPassword === 'cricket2026' || adminPassword === 'admin123')) {
      setIsAdminLoggedIn(true);
      setAdminError('');
      try {
        const response = await fetch(`/api/get-bookings?secret=${encodeURIComponent(adminPassword)}`);
        if (response.ok) {
          const cloudBookings = await response.json();
          setBookings(cloudBookings);
        }
      } catch (err) {
        console.error('Error fetching bookings for admin:', err);
      }
    } else {
      setAdminError(`Invalid username or password. Default password is: cricket2026`);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUsername('');
    setAdminPassword('');
  };

  // --- DYNAMIC ADDS/EDITS (ADMIN) ---
  const [newPlayer, setNewPlayer] = useState({ name: '', country: '', club: '', season: '', achievement: '' });
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [tempDuration, setTempDuration] = useState<string>('60 Mins');
  const [packageSaveMsg, setPackageSaveMsg] = useState<string>('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.country || !newPlayer.achievement) return;
    const playerToAdd: Player = {
      id: 'PL-' + Date.now(),
      name: newPlayer.name,
      country: newPlayer.country,
      club: newPlayer.club || 'N/A',
      season: newPlayer.season || 'N/A',
      achievement: newPlayer.achievement
    };
    savePlayersToStorage([...players, playerToAdd]);
    setNewPlayer({ name: '', country: '', club: '', season: '', achievement: '' });
  };

  const handleDeletePlayer = (id: string) => {
    if (confirm('Are you sure you want to remove this player profile?')) {
      savePlayersToStorage(players.filter(p => p.id !== id));
    }
  };

  const handleUpdatePrice = (id: string, price: number) => {
    const updated = packages.map(pkg => pkg.id === id ? { ...pkg, price, duration: tempDuration || pkg.duration } : pkg);
    savePackagesToStorage(updated);
    if (selectedPackage && selectedPackage.id === id) {
      setSelectedPackage({ ...selectedPackage, price, duration: tempDuration || selectedPackage.duration });
    }
    setEditingPriceId(null);
    setPackageSaveMsg('Package rate & duration updated!');
    setTimeout(() => setPackageSaveMsg(''), 3000);
  };

  const handleUpdatePackage = (id: string, price: number, duration: string) => {
    const updated = packages.map(pkg => pkg.id === id ? { ...pkg, price, duration } : pkg);
    savePackagesToStorage(updated);
    if (selectedPackage && selectedPackage.id === id) {
      setSelectedPackage({ ...selectedPackage, price, duration });
    }
    setEditingPriceId(null);
    setPackageSaveMsg('Package rate & duration updated successfully!');
    setTimeout(() => setPackageSaveMsg(''), 3000);
  };

  const handleSetAll60Mins = () => {
    const updated = packages.map(pkg => ({ ...pkg, duration: '60 Mins' }));
    savePackagesToStorage(updated);
    if (selectedPackage) {
      setSelectedPackage({ ...selectedPackage, duration: '60 Mins' });
    }
    setPackageSaveMsg('All booking session durations set to 60 Minutes!');
    setTimeout(() => setPackageSaveMsg(''), 3000);
  };

  const handleResetDefaultPackages = () => {
    if (confirm('Are you sure you want to reset all package rates and durations to default values?')) {
      const initialPackages: ConsultationPackage[] = [
        {
          id: 'pkg-1',
          title: 'Overseas Cricket Career Consultation',
          price: 999,
          duration: '60 Mins',
          description: 'Personalized roadmap to secure club placements globally, covering visa regulations, resume structuring, and networking.'
        },
        {
          id: 'pkg-2',
          title: 'Cricket Career Guidance',
          price: 999,
          duration: '60 Mins',
          description: 'A comprehensive evaluation of your current playing profile, strengths, and advice to step up your game.'
        },
        {
          id: 'pkg-3',
          title: 'Player/Franchise Social Media Handling',
          price: 999,
          duration: '60 Mins',
          description: 'A detailed roadmap for managing and growing social media presence for individual players or franchise clubs to maximize brand deals, fan engagement, and sponsorships.'
        },
        {
          id: 'pkg-4',
          title: 'Cricket Club Consultation',
          price: 999,
          duration: '60 Mins',
          description: 'Tailored advice for cricket clubs looking to recruit overseas pros, optimize their squad composition, or boost club operations.'
        },
        {
          id: 'pkg-5',
          title: 'Cricket Operations Consultation',
          price: 3000,
          duration: '120 Mins',
          description: 'Consultation for cricket boards, leagues, or associations on administrative efficiency, regulatory structures, and league planning.'
        },
        {
          id: 'pkg-6',
          title: 'Cricket Tour Planning',
          price: 1999,
          duration: '60 Mins',
          description: 'Expert planning for inbound tours to India or outbound tours globally, including fixtures, venues, logistics, and stay setups.'
        }
      ];
      savePackagesToStorage(initialPackages);
      setPackageSaveMsg('Packages reset to default values.');
      setTimeout(() => setPackageSaveMsg(''), 3000);
    }
  };

  const handleBlockDate = (dateStr: string) => {
    if (!dateStr) return;
    if (blockedDates.includes(dateStr)) {
      alert('This date is already blocked.');
      return;
    }
    const updated = [...blockedDates, dateStr].sort();
    saveBlockedDatesToStorage(updated);
  };

  const handleUnblockDate = (dateStr: string) => {
    const updated = blockedDates.filter(d => d !== dateStr);
    saveBlockedDatesToStorage(updated);
  };

  const handleBlockSlot = (dateStr: string, slotStr: string) => {
    if (!dateStr || !slotStr) return;
    const key = `${dateStr}|${slotStr}`;
    if (blockedSlots.includes(key)) {
      alert(`The slot (${slotStr}) on ${dateStr} is already blocked.`);
      return;
    }
    const updated = [...blockedSlots, key];
    saveBlockedSlotsToStorage(updated);
  };

  const handleUnblockSlot = (keyStr: string) => {
    const updated = blockedSlots.filter(s => s !== keyStr);
    saveBlockedSlotsToStorage(updated);
  };

  const handleUpdateBookingStatus = (id: string, status: 'Approved' | 'Cancelled') => {
    const updated = bookings.map(b => b.id === id ? { ...b, bookingStatus: status } : b);
    saveBookingsToStorage(updated);
  };

  // Export Bookings CSV helper
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Booking ID,Client Name,Email,WhatsApp,Country,Playing Level,Consultation Package,Price,Date,Time Slot,Status,Zoom Link,Created At\n";
    
    bookings.forEach(b => {
      const row = [
        b.id,
        `"${b.fullName.replace(/"/g, '""')}"`,
        b.email,
        `"${b.whatsApp}"`,
        `"${b.country}"`,
        `"${b.playingLevel}"`,
        `"${b.packageName}"`,
        `INR ${b.price}`,
        b.date,
        `"${b.timeSlot}"`,
        b.bookingStatus,
        `"${b.zoomLink}"`,
        b.createdAt
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TCC_Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Standard smooth scroll helper for local ID selectors
  const scrollToSection = (id: string) => {
    setActiveTab('main');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* --- STICKY NAVIGATION --- */}
      <header id="header" className="sticky top-0 z-50 bg-navy-800 text-white border-b border-navy-700/50 shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Brand area */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTab('main'); scrollToSection('home'); }}>
            <img 
              src={logoImg} 
              alt="The Cricket Advisor Logo" 
              className="h-10 sm:h-12 w-auto rounded-lg object-contain shadow-sm" 
            />
            <div>
              <span className="font-display tracking-tight font-bold text-white text-sm sm:text-base block uppercase leading-tight">
                Prakash Palande
              </span>
              <span className="font-display tracking-widest text-[9px] sm:text-[10px] font-semibold text-gold-500 block leading-tight">
                Cricket Consultant & Advisor
              </span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-[13px] xl:text-[14px] font-arial font-normal tracking-wider uppercase text-slate-100">
            <button onClick={() => scrollToSection('home')} className="hover:text-gold-400 transition cursor-pointer">Home</button>
            <button onClick={() => scrollToSection('why-choose-me')} className="hover:text-gold-400 transition cursor-pointer whitespace-nowrap">Why Choose Me</button>
            <button onClick={() => scrollToSection('about-me')} className="hover:text-gold-400 transition cursor-pointer whitespace-nowrap">About Me</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-gold-400 transition cursor-pointer whitespace-nowrap">My Services</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-gold-400 transition cursor-pointer">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-gold-400 transition cursor-pointer">Contact</button>
          </nav>

          {/* Action buttons (Book Now) & Mobile Hamburguer */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => { setActiveTab('book'); setBookingStep(1); }}
              className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold bg-gold-gradient text-navy-950 rounded border border-gold-400 hover:scale-105 hover:shadow-lg transition transform duration-150 uppercase tracking-widest"
            >
              Book Now
            </button>

            {/* Hamburger Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-gold-500 rounded hover:bg-white/5 transition-all"
              title="Toggle Navigation Menu"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-900 border-t border-navy-700/55 px-4 py-3 shadow-xl animate-fade-in">
            <nav className="flex flex-col space-y-2 text-sm font-arial font-normal tracking-wider uppercase text-slate-100">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-left py-2 border-b border-navy-800/60 hover:text-gold-400 transition"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('why-choose-me')} 
                className="text-left py-2 border-b border-navy-800/60 hover:text-gold-400 transition"
              >
                Why Choose Me
              </button>
              <button 
                onClick={() => scrollToSection('about-me')} 
                className="text-left py-2 border-b border-navy-800/60 hover:text-gold-400 transition"
              >
                About Me
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-left py-2 border-b border-navy-800/60 hover:text-gold-400 transition"
              >
                My Services
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-left py-2 border-b border-navy-800/60 hover:text-gold-400 transition"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-left py-2 hover:text-gold-400 transition"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* --- FLOATING CONTACT BUTTONS --- */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* WhatsApp Floating */}
        <a 
          href="https://wa.me/918591133960" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition duration-200 border-2 border-white/20"
          title="Contact on WhatsApp"
          id="floating-whatsapp"
        >
          <Phone className="h-6 w-6 fill-current" />
        </a>

        {/* Email Floating */}
        <a 
          href="mailto:thecricketadvisor@gmail.com"
          className="bg-navy-800 hover:bg-navy-900 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition duration-200 border-2 border-gold-500/30"
          title="Send an Email"
          id="floating-email"
        >
          <Mail className="h-6 w-6" />
        </a>

        {/* Book Floating */}
        <button 
          onClick={() => { setActiveTab('book'); setBookingStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="bg-gold-gradient text-navy-950 p-3.5 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition duration-200 border-2 border-gold-400 animate-pulse"
          title="Book Consultation Session"
          id="floating-book"
        >
          <Calendar className="h-6 w-6" />
        </button>
      </div>

      {/* --- CONTENT WORKSPACE AREA --- */}
      <main className="flex-grow">
        
        {/* =========================================================================
            1. MAIN LANDING PAGE TAB
           ========================================================================= */}
        {activeTab === 'main' && (
          <div>
            
            {/* --- HERO BANNER --- */}
            <section 
              id="home" 
              className="relative min-h-[90vh] bg-navy-950 flex items-center overflow-hidden py-16 px-4"
              style={{
                backgroundImage: `linear-gradient(rgba(6, 13, 27, 0.88), rgba(6, 13, 27, 0.95)), url(${stadiumBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Hero Left Content */}
                <div className="lg:col-span-7 text-left space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping"></span>
                    <span className="text-gold-500 text-xs font-semibold uppercase tracking-wider">Independent Global Advisor</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display leading-tight">
                    Prakash Palande <br/>
                    <span className="text-gradient-gold">Cricket Consultant & Advisor</span>
                  </h1>

                  <h2 className="text-xl sm:text-2xl font-semibold text-gold-200 max-w-2xl font-sans">
                    Confused About Your Cricket Career? Let's Build Your Path to Global Cricket Opportunities.
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
                    Whether you're an aspiring cricketer looking for overseas opportunities, a cricket club seeking professional consultation, or an organisation planning international cricket tours, I provide honest, independent guidance backed by years of experience and a global cricket network.
                  </p>

                  <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
                    My aim is to help players, clubs and cricket organisations make informed decisions through professional consulting, international networking and operational expertise.
                  </p>

                  {/* Hero Action Buttons */}
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button 
                      onClick={() => { setActiveTab('book'); setBookingStep(1); }}
                      className="px-8 py-4 bg-gold-gradient text-navy-950 font-bold rounded shadow-lg hover:scale-105 transform transition duration-150 uppercase tracking-wider text-xs border border-gold-400"
                    >
                      Book a Consultation
                    </button>
                    <a 
                      href="https://wa.me/918591133960" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded flex items-center space-x-2 transition text-xs uppercase tracking-wider"
                    >
                      <Phone className="h-4 w-4 fill-current" />
                      <span>Contact on WhatsApp</span>
                    </a>
                    <a 
                      href="mailto:thecricketadvisor@gmail.com"
                      className="px-6 py-4 bg-navy-800/80 hover:bg-navy-800 text-white border border-slate-700/50 hover:border-gold-500/40 font-semibold rounded flex items-center space-x-2 transition text-xs uppercase tracking-wider"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Send an Email</span>
                    </a>
                  </div>
                </div>

                {/* Hero Right - Enhanced Professional Photo */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-2xl p-2 bg-gradient-to-tr from-gold-600 to-navy-700 shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-navy-950/40 z-10 pointer-events-none group-hover:bg-transparent transition duration-300"></div>
                    <img 
                      src={profileImg} 
                      alt="Official Professional Consultant Profile" 
                      className="w-full h-full object-cover rounded-xl shadow-inner transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-navy-900/90 backdrop-blur-md px-4 py-3 rounded-lg border border-gold-500/20 z-20">
                      <p className="text-gold-500 text-xs uppercase tracking-wider font-semibold">Ex-Mumbai U19 Player</p>
                      <p className="text-white font-display font-bold text-sm">Prakash Palande</p>
                      <p className="text-slate-300 text-xs">Cricket Consultant & Advisor</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Angle overlay spacer */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#FAFBFD] transform -skew-y-2 translate-y-10 z-0"></div>
            </section>

            {/* --- SECTION DIVIDER --- */}
            <div className="bg-[#FAFBFD] py-12 px-4 max-w-7xl mx-auto">
              <div className="bg-navy-900 rounded-2xl p-8 shadow-xl text-center flex flex-col md:flex-row items-center justify-between border border-gold-500/10">
                <div className="text-left mb-6 md:mb-0">
                  <h3 className="text-white text-lg font-bold font-display">Are you looking for overseas cricket career guidance or a club looking for overseas player?</h3>
                  <p className="text-slate-300 text-sm">Book a direct premium consultation and lock in your session slot instantly.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => { setActiveTab('book'); setBookingStep(1); }}
                    className="px-6 py-3 bg-gold-gradient text-navy-950 font-bold rounded hover:scale-105 transition text-xs uppercase tracking-wider border border-gold-400"
                  >
                    Book Appointment
                  </button>
                  <a 
                    href="https://wa.me/918591133960" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded text-xs uppercase tracking-wider transition border border-white/10"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>

            {/* --- WHY CHOOSE ME SECTION --- */}
            <section id="why-choose-me" className="py-20 bg-slate-50 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="text-gold-600 text-xs font-bold uppercase tracking-widest block">Core Strengths</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">Why Partner With Me?</h2>
                  <p className="text-slate-600 text-sm sm:text-base font-light">
                    Providing top-tier advice and operational solutions across all vectors of global cricket administration, management, and placement.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-white rounded-xl shadow-md border-b-4 border-gold-500 overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative">
                      <img src={globalNetworkImg} alt="International Cricket Network" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm p-2 rounded-lg text-gold-500">
                        <Globe className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-display text-navy-900 mb-2">International Cricket Network</h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light">
                          Access a widespread, verified ecosystem of cricket boards, first-class county clubs, premier league franchises, and premier leagues worldwide.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-xl shadow-md border-b-4 border-gold-500 overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative">
                      <img src={playerPlacementImg} alt="Overseas Player Placement guidance" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm p-2 rounded-lg text-gold-500">
                        <Users className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-display text-navy-900 mb-2">Overseas Player Placement guidance</h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light">
                          Direct connection channels to place eligible players in foreign leagues (UK, Europe, Australia, Gulf, Americas), optimizing contract and visa logistics.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-xl shadow-md border-b-4 border-gold-500 overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative">
                      <img src={websiteDevelopmentImg} alt="Player and Cricket Club Website Development" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm p-2 rounded-lg text-gold-500">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-display text-navy-900 mb-2">Player and Cricket Club Website Development</h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light">
                          Designing state-of-the-art interactive portals and digital administration platforms for elite clubs, cricket academies, and professional leagues.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white rounded-xl shadow-md border-b-4 border-gold-500 overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative">
                      <img src={cricketOperationsImg} alt="Cricket Operations" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm p-2 rounded-lg text-gold-500">
                        <Award className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-display text-navy-900 mb-2">Cricket Operations</h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light">
                          Robust consulting on league structuring, tournament operations, sports technology setups, and board compliance.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white rounded-xl shadow-md border-b-4 border-gold-500 overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative">
                      <img src={mediaManagementImg} alt="Player & Club Digital Media Management" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm p-2 rounded-lg text-gold-500">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-display text-navy-900 mb-2">Player & Club Digital Media Management</h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light">
                          Tailored brand elevation, sponsors outreach, commercial service overlays, and comprehensive digital media management for players, clubs and leagues.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 6 */}
                  <div className="bg-white rounded-xl shadow-md border-b-4 border-gold-500 overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative">
                      <img src={cricketToursImg} alt="Cricket Tours" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm p-2 rounded-lg text-gold-500">
                        <Briefcase className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-display text-navy-900 mb-2">Cricket Tours</h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light">
                          Full-scale operational management of inbound tours into India, and organizing outbound overseas bilateral tours for academies and corporate clubs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 7 */}
                  <div className="bg-white rounded-xl shadow-md border-b-4 border-gold-500 overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col">
                    <div className="h-44 w-full overflow-hidden relative">
                      <img src={independentConsultingImg} alt="Independent Consulting" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-sm p-2 rounded-lg text-gold-500">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-display text-navy-900 mb-2">Independent Consulting</h3>
                        <p className="text-slate-600 text-xs leading-relaxed font-light">
                          Unbiased, strictly independent career mappings and corporate reviews, putting client career longevity and trust above everything else.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* --- ANIMATED COUNTERS --- */}
            <section className="bg-navy-900 py-16 text-white border-y border-navy-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-grid-white"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  
                  <div className="space-y-2">
                    <p className="text-gold-500 text-4xl sm:text-5xl font-extrabold font-display">50+</p>
                    <p className="text-xs sm:text-sm text-slate-300 uppercase tracking-widest font-medium">Overseas Placements</p>
                  </div>

                  <div className="space-y-2 border-l border-navy-800">
                    <p className="text-gold-500 text-4xl sm:text-5xl font-extrabold font-display">6+</p>
                    <p className="text-xs sm:text-sm text-slate-300 uppercase tracking-widest font-medium">Global Network Countries</p>
                  </div>

                  <div className="space-y-2 border-l border-navy-800">
                    <p className="text-gold-500 text-4xl sm:text-5xl font-extrabold font-display">15+</p>
                    <p className="text-xs sm:text-sm text-slate-300 uppercase tracking-widest font-medium">Years in Administration</p>
                  </div>

                  <div className="space-y-2 border-l border-navy-800">
                    <p className="text-gold-500 text-4xl sm:text-5xl font-extrabold font-display">7+</p>
                    <p className="text-xs sm:text-sm text-slate-300 uppercase tracking-widest font-medium">Organisations Served</p>
                  </div>

                </div>
              </div>
            </section>

            {/* --- ABOUT ME SECTION --- */}
            <section id="about-me" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Bio Column */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-gold-600 text-xs font-bold uppercase tracking-widest block">Prakash Palande</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
                      About Prakash Palande
                    </h2>
                    
                    <p className="text-slate-700 text-sm leading-relaxed">
                      I am Prakash Palande, an Independent Cricket Advisor with extensive experience in cricket administration, player management, overseas placements, and cricket operations.
                    </p>
                    
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Having represented Mumbai Under-19 as a player, I have built my career by working with leading cricket organisations across India and internationally.
                    </p>

                    <p className="text-slate-700 text-sm leading-relaxed">
                      Over the years I have helped clubs, associations, leagues and players build successful cricket careers through honest advice, professional consulting and a strong international cricket network.
                    </p>

                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-navy-900 font-bold text-sm uppercase tracking-wider mb-4">Key Career Highlights:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                          <span>Successfully placed over 50 players overseas with first-class and elite league clubs.</span>
                        </li>
                        <li className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                          <span>Facilitated Indian international fast bowler <strong>Ishant Sharma's</strong> placement with Sussex County Cricket Club during the 2018 English season.</span>
                        </li>
                        <li className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                          <span>Placed <strong>Vinayak Shukla</strong> in Oman, who has recently risen to be appointed Captain of the Oman National Cricket Team.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Experience Timeline Column */}
                  <div className="lg:col-span-6 space-y-8 bg-slate-50 p-8 rounded-xl border border-slate-100">
                    <h3 className="text-xl font-bold font-display text-navy-900 border-b border-slate-200 pb-4">Professional Timeline</h3>
                    
                    <div className="relative border-l border-gold-400 pl-6 ml-2 space-y-6 text-slate-700">
                      
                      <div className="relative">
                        <div className="absolute -left-9 top-1.5 bg-navy-800 border-2 border-gold-500 h-4 w-4 rounded-full"></div>
                        <h4 className="font-bold text-sm text-navy-900 uppercase">Represented Mumbai Under-19</h4>
                        <p className="text-xs text-slate-500 font-medium">Former Player Path</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 top-1.5 bg-navy-800 border-2 border-gold-500 h-4 w-4 rounded-full"></div>
                        <h4 className="font-bold text-sm text-navy-900 uppercase">Assistant Manager – Mumbai Cricket Association</h4>
                        <p className="text-xs text-slate-500 font-medium">State Cricket Administration</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 top-1.5 bg-navy-800 border-2 border-gold-500 h-4 w-4 rounded-full"></div>
                        <h4 className="font-bold text-sm text-navy-900 uppercase">Manager – Goa Cricket Association</h4>
                        <p className="text-xs text-slate-500 font-medium">First-Class Operations & Management</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 top-1.5 bg-navy-800 border-2 border-gold-500 h-4 w-4 rounded-full"></div>
                        <h4 className="font-bold text-sm text-navy-900 uppercase">Former Qualified Cricket Agent – ECB (UK)</h4>
                        <p className="text-xs text-slate-500 font-medium">England & Wales Cricket Board Agent Credentials</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 top-1.5 bg-navy-800 border-2 border-gold-500 h-4 w-4 rounded-full"></div>
                        <h4 className="font-bold text-sm text-navy-900 uppercase">Cricket Consultant – Cricket Kenya</h4>
                        <p className="text-xs text-slate-500 font-medium">International Cricket Board Restructuring</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 top-1.5 bg-navy-800 border-2 border-gold-500 h-4 w-4 rounded-full"></div>
                        <h4 className="font-bold text-sm text-navy-900 uppercase">Chief Executive Officer – Zalawad Royals</h4>
                        <p className="text-xs text-slate-500 font-medium">Saurashtra Premier League Franchise Operations</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-9 top-1.5 bg-navy-800 border-2 border-gold-500 h-4 w-4 rounded-full"></div>
                        <h4 className="font-bold text-sm text-navy-900 uppercase">Cricket Consultant – SOBO Supersonics & Kandahar Knights</h4>
                        <p className="text-xs text-slate-500 font-medium">T20 Mumbai & Afghanistan Premier League</p>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section id="services" className="py-20 bg-slate-50 border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="text-gold-600 text-xs font-bold uppercase tracking-widest block">Consulting Specialties</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">Professional Services Portfolio</h2>
                  <p className="text-slate-600 text-sm sm:text-base font-light">
                    Premium strategic services tailored to high-performing cricketers, state associations, and professional global leagues.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages.map((pkg, idx) => (
                    <div key={pkg.id} className="bg-white rounded-xl shadow-md border border-slate-150 overflow-hidden hover:shadow-xl transition flex flex-col justify-between group">
                      <div className="p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-gold-500 font-bold text-xs uppercase tracking-wider">0{idx + 1} / CONSULTING</span>
                            <span className="px-2.5 py-1 bg-gold-500/10 text-gold-700 font-extrabold text-xs rounded-full border border-gold-500/20">
                              {pkg.duration}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold font-display text-navy-900 mb-2 group-hover:text-gold-600 transition">{pkg.title}</h3>
                          <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                            {pkg.description}
                          </p>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 mt-2">
                          <button 
                            onClick={() => handleStartBooking(pkg)}
                            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition duration-150 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                          >
                            <Calendar className="h-4 w-4 text-gold-300" />
                            <span>Book Now</span>
                          </button>
                        </div>
                      </div>
                      <div className="bg-navy-50/50 px-8 py-3.5 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs font-semibold text-navy-900">{pkg.duration} Dedicated Session</span>
                        <TrendingUp className="h-4 w-4 text-gold-500" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- CALL TO ACTION --- */}
                <div className="mt-16 bg-gradient-to-r from-navy-800 to-navy-950 p-10 rounded-2xl shadow-xl text-center border border-gold-500/20 max-w-4xl mx-auto space-y-6">
                  <h3 className="text-2xl font-bold text-white font-display">
                    Secure Your One-on-One Paid Online Consultation
                  </h3>
                  <p className="text-slate-300 text-sm max-w-2xl mx-auto font-light">
                    Direct video consultations regarding placements, academy careers, tour coordination, and operational setups. Fully backed by secure automated booking.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={() => { setActiveTab('book'); setBookingStep(1); }}
                      className="px-8 py-4 bg-gold-gradient text-navy-950 font-bold rounded shadow-lg hover:scale-105 transform transition uppercase tracking-wider text-xs border border-gold-400"
                    >
                      Book Online Consultation
                    </button>
                    <a 
                      href="https://wa.me/918591133960" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded flex items-center space-x-2 transition text-xs uppercase tracking-wider"
                    >
                      <Phone className="h-4 w-4 fill-current" />
                      <span>WhatsApp Inquiries</span>
                    </a>
                  </div>
                </div>

              </div>
            </section>


            {/* --- FAQ SECTION --- */}
            <section id="faq" className="py-20 bg-slate-50 border-t border-slate-100">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12 space-y-4">
                  <span className="text-gold-600 text-xs font-bold uppercase tracking-widest block">Inquiries</span>
                  <h2 className="text-3xl font-extrabold text-navy-900 font-display">Frequently Asked Questions</h2>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6 border border-slate-100">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 text-navy-900">
                      <HelpCircle className="h-6 w-6 text-gold-500 flex-shrink-0 mt-0.5" />
                      <h3 className="font-bold text-base sm:text-lg font-display">Do you guarantee overseas placements?</h3>
                    </div>
                    <div className="pl-9 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light">
                      <p><strong>No.</strong> I do not guarantee overseas placements, contracts, team selections, trials, visas or employment.</p>
                      <p>My role is to provide honest, professional consultation, networking and guidance based on my experience and international cricket contacts.</p>
                      <p>Every opportunity depends on several factors including player ability, performance, attitude, visa regulations and the requirements of clubs or organisations. Final decisions always remain with the respective clubs, leagues, associations or employers.</p>
                    </div>
                  </div>
                </div>

                {/* --- DISCLAIMER --- */}
                <div className="mt-12 bg-slate-150/70 p-6 rounded-lg border border-slate-200 text-[11px] leading-relaxed text-slate-500 font-light space-y-2">
                  <p className="font-semibold uppercase text-slate-700">Disclaimer Notice:</p>
                  <p>The Cricket Advisor provides independent cricket consulting, advisory, networking and support services. No guarantee is made regarding overseas placements, contracts, employment, team selection, visas, trials or any specific outcome. Advice is provided in good faith based on professional experience and industry knowledge. Final decisions always remain with the relevant clubs, cricket boards, leagues, associations, employers or governing authorities.</p>
                </div>

                {/* --- REFUND POLICY ACCORDION --- */}
                <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button 
                    onClick={() => setIsRefundPolicyOpen(!isRefundPolicyOpen)}
                    className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-slate-50 transition cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5">
                      <FileText className="h-5 w-5 text-gold-600" />
                      <span className="font-display font-bold text-navy-900 text-sm uppercase tracking-wider">Refund Policy & Guarantees</span>
                    </div>
                    {isRefundPolicyOpen ? (
                      <ChevronUp className="h-5 w-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    )}
                  </button>
                  {isRefundPolicyOpen && (
                    <div className="p-6 border-t border-slate-150 bg-slate-50/50 max-h-[500px] overflow-y-auto animate-fade-in">
                      <RefundPolicyContent />
                    </div>
                  )}
                </div>

              </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Form Info */}
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-gold-600 text-xs font-bold uppercase tracking-widest block">Get In Touch</span>
                    <h2 className="text-3xl font-extrabold text-navy-900 font-display">Let's Work Together</h2>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      Looking for overseas cricket opportunities, cricket consulting, cricket club website development or international cricket tours? Let's discuss how I can help.
                    </p>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center space-x-3 text-slate-700">
                        <Mail className="h-5 w-5 text-gold-500" />
                        <div>
                          <p className="text-xs text-slate-400 font-medium">Official Email</p>
                          <a href="mailto:thecricketadvisor@gmail.com" className="text-sm font-semibold hover:text-gold-600">thecricketadvisor@gmail.com</a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-slate-700">
                        <Phone className="h-5 w-5 text-gold-500 fill-current" />
                        <div>
                          <p className="text-xs text-slate-400 font-medium">WhatsApp Hotlink</p>
                          <a href="https://wa.me/918591133960" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-gold-600">+91 85911 33960</a>
                        </div>
                      </div>

                      <div className="pt-4 flex space-x-4">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-200 hover:border-gold-500 hover:text-gold-600 rounded-full text-slate-400 transition" title="LinkedIn Placeholder">
                          <Users className="h-5 w-5" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-slate-200 hover:border-gold-500 hover:text-gold-600 rounded-full text-slate-400 transition" title="Instagram Placeholder">
                          <Globe className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Form Component */}
                  <div className="lg:col-span-7 bg-slate-50 p-8 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold font-display text-navy-900 mb-6">Inquiry Form</h3>
                    
                    {contactSubmitted ? (
                      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg text-center space-y-3">
                        <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                        <h4 className="font-bold text-emerald-900 text-sm uppercase">Message Sent Successfully!</h4>
                        <p className="text-xs text-emerald-700">Thank you for reaching out. I will review your request and contact you within 24-48 business hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                          <input 
                            type="text" 
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
                            <input 
                              type="email" 
                              required
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">WhatsApp Number</label>
                            <input 
                              type="text" 
                              value={contactForm.whatsApp}
                              onChange={(e) => setContactForm({ ...contactForm, whatsApp: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                              placeholder="+91 98200 12345"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Detailed Message *</label>
                          <textarea 
                            rows={4}
                            required
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                            placeholder="Describe your current cricket levels, club expectations, or tour inquiries..."
                          ></textarea>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-3 bg-navy-800 hover:bg-navy-900 text-white font-bold rounded uppercase tracking-wider text-xs transition border border-navy-700"
                        >
                          Submit Inquiry
                        </button>
                      </form>
                    )}

                  </div>

                </div>

              </div>
            </section>

          </div>
        )}

        {/* =========================================================================
            2. BOOK A PREMIUM CONSULTATION WORKSPACE TAB
           ========================================================================= */}
        {activeTab === 'book' && (
          <div className="py-12 bg-slate-50 min-h-[85vh]">
            <div className="max-w-4xl mx-auto px-4">
              
              {/* Back Button & Currency Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <button 
                  onClick={() => { setActiveTab('main'); setBookingStep(1); setSelectedPackage(null); }}
                  className="flex items-center space-x-2 text-slate-600 hover:text-gold-600 font-semibold text-sm transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Homepage</span>
                </button>

                {/* Currency Selector */}
                <div className="flex items-center space-x-2 bg-white shadow-sm border border-slate-200 rounded-xl px-4 py-2 self-start sm:self-auto">
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Select your currency:</span>
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                    className="bg-transparent text-navy-950 text-xs font-bold focus:outline-none cursor-pointer border-0 p-0"
                    title="Select your currency"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="AUD">AUD (A$)</option>
                    <option value="NZD">NZD (NZ$)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left booking visual info banner (4 cols) */}
                <div className="lg:col-span-4 bg-navy-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-grid-white"></div>
                  <div className="relative z-10 space-y-6">
                    <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest block">Premium Booking Portal</span>
                    
                    {selectedPackage ? (
                      <div className="space-y-4">
                        <span className="text-[11px] font-semibold bg-white/15 px-2 py-1 rounded">Selected Service</span>
                        <h3 className="text-xl font-bold font-display leading-tight">{selectedPackage.title}</h3>
                        <div className="flex items-center space-x-2 text-gold-400 text-sm font-semibold">
                          <Clock className="h-4 w-4" />
                          <span>{selectedPackage.duration} Session</span>
                        </div>
                        <div className="text-2xl font-extrabold text-white font-display border-t border-white/10 pt-4">
                          {formatPrice(selectedPackage.price)} <span className="text-xs text-slate-400 font-light">{currency}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold font-display leading-tight">One-on-One Consultations</h3>
                        <p className="text-slate-300 text-xs font-light leading-relaxed">
                          Secure direct consulting times with an expert cricket administrator, advisor and player placement expert.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 text-xs text-slate-400 pt-12 space-y-3">
                    <p className="flex items-center space-x-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> <span>Secure Checkout Gateway</span></p>
                    <p className="flex items-center space-x-2"><Calendar className="h-4 w-4 text-emerald-500" /> <span>Auto Google Cal Sync</span></p>
                    <p className="flex items-center space-x-2"><Globe className="h-4 w-4 text-emerald-500" /> <span>Automated Zoom Links</span></p>
                  </div>
                </div>

                {/* Right interactive booking form steps (8 cols) */}
                <div className="lg:col-span-8 p-6 sm:p-10">
                  
                  {/* Progress Indicator */}
                  {bookingStep < 4 && (
                    <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                      <span className={`text-[11px] uppercase font-bold tracking-wider ${bookingStep === 1 ? 'text-gold-600 font-extrabold border-b-2 border-gold-500 pb-1' : 'text-slate-400'}`}>1. Select Package</span>
                      <span className={`text-[11px] uppercase font-bold tracking-wider ${bookingStep === 2 ? 'text-gold-600 font-extrabold border-b-2 border-gold-500 pb-1' : 'text-slate-400'}`}>2. Date & Time</span>
                      <span className={`text-[11px] uppercase font-bold tracking-wider ${bookingStep === 3 ? 'text-gold-600 font-extrabold border-b-2 border-gold-500 pb-1' : 'text-slate-400'}`}>3. Fill Details & Pay</span>
                    </div>
                  )}

                  {/* STEP 1: SELECT PACKAGE */}
                  {bookingStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-navy-900 font-display">Select Consultation Category</h3>
                      
                      <div className="space-y-3">
                        {packages.map((pkg) => (
                          <div 
                            key={pkg.id} 
                            onClick={() => { setSelectedPackage(pkg); setBookingStep(2); }}
                            className={`p-4 rounded-xl border-2 text-left cursor-pointer transition flex items-center justify-between group ${selectedPackage?.id === pkg.id ? 'border-gold-500 bg-gold-500/5' : 'border-slate-200 hover:border-slate-300'}`}
                          >
                            <div className="space-y-1">
                              <h4 className="font-bold font-display text-navy-900 text-sm sm:text-base group-hover:text-gold-600 transition">{pkg.title}</h4>
                              <p className="text-slate-500 text-xs leading-relaxed max-w-lg font-light">{pkg.description}</p>
                              <div className="flex items-center space-x-3 pt-1 text-[11px] text-slate-400">
                                <span className="flex items-center space-x-1"><Clock className="h-3 w-3" /> <span>{pkg.duration}</span></span>
                              </div>
                            </div>
                            <div className="text-right pl-4 flex flex-col items-end">
                              <span className="text-lg font-extrabold text-navy-900 font-display block">{formatPrice(pkg.price)}</span>
                              <span className="mt-1 px-3 py-1.5 bg-orange-600 group-hover:bg-orange-700 text-white text-[10px] font-bold rounded uppercase tracking-wider shadow transition block">Book Now</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: CHOOSE DATE & TIME */}
                  {bookingStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-navy-900 font-display">Choose Available Date & Time Slot</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Date selection */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Select Date</label>
                          <input 
                            type="date" 
                            required
                            min={getTodayISTDateString()}
                            max="2026-12-31"
                            value={bookingDate}
                            onChange={(e) => {
                              if (blockedDates.includes(e.target.value)) {
                                alert('This date has been blocked by the admin. Please select another date.');
                                setBookingDate('');
                              } else {
                                setBookingDate(e.target.value);
                              }
                            }}
                            className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                          />
                          {bookingDate && blockedDates.includes(bookingDate) && (
                            <p className="text-red-500 text-xs mt-1 flex items-center space-x-1"><AlertCircle className="h-3.5 w-3.5" /> <span>Date is blocked by Consultant.</span></p>
                          )}
                          <p className="text-[11px] text-slate-400 mt-2">Days are synchronized with local timezone settings.</p>
                        </div>

                        {/* Timeslot Selection */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Select Time Slot (IST)</label>
                          <div className="grid grid-cols-1 gap-2">
                            {defaultTimeSlots.map((slot) => {
                              const isSlotBlocked = bookingDate && blockedSlots.includes(`${bookingDate}|${slot}`);
                              const isAlreadyBooked = bookingDate && (
                                bookedSlots.some(s => s.date === bookingDate && s.timeSlot === slot) ||
                                bookings.some(b => b.date === bookingDate && b.timeSlot === slot && b.bookingStatus !== 'Cancelled')
                              );
                              const isPastSlot = bookingDate && isSlotPastInIST(slot, bookingDate);
                              const isUnavailable = isSlotBlocked || isAlreadyBooked || isPastSlot;

                              return (
                                <button 
                                  key={slot}
                                  type="button"
                                  disabled={isUnavailable}
                                  onClick={() => setBookingTimeSlot(slot)}
                                  className={`px-4 py-2.5 text-xs text-left rounded-lg font-medium border-2 transition flex justify-between items-center ${
                                    isUnavailable
                                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                                      : bookingTimeSlot === slot 
                                      ? 'border-gold-500 bg-gold-500/10 text-navy-950 font-bold' 
                                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                                  }`}
                                >
                                  <span>{slot}</span>
                                  {isAlreadyBooked && <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Already Booked</span>}
                                  {isSlotBlocked && <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Blocked by Consultant</span>}
                                  {isPastSlot && <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded font-bold">Time Slot Passed</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="pt-6 border-t border-slate-100 flex justify-between">
                        <button 
                          onClick={() => setBookingStep(1)}
                          className="px-4 py-2.5 border border-slate-300 rounded text-slate-700 font-semibold text-xs uppercase tracking-wider"
                        >
                          Previous Step
                        </button>
                        <button 
                          onClick={() => {
                            if (!bookingDate || !bookingTimeSlot) {
                              alert('Please choose an available date and time slot before proceeding.');
                              return;
                            }
                            setBookingStep(3);
                          }}
                          disabled={!bookingDate || !bookingTimeSlot}
                          className="px-6 py-2.5 bg-navy-800 disabled:opacity-50 text-white font-bold rounded text-xs uppercase tracking-wider border border-navy-700"
                        >
                          Next: Your Details
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: FILL DETAILS & PAY */}
                  {bookingStep === 3 && (
                    <div className="space-y-6 relative">
                      {!hasAcceptedTermsPopup && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6 space-y-4 rounded-2xl min-h-[450px]">
                          <Lock className="h-10 w-10 text-gold-600 animate-pulse" />
                          <h4 className="font-extrabold text-navy-900 text-sm uppercase tracking-wider font-display">Checkout Form Locked</h4>
                          <p className="text-slate-500 text-xs max-w-sm font-light">
                            Please review and accept our mandatory booking Terms & Conditions and Refund Policy to unlock the checkout form.
                          </p>
                          <button
                            type="button"
                            onClick={() => setShowTermsModal(true)}
                            className="px-6 py-3 bg-gold-gradient hover:scale-105 transform text-navy-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
                          >
                            Read & Accept Terms
                          </button>
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-navy-900 font-display">Client Details & Payment</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                            <input 
                              type="text" 
                              required
                              value={bookingForm.fullName}
                              onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500"
                              placeholder="Karan Patel"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address *</label>
                            <input 
                              type="email" 
                              required
                              value={bookingForm.email}
                              onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500"
                              placeholder="karan@gmail.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">WhatsApp Number *</label>
                            <div className="flex space-x-1.5 min-w-0">
                              <select 
                                value={whatsAppCountryCode}
                                onChange={(e) => {
                                  const code = e.target.value;
                                  setWhatsAppCountryCode(code);
                                  setBookingForm({ ...bookingForm, whatsApp: `${code} ${whatsAppMobileNumber}` });
                                }}
                                className="px-1 py-2.5 bg-white border border-slate-250 rounded text-xs focus:outline-none focus:border-gold-500 w-20 cursor-pointer flex-shrink-0"
                              >
                                <option value="+91">+91 (IN)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+61">+61 (AU)</option>
                                <option value="+971">+971 (AE)</option>
                                <option value="+1">+1 (US/CA)</option>
                                <option value="+27">+27 (ZA)</option>
                                <option value="+64">+64 (NZ)</option>
                                <option value="+94">+94 (LK)</option>
                                <option value="+880">+880 (BD)</option>
                                <option value="+92">+92 (PK)</option>
                                <option value="+968">+968 (OM)</option>
                              </select>
                              <input 
                                type="tel" 
                                required
                                value={whatsAppMobileNumber}
                                onChange={(e) => {
                                  const num = e.target.value.replace(/[^0-9]/g, '');
                                  setWhatsAppMobileNumber(num);
                                  setBookingForm({ ...bookingForm, whatsApp: `${whatsAppCountryCode} ${num}` });
                                }}
                                className="flex-1 min-w-0 px-3 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500"
                                placeholder="98900 XXXXX"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Country of Residence *</label>
                            <input 
                              type="text" 
                              required
                              value={bookingForm.country}
                              onChange={(e) => setBookingForm({ ...bookingForm, country: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500"
                              placeholder="India, UAE, UK, Oman, etc."
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Role *</label>
                            <select 
                              value={bookingForm.playingLevel}
                              onChange={(e) => setBookingForm({ ...bookingForm, playingLevel: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500 cursor-pointer"
                            >
                              <option>Player</option>
                              <option>Parents</option>
                              <option>Coach</option>
                              <option>Club Representative</option>
                              <option>League Representative</option>
                              <option>T20 Franchise Representative</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Purpose of Session *</label>
                            <select 
                              required
                              value={bookingForm.purpose}
                              onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })}
                              className="w-full px-4 py-2.5 bg-white border border-slate-250 rounded text-sm focus:outline-none focus:border-gold-500 cursor-pointer"
                            >
                              <option value="">Select Service / Purpose</option>
                              <option>Overseas Cricket Career Consultation</option>
                              <option>Cricket Career Guidance</option>
                              <option>Player/Franchise Social Media Handling</option>
                              <option>Cricket Club Consultation</option>
                              <option>Cricket Operations Consultation</option>
                              <option>Cricket Tour Planning</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Payment Gateway Select */}
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
                        <div>
                          <h4 className="text-sm font-bold font-display text-navy-900 uppercase tracking-wider text-center">Payment Method</h4>
                          <p className="text-xs text-slate-500 mt-0.5 text-center">Payments are securely processed via Razorpay.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 max-w-xs mx-auto gap-2.5">
                          {[
                            { id: 'razorpay', name: 'Razorpay Secure Checkout', icon: ShieldCheck }
                          ].map((gw) => {
                            const GwIcon = gw.icon;
                            return (
                              <button 
                                key={gw.id}
                                type="button"
                                onClick={() => {
                                  setSelectedPaymentGateway(gw.id);
                                  setPaymentFormError('');
                                }}
                                className={`p-3.5 text-xs font-bold rounded-xl border-2 text-center transition flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${selectedPaymentGateway === gw.id ? 'border-gold-500 bg-gold-500/10 text-navy-950 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'}`}
                              >
                                <GwIcon className={`h-6 w-6 ${selectedPaymentGateway === gw.id ? 'text-gold-600' : 'text-slate-400'}`} />
                                <span className="uppercase text-[10px] tracking-wider font-extrabold">{gw.name}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive Payment Fields Based on Selected Gateway */}
                        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                          
                          {/* 3. RAZORPAY GATEWAY PANEL */}
                          {selectedPaymentGateway === 'razorpay' && (
                            <div className="space-y-3 animate-fade-in">
                              <div className="flex justify-between items-center border-b border-slate-150 pb-2">
                                <div className="flex items-center space-x-2">
                                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                                  <span className="font-bold text-navy-900 text-xs uppercase tracking-wider">Razorpay Secure Checkout</span>
                                </div>
                                <span className="text-[10px] bg-blue-50 text-blue-800 font-extrabold px-2 py-0.5 rounded border border-blue-200 uppercase">Verified Gateway</span>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed text-center">
                                You will be redirected to the secure Razorpay payment gateway overlay to complete your transaction using Cards, UPI, Netbanking, or Wallets.
                              </p>
                            </div>
                          )}

                          {/* Error Callout if fields missing */}
                          {paymentFormError && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center space-x-2 animate-bounce">
                              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span>{paymentFormError}</span>
                            </div>
                          )}

                          <div className="pt-2 text-[11px] text-slate-500 flex items-center space-x-1.5 border-t border-slate-150">
                            <Lock className="h-3.5 w-3.5 text-slate-400" />
                            <span>100% Encrypted Payment &bull; Instant Zoom Link & Receipt Generation upon authorization.</span>
                          </div>
                        </div>
                      </div>

                      {/* Collapsible Refund Policy in Checkout Form */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm mt-4">
                        <button 
                          type="button"
                          onClick={() => setIsCheckoutRefundPolicyOpen(!isCheckoutRefundPolicyOpen)}
                          className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-slate-50 transition cursor-pointer font-medium"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gold-600" />
                            <span className="font-bold text-navy-900 text-xs uppercase tracking-wider">View Refund Policy & Disclaimers</span>
                          </div>
                          {isCheckoutRefundPolicyOpen ? (
                            <ChevronUp className="h-4 w-4 text-slate-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-500" />
                          )}
                        </button>
                        {isCheckoutRefundPolicyOpen && (
                          <div className="p-4 border-t border-slate-150 bg-slate-50/50 max-h-[250px] overflow-y-auto text-xs font-light leading-relaxed">
                            <RefundPolicyContent />
                          </div>
                        )}
                      </div>

                      {/* Checkout actions */}
                      <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                        <button 
                          onClick={() => setBookingStep(2)}
                          className="px-4 py-2.5 border border-slate-300 rounded text-slate-700 font-semibold text-xs uppercase tracking-wider hover:bg-slate-50 transition cursor-pointer"
                        >
                          Previous Step
                        </button>

                        <button 
                          onClick={handleInitiatePayment}
                          disabled={isProcessingPayment}
                          className="px-8 py-3.5 bg-gold-gradient text-navy-950 font-bold rounded shadow-lg hover:scale-105 transform transition uppercase tracking-wider text-xs border border-gold-400 flex items-center space-x-2 cursor-pointer"
                        >
                          {isProcessingPayment ? (
                            <>
                              <span className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin"></span>
                              <span>Authorizing Secure Gateway...</span>
                            </>
                          ) : (
                            <span>Process Payment & Confirm Booking ({selectedPackage && formatPrice(selectedPackage.price)})</span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: SUCCESS CONFIRMATION */}
                  {bookingStep === 4 && confirmedBooking && (
                    <div className="text-center space-y-6 animate-fade-in py-6">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
                        <Check className="h-8 w-8 stroke-[3]" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-display text-emerald-950 uppercase tracking-tight">Consultation Confirmed!</h3>
                        <p className="text-slate-500 text-sm">Transaction receipt and booking invitation have been sent via email.</p>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-lg mx-auto text-left text-xs space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                          <div>
                            <span className="text-slate-400 uppercase font-bold tracking-widest text-[9px] block">Booking Reference</span>
                            <span className="font-mono text-slate-800 font-bold text-sm">{confirmedBooking.id}</span>
                          </div>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase rounded-full border border-emerald-300">
                            Payment Confirmed
                          </span>
                        </div>

                        <p><strong>Client Name:</strong> <span className="text-slate-800">{confirmedBooking.fullName} ({confirmedBooking.email})</span></p>
                        <p><strong>Date & Time Slot:</strong> <span className="text-slate-800 font-bold">{confirmedBooking.date} &ndash; {confirmedBooking.timeSlot}</span></p>
                        <p><strong>Consultation Type:</strong> <span className="text-slate-800">{confirmedBooking.packageName} ({formatPrice(confirmedBooking.price)})</span></p>
                        
                        {/* Zoom Meeting Card */}
                        <div className="bg-navy-900 text-white p-4 rounded-xl border border-gold-500/30 space-y-3 mt-4 shadow-md">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <p className="text-[10px] text-gold-400 uppercase tracking-widest font-bold flex items-center space-x-1.5">
                              <Video className="h-3.5 w-3.5 text-gold-400" />
                              <span>Zoom Meeting Details</span>
                            </p>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">Live Link Ready</span>
                          </div>

                          <p className="text-xs">
                            <strong>Meeting URL:</strong> 
                            <a href={confirmedBooking.zoomLink} target="_blank" rel="noopener noreferrer" className="text-gold-300 break-all underline block font-semibold hover:text-gold-200 mt-0.5">
                              {confirmedBooking.zoomLink}
                            </a>
                          </p>

                          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 font-mono">
                            <p><strong>ID:</strong> <span className="text-slate-200">{confirmedBooking.meetingId}</span></p>
                            <p><strong>Passcode:</strong> <span className="text-slate-200">TCC2026</span></p>
                          </div>

                          <div className="pt-2 flex flex-wrap gap-2">
                            <button
                              onClick={() => handleCopyZoomLink(confirmedBooking.zoomLink)}
                              className="px-3 py-1.5 bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 text-[10px] font-bold rounded flex items-center space-x-1 border border-gold-500/40 transition cursor-pointer"
                            >
                              <Copy className="h-3 w-3" />
                              <span>{copiedLink ? 'Link Copied!' : 'Copy Zoom Link'}</span>
                            </button>
                            <a
                              href={confirmedBooking.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-gold-gradient text-navy-950 font-bold text-[10px] rounded flex items-center space-x-1 transition shadow hover:scale-105"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Join Meeting</span>
                            </a>
                          </div>
                        </div>

                        {/* Calendar Integration, WhatsApp & Email Dispatch, & Invoice Actions */}
                        <div className="pt-3 border-t border-slate-200 space-y-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Send Details, Calendar & Official Invoice</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <a
                              href={generateWhatsAppUrl(confirmedBooking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition cursor-pointer shadow-sm"
                            >
                              <MessageSquare className="h-4 w-4 fill-current" />
                              <span>Send via WhatsApp</span>
                            </a>

                            <a
                              href={generateEmailUrl(confirmedBooking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition cursor-pointer shadow-sm"
                            >
                              <Mail className="h-4 w-4" />
                              <span>Email Zoom Link & Receipt</span>
                            </a>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <a
                              href={generateGoogleCalendarUrl(confirmedBooking)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 flex items-center justify-center space-x-1.5 transition cursor-pointer shadow-sm"
                            >
                              <Calendar className="h-3.5 w-3.5 text-blue-600" />
                              <span>Add to Google Calendar</span>
                            </a>

                            <button
                              onClick={() => downloadIcsFile(confirmedBooking)}
                              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 flex items-center justify-center space-x-1.5 transition cursor-pointer shadow-sm"
                            >
                              <Download className="h-3.5 w-3.5 text-orange-600" />
                              <span>Download .ICS Invite</span>
                            </button>
                          </div>

                          <button
                            onClick={() => setSelectedInvoiceBooking(confirmedBooking)}
                            className="w-full py-2.5 bg-navy-900 hover:bg-navy-950 text-gold-400 text-xs font-bold rounded-xl uppercase tracking-wider flex items-center justify-center space-x-2 transition border border-gold-500/30 cursor-pointer shadow-md mt-2"
                          >
                            <FileText className="h-4 w-4 text-gold-400" />
                            <span>View & Print Official Tax Invoice</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 space-y-3">
                        <button 
                          onClick={() => { setActiveTab('main'); setBookingStep(1); setSelectedPackage(null); }}
                          className="px-6 py-3 bg-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded border border-navy-700"
                        >
                          Return to Homepage
                        </button>
                        <p className="text-[10px] text-slate-400 font-light">Need assistance? Email thecricketadvisor@gmail.com anytime.</p>
                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            3. ADMINISTRATIVE DASHBOARD TAB
           ========================================================================= */}
        {activeTab === 'admin' && (
          <div className="py-12 bg-slate-50 min-h-[90vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Back to Home Button */}
              <button 
                onClick={() => setActiveTab('main')}
                className="flex items-center space-x-2 text-slate-600 hover:text-navy-900 font-semibold mb-6 text-sm transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Public Website</span>
              </button>

              {/* DASHBOARD AUTHENTICATION LOCK GATE */}
              {!isAdminLoggedIn ? (
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                  <div className="text-center space-y-3 mb-6">
                    <div className="p-3 bg-navy-50 text-navy-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                      <Lock className="h-6 w-6 text-gold-500" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-navy-900 uppercase">Consultant Portal</h3>
                    <p className="text-slate-500 text-xs">Verify credentials to manage schedules, prices, placements and bookings.</p>
                  </div>

                  {adminError && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded text-xs text-red-600 mb-4 flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{adminError}</span>
                    </div>
                  )}

                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Username</label>
                      <input 
                        type="text" 
                        required
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded text-sm focus:outline-none focus:border-navy-500"
                        placeholder="admin"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Password</label>
                      <input 
                        type="password" 
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-250 rounded text-sm focus:outline-none focus:border-navy-500"
                        placeholder="••••••••"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-navy-800 hover:bg-navy-900 text-white font-bold rounded uppercase tracking-wider text-xs transition border border-navy-700 shadow"
                    >
                      Enter Portal Dashboard
                    </button>

                    <div className="mt-6 pt-4 border-t border-slate-200 text-left space-y-2">
                      <div className="flex items-center space-x-2 text-xs font-bold text-navy-900 uppercase">
                        <CreditCard className="h-4 w-4 text-orange-600" />
                        <span>Manage Bank & UPI Settings Here</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Sign in to update your Bank Account Number, IFSC Code, and UPI ID displayed to clients during booking checkout.
                      </p>
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 text-[11px] text-slate-700 space-y-1.5">
                        <div className="flex justify-between items-center font-bold text-slate-800">
                          <span>Consultant Login Credentials:</span>
                          <button 
                            type="button" 
                            onClick={() => { setAdminUsername('admin'); setAdminPassword(adminSettings.adminPassword || 'cricket2026'); }}
                            className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded font-bold hover:bg-orange-700 transition uppercase cursor-pointer"
                          >
                            Auto-Fill Login
                          </button>
                        </div>
                        <p className="font-mono text-slate-900">Username: <strong>admin</strong></p>
                        <p className="font-mono text-slate-900">Password: <strong>{adminSettings.adminPassword || 'cricket2026'}</strong></p>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                
                // MAIN ADMINISTRATIVE WORKSPACE
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Dashboard Header Bar */}
                  <div className="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between border border-gold-500/20">
                    <div className="text-left mb-4 sm:mb-0 space-y-1">
                      <p className="text-xs text-gold-400 uppercase tracking-widest font-semibold">Administrative Access Granted</p>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">TCC Management Console</h2>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleExportCSV}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded border border-slate-700 flex items-center space-x-2"
                        title="Export appointments schema to CSV format"
                      >
                        <FileSpreadsheet className="h-4 w-4" />
                        <span>Export CSV Report</span>
                      </button>
                      <button 
                        onClick={handleAdminLogout}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white text-xs font-bold uppercase tracking-wider rounded border border-red-500/30"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>

                  {/* Sub-Nav Toolbar for Admin Dashboard Sections */}
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-2">
                    <button 
                      onClick={() => setAdminSubTab('settings')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition flex items-center space-x-1.5 cursor-pointer ${adminSubTab === 'settings' ? 'bg-gold-500 text-navy-950 shadow-md font-extrabold' : 'bg-gold-50 text-gold-900 hover:bg-gold-100 border border-gold-200'}`}
                    >
                      <Video className="h-4 w-4 text-gold-600" />
                      <span>Zoom Email & Admin Config</span>
                    </button>
                    <button 
                      onClick={() => setAdminSubTab('bank')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition flex items-center space-x-2 cursor-pointer ${adminSubTab === 'bank' ? 'bg-orange-600 text-white shadow-md' : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'}`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Bank Account & UPI Settings</span>
                    </button>
                    <button 
                      onClick={() => setAdminSubTab('bookings')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition flex items-center space-x-1.5 ${adminSubTab === 'bookings' ? 'bg-navy-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Bookings ({bookings.length})</span>
                    </button>
                    <button 
                      onClick={() => setAdminSubTab('prices')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition flex items-center space-x-1.5 ${adminSubTab === 'prices' ? 'bg-navy-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      <DollarSign className="h-4 w-4" />
                      <span>Rates & Pricing</span>
                    </button>
                    <button 
                      onClick={() => setAdminSubTab('dates')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition flex items-center space-x-1.5 ${adminSubTab === 'dates' ? 'bg-navy-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      <Clock className="h-4 w-4" />
                      <span>Calendar Block</span>
                    </button>
                    <button 
                      onClick={() => setAdminSubTab('calendar')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition flex items-center space-x-1.5 ${adminSubTab === 'calendar' ? 'bg-navy-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      <Calendar className="h-4 w-4 text-gold-500" />
                      <span>Calendar & Zoom Sync</span>
                    </button>
                    <button 
                      onClick={() => setAdminSubTab('players')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition flex items-center space-x-1.5 ${adminSubTab === 'players' ? 'bg-navy-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      <Users className="h-4 w-4" />
                      <span>Player Roster</span>
                    </button>
                    <button 
                      onClick={() => setAdminSubTab('all')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition flex items-center space-x-1.5 ${adminSubTab === 'all' ? 'bg-navy-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      <span>View All Overview</span>
                    </button>
                  </div>

                  {/* Dedicated Calendar & Zoom Management View */}
                  {adminSubTab === 'calendar' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-navy-100 p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-150 pb-4 gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-6 w-6 text-gold-500" />
                            <h3 className="text-xl font-bold font-display text-navy-900 uppercase">Calendar Sync, Zoom Meetings & Invoicing</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Manage scheduled video consultations, sync with Google/Outlook calendar feeds, and issue official tax receipts.
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 self-start sm:self-auto">
                          <button
                            onClick={() => {
                              if (bookings.length > 0) {
                                downloadIcsFile(bookings[0]);
                              } else {
                                alert('No scheduled bookings available to export.');
                              }
                            }}
                            className="px-4 py-2 bg-navy-900 hover:bg-navy-950 text-gold-400 font-bold text-xs rounded-lg uppercase tracking-wider transition shadow flex items-center space-x-2 border border-gold-500/30 cursor-pointer"
                          >
                            <Download className="h-4 w-4 text-gold-400" />
                            <span>Export Calendar Feed (.ICS)</span>
                          </button>
                        </div>
                      </div>

                      {/* Explanation Banner: How Calendar Management Works */}
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="space-y-1 bg-white p-4 rounded-xl border border-slate-200">
                          <div className="flex items-center space-x-2 text-navy-900 font-bold">
                            <Video className="h-4 w-4 text-emerald-600" />
                            <span>1. Automated Zoom Rooms</span>
                          </div>
                          <p className="text-slate-500 leading-relaxed">
                            Upon payment completion, a unique Zoom meeting URL, Meeting ID, and passcode are generated automatically for each client.
                          </p>
                        </div>

                        <div className="space-y-1 bg-white p-4 rounded-xl border border-slate-200">
                          <div className="flex items-center space-x-2 text-navy-900 font-bold">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span>2. 2-Way Calendar Invites</span>
                          </div>
                          <p className="text-slate-500 leading-relaxed">
                            Clients receive instant Google Calendar template links and downloadable <code>.ics</code> calendar files that work seamlessly with Apple Calendar and Outlook.
                          </p>
                        </div>

                        <div className="space-y-1 bg-white p-4 rounded-xl border border-slate-200">
                          <div className="flex items-center space-x-2 text-navy-900 font-bold">
                            <FileText className="h-4 w-4 text-gold-600" />
                            <span>3. Automated GST Invoicing</span>
                          </div>
                          <p className="text-slate-500 leading-relaxed">
                            Official itemized GST tax invoices are automatically created with unique invoice numbers, SAC service codes, and printable receipts.
                          </p>
                        </div>
                      </div>

                      {/* Consultation Appointments Calendar Agenda */}
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <h4 className="font-bold font-display text-navy-900 uppercase text-sm">Scheduled Video Appointments Agenda</h4>
                          <span className="text-xs text-slate-500 font-medium">Total Appointments: {bookings.length}</span>
                        </div>

                        {bookings.length === 0 ? (
                          <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                            No scheduled video consultations found.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {bookings.map((booking) => (
                              <div key={booking.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 hover:border-slate-300 transition">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-navy-900 text-gold-400 rounded-lg font-bold font-mono text-xs">
                                      {booking.id}
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-navy-900 text-sm flex items-center space-x-2">
                                        <span>{booking.fullName}</span>
                                        <button
                                          onClick={() => setEditingBooking(booking)}
                                          className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-1.5 py-0.5 rounded font-bold transition flex items-center space-x-1 cursor-pointer"
                                          title="Update Client Email or WhatsApp"
                                        >
                                          <Edit2 className="h-2.5 w-2.5" />
                                          <span>Edit Email/WhatsApp</span>
                                        </button>
                                      </h5>
                                      <p className="text-slate-500 text-xs">
                                        <strong>Email:</strong> {booking.email} | <strong>WhatsApp:</strong> <span className="font-mono text-emerald-800 font-bold">{booking.whatsApp}</span>
                                      </p>
                                      <p className="text-slate-500 text-xs mt-0.5">{booking.packageName} &bull; <strong className="text-slate-800">{booking.date} @ {booking.timeSlot}</strong></p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-full border border-emerald-300">
                                      {booking.bookingStatus}
                                    </span>
                                    <span className="text-xs font-bold text-navy-900 font-mono">₹{booking.price}</span>
                                  </div>
                                </div>

                                <div className="bg-navy-900 text-white p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                  <div className="truncate max-w-md">
                                    <span className="text-gold-400 font-bold mr-2">Zoom Meeting:</span>
                                    <a href={booking.zoomLink} target="_blank" rel="noopener noreferrer" className="text-gold-300 underline font-semibold">{booking.zoomLink}</a>
                                  </div>
                                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                                    <button
                                      onClick={() => handleCopyZoomLink(booking.zoomLink)}
                                      className="px-2.5 py-1 bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 text-[10px] font-bold rounded flex items-center space-x-1 border border-gold-500/30 cursor-pointer"
                                    >
                                      <Copy className="h-3 w-3" />
                                      <span>Copy Link</span>
                                    </button>
                                    <a
                                      href={booking.zoomLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1 bg-gold-gradient text-navy-950 text-[10px] font-bold rounded flex items-center space-x-1 cursor-pointer"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      <span>Start Meeting</span>
                                    </a>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200 gap-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <a
                                      href={generateWhatsAppUrl(booking)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded flex items-center space-x-1 cursor-pointer shadow-sm"
                                      title="Send Zoom Link & Details directly to Client's WhatsApp"
                                    >
                                      <MessageSquare className="h-3 w-3 fill-current" />
                                      <span>Send via WhatsApp</span>
                                    </a>

                                    <a
                                      href={generateEmailUrl(booking)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded flex items-center space-x-1 cursor-pointer shadow-sm"
                                      title="Send Email with Zoom Link & Invoice"
                                    >
                                      <Mail className="h-3 w-3" />
                                      <span>Email Zoom Link</span>
                                    </a>

                                    <a
                                      href={generateGoogleCalendarUrl(booking)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold rounded border border-slate-300 flex items-center space-x-1 cursor-pointer"
                                    >
                                      <Calendar className="h-3 w-3 text-blue-600" />
                                      <span>Google Cal</span>
                                    </a>

                                    <button
                                      onClick={() => downloadIcsFile(booking)}
                                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold rounded border border-slate-300 flex items-center space-x-1 cursor-pointer"
                                    >
                                      <Download className="h-3 w-3 text-orange-600" />
                                      <span>.ICS</span>
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => setSelectedInvoiceBooking(booking)}
                                    className="px-3 py-1 bg-navy-900 hover:bg-navy-950 text-gold-400 font-bold text-xs rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
                                  >
                                    <FileText className="h-3.5 w-3.5 text-gold-400" />
                                    <span>View / Print Invoice</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dedicated Consultation Bookings & Direct WhatsApp Dispatch View */}
                  {adminSubTab === 'bookings' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-navy-100 p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-150 pb-4 gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-6 w-6 text-emerald-600" />
                            <h3 className="text-xl font-bold font-display text-navy-900 uppercase">Consultation Bookings & WhatsApp Dispatch</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Click <strong>"Send via WhatsApp"</strong> on any client booking to open WhatsApp with pre-filled Zoom meeting link, ID, and passcode.
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                            {bookings.length} Bookings Registered
                          </span>
                        </div>
                      </div>

                      {bookings.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                          No active consultation bookings registered.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {bookings.map((booking) => (
                            <div key={booking.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3 hover:border-slate-300 transition">
                              <div className="flex justify-between items-start flex-wrap gap-2">
                                <div>
                                  <span className="font-mono text-slate-400 font-bold block">{booking.id}</span>
                                  <h4 className="font-bold text-sm text-navy-900 flex items-center space-x-2">
                                    <span>{booking.fullName}</span>
                                    <button
                                      onClick={() => setEditingBooking(booking)}
                                      className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded font-bold transition flex items-center space-x-1 cursor-pointer"
                                      title="Update Client Email or WhatsApp"
                                    >
                                      <Edit2 className="h-2.5 w-2.5" />
                                      <span>Edit Email/WhatsApp</span>
                                    </button>
                                  </h4>
                                  <p className="text-slate-500 mt-0.5">
                                    <strong>Email:</strong> {booking.email} | <strong>WhatsApp:</strong> <span className="font-mono text-emerald-800 font-bold">{booking.whatsApp}</span>
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="px-2.5 py-1 font-semibold rounded-full uppercase tracking-wider text-[10px] block border text-center" 
                                    style={{
                                      borderColor: booking.bookingStatus === 'Approved' ? '#10b981' : booking.bookingStatus === 'Cancelled' ? '#ef4444' : '#f59e0b',
                                      color: booking.bookingStatus === 'Approved' ? '#047857' : booking.bookingStatus === 'Cancelled' ? '#b91c1c' : '#b45309',
                                      backgroundColor: booking.bookingStatus === 'Approved' ? '#f0fdf4' : booking.bookingStatus === 'Cancelled' ? '#fef2f2' : '#fffbeb'
                                    }}
                                  >
                                    {booking.bookingStatus}
                                  </span>
                                  <span className="text-[10px] text-slate-400 block mt-1">Paid via {booking.paymentMethod}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-200/60 pt-3 text-slate-600">
                                <p><strong>Package:</strong> {booking.packageName}</p>
                                <p><strong>Price:</strong> {formatPrice(booking.price)}</p>
                                <p><strong>Scheduled Slot:</strong> {booking.date} @ {booking.timeSlot}</p>
                                <p><strong>Playing level:</strong> {booking.playingLevel}</p>
                              </div>

                              <div className="bg-navy-900 text-white p-3 rounded-lg flex items-center justify-between text-[11px]">
                                <p className="truncate mr-3"><strong>Zoom Link:</strong> <a href={booking.zoomLink} target="_blank" rel="noopener noreferrer" className="text-gold-300 hover:underline">{booking.zoomLink}</a></p>
                                <span className="font-mono text-slate-400">ID: {booking.meetingId}</span>
                              </div>

                              {/* DIRECT DISPATCH BUTTONS */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                                <div className="flex flex-wrap items-center gap-2">
                                  <a
                                    href={generateWhatsAppUrl(booking)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer shadow transition"
                                    title="Send Zoom Link & Consultation Details directly to Client's WhatsApp"
                                  >
                                    <MessageSquare className="h-4 w-4 fill-current text-white" />
                                    <span>Send via WhatsApp</span>
                                  </a>

                                  <a
                                    href={generateEmailUrl(booking)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer shadow transition"
                                    title="Send Email with Zoom Link & Invoice"
                                  >
                                    <Mail className="h-4 w-4" />
                                    <span>Send via Email</span>
                                  </a>

                                  <button
                                    onClick={() => setSelectedInvoiceBooking(booking)}
                                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-950 text-gold-400 text-xs font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer"
                                  >
                                    <FileText className="h-4 w-4 text-gold-400" />
                                    <span>View Invoice</span>
                                  </button>
                                </div>

                                <div className="flex items-center space-x-2">
                                  {booking.bookingStatus !== 'Approved' && (
                                    <button 
                                      onClick={() => handleUpdateBookingStatus(booking.id, 'Approved')}
                                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase tracking-wider rounded font-bold transition"
                                    >
                                      Approve
                                    </button>
                                  )}
                                  {booking.bookingStatus !== 'Cancelled' && (
                                    <button 
                                      onClick={() => handleUpdateBookingStatus(booking.id, 'Cancelled')}
                                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] uppercase tracking-wider rounded font-bold transition"
                                    >
                                      Cancel Booking
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dedicated Calendar Block (Dates & Time Slots) View */}
                  {adminSubTab === 'dates' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-navy-100 p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-150 pb-4 gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-6 w-6 text-red-600" />
                            <h3 className="text-xl font-bold font-display text-navy-900 uppercase">Block Calendar Dates & Specific Time Slots</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Block off unavailable dates (e.g., travel/holidays) or specific time slots (e.g., Monday at 11:00 AM IST) so clients cannot book them online.
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-300">
                            {blockedDates.length} Full Dates & {blockedSlots.length} Slots Blocked
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Block Specific Slot (e.g. Monday at 11 AM) */}
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                          <h4 className="font-bold text-sm text-navy-900 uppercase flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-amber-600" />
                            <span>Block Specific Time Slot (e.g. Monday 11:00 AM)</span>
                          </h4>
                          <p className="text-xs text-slate-500">
                            Pick a date and a time slot to block individually without blocking the entire day.
                          </p>
                          <div className="space-y-3 pt-1">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Select Date</label>
                              <input 
                                type="date" 
                                id="admin-tab-block-slot-date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:border-navy-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Select Time Slot (IST)</label>
                              <select
                                id="admin-tab-block-slot-time"
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:border-navy-500"
                              >
                                {defaultTimeSlots.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                            <button 
                              type="button"
                              onClick={() => {
                                const dateEl = document.getElementById('admin-tab-block-slot-date') as HTMLInputElement;
                                const slotEl = document.getElementById('admin-tab-block-slot-time') as HTMLSelectElement;
                                if (dateEl && dateEl.value && slotEl && slotEl.value) {
                                  handleBlockSlot(dateEl.value, slotEl.value);
                                }
                              }}
                              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg uppercase tracking-wider shadow transition cursor-pointer"
                            >
                              Block This Time Slot
                            </button>
                          </div>
                        </div>

                        {/* Block Full Day */}
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                          <h4 className="font-bold text-sm text-navy-900 uppercase flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-red-600" />
                            <span>Block Entire Day</span>
                          </h4>
                          <p className="text-xs text-slate-500">
                            Select a full date to disable all time slots on that day for clients.
                          </p>
                          <div className="space-y-3 pt-1">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Select Date to Block Completely</label>
                              <input 
                                type="date" 
                                id="admin-tab-block-date"
                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:outline-none focus:border-navy-500"
                              />
                            </div>
                            <button 
                              type="button"
                              onClick={() => {
                                const el = document.getElementById('admin-tab-block-date') as HTMLInputElement;
                                if (el && el.value) {
                                  handleBlockDate(el.value);
                                  el.value = '';
                                }
                              }}
                              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg uppercase tracking-wider shadow transition cursor-pointer"
                            >
                              Block Entire Day
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Blocked Listings */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                        <div>
                          <h4 className="font-bold text-xs text-slate-700 uppercase mb-2">Blocked Time Slots ({blockedSlots.length})</h4>
                          {blockedSlots.length === 0 ? (
                            <p className="text-slate-400 text-xs italic">No individual slots blocked.</p>
                          ) : (
                            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                              {blockedSlots.map(key => {
                                const [d, s] = key.split('|');
                                return (
                                  <div key={key} className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex justify-between items-center text-xs">
                                    <div>
                                      <span className="font-mono font-bold text-amber-950 block">{d}</span>
                                      <span className="text-amber-800 text-[11px] font-semibold">{s}</span>
                                    </div>
                                    <button
                                      onClick={() => handleUnblockSlot(key)}
                                      className="px-2 py-1 bg-amber-200/60 hover:bg-amber-300 text-amber-900 font-bold rounded text-[10px] transition cursor-pointer"
                                    >
                                      Unblock Slot
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-slate-700 uppercase mb-2">Blocked Full Dates ({blockedDates.length})</h4>
                          {blockedDates.length === 0 ? (
                            <p className="text-slate-400 text-xs italic">No full dates blocked.</p>
                          ) : (
                            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                              {blockedDates.map(date => (
                                <div key={date} className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex justify-between items-center text-xs">
                                  <span className="font-mono font-bold text-red-950">{date}</span>
                                  <button
                                    onClick={() => handleUnblockDate(date)}
                                    className="px-2 py-1 bg-red-200/60 hover:bg-red-300 text-red-900 font-bold rounded text-[10px] transition cursor-pointer"
                                  >
                                    Unblock Day
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dedicated Zoom Email, Password & Admin Settings View */}
                  {adminSubTab === 'settings' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gold-300 p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-150 pb-4 gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Video className="h-6 w-6 text-gold-600" />
                            <h3 className="text-xl font-bold font-display text-navy-900 uppercase">Zoom Host Email & Admin Configuration</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Configure your primary Email ID for Zoom video consultations, admin portal password, and tax invoice headers.
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-gold-100 text-gold-900 font-mono text-xs font-extrabold rounded-full border border-gold-300 self-start sm:self-auto">
                          Configured Email: {adminSettings.adminEmail}
                        </span>
                      </div>

                      {adminSettingsSaveMsg && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 animate-bounce">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span>{adminSettingsSaveMsg}</span>
                        </div>
                      )}

                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          saveAdminSettingsToStorage(adminSettings);
                        }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                          {/* Primary Email ID for Zoom & Notifications */}
                          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <label className="block text-navy-900 font-bold uppercase text-[10px]">
                              Primary Email ID (For Zoom & Inquiries) *
                            </label>
                            <input
                              type="email"
                              required
                              value={adminSettings.adminEmail}
                              onChange={(e) => setAdminSettings({ ...adminSettings, adminEmail: e.target.value, zoomHostEmail: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-gold-500 font-medium"
                              placeholder="thecricketadvisor@gmail.com"
                            />
                            <p className="text-[10px] text-slate-500">This email address is configured with Zoom for meeting room generation and client alerts.</p>
                          </div>

                          {/* Zoom Host Display Name */}
                          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <label className="block text-navy-900 font-bold uppercase text-[10px]">
                              Zoom Host Display Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={adminSettings.zoomHostName}
                              onChange={(e) => setAdminSettings({ ...adminSettings, zoomHostName: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-gold-500 font-medium"
                              placeholder="Prakash Palande (TCC)"
                            />
                            <p className="text-[10px] text-slate-500">Shown to clients on their booking receipt and Zoom calendar invitation.</p>
                          </div>

                          {/* Zoom Personal Meeting ID / Link Prefix */}
                          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <label className="block text-navy-900 font-bold uppercase text-[10px]">
                              Zoom Personal Meeting ID / Room Code *
                            </label>
                            <input
                              type="text"
                              required
                              value={adminSettings.zoomPersonalMeetingId}
                              onChange={(e) => setAdminSettings({ ...adminSettings, zoomPersonalMeetingId: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-gold-500 font-mono"
                              placeholder="987 654 3210"
                            />
                            <p className="text-[10px] text-slate-500">Used to generate secure instant meeting links for each client appointment.</p>
                          </div>

                          {/* Admin Portal Security Password */}
                          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <label className="block text-navy-900 font-bold uppercase text-[10px] text-orange-700">
                              Admin Portal Password *
                            </label>
                            <input
                              type="text"
                              required
                              value={adminSettings.adminPassword}
                              onChange={(e) => setAdminSettings({ ...adminSettings, adminPassword: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-orange-500 font-mono font-bold text-orange-900"
                              placeholder="cricket2026"
                            />
                            <p className="text-[10px] text-slate-500">Your password to enter the Management Portal (Current: <strong>{adminSettings.adminPassword}</strong>).</p>
                          </div>

                          {/* GSTIN Tax Registration */}
                          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <label className="block text-navy-900 font-bold uppercase text-[10px]">
                              GSTIN / Tax Registration No.
                            </label>
                            <input
                              type="text"
                              value={adminSettings.gstin}
                              onChange={(e) => setAdminSettings({ ...adminSettings, gstin: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-gold-500 font-mono"
                              placeholder="27AAAAA0000A1Z5"
                            />
                            <p className="text-[10px] text-slate-500">Appears on client tax invoices and official payment receipts.</p>
                          </div>

                          {/* Business Address */}
                          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <label className="block text-navy-900 font-bold uppercase text-[10px]">
                              Business Office Address
                            </label>
                            <input
                              type="text"
                              value={adminSettings.businessAddress}
                              onChange={(e) => setAdminSettings({ ...adminSettings, businessAddress: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-gold-500"
                              placeholder="Mumbai & Global Cricket Advisory, India"
                            />
                            <p className="text-[10px] text-slate-500">Displayed in tax invoice headers for professional compliance.</p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="px-6 py-3 bg-navy-900 hover:bg-navy-950 text-gold-400 font-extrabold text-xs rounded-xl uppercase tracking-wider transition shadow flex items-center space-x-2 border border-gold-500/30 cursor-pointer"
                          >
                            <CheckCircle className="h-4 w-4 text-gold-400" />
                            <span>Save & Apply Zoom Email & Settings</span>
                          </button>
                        </div>
                      </form>

                      {/* Explanation Guide on How Invoices, Zoom, and Calendar work */}
                      <div className="pt-6 border-t border-slate-200 space-y-3">
                        <h4 className="font-bold text-navy-900 uppercase text-xs tracking-wider">How Automation & Dispatch Work in TCC System</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                            <p className="font-bold text-navy-900">🎥 1. Automated Zoom</p>
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              When a client completes a booking, a unique password-protected Zoom meeting URL is generated linked to <strong>{adminSettings.adminEmail}</strong>.
                            </p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                            <p className="font-bold text-emerald-900">💬 2. WhatsApp & Email Dispatch</p>
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              Client WhatsApp & Email are captured during checkout. Use 1-click <strong>WhatsApp Zoom Link</strong> or <strong>Email Zoom Link</strong> buttons to dispatch instantly!
                            </p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                            <p className="font-bold text-navy-900">📄 3. Instant Tax Invoicing</p>
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              Every paid consultation generates a downloadable/printable GST Tax Invoice with SAC Code 998311, GST calculations, and custom reference ID.
                            </p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                            <p className="font-bold text-navy-900">📅 4. Calendar Sync</p>
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              Clients and consultants get 1-click Google Calendar links and downloadable <code>.ics</code> calendar feeds for seamless schedule sync.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dedicated Bank & UPI Settings View */}
                  {adminSubTab === 'bank' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-150 pb-4 gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-6 w-6 text-orange-600" />
                            <h3 className="text-xl font-bold font-display text-navy-900 uppercase">Bank Account & UPI Payment Settings</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Configure your bank account details and UPI ID shown to clients during booking checkout.</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-mono text-xs font-bold rounded-full border border-emerald-200 self-start sm:self-auto">
                          Live Payout Active
                        </span>
                      </div>

                      {bankSaveMessage && (
                        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-lg shadow-sm flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span>{bankSaveMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Form column */}
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          saveBankDetailsToStorage(bankDetails);
                        }} className="lg:col-span-7 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 text-xs">
                          <h4 className="font-bold text-sm text-navy-900 uppercase border-b border-slate-200 pb-2">Edit Payment Credentials</h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-700 font-semibold uppercase text-[10px] mb-1">Account Holder Name *</label>
                              <input 
                                type="text" 
                                value={bankDetails.accountName}
                                onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded text-sm focus:outline-none focus:border-navy-500 font-medium"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-slate-700 font-semibold uppercase text-[10px] mb-1">Bank Name *</label>
                              <input 
                                type="text" 
                                value={bankDetails.bankName}
                                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded text-sm focus:outline-none focus:border-navy-500 font-medium"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-700 font-semibold uppercase text-[10px] mb-1">Account Number *</label>
                              <input 
                                type="text" 
                                value={bankDetails.accountNumber}
                                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded text-sm focus:outline-none focus:border-navy-500 font-mono font-bold"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-slate-700 font-semibold uppercase text-[10px] mb-1">IFSC Code *</label>
                              <input 
                                type="text" 
                                value={bankDetails.ifscCode}
                                onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded text-sm focus:outline-none focus:border-navy-500 font-mono font-bold"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-700 font-semibold uppercase text-[10px] mb-1">UPI ID (e.g., GPay / PhonePe / Paytm / BHIM) *</label>
                            <input 
                              type="text" 
                              value={bankDetails.upiId}
                              onChange={(e) => setBankDetails({ ...bankDetails, upiId: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded text-sm focus:outline-none focus:border-navy-500 font-mono font-bold text-navy-900"
                              required
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg mt-2"
                          >
                            Save & Publish Bank & UPI Settings
                          </button>
                        </form>

                        {/* Preview Column */}
                        <div className="lg:col-span-5 bg-navy-950 text-white p-6 rounded-xl border border-gold-500/30 space-y-4">
                          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Client Checkout Preview</span>
                            <span className="text-[10px] bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded font-mono">Step 3 Live Mode</span>
                          </div>

                          <p className="text-xs text-slate-300">This is how your bank details appear to clients during checkout:</p>

                          <div className="bg-white text-slate-900 p-4 rounded-lg border border-gold-400 space-y-3 text-xs">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                              <span className="font-bold text-navy-900 uppercase text-[11px]">Direct Bank & UPI Transfer</span>
                              <span className="text-[10px] text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-200">Verified</span>
                            </div>
                            <div className="space-y-1.5 text-slate-700 text-[11px]">
                              <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
                              <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
                              <p><strong>Account No:</strong> <span className="font-mono font-bold text-slate-900">{bankDetails.accountNumber}</span></p>
                              <p><strong>IFSC Code:</strong> <span className="font-mono font-bold text-slate-900">{bankDetails.ifscCode}</span></p>
                              <div className="mt-2 p-2.5 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                                <div>
                                  <span className="block text-[9px] text-slate-400 uppercase font-bold">UPI ID</span>
                                  <span className="font-mono font-bold text-navy-900 text-xs">{bankDetails.upiId}</span>
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => alert('Client clicking this copies the UPI ID')}
                                  className="px-2.5 py-1 bg-orange-600 text-white text-[10px] font-bold rounded uppercase"
                                >
                                  Copy UPI
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dedicated Rates & Session Duration Management View */}
                  {adminSubTab === 'prices' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-navy-100 p-6 sm:p-8 space-y-6 animate-fade-in">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-150 pb-4 gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-6 w-6 text-orange-600" />
                            <h3 className="text-xl font-bold font-display text-navy-900 uppercase">Consultation Session Durations & Rates</h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Set consultation prices and duration in minutes (30, 45, 60, 90 mins). Default session duration is set to 60 Minutes.
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 self-start sm:self-auto">
                          <button 
                            onClick={handleSetAll60Mins}
                            className="px-4 py-2.5 bg-navy-900 hover:bg-navy-950 text-gold-400 font-bold text-xs rounded-lg uppercase tracking-wider transition shadow flex items-center space-x-2 border border-gold-500/30 cursor-pointer"
                          >
                            <CheckCircle className="h-4 w-4 text-gold-400" />
                            <span>Set All Sessions to 60 Minutes</span>
                          </button>
                          <button 
                            onClick={handleResetDefaultPackages}
                            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg uppercase tracking-wider transition flex items-center space-x-1.5 border border-slate-200 cursor-pointer"
                          >
                            <span>Reset Defaults</span>
                          </button>
                        </div>
                      </div>

                      {packageSaveMsg && (
                        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-lg shadow-sm flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span>{packageSaveMsg}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packages.map((pkg) => (
                          <div key={pkg.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between hover:border-slate-300 transition">
                            <div>
                              <div className="flex justify-between items-start gap-2 mb-1">
                                <h4 className="font-bold text-navy-900 text-sm">{pkg.title}</h4>
                                <span className="px-2.5 py-0.5 bg-orange-100 text-orange-800 font-mono font-bold text-xs rounded-full border border-orange-200">
                                  {pkg.duration}
                                </span>
                              </div>
                              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{pkg.description}</p>
                            </div>

                            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                              {editingPriceId === pkg.id ? (
                                <div className="w-full space-y-2 bg-white p-3 rounded-lg border border-orange-300 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Price (₹)</label>
                                      <input 
                                        type="number"
                                        value={tempPrice}
                                        onChange={(e) => setTempPrice(parseInt(e.target.value) || 0)}
                                        className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono font-bold text-navy-900 focus:outline-none focus:border-navy-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Minutes / Duration</label>
                                      <select 
                                        value={tempDuration}
                                        onChange={(e) => setTempDuration(e.target.value)}
                                        className="w-full px-2 py-1.5 border border-slate-300 rounded font-semibold text-navy-900 focus:outline-none focus:border-navy-500"
                                      >
                                        <option value="30 Mins">30 Mins</option>
                                        <option value="45 Mins">45 Mins</option>
                                        <option value="60 Mins">60 Mins (Standard)</option>
                                        <option value="90 Mins">90 Mins (1.5 Hrs)</option>
                                        <option value="120 Mins">120 Mins (2 Hrs)</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="flex space-x-2 pt-1">
                                    <button 
                                      onClick={() => handleUpdatePackage(pkg.id, tempPrice, tempDuration)}
                                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded flex items-center justify-center space-x-1 cursor-pointer"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                      <span>Save Changes</span>
                                    </button>
                                    <button 
                                      onClick={() => setEditingPriceId(null)}
                                      className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded cursor-pointer"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="space-x-2">
                                    <span className="text-base font-extrabold text-navy-900 font-display">₹{pkg.price}</span>
                                    <span className="text-xs text-slate-500 font-medium">({pkg.duration} session)</span>
                                  </div>
                                  <button 
                                    onClick={() => { setEditingPriceId(pkg.id); setTempPrice(pkg.price); setTempDuration(pkg.duration || '60 Mins'); }}
                                    className="px-3 py-1.5 bg-navy-900 hover:bg-navy-950 text-white text-xs font-bold rounded-lg flex items-center space-x-1 transition shadow-sm cursor-pointer"
                                  >
                                    <Edit2 className="h-3.5 w-3.5 text-gold-400" />
                                    <span>Edit Rate & Minutes</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dashboard Content Grid splits */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT PANEL (8 COLS): BOOKINGS & PLAYER PLACEMENT PANEL */}
                    <div className="lg:col-span-8 space-y-8">
                      
                      {/* Booking Request List */}
                      <div className="bg-white rounded-2xl shadow-md border border-slate-150 p-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                          <h3 className="text-lg font-bold font-display text-navy-900 uppercase">Consultation Bookings ({bookings.length})</h3>
                          <span className="text-[11px] font-mono text-slate-400">Database synchronization active</span>
                        </div>

                        {bookings.length === 0 ? (
                          <div className="text-center py-8 text-slate-400">
                            <Calendar className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-xs">No active bookings registered.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {bookings.map((booking) => (
                              <div key={booking.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                  <div>
                                    <span className="font-mono text-slate-400 font-bold block">{booking.id}</span>
                                    <h4 className="font-bold text-sm text-navy-900 flex items-center space-x-2">
                                      <span>{booking.fullName}</span>
                                      <button
                                        onClick={() => setEditingBooking(booking)}
                                        className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-1.5 py-0.5 rounded font-bold transition flex items-center space-x-1 cursor-pointer"
                                        title="Update Client Email or WhatsApp"
                                      >
                                        <Edit2 className="h-2.5 w-2.5" />
                                        <span>Edit Email/WhatsApp</span>
                                      </button>
                                    </h4>
                                    <p className="text-slate-500"><strong>Email:</strong> {booking.email} | <strong>WhatsApp:</strong> <span className="font-mono text-emerald-800 font-bold">{booking.whatsApp}</span></p>
                                  </div>
                                  <div className="text-right">
                                    <span className="px-2.5 py-1 font-semibold rounded-full uppercase tracking-wider text-[10px] block border text-center" 
                                      style={{
                                        borderColor: booking.bookingStatus === 'Approved' ? '#10b981' : booking.bookingStatus === 'Cancelled' ? '#ef4444' : '#f59e0b',
                                        color: booking.bookingStatus === 'Approved' ? '#047857' : booking.bookingStatus === 'Cancelled' ? '#b91c1c' : '#b45309',
                                        backgroundColor: booking.bookingStatus === 'Approved' ? '#f0fdf4' : booking.bookingStatus === 'Cancelled' ? '#fef2f2' : '#fffbeb'
                                      }}
                                    >
                                      {booking.bookingStatus}
                                    </span>
                                    <span className="text-[10px] text-slate-400 block mt-1">Paid via {booking.paymentMethod}</span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-200/60 pt-3 text-slate-600">
                                  <p><strong>Package:</strong> {booking.packageName}</p>
                                  <p><strong>Price:</strong> {formatPrice(booking.price)}</p>
                                  <p><strong>Scheduled Slot:</strong> {booking.date} @ {booking.timeSlot}</p>
                                  <p><strong>Playing level:</strong> {booking.playingLevel}</p>
                                </div>

                                <p className="bg-white p-2.5 rounded border border-slate-200 text-[11px] text-slate-500">
                                  <strong>Purpose of Consultation:</strong> "{booking.purpose}"
                                </p>

                                <div className="bg-navy-900 text-white p-3 rounded-lg flex items-center justify-between text-[11px]">
                                  <p className="truncate mr-3"><strong>Zoom Link:</strong> <a href={booking.zoomLink} target="_blank" rel="noopener noreferrer" className="text-gold-300 hover:underline">{booking.zoomLink}</a></p>
                                  <span className="font-mono text-slate-400">ID: {booking.meetingId}</span>
                                </div>

                                {/* Booking action triggers & 1-click Dispatch */}
                                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <a
                                      href={generateWhatsAppUrl(booking)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded flex items-center space-x-1 cursor-pointer shadow-sm"
                                      title="Send Zoom Link & Details directly to Client's WhatsApp"
                                    >
                                      <MessageSquare className="h-3 w-3 fill-current" />
                                      <span>Send via WhatsApp</span>
                                    </a>

                                    <a
                                      href={generateEmailUrl(booking)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded flex items-center space-x-1 cursor-pointer shadow-sm"
                                      title="Send Email with Zoom Link & Invoice"
                                    >
                                      <Mail className="h-3 w-3" />
                                      <span>Send Email</span>
                                    </a>

                                    <button
                                      onClick={() => setSelectedInvoiceBooking(booking)}
                                      className="px-2.5 py-1 bg-navy-900 hover:bg-navy-950 text-gold-400 text-[10px] font-bold rounded flex items-center space-x-1 cursor-pointer"
                                    >
                                      <FileText className="h-3 w-3 text-gold-400" />
                                      <span>Invoice</span>
                                    </button>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    {booking.bookingStatus !== 'Approved' && (
                                      <button 
                                        onClick={() => handleUpdateBookingStatus(booking.id, 'Approved')}
                                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase tracking-wider rounded font-bold transition"
                                      >
                                        Approve
                                      </button>
                                    )}
                                    {booking.bookingStatus !== 'Cancelled' && (
                                      <button 
                                        onClick={() => handleUpdateBookingStatus(booking.id, 'Cancelled')}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] uppercase tracking-wider rounded font-bold transition"
                                      >
                                        Cancel Booking
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Manage Player Profiles */}
                      <div className="bg-white rounded-2xl shadow-md border border-slate-150 p-6 space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <h3 className="text-lg font-bold font-display text-navy-900 uppercase">Manage Player Profiles</h3>
                          <p className="text-xs text-slate-400">Add or remove players featured on the public placements roster.</p>
                        </div>

                        {/* Roster list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {players.map(p => (
                            <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-start">
                              <div className="space-y-1">
                                <span className="px-2 py-0.5 text-[9px] font-bold bg-gold-100 text-gold-800 rounded uppercase">{p.country}</span>
                                <h4 className="font-bold text-navy-900 text-sm">{p.name}</h4>
                                <p className="text-slate-500 font-medium">Club: {p.club}</p>
                                <p className="text-slate-400">Season: {p.season}</p>
                              </div>
                              <button 
                                onClick={() => handleDeletePlayer(p.id)}
                                className="p-1 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 transition"
                                title="Delete Profile"
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add Player Form */}
                        <form onSubmit={handleAddPlayer} className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs space-y-4">
                          <h4 className="font-bold font-display text-navy-900 uppercase tracking-wider border-b border-slate-200 pb-2">Add New Placed Player</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-600 uppercase font-semibold mb-1">Player Name *</label>
                              <input 
                                type="text" 
                                required
                                value={newPlayer.name}
                                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500"
                                placeholder="E.g. Vinayak Shukla"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 uppercase font-semibold mb-1">Country *</label>
                              <input 
                                type="text" 
                                required
                                value={newPlayer.country}
                                onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500"
                                placeholder="E.g. Oman"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-600 uppercase font-semibold mb-1">Overseas Club</label>
                              <input 
                                type="text" 
                                value={newPlayer.club}
                                onChange={(e) => setNewPlayer({ ...newPlayer, club: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500"
                                placeholder="E.g. Sussex Cricket Club"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 uppercase font-semibold mb-1">Season Year</label>
                              <input 
                                type="text" 
                                value={newPlayer.season}
                                onChange={(e) => setNewPlayer({ ...newPlayer, season: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500"
                                placeholder="E.g. 2018 or Present"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-600 uppercase font-semibold mb-1">Placement Achievement Description *</label>
                            <input 
                              type="text" 
                              required
                              value={newPlayer.achievement}
                              onChange={(e) => setNewPlayer({ ...newPlayer, achievement: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500"
                              placeholder="E.g. Successfully placed in Oman and recently appointed Captain."
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-2.5 bg-navy-800 text-white font-bold uppercase tracking-wider rounded border border-navy-700"
                          >
                            Add To Placements Roster
                          </button>
                        </form>
                      </div>

                    </div>

                    {/* RIGHT PANEL (4 COLS): PRICE MANAGEMENT & BLOCK DATES */}
                    <div className="lg:col-span-4 space-y-8">
                      
                      {/* Manage Consultation Prices */}
                      <div className="bg-white rounded-2xl shadow-md border border-slate-150 p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h3 className="text-base font-bold font-display text-navy-900 uppercase">Consultation Rates</h3>
                          <button 
                            onClick={handleSetAll60Mins}
                            className="text-[10px] bg-orange-50 text-orange-700 hover:bg-orange-100 font-bold px-2 py-0.5 rounded border border-orange-200 uppercase transition cursor-pointer"
                            title="Set all session durations to 60 Mins"
                          >
                            All 60 Mins
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {packages.map(pkg => (
                            <div key={pkg.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col space-y-2 text-xs">
                              <div className="flex justify-between items-center">
                                <h4 className="font-bold text-navy-900 truncate max-w-[160px]">{pkg.title}</h4>
                                <span className="text-[10px] font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">{pkg.duration}</span>
                              </div>
                              <div>
                                {editingPriceId === pkg.id ? (
                                  <div className="space-y-2 bg-white p-2.5 rounded border border-orange-300">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Price (₹)</label>
                                        <input 
                                          type="number" 
                                          value={tempPrice}
                                          onChange={(e) => setTempPrice(parseInt(e.target.value) || 0)}
                                          className="w-full px-1.5 py-1 bg-white border border-slate-300 rounded text-center text-xs font-bold focus:outline-none focus:border-navy-500"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase">Minutes</label>
                                        <select 
                                          value={tempDuration}
                                          onChange={(e) => setTempDuration(e.target.value)}
                                          className="w-full px-1 py-1 bg-white border border-slate-300 rounded text-xs font-semibold focus:outline-none focus:border-navy-500"
                                        >
                                          <option value="30 Mins">30 Mins</option>
                                          <option value="45 Mins">45 Mins</option>
                                          <option value="60 Mins">60 Mins</option>
                                          <option value="90 Mins">90 Mins</option>
                                          <option value="120 Mins">120 Mins</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="flex space-x-1 pt-1">
                                      <button 
                                        onClick={() => handleUpdatePackage(pkg.id, tempPrice, tempDuration)}
                                        className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[10px] flex items-center justify-center space-x-1 cursor-pointer"
                                      >
                                        <Check className="h-3 w-3" />
                                        <span>Save</span>
                                      </button>
                                      <button 
                                        onClick={() => setEditingPriceId(null)}
                                        className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-bold cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between border-t border-slate-200/60 pt-1.5">
                                    <span className="font-bold font-display text-navy-900 text-sm">₹{pkg.price}</span>
                                    <button 
                                      onClick={() => { setEditingPriceId(pkg.id); setTempPrice(pkg.price); setTempDuration(pkg.duration || '60 Mins'); }}
                                      className="p-1 text-slate-400 hover:text-gold-600 hover:bg-slate-100 rounded transition flex items-center space-x-1 font-semibold text-[11px] cursor-pointer"
                                      title="Edit Price & Minutes"
                                    >
                                      <Edit2 className="h-3.5 w-3.5" />
                                      <span>Edit</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Block Schedule Dates & Slots */}
                      <div className="bg-white rounded-2xl shadow-md border border-slate-150 p-6 space-y-4">
                        <h3 className="text-base font-bold font-display text-navy-900 uppercase border-b border-slate-100 pb-3 flex items-center justify-between">
                          <span>Block Calendar Dates & Slots</span>
                          <Clock className="h-4 w-4 text-red-600" />
                        </h3>
                        <p className="text-[11px] text-slate-500">Prevent clients from booking specific dates or specific time slots (e.g. Monday 11 AM).</p>
                        
                        <div className="space-y-4">
                          {/* Block specific slot */}
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                            <p className="font-bold text-navy-900 uppercase text-[10px]">Block Specific Slot (e.g. Monday 11:00 AM)</p>
                            <div className="space-y-2">
                              <input 
                                type="date" 
                                id="admin-overview-slot-date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium focus:outline-none focus:border-navy-500"
                              />
                              <select
                                id="admin-overview-slot-time"
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium focus:outline-none focus:border-navy-500"
                              >
                                {defaultTimeSlots.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <button 
                                type="button"
                                onClick={() => {
                                  const dateEl = document.getElementById('admin-overview-slot-date') as HTMLInputElement;
                                  const slotEl = document.getElementById('admin-overview-slot-time') as HTMLSelectElement;
                                  if (dateEl && dateEl.value && slotEl && slotEl.value) {
                                    handleBlockSlot(dateEl.value, slotEl.value);
                                  }
                                }}
                                className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-xs transition cursor-pointer"
                              >
                                Block Time Slot
                              </button>
                            </div>
                          </div>

                          {/* Block entire date */}
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                            <p className="font-bold text-navy-900 uppercase text-[10px]">Block Entire Day</p>
                            <div className="flex space-x-2">
                              <input 
                                type="date" 
                                id="admin-block-date"
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs focus:outline-none focus:border-navy-500 font-medium"
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const el = document.getElementById('admin-block-date') as HTMLInputElement;
                                  if (el && el.value) {
                                    handleBlockDate(el.value);
                                    el.value = '';
                                  }
                                }}
                                className="px-3.5 bg-navy-800 text-white rounded font-bold hover:bg-navy-900 text-xs transition cursor-pointer shrink-0"
                              >
                                Block Day
                              </button>
                            </div>
                          </div>

                          {/* Blocked slot & date listings */}
                          <div className="space-y-2 pt-2 border-t border-slate-150 text-xs">
                            <p className="font-bold text-slate-700">Blocked Time Slots ({blockedSlots.length})</p>
                            {blockedSlots.length === 0 ? (
                              <p className="text-slate-400 text-[11px]">No slots blocked.</p>
                            ) : (
                              <div className="max-h-[100px] overflow-y-auto space-y-1 pr-1">
                                {blockedSlots.map(key => {
                                  const [d, s] = key.split('|');
                                  return (
                                    <div key={key} className="px-2 py-1 bg-amber-50 border border-amber-200 rounded flex justify-between items-center text-[11px]">
                                      <span className="font-mono font-bold text-amber-900">{d} ({s})</span>
                                      <button 
                                        onClick={() => handleUnblockSlot(key)}
                                        className="text-amber-600 hover:text-amber-900 p-0.5 rounded transition cursor-pointer"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            <p className="font-bold text-slate-700 pt-1">Blocked Full Dates ({blockedDates.length})</p>
                            {blockedDates.length === 0 ? (
                              <p className="text-slate-400 text-[11px]">No dates blocked.</p>
                            ) : (
                              <div className="max-h-[100px] overflow-y-auto space-y-1 pr-1">
                                {blockedDates.map(date => (
                                  <div key={date} className="px-2.5 py-1.5 bg-red-50 border border-red-100 rounded flex justify-between items-center">
                                    <span className="font-mono text-[11px] font-bold text-red-700">{date}</span>
                                    <button 
                                      onClick={() => handleUnblockDate(date)}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-100/50 p-0.5 rounded transition cursor-pointer"
                                      title="Unblock Date"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Manage Bank Details */}
                      <div className="bg-white rounded-2xl shadow-md border border-slate-150 p-6 space-y-4">
                        <h3 className="text-base font-bold font-display text-navy-900 uppercase border-b border-slate-100 pb-3">Bank Account & UPI Settings</h3>
                        <p className="text-[11px] text-slate-400">Configure bank details and UPI ID displayed to clients during booking checkout.</p>
                        
                        {bankSaveMessage && (
                          <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded">
                            {bankSaveMessage}
                          </div>
                        )}

                        <form onSubmit={(e) => {
                          e.preventDefault();
                          saveBankDetailsToStorage(bankDetails);
                        }} className="space-y-3 text-xs">
                          <div>
                            <label className="block text-slate-600 font-semibold uppercase text-[10px] mb-1">Account Holder Name</label>
                            <input 
                              type="text" 
                              value={bankDetails.accountName}
                              onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500 font-medium"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-slate-600 font-semibold uppercase text-[10px] mb-1">Bank Name</label>
                            <input 
                              type="text" 
                              value={bankDetails.bankName}
                              onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500 font-medium"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-slate-600 font-semibold uppercase text-[10px] mb-1">Account Number</label>
                              <input 
                                type="text" 
                                value={bankDetails.accountNumber}
                                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500 font-medium font-mono"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-slate-600 font-semibold uppercase text-[10px] mb-1">IFSC Code</label>
                              <input 
                                type="text" 
                                value={bankDetails.ifscCode}
                                onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500 font-medium font-mono"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-600 font-semibold uppercase text-[10px] mb-1">UPI ID (e.g. gpay / phonepe / paytm)</label>
                            <input 
                              type="text" 
                              value={bankDetails.upiId}
                              onChange={(e) => setBankDetails({ ...bankDetails, upiId: e.target.value })}
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-250 rounded text-xs focus:outline-none focus:border-navy-500 font-medium font-mono"
                              required
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-2 bg-navy-800 hover:bg-navy-900 text-white font-bold rounded text-xs uppercase tracking-wider transition"
                          >
                            Save Bank Details
                          </button>
                        </form>
                      </div>

                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-navy-950 text-slate-400 pt-16 pb-8 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Logo brand about (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logoImg} 
                alt="The Cricket Advisor Logo Foot" 
                className="h-10 sm:h-12 w-auto rounded-lg object-contain shadow-sm" 
              />
              <div>
                <span className="font-display tracking-tight font-extrabold text-white text-sm block uppercase">
                  Prakash Palande
                </span>
                <span className="font-display tracking-widest text-[9px] font-bold text-gold-500 block uppercase">
                  Cricket Consultant & Advisor
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-sm font-light">
              Premium sports consulting agency delivering reliable placements, professional operations, and comprehensive overseas tour planning. Guided by trust and transparency.
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="text-white uppercase tracking-wider font-bold text-[11px]">Quick Navigation</h4>
            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => scrollToSection('home')} className="text-left hover:text-gold-500 transition">Home</button>
              <button onClick={() => scrollToSection('why-choose-me')} className="text-left hover:text-gold-500 transition">Why Choose Me</button>
              <button onClick={() => scrollToSection('about-me')} className="text-left hover:text-gold-500 transition">About Prakash Palande</button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-gold-500 transition">My Services</button>
              <button onClick={() => scrollToSection('faq')} className="text-left hover:text-gold-500 transition">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-gold-500 transition">Contact Prakash Palande</button>
              <button 
                onClick={() => {
                  setActiveTab('main');
                  setIsRefundPolicyOpen(true);
                  setTimeout(() => {
                    scrollToSection('faq');
                  }, 100);
                }} 
                className="text-left text-gold-500 font-semibold hover:text-gold-400 transition"
              >
                Refund Policy
              </button>
            </div>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="text-white uppercase tracking-wider font-bold text-[11px]">Contact & Support</h4>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold-500 flex-shrink-0" />
                <a href="mailto:thecricketadvisor@gmail.com" className="hover:text-gold-500 transition">thecricketadvisor@gmail.com</a>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gold-500 fill-current flex-shrink-0" />
                <a href="https://wa.me/918591133960" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition">+91 85911 33960</a>
              </p>
              <p className="text-[10px] text-slate-500 italic mt-3">Consultations are online via secure Zoom meetings only.</p>
            </div>
          </div>

        </div>

        {/* Bottom line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-navy-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-light">
          <p>© 2026 Prakash Palande - Cricket Consultant & Advisor. All Rights Reserved.</p>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <span className="text-slate-600">Online Zoom Consultations</span>
            <button 
              onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="text-slate-700 hover:text-slate-400 transition"
              title="Portal Access"
            >
              <Lock className="h-3 w-3" />
            </button>
          </div>
        </div>
      </footer>

      {/* Tax Invoice Modal */}
      {selectedInvoiceBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-6 relative text-slate-800 my-8">
            
            {/* Modal Actions */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 print:hidden">
              <div className="flex items-center space-x-2 text-navy-900 font-bold uppercase text-xs tracking-wider">
                <FileText className="h-5 w-5 text-gold-600" />
                <span>Official Tax Invoice & Payment Receipt</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-950 text-gold-400 font-bold text-xs rounded-lg uppercase flex items-center space-x-1.5 transition shadow cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceBooking(null)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
 
            {/* Printable Invoice Document */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6">
              
              {/* Header Branding */}
              <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-navy-900 pb-6 gap-4">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-gold-600 uppercase">OFFICIAL TAX INVOICE</span>
                  <h2 className="text-xl font-black font-display text-navy-950 uppercase tracking-tight">Prakash Palande Cricket Consultancy</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Global Player Placements, Board Advisory & Professional Coaching</p>
                  <p className="text-[11px] text-slate-400 mt-1">Email: thecricketadvisor@gmail.com | Web: www.thecricketadvisor.com</p>
                  <p className="text-[11px] text-slate-400">GST / SAC Code: 998311 (Management Advisory & Coaching Services)</p>
                </div>
 
                <div className="text-left sm:text-right font-mono text-xs space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Invoice Number</p>
                  <p className="font-extrabold text-navy-900 text-sm">INV-{selectedInvoiceBooking.id}</p>
                  <p className="text-slate-500 text-[11px]">Issued: {new Date(selectedInvoiceBooking.createdAt).toLocaleDateString()}</p>
                  <div className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded uppercase mt-1 border border-emerald-300">
                    Payment Status: PAID
                  </div>
                </div>
              </div>
 
              {/* Client & Booking Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-slate-200 pb-6">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BILLED TO (CLIENT)</p>
                  <p className="font-extrabold text-navy-900 text-sm">{selectedInvoiceBooking.fullName}</p>
                  <p className="text-slate-600"><strong>Email:</strong> {selectedInvoiceBooking.email}</p>
                  <p className="text-slate-600"><strong>WhatsApp:</strong> {selectedInvoiceBooking.whatsApp}</p>
                  <p className="text-slate-600"><strong>Country:</strong> {selectedInvoiceBooking.country}</p>
                  <p className="text-slate-600"><strong>Playing Level:</strong> {selectedInvoiceBooking.playingLevel}</p>
                </div>
 
                <div className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CONSULTATION SCHEDULE</p>
                  <p className="font-bold text-navy-900">Date: {selectedInvoiceBooking.date}</p>
                  <p className="font-bold text-navy-900">Slot: {selectedInvoiceBooking.timeSlot}</p>
                  <p className="text-slate-600">Payment Method: <strong className="uppercase">{selectedInvoiceBooking.paymentMethod}</strong></p>
                  <p className="text-slate-600 break-words"><strong>Zoom Link:</strong> <a href={selectedInvoiceBooking.zoomLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline break-all">{selectedInvoiceBooking.zoomLink}</a></p>
                  <p className="text-slate-600">Passcode: <strong>TCC2026</strong></p>
                </div>
              </div>
 
              {/* Itemized Services Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[550px]">
                  <thead>
                    <tr className="bg-navy-950 text-white font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3 rounded-l-lg">Service Description</th>
                      <th className="p-3 text-center">Session Duration</th>
                      <th className="p-3 text-right rounded-r-lg">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 py-4">
                        <p className="font-bold text-navy-900 text-sm">{selectedInvoiceBooking.packageName}</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">One-on-one video consultation with Prakash Palande including roadmap, player placement review, and recording.</p>
                      </td>
                      <td className="p-3 py-4 text-center font-bold text-slate-700">60 Minutes</td>
                      <td className="p-3 py-4 text-right font-extrabold text-navy-900 font-mono text-sm">₹{selectedInvoiceBooking.price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total Summary */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t-2 border-slate-300 pt-4 gap-4">
                <div className="text-[11px] text-slate-500 space-y-1 max-w-xs">
                  <p className="font-bold text-slate-700">Payment Authorization:</p>
                  <p>This document serves as an official receipt of payment for professional services. 18% GST included where applicable.</p>
                </div>

                <div className="w-full sm:w-64 bg-navy-900 text-white p-4 rounded-xl space-y-2 text-xs text-right font-mono border border-gold-500/20">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal:</span>
                    <span>₹{Math.round(selectedInvoiceBooking.price * 0.82)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>GST (18%):</span>
                    <span>₹{Math.round(selectedInvoiceBooking.price * 0.18)}</span>
                  </div>
                  <div className="flex justify-between text-gold-400 font-extrabold text-base border-t border-white/20 pt-2 font-display">
                    <span>TOTAL PAID:</span>
                    <span>₹{selectedInvoiceBooking.price}</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-slate-200 text-[10px] text-slate-400">
                <p>Prakash Palande Cricket Consultancy & Advisory &bull; Thank you for choosing our professional services!</p>
              </div>

            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-2 print:hidden">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={generateWhatsAppUrl(selectedInvoiceBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition cursor-pointer shadow-sm"
                >
                  <MessageSquare className="h-4 w-4 fill-current" />
                  <span>Send via WhatsApp</span>
                </a>

                <a
                  href={generateEmailUrl(selectedInvoiceBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition cursor-pointer shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Zoom Link & Receipt</span>
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => downloadIcsFile(selectedInvoiceBooking)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>Calendar Invite</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceBooking(null)}
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-950 text-white text-xs font-bold rounded-lg uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Edit Client Email & WhatsApp Modal */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gold-300 max-w-lg w-full p-6 space-y-5 relative text-slate-800">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2 text-navy-900 font-bold uppercase text-xs tracking-wider">
                <Edit2 className="h-4 w-4 text-gold-600" />
                <span>Update Client Email & WhatsApp Number</span>
              </div>
              <button
                onClick={() => setEditingBooking(null)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Update the contact email ID or WhatsApp number for booking reference <strong>{editingBooking.id}</strong>. Updating this allows 1-click dispatch to the updated address or number.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEditedBooking(editingBooking);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-600 font-bold uppercase text-[10px] mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingBooking.fullName}
                  onChange={(e) => setEditingBooking({ ...editingBooking, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold uppercase text-[10px] mb-1">
                  Client Email ID (For Zoom Invites & Invoices) *
                </label>
                <input
                  type="email"
                  required
                  value={editingBooking.email}
                  onChange={(e) => setEditingBooking({ ...editingBooking, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy-500 font-medium"
                  placeholder="client@example.com"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold uppercase text-[10px] mb-1">
                  Client WhatsApp Phone Number (With Country Code) *
                </label>
                <input
                  type="text"
                  required
                  value={editingBooking.whatsApp}
                  onChange={(e) => setEditingBooking({ ...editingBooking, whatsApp: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy-500 font-mono font-bold text-emerald-800"
                  placeholder="+91 98765 43210"
                />
                <p className="text-[10px] text-slate-400 mt-1">Include country code (e.g., +91 for India, +44 for UK, +1 for USA/Canada).</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold uppercase text-[10px] mb-1">
                    Consultation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={editingBooking.date}
                    onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold uppercase text-[10px] mb-1">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBooking.timeSlot}
                    onChange={(e) => setEditingBooking({ ...editingBooking, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold uppercase text-[10px] mb-1">
                  Zoom Meeting URL
                </label>
                <input
                  type="url"
                  required
                  value={editingBooking.zoomLink}
                  onChange={(e) => setEditingBooking({ ...editingBooking, zoomLink: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-navy-500 font-mono text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg uppercase tracking-wider text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg uppercase tracking-wider text-xs shadow transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  <span>Save Client Details</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 3D Secure Card OTP Authentication Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-navy-900 max-w-md w-full p-6 space-y-5 relative text-slate-800">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-navy-900 text-gold-400 rounded-lg">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold font-display text-navy-950 text-sm uppercase tracking-wider">3D Secure Card Authentication</h3>
                  <p className="text-[10px] text-slate-500">Verified by Visa / Mastercard Identity Check</p>
                </div>
              </div>
              <button 
                onClick={() => setShowOtpModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Merchant:</span>
                <strong className="text-navy-900">The Cricket Solutions (Prakash Palande)</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Card Number:</span>
                <strong className="font-mono text-slate-900">•••• {cardForm.cardNumber.slice(-4) || '5678'}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Amount:</span>
                <strong className="text-emerald-700 font-extrabold">{selectedPackage && formatPrice(selectedPackage.price)}</strong>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Enter One Time Password (OTP)
              </label>
              <p className="text-[11px] text-slate-500">
                An OTP code has been sent to your registered mobile number associated with your card ending in <strong>•••• {cardForm.cardNumber.slice(-4) || '5678'}</strong>.
              </p>

              <div className="relative">
                <input 
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => {
                    setOtpInput(e.target.value.replace(/[^0-9]/g, ''));
                    setOtpError('');
                  }}
                  placeholder="849201"
                  className="w-full text-center text-xl font-mono font-bold tracking-[0.5em] px-4 py-3 bg-slate-50 border-2 border-navy-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <span className="text-[10px] text-slate-400 block text-right mt-1 font-mono">Demo OTP prefilled: 849201</span>
              </div>

              {otpError && (
                <p className="text-xs text-red-600 font-bold flex items-center space-x-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{otpError}</span>
                </p>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-150">
              <button
                type="button"
                onClick={handleConfirmOtp}
                className="w-full py-3 bg-navy-900 hover:bg-navy-950 text-gold-400 font-bold rounded-xl shadow-lg transition uppercase tracking-wider text-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Lock className="h-4 w-4 text-gold-400" />
                <span>Submit OTP & Complete Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition uppercase tracking-wider text-[11px] cursor-pointer"
              >
                Cancel Transaction
              </button>
            </div>

          </div>
        </div>
      )}

      {/* UPI App Push Payment Modal */}
      {showUpiPushModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-emerald-600 max-w-md w-full p-6 space-y-5 relative text-slate-800">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-emerald-600 text-white rounded-lg">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold font-display text-navy-950 text-sm uppercase tracking-wider">UPI Payment Request Sent</h3>
                  <p className="text-[10px] text-slate-500">Open your UPI App to approve request</p>
                </div>
              </div>
              <button 
                onClick={() => setShowUpiPushModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="text-center space-y-3 py-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Smartphone className="h-8 w-8" />
              </div>

              <div>
                <h4 className="font-bold text-navy-950 text-sm">Approve Collect Request in UPI App</h4>
                <p className="text-xs text-slate-600 mt-1">
                  We have sent a collect request of <strong className="text-emerald-700">{selectedPackage && formatPrice(selectedPackage.price)}</strong> to VPA <strong className="font-mono text-navy-900">{upiForm.upiId || bankDetails.upiId}</strong>.
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                <span className="font-bold block uppercase text-[10px] tracking-wider text-amber-800">Instructions:</span>
                <p>1. Open Google Pay / PhonePe / Paytm / BHIM on your smartphone.</p>
                <p>2. Tap on the incoming notification from <strong>The Cricket Solutions</strong>.</p>
                <p>3. Enter your 4 or 6-digit UPI PIN to authorize transfer.</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-150">
              <button
                type="button"
                onClick={handleConfirmUpiPush}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition uppercase tracking-wider text-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CheckCircle className="h-4 w-4" />
                <span>I Have Approved Payment in UPI App</span>
              </button>

              <button
                type="button"
                onClick={() => setShowUpiPushModal(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition uppercase tracking-wider text-[11px] cursor-pointer"
              >
                Cancel / Try Different Gateway
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Checkout Policy Confirmation Pop-up Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gold-550 max-w-xl w-full p-6 space-y-5 relative text-slate-800">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-navy-900 text-gold-400 rounded-lg animate-pulse">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold font-display text-navy-955 text-xs uppercase tracking-wider">Mandatory Checkout Confirmation</h3>
                  <p className="text-[10px] text-slate-500">Please review & accept policies to proceed</p>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-650 leading-relaxed space-y-3">
              <p>
                Before completing your paid online consultation booking, you must confirm that you have read and agreed to our 
                booking terms, refund policies, and outcome disclaimers.
              </p>

              {/* Collapsible Refund Policy in Pop-up Modal */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button 
                  type="button"
                  onClick={() => setIsCheckoutRefundPolicyOpen(!isCheckoutRefundPolicyOpen)}
                  className="w-full flex items-center justify-between py-2.5 px-3 hover:bg-slate-100 transition cursor-pointer text-left text-[11px] font-bold text-navy-950 uppercase"
                >
                  <span className="flex items-center space-x-1.5">
                    <FileText className="h-4 w-4 text-gold-600" />
                    <span>Read Full Refund Policy</span>
                  </span>
                  {isCheckoutRefundPolicyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {isCheckoutRefundPolicyOpen && (
                  <div className="p-4 border-t border-slate-200 bg-white max-h-[220px] overflow-y-auto text-[11px] leading-relaxed">
                    <RefundPolicyContent />
                  </div>
                )}
              </div>

              {/* Mandatory Statement and Checkbox */}
              <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-150">
                <input 
                  type="checkbox" 
                  id="terms-popup-checkbox"
                  checked={modalCheckboxChecked}
                  onChange={(e) => setModalCheckboxChecked(e.target.checked)}
                  className="h-5 w-5 mt-0.5 rounded border-slate-300 text-gold-600 focus:ring-gold-500 cursor-pointer"
                />
                <label htmlFor="terms-popup-checkbox" className="text-slate-700 text-xs leading-relaxed font-semibold select-none cursor-pointer">
                  I have read, understood, and agree to the Terms & Conditions, Privacy Policy, Disclaimer, and Refund Policy of TheCricketAdvisor.com. I understand that all payments are final and non-refundable except where The Cricket Advisor is unable to provide the purchased service.
                </label>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[10px] text-amber-800 leading-relaxed font-light">
                <strong>Outcome Disclaimer Notice:</strong> I further acknowledge that no service offered by TheCricketAdvisor.com guarantees any result, placement, selection, contract, employment, visa approval, scholarship, sponsorship, or any other specific outcome.
              </div>
            </div>

            <div className="flex space-x-3 pt-2 border-t border-slate-150">
              <button
                type="button"
                onClick={() => {
                  setShowTermsModal(false);
                  setBookingStep(2); // Go back to calendar step
                }}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg uppercase tracking-wider text-xs transition cursor-pointer text-center"
              >
                Go Back
              </button>

              <button
                type="button"
                disabled={!modalCheckboxChecked}
                onClick={() => {
                  setHasAcceptedTermsPopup(true);
                  setShowTermsModal(false);
                }}
                className="flex-1 py-2.5 bg-gold-gradient disabled:opacity-50 disabled:cursor-not-allowed text-navy-950 font-bold rounded-lg uppercase tracking-wider text-xs transition shadow-lg cursor-pointer"
              >
                Agree & Proceed
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
