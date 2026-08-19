import React from 'react';
import { CricketCVFull } from './CVTypes';
import CVLivePreview from './CVLivePreview';
import CVColourSelector from './CVColourSelector';
import CVFontSelector from './CVFontSelector';
import { Layers, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react';

interface CVStyleStepProps {
  cv: CricketCVFull;
  onChange: (updated: CricketCVFull) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CVStyleStep({ cv, onChange, onNext, onPrev }: CVStyleStepProps) {
  const templates = [
    {
      id: 'executive',
      name: 'The Executive',
      desc: 'Clean corporate layout with a prominent left sidebar. Ideal for professional club and administrative opportunities.',
      character: 'Corporate, Structured',
      // Visual representation of the layout structure
      layoutPreview: (activeColor: string) => (
        <div className="w-12 h-16 bg-white border border-slate-700 rounded overflow-hidden flex flex-row shrink-0 select-none">
          <div className="w-4 h-full" style={{ backgroundColor: activeColor }} />
          <div className="flex-1 p-1 space-y-1">
            <div className="h-1 bg-slate-300 w-full" />
            <div className="h-1 bg-slate-200 w-3/4" />
            <div className="h-4" />
            <div className="h-1 bg-slate-100 w-full" />
            <div className="h-1 bg-slate-100 w-full" />
          </div>
        </div>
      )
    },
    {
      id: 'professional',
      name: 'The Professional',
      desc: 'Modern layout with an accent color banner. Displays key statistics blocks directly at the top for immediate impact.',
      character: 'Modern, Stats-Focused',
      layoutPreview: (activeColor: string) => (
        <div className="w-12 h-16 bg-white border border-slate-700 rounded overflow-hidden flex flex-col shrink-0 select-none">
          <div className="h-3 w-full" style={{ backgroundColor: activeColor }} />
          <div className="flex-1 p-1 space-y-1">
            <div className="grid grid-cols-3 gap-0.5">
              <div className="h-2 bg-slate-200" />
              <div className="h-2 bg-slate-200" />
              <div className="h-2 bg-slate-200" />
            </div>
            <div className="h-1 bg-slate-300 w-full" />
            <div className="h-1 bg-slate-200 w-3/4" />
          </div>
        </div>
      )
    },
    {
      id: 'international',
      name: 'The International',
      desc: 'Tailored for overseas opportunities. Detailed sections for nationality, residence, visa availability and overseas playing experience.',
      character: 'Global Placement',
      layoutPreview: (activeColor: string) => (
        <div className="w-12 h-16 bg-white border border-slate-700 rounded overflow-hidden flex flex-col shrink-0 select-none">
          <div className="h-1 w-full" style={{ backgroundColor: activeColor }} />
          <div className="flex-1 p-1 space-y-1">
            <div className="h-2 bg-slate-100 w-full" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 bg-slate-50 border border-slate-100" />
              <div className="h-8 bg-slate-50 border border-slate-100" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'classic',
      name: 'The Classic',
      desc: 'Traditional clean format with elegant typography. Focuses on playing history and simple text-based data representation.',
      character: 'Traditional, Elegant',
      layoutPreview: (activeColor: string) => (
        <div className="w-12 h-16 bg-white border border-slate-700 rounded overflow-hidden flex flex-col items-center justify-between p-1 shrink-0 select-none">
          <div className="h-1 bg-slate-400 w-1/2" />
          <div className="w-full space-y-1">
            <div className="h-0.5 bg-slate-200 w-full" />
            <div className="h-0.5 bg-slate-200 w-full" />
            <div className="h-0.5 bg-slate-200 w-full" />
            <div className="h-0.5 bg-slate-200 w-full" />
            <div className="h-0.5 bg-slate-200 w-full" />
          </div>
          <div className="h-1 w-full" style={{ backgroundColor: activeColor }} />
        </div>
      )
    },
    {
      id: 'performance',
      name: 'The Performance',
      desc: 'Athletic profile displaying statistics highlights first. Emphasizes tournament statistics and major team logs.',
      character: 'Athlete, High-Impact',
      layoutPreview: (activeColor: string) => (
        <div className="w-12 h-16 bg-white border border-slate-700 rounded overflow-hidden flex flex-col shrink-0 p-1 space-y-1 select-none">
          <div className="flex justify-between items-center">
            <div className="h-2 w-4 bg-slate-200" />
            <div className="h-2 w-4" style={{ backgroundColor: activeColor }} />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="h-4 bg-slate-100" />
            <div className="h-4 bg-slate-100" />
          </div>
          <div className="h-1 bg-slate-300 w-full" />
          <div className="h-1 bg-slate-200 w-3/4" />
        </div>
      )
    }
  ];

  // Optimal color switcher based on template selection
  const getOptimalColor = (templateId: string) => {
    switch (templateId) {
      case 'professional': return '#991B1B'; // crimson
      case 'international': return '#065F46'; // emerald green
      case 'classic': return '#1F2937'; // charcoal grey
      case 'performance': return '#B45309'; // gold/bronze
      case 'executive':
      default: return '#0B1A30'; // navy
    }
  };

  const handleSelectTemplate = (id: string) => {
    onChange({
      ...cv,
      templateId: id,
      accentColour: getOptimalColor(id)
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 text-left max-w-6xl mx-auto shadow-2xl space-y-8 font-sans">
      
      {/* Step Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Step 2 of 3
          </span>
          <h2 className="text-2xl font-black text-white mt-1 uppercase tracking-tight font-display">
            Choose Layout & Styling
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Select a design template and customize colors and typography.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Style Controls (Left Column) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Templates Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-500" /> Choose Design Template
            </h3>
            
            <div className="space-y-3">
              {templates.map((t) => {
                const isSelected = cv.templateId === t.id;
                const optColor = getOptimalColor(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => handleSelectTemplate(t.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-blue-950/20 border-gold-500 shadow-md shadow-gold-500/5'
                        : 'bg-slate-950 border-slate-850 hover:border-slate-800'
                    }`}
                  >
                    {/* Visual representation */}
                    {t.layoutPreview(optColor)}

                    <div className="space-y-0.5 flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-white text-xs">{t.name}</h4>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          isSelected ? 'bg-gold-500 text-navy-950' : 'bg-slate-900 text-slate-500'
                        }`}>
                          {t.character}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans mt-1">{t.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Selector */}
          <div className="border-t border-slate-800 pt-5">
            <CVColourSelector 
              selectedColour={cv.accentColour}
              onSelectColour={(c) => onChange({ ...cv, accentColour: c })}
            />
          </div>

          {/* Font Selector */}
          <div className="border-t border-slate-800 pt-5">
            <CVFontSelector 
              selectedFont={cv.font}
              onSelectFont={(f) => onChange({ ...cv, font: f })}
            />
          </div>

        </div>

        {/* Live Preview (Right Column) */}
        <div className="lg:col-span-7 h-[650px] rounded-xl overflow-hidden shadow-2xl border border-slate-850">
          <CVLivePreview cv={cv} isPreview={true} />
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
        <button
          onClick={onPrev}
          className="px-5 py-3 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Edit Details
        </button>

        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-gold-gradient text-navy-950 hover:opacity-90 transition font-black flex items-center gap-1.5 text-xs cursor-pointer"
        >
          Continue to Payment <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
