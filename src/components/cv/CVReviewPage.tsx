import React, { useState } from 'react';
import { CricketCVFull } from './CVTypes';
import { 
  CheckCircle, 
  AlertTriangle, 
  ChevronLeft, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Lock,
  Wallet
} from 'lucide-react';

interface CVReviewPageProps {
  cv: CricketCVFull;
  onPay: (isSimulated: boolean) => void;
  onPrev: () => void;
}

export default function CVReviewPage({ cv, onPay, onPrev }: CVReviewPageProps) {
  // 3 T&C checkboxes
  const [agreedDetails, setAgreedDetails] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedLocking, setAgreedLocking] = useState(false);

  // Payment method selection
  const [payMethod, setPayMethod] = useState<'card' | 'upi'>('card');
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const allAgreed = agreedDetails && agreedTerms && agreedLocking;

  const isFormValid = () => {
    if (!allAgreed) return false;
    if (payMethod === 'card') {
      return cardNo.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCvv.length === 3;
    } else {
      return upiId.includes('@') && upiId.length > 3;
    }
  };

  const handleCardNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces: XXXX XXXX XXXX XXXX
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNo(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format expiry: MM/YY
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setCardExpiry(value);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 text-left max-w-4xl mx-auto shadow-2xl space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center gap-1 font-display">
          Step 3 of 3 • Secure Checkout
        </span>
        <h2 className="text-2xl font-black text-white mt-1 uppercase tracking-tight">
          Review & Unlock Premium CV
        </h2>
        <p className="text-slate-400 text-xs">Verify details, agree to terms, and complete simulated payment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Order Summary & T&C Checklist (col-span-6) */}
        <div className="md:col-span-6 space-y-6">
          
          {/* Order Summary Card */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Summary</h3>
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <div>
                <span className="font-bold text-white text-sm">
                  {cv.paymentStatus === 'Paid' ? 'Cricket CV 5-Edit Renewal' : 'Professional Cricket CV'}
                </span>
                <p className="text-[10px] text-slate-500 mt-0.5">Template: {cv.templateId.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 line-through">₹1,499</span>
                <span className="font-black text-gold-400 text-base block">₹699</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 space-y-1">
              <div>• Unlimited PDF downloads</div>
              <div>• Access to all templates</div>
              <div>• 5 profile edits allowed per year</div>
            </div>
          </div>

          {/* Guidelines Warnings */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 text-xs text-yellow-400">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Identity Verification Lock</span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                To prevent account sharing and maintain credibility, your core identity fields (Name, Date of Birth, Nationality) will be permanently locked on the CV sheet after purchase.
              </p>
            </div>
          </div>

          {/* Terms & Conditions Checkboxes */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Terms & Conditions Consent</h3>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={agreedDetails}
                  onChange={(e) => setAgreedDetails(e.target.checked)}
                  className="w-4 h-4 text-gold-500 rounded border-slate-850 bg-slate-900 mt-0.5 focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-[11px] text-slate-300 leading-relaxed">
                  I confirm that all playing statistics, personal information and cricket history provided in this form are accurate and truthful to the best of my knowledge.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="w-4 h-4 text-gold-500 rounded border-slate-850 bg-slate-900 mt-0.5 focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-[11px] text-slate-300 leading-relaxed">
                  I agree to The Cricket Advisor Terms of Service and Privacy Policy, including no-refund digital delivery.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={agreedLocking}
                  onChange={(e) => setAgreedLocking(e.target.checked)}
                  className="w-4 h-4 text-gold-500 rounded border-slate-850 bg-slate-900 mt-0.5 focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-[11px] text-slate-300 leading-relaxed text-yellow-500/90">
                  I understand that my Full Name, Nationality, and Date of Birth will be locked for future modifications once this CV is activated.
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Payment Gateway Simulation (col-span-6) */}
        <div className="md:col-span-6 space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-850">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
            <Lock className="w-3.5 h-3.5 text-green-500" /> Secure Payment Gateway
          </h3>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPayMethod('card')}
              className={`py-2 px-3 rounded-lg border text-center text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                payMethod === 'card' 
                  ? 'bg-blue-950/20 border-gold-500 text-white' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Credit/Debit Card
            </button>
            <button
              onClick={() => setPayMethod('upi')}
              className={`py-2 px-3 rounded-lg border text-center text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                payMethod === 'upi' 
                  ? 'bg-blue-950/20 border-gold-500 text-white' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <QrCode className="w-4 h-4" /> UPI / GPay
            </button>
          </div>

          {/* Payment Forms */}
          {payMethod === 'card' ? (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase block font-semibold">Card Number</label>
                <input 
                  type="text" 
                  value={cardNo}
                  onChange={handleCardNoChange}
                  placeholder="4111 2222 3333 4444"
                  className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-mono transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase block font-semibold">Expiry Date</label>
                  <input 
                    type="text" 
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-mono transition text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase block font-semibold">CVV</label>
                  <input 
                    type="password" 
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="***"
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-mono transition text-center"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase block font-semibold">UPI ID</label>
                <input 
                  type="text" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="playername@upi"
                  className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 transition"
                />
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Enter your VPA / UPI handle (e.g. name@okaxis, player@paytm). A simulated transaction prompt will be triggered on submission.
              </p>
            </div>
          )}

          {/* Secure indicator */}
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 pt-2 border-t border-slate-900">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500/80" /> Razorpay Secured 256-bit Encrypted Transaction
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex gap-3">
              <button 
                onClick={onPrev}
                className="px-4 py-3 rounded-xl border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-900 transition text-xs font-bold text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Styling
              </button>
              
              <button 
                disabled={!isFormValid()}
                onClick={() => onPay(false)}
                className="flex-1 py-3.5 rounded-xl font-black bg-gold-gradient text-navy-950 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 text-xs cursor-pointer shadow-md shadow-gold-500/10 uppercase"
              >
                <Wallet className="w-4 h-4" /> {cv.paymentStatus === 'Paid' ? 'RENEW PLAN ₹699' : 'PAY ₹699 SECURELY'}
              </button>
            </div>
            
            <button 
              type="button"
              onClick={() => onPay(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/50 hover:border-blue-400 text-blue-400 hover:text-blue-300 bg-blue-950/20 hover:bg-blue-950/40 transition text-center text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            >
              Simulate Successful Payment (Bypass)
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
