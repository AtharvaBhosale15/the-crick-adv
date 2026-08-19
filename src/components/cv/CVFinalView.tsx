import React from 'react';
import { Download, LayoutDashboard, Sparkles, AlertCircle } from 'lucide-react';
import { CricketCVFull } from './CVTypes';
import CVLivePreview from './CVLivePreview';

interface CVFinalViewProps {
  cv: CricketCVFull;
  onDownloadCleanPDF: () => void;
  onGoToDashboard: () => void;
}

export default function CVFinalView({ cv, onDownloadCleanPDF, onGoToDashboard }: CVFinalViewProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 text-left max-w-5xl mx-auto shadow-2xl space-y-8 font-sans">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Premium CV Unlocked
          </span>
          <h2 className="text-2xl font-black text-white mt-1 uppercase tracking-tight font-display">
            Your Unwatermarked CV
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Download your clean A4 document or return to the player dashboard.
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onGoToDashboard}
            className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white transition flex items-center gap-2 text-xs font-bold cursor-pointer font-sans"
          >
            <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
          </button>
          <button 
            onClick={onDownloadCleanPDF}
            className="px-6 py-2.5 rounded-xl bg-gold-gradient text-navy-950 hover:shadow-lg hover:shadow-gold-500/20 font-black transition flex items-center gap-2 text-xs cursor-pointer font-sans"
          >
            <Download className="w-4 h-4" /> Download Clean PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Info panel */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-900 pb-2">
              Identity Locked Info
            </h3>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              As a security precaution to prevent profile sharing, your core identity fields (Name, Date of Birth, Nationality) are permanently locked on the CV. 
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div>Name: <strong className="text-white">{cv.firstName} {cv.lastName}</strong></div>
              <div>DOB: <strong className="text-white">{cv.dateOfBirth}</strong></div>
              <div>Nationality: <strong className="text-white">{cv.nationality}</strong></div>
            </div>
          </div>

          <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850 flex gap-3 text-xs text-slate-400 leading-relaxed">
            <AlertCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Need to edit details?</span>
              You have <strong>{cv.editsAllowed - cv.editsUsed} edits left</strong> for this year. You can update statistics or achievements from the dashboard at any time.
            </div>
          </div>
        </div>

        {/* Live Preview Without Watermark */}
        <div className="lg:col-span-8 h-[700px] rounded-xl overflow-hidden shadow-2xl border border-slate-850">
          <CVLivePreview cv={cv} isPreview={false} />
        </div>

      </div>

    </div>
  );
}
