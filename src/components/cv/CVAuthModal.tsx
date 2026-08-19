import React, { useState } from 'react';
import { Mail, Lock, X, AlertCircle } from 'lucide-react';

interface CVAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string, user: any) => void;
  onForgotPasswordClick: () => void;
  onSignUpClick: () => void; // Trigger onboarding
}

export default function CVAuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onForgotPasswordClick,
  onSignUpClick
}: CVAuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/cv-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check credentials.');
      }

      onLoginSuccess(data.token, data.user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-850 rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-white">Log In to Your CV</h2>
            <p className="text-slate-400 text-xs mt-1">Access your dashboard and edit history.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-2 text-xs text-red-400">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs text-slate-400 font-bold">Password</label>
                <button 
                  type="button"
                  onClick={onForgotPasswordClick}
                  className="text-[10px] text-gold-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 pl-10 rounded text-white text-xs"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-gold-gradient text-navy-950 hover:opacity-90 disabled:opacity-50 transition text-xs mt-2 cursor-pointer"
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </button>
          </form>

          <div className="border-t border-slate-850 pt-4 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <button 
              onClick={() => {
                onSignUpClick();
                onClose();
              }}
              className="text-gold-400 font-bold hover:underline"
            >
              Start Building Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
