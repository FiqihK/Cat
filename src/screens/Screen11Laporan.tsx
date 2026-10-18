import React, { useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  RotateCw,
} from 'lucide-react';
import { ScreenId } from '../types';
import { SALES_WEEK_DATA } from '../data/mockData';
import { BottomNav } from '../components/BottomNav';

interface Screen11LaporanProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const Screen11Laporan: React.FC<Screen11LaporanProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'Penjualan' | 'Pembelian' | 'Stok'>('Penjualan');
  const tabs = ['Penjualan', 'Pembelian', 'Stok'] as const;

  return (
    <div className="flex-1 flex flex-col justify-between bg-white relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="px-5 pt-11 pb-3 flex items-center justify-between border-b border-slate-100">
        <button
          type="button"
          onClick={() => onNavigate?.('beranda')}
          className="flex items-center gap-1 text-slate-800 font-bold text-sm hover:text-slate-600"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Laporan</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
        {/* Report Category Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date Range Picker Container */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-medium">01 Okt 2026 - 18 Okt 2026</span>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-700"
            aria-label="Segarkan Tanggal"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2 Summary Metric Cards Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Mint Card: Total Penjualan */}
          <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
            <div className="flex items-center justify-between text-[11px] text-emerald-800 font-semibold mb-1">
              <span>Total Penjualan</span>
              <span className="text-emerald-600 font-bold">&gt;</span>
            </div>
            <p className="text-xs font-black text-emerald-600 leading-tight">
              Rp 125.430.000
            </p>
          </div>

          {/* Light Blue Card: Jumlah Transaksi */}
          <div className="p-3 bg-sky-50/60 border border-sky-100 rounded-2xl">
            <p className="text-[11px] text-slate-500 font-medium mb-1">
              Jumlah Transaksi
            </p>
            <p className="text-base font-black text-blue-600 leading-tight">
              48
            </p>
          </div>
        </div>

        {/* Bar Chart Container */}
        <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
          <div className="relative pt-6 pb-1">
            {/* Tooltip on Saturday */}
            <div
              className="absolute -top-1 left-[70%] -translate-x-1/2 bg-sky-100/90 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-10 pointer-events-none"
            >
              Rp 12.450.000
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-sky-100/90" />
            </div>

            <div className="h-24 flex items-end justify-between px-2 gap-2 border-b border-slate-100 pb-1">
              {SALES_WEEK_DATA.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    style={{ height: `${item.heightPercent}%` }}
                    className={`w-full max-w-[16px] rounded-t-sm transition-all ${
                      item.isHighlight
                        ? 'bg-blue-500 shadow-sm'
                        : 'bg-sky-400/80 hover:bg-sky-500'
                    }`}
                  />
                  <span className="text-[10px] font-medium text-slate-500">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Penjualan per Perusahaan */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900">
            Penjualan per Perusahaan
          </h3>

          <div className="flex items-center gap-4">
            {/* Realistic Donut Chart */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="5"
                />
                {/* 30% Retail segment (Teal/Cyan) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="5"
                  strokeDasharray="26.39 87.96"
                  strokeDashoffset="0"
                />
                {/* 70% PKP segment (Royal Blue) */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="5"
                  strokeDasharray="61.57 87.96"
                  strokeDashoffset="-26.39"
                />
              </svg>
            </div>

            {/* Legend & Breakdown */}
            <div className="flex-1 space-y-2 text-xs">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span className="text-slate-600 text-[11px] font-semibold">
                    PKP (Faktur Pajak)
                  </span>
                </div>
                <div className="pl-4 text-[11px] text-slate-900 font-bold mt-0.5">
                  <span className="text-blue-600 font-black">70%</span> Rp 87.801.000
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
                  <span className="text-slate-600 text-[11px] font-semibold">
                    Retail (Eceran)
                  </span>
                </div>
                <div className="pl-4 text-[11px] text-slate-900 font-bold mt-0.5">
                  <span className="text-cyan-600 font-black">30%</span> Rp 37.629.000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab="laporan" onNavigate={onNavigate} />
    </div>
  );
};
