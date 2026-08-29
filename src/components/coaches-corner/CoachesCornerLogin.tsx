import React, { useState } from "react";
import { ShieldCheck, Eye, EyeOff, Lock } from "lucide-react";

interface CoachesCornerLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const COACHES_PIN = "coach2024";

export const CoachesCornerLogin: React.FC<CoachesCornerLoginProps> = ({ onLogin, onBack }) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === COACHES_PIN) {
      setError("");
      onLogin();
    } else {
      setError("Invalid PIN. Please try again.");
      setShaking(true);
      setPin("");
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1A30] via-[#0f2440] to-[#0B1A30] flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%),repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "30px 30px" }}
      />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl mb-4 ring-4 ring-amber-400/30">
            <span className="text-4xl">🏏</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Coaches Corner</h1>
          <p className="text-amber-400 text-sm font-semibold mt-1 uppercase tracking-widest">Assessment Report Generator</p>
          <p className="text-slate-400 text-xs mt-2">The Cricket Advisor – Certified Division</p>
        </div>
        <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl ${shaking ? "shake-anim" : ""}`}>
          <div className="flex items-center gap-2 mb-6">
            <Lock size={18} className="text-amber-400" />
            <h2 className="text-white font-bold text-lg">Coach Access Login</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Coach Access PIN</label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={e => { setPin(e.target.value); setError(""); }}
                  placeholder="Enter your Coach PIN"
                  className="w-full px-4 py-3.5 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
                  autoComplete="off"
                />
                <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition">
                  {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-red-400 text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck size={12} /> {error}
                </p>
              )}
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B1A30] font-extrabold rounded-xl transition shadow-lg text-sm uppercase tracking-wider">
              🏏 Enter Coaches Corner
            </button>
          </form>
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="bg-white/5 rounded-xl p-3 text-center space-y-1">
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Default Access PIN</p>
              <p className="text-amber-300 font-mono font-bold text-lg">coach2024</p>
            </div>
          </div>
        </div>
        <button onClick={onBack} className="mt-6 w-full py-3 text-slate-400 hover:text-white text-sm font-semibold transition text-center">
          ← Back to Admin Panel
        </button>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-8px)}80%{transform:translateX(8px)}}.shake-anim{animation:shake 0.5s ease-in-out;}`}</style>
    </div>
  );
};
