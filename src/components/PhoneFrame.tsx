import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  darkStatusBar?: boolean; // if true, status bar text & icons are white (for dark/blue headers)
  showHomeIndicator?: boolean;
  className?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  darkStatusBar = false,
  showHomeIndicator = true,
  className = '',
}) => {
  return (
    <div
      className={`relative w-[375px] h-[812px] shrink-0 bg-white rounded-[44px] border-[8px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col select-none ${className}`}
      style={{
        boxShadow:
          '0 0 0 2px #334155, 0 20px 40px -15px rgba(0,0,0,0.35), 0 0 60px rgba(0,0,0,0.1)',
      }}
    >
      {/* Top Status Bar (Overlay) */}
      <div
        className={`absolute top-0 left-0 right-0 z-40 h-11 px-7 flex items-center justify-between text-xs font-semibold pointer-events-none transition-colors ${
          darkStatusBar ? 'text-white' : 'text-slate-900'
        }`}
      >
        <span>9:41</span>
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full flex items-center justify-end pr-2.5 gap-1.5 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
        </div>
        <div className="flex items-center gap-1.5">
          {/* Signal 4 bars */}
          <div className="flex items-end gap-[1.5px] h-3">
            <span className="w-[3px] h-1.5 bg-current rounded-xs" />
            <span className="w-[3px] h-2 bg-current rounded-xs" />
            <span className="w-[3px] h-2.5 bg-current rounded-xs" />
            <span className="w-[3px] h-3 bg-current rounded-xs" />
          </div>
          <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
          <Battery className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>

      {/* Screen Content Viewport (full 812px height container) */}
      <div className="relative w-full h-full flex flex-col bg-white overflow-hidden">
        {children}
      </div>

      {/* Bottom Home Indicator */}
      {showHomeIndicator && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/40 rounded-full pointer-events-none z-50" />
      )}
    </div>
  );
};
