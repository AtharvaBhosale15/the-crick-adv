import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface CVForgotPasswordProps {
  resetToken?: string; // If present, shows reset password form. If absent, shows forgot request form.
  onClose: () => void;
  onSuccess: () => void;
}

export default function CVForgotPassword({ resetToken, onClose, onSuccess }: CVForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/cv-forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to request reset link.');

      setSuccessMsg('A password reset link has been emailed to you. Please check your inbox.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/cv-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password.');

      setSuccessMsg('Password has been reset successfully. You can now log in.');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-sm mx-auto text-left shadow-2xl relative">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white">
          {resetToken ? 'Reset Your Password' : 'Reset Password'}
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          {resetToken ? 'Enter your new account password.' : 'Enter email to receive reset instructions.'}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-2 text-xs text-red-400 mb-4 animate-fade-in">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg ? (
        <div className="text-center py-6 space-y-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <p className="text-xs text-slate-300 leading-relaxed">{successMsg}</p>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-850 transition text-xs font-bold"
          >
            Go Back
          </button>
        </div>
      ) : (
        <form onSubmit={resetToken ? handleApplyReset : handleRequestReset} className="space-y-4">
          {!resetToken ? (
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-bold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 pl-10 rounded text-white text-xs"
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="password" 
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 pl-10 rounded text-white text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 pl-10 rounded text-white text-xs"
                  />
                </div>
              </div>
            </>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold bg-gold-gradient text-navy-950 hover:opacity-90 disabled:opacity-50 transition text-xs mt-2 cursor-pointer"
          >
            {loading ? 'Processing...' : resetToken ? 'UPDATE PASSWORD' : 'SEND RESET LINK'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 transition text-xs font-bold text-center"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
