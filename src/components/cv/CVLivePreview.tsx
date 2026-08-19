import React, { useState, useRef, useEffect } from 'react';
import CVTemplateRenderer from './templates/CVTemplates';
import { CricketCVFull } from './CVTypes';
import { ZoomIn, ZoomOut, Maximize2, RefreshCw } from 'lucide-react';

interface CVLivePreviewProps {
  cv: CricketCVFull;
  isPreview?: boolean;
}

export default function CVLivePreview({ cv, isPreview = true }: CVLivePreviewProps) {
  const [zoom, setZoom] = useState<number>(0.85); // scaling factor
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Update container width for auto-fitting
  const updateWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Base A4 dimensions at 96 DPI
  const a4Width = 794;
  const a4Height = 1123;

  // Auto-scale to fit container on load or resize
  useEffect(() => {
    if (containerWidth > 0) {
      // Fit to container width with 32px padding
      const fitZoom = (containerWidth - 32) / a4Width;
      setZoom(Math.min(Math.max(fitZoom, 0.4), 1.2));
    }
  }, [containerWidth]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));
  const handleResetZoom = () => {
    if (containerWidth > 0) {
      setZoom((containerWidth - 32) / a4Width);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative">
      {/* Control Bar */}
      <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-850 flex items-center justify-between text-xs text-slate-400 z-10">
        <span className="font-semibold text-slate-200">
          Live CV Preview ({cv.templateId.toUpperCase()})
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-slate-850 hover:text-white rounded transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-[10px] bg-slate-850 px-2 py-0.5 rounded text-slate-300">
            {Math.round(zoom * 100)}%
          </span>
          <button 
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-slate-850 hover:text-white rounded transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={handleResetZoom}
            className="p-1.5 hover:bg-slate-850 hover:text-white rounded transition"
            title="Fit to Width"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* A4 Sandbox Container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 flex justify-center items-start bg-slate-950/40 relative select-none"
        style={{ minHeight: '400px' }}
      >
        <div 
          className="shadow-2xl origin-top transition-transform duration-100 flex-shrink-0"
          style={{ 
            width: `${a4Width}px`, 
            height: `${a4Height}px`,
            transform: `scale(${zoom})`,
            marginBottom: `${a4Height * (zoom - 1)}px` // correct layout height collapse when scaled
          }}
        >
          <CVTemplateRenderer 
            cv={cv} 
            accentColour={cv.accentColour} 
            font={cv.font} 
            isPreview={isPreview} 
          />
        </div>
      </div>

      {/* Page / Status Bar */}
      <div className="bg-slate-950/80 px-4 py-2 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-500">
        <span>A4 Format (210 × 297 mm)</span>
        <span className="font-semibold text-gold-500/80">PAGE 1 OF 1</span>
      </div>
    </div>
  );
}
