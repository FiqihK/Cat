import React from 'react';
import { ScreenId } from '../types';

interface Screen1SplashProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const Screen1Splash: React.FC<Screen1SplashProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex-1 flex flex-col justify-between bg-white overflow-hidden pb-6 h-full pt-11">
      {/* Top Dripping Paint Illustration */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-10">
        <svg
          viewBox="0 0 375 140"
          className="w-full h-auto drop-shadow-sm"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue Paint Drips */}
          <path
            d="M0 0 L375 0 L375 45 C355 45 348 70 342 70 C336 70 330 45 315 45 C305 45 300 85 292 85 C285 85 280 45 265 45 C255 45 248 95 240 95 C232 95 225 45 210 45 C200 45 195 65 188 65 C180 65 175 45 160 45 C150 45 142 110 132 110 C122 110 115 45 100 45 C90 45 82 80 75 80 C68 80 60 45 45 45 C35 45 28 100 20 100 C12 100 8 45 0 45 Z"
            fill="#0284C7"
          />
          {/* Cyan/Sky Blue Accent Drips */}
          <path
            d="M30 0 L260 0 L260 30 C245 30 240 60 232 60 C225 60 220 30 205 30 C195 30 190 75 180 75 C170 75 165 30 150 30 C140 30 135 65 125 65 C115 65 110 30 95 30 C85 30 80 85 72 85 C65 85 58 30 30 30 Z"
            fill="#38BDF8"
            opacity="0.9"
          />
          {/* Yellow Drips */}
          <path
            d="M130 0 L290 0 L290 35 C280 35 275 75 268 75 C260 75 255 35 240 35 C230 35 225 80 216 80 C208 80 202 35 190 35 C180 35 175 60 166 60 C158 60 150 35 130 35 Z"
            fill="#FACC15"
          />
          {/* Red Drips */}
          <path
            d="M240 0 L375 0 L375 50 C365 50 360 85 352 85 C345 85 340 50 325 50 C315 50 310 95 302 95 C295 95 288 50 270 50 C260 50 255 70 248 70 C242 70 240 50 240 50 Z"
            fill="#EF4444"
          />
        </svg>
      </div>

      {/* Center Brand & Logo */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pt-24 px-6 text-center">
        {/* Dynamic Stylized Logo */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="w-24 h-24 relative flex items-center justify-center">
            {/* Background colorful paint stroke ribbons */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <polygon points="15,48 50,15 62,27 27,60" fill="#0284C7" />
              <polygon points="32,65 65,32 75,42 42,75" fill="#EF4444" />
              <polygon points="46,80 78,48 86,56 54,88" fill="#F59E0B" />
              {/* Paint brush handle / roller */}
              <circle cx="28" cy="72" r="14" fill="#0369A1" />
              <rect
                x="32"
                y="52"
                width="14"
                height="28"
                rx="6"
                transform="rotate(-45 32 52)"
                fill="#0F172A"
              />
              <path
                d="M50 20 L75 45 L68 52 L43 27 Z"
                fill="#38BDF8"
              />
            </svg>
          </div>
        </div>

        {/* Brand Text */}
        <h1 className="text-2xl font-black text-slate-900 tracking-wider flex flex-col items-center leading-tight">
          <span>PUSAT CAT</span>
          <span className="text-sm font-bold tracking-[0.25em] text-slate-800 mt-0.5">
            INDONESIA
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-sm font-medium text-slate-600 leading-relaxed max-w-[240px]">
          Solusi Lengkap Kebutuhan<br />Cat &amp; Thinner Anda
        </p>
      </div>

      {/* Bottom Visual: Paint Cans & Splashes */}
      <div className="relative w-full h-44 mb-4 flex items-end justify-center px-4 overflow-hidden pointer-events-none">
        {/* Paint Splash SVG Background */}
        <svg
          viewBox="0 0 360 160"
          className="absolute inset-0 w-full h-full object-cover"
          fill="none"
        >
          <path
            d="M20 120 C50 70 80 150 140 100 C180 60 220 140 280 80 C320 130 350 90 360 130 L360 160 L0 160 Z"
            fill="#E0F2FE"
            opacity="0.8"
          />
          <circle cx="60" cy="110" r="18" fill="#38BDF8" opacity="0.4" />
          <circle cx="290" cy="95" r="14" fill="#F87171" opacity="0.4" />
          <circle cx="180" cy="65" r="8" fill="#FBBF24" opacity="0.5" />
        </svg>

        {/* Realistic Can Grouping */}
        <div className="relative z-10 flex items-end justify-center -space-x-4">
          {/* Left can */}
          <div className="w-20 h-24 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 rounded-t-lg border border-slate-400 shadow-lg relative flex flex-col items-center justify-end overflow-hidden">
            <div className="w-full h-8 bg-sky-600 flex items-center justify-center">
              <span className="text-[7px] text-white font-extrabold">CAT TEMBOK</span>
            </div>
            <div className="absolute top-2 w-14 h-3 rounded-full bg-slate-300 border border-slate-400" />
          </div>

          {/* Center main drum can */}
          <div className="w-28 h-32 bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-t-xl border border-slate-500 shadow-2xl relative flex flex-col items-center justify-end overflow-hidden z-20">
            <div className="w-full h-12 bg-blue-600 flex flex-col items-center justify-center">
              <span className="text-[9px] text-white font-black tracking-wide">PUSAT CAT</span>
              <span className="text-[7px] text-sky-200 font-semibold">PREMIUM 20L</span>
            </div>
            <div className="absolute top-2 w-20 h-4 rounded-full bg-slate-200 border border-slate-400 flex items-center justify-center">
              <div className="w-8 h-1 bg-slate-400 rounded-full" />
            </div>
          </div>

          {/* Right thinner can */}
          <div className="w-20 h-26 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-t-md border border-slate-500 shadow-lg relative flex flex-col items-center justify-end overflow-hidden">
            <div className="w-full h-9 bg-rose-600 flex items-center justify-center">
              <span className="text-[7px] text-white font-bold">THINNER A</span>
            </div>
            <div className="absolute top-1 right-2 w-4 h-3 bg-red-600 rounded-sm border border-red-800" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-20 px-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onNavigate?.('pilih-perusahaan')}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-full shadow-lg shadow-blue-500/25 transition-all text-sm tracking-wide"
        >
          Masuk
        </button>

        <button
          type="button"
          onClick={() => onNavigate?.('pilih-perusahaan')}
          className="w-full py-3.5 bg-white hover:bg-blue-50/60 active:scale-[0.99] border-2 border-blue-600 text-blue-600 font-bold rounded-full transition-all text-sm tracking-wide"
        >
          Daftar Akun
        </button>
      </div>
    </div>
  );
};
