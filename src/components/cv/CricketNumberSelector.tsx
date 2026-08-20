import React from 'react';

interface CricketNumberSelectorProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max: number;
  step?: number;
  helperText?: string;
  largeNumbers?: boolean; // if true, show +10, +100, +1000 fast-scrub buttons
}

export default function CricketNumberSelector({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  helperText,
  largeNumbers = false
}: CricketNumberSelectorProps) {
  
  const handleDecrement = () => {
    onChange(Math.max(min, value - step));
  };

  const handleIncrement = () => {
    onChange(Math.min(max, value + step));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      onChange(Math.max(min, Math.min(max, val)));
    }
  };

  const handleFastAdd = (amount: number) => {
    onChange(Math.max(min, Math.min(max, value + amount)));
  };

  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 text-left">
      <div className="flex justify-between items-start">
        <div>
          <label className="block text-xs text-white font-bold tracking-wide uppercase">{label}</label>
          {helperText && <span className="text-[10px] text-slate-500 block mt-0.5">{helperText}</span>}
        </div>
        
        {/* Prominent current value display */}
        <span className="text-base font-black text-gold-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg min-w-[50px] text-center shadow-inner">
          {value}
        </span>
      </div>

      {/* Button Row & Fast scrubbing */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= min}
            className="flex-1 py-2 bg-slate-900 border border-slate-800 text-white rounded-lg font-black hover:bg-slate-800 hover:border-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed select-none text-sm cursor-pointer"
          >
            －
          </button>
          
          <button
            type="button"
            onClick={handleIncrement}
            disabled={value >= max}
            className="flex-1 py-2 bg-slate-900 border border-slate-800 text-white rounded-lg font-black hover:bg-slate-800 hover:border-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed select-none text-sm cursor-pointer"
          >
            ＋
          </button>
        </div>

        {/* Scroll wheel range input */}
        <div className="flex items-center gap-2 pt-1.5">
          <span className="text-[9px] text-slate-500 select-none font-bold uppercase">{min}</span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="flex-1 accent-gold-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer border border-slate-850"
          />
          <span className="text-[9px] text-slate-500 select-none font-bold uppercase">{max}</span>
        </div>

        {/* Large Numbers Fast Jump Badges */}
        {largeNumbers && (
          <div className="flex justify-end gap-1 pt-1.5 border-t border-slate-900/60">
            <span className="text-[8px] text-slate-500 font-bold uppercase self-center mr-1">Fast Jump:</span>
            <button
              type="button"
              onClick={() => handleFastAdd(10)}
              className="text-[9px] bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold px-1.5 py-0.5 rounded cursor-pointer transition"
            >
              +10
            </button>
            <button
              type="button"
              onClick={() => handleFastAdd(100)}
              className="text-[9px] bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold px-1.5 py-0.5 rounded cursor-pointer transition"
            >
              +100
            </button>
            <button
              type="button"
              onClick={() => handleFastAdd(1000)}
              className="text-[9px] bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold px-1.5 py-0.5 rounded cursor-pointer transition"
            >
              +1000
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
