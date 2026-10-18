import React, { useState } from 'react';
import {
  ChevronDown,
  Bell,
  Search,
  Package,
  Layers,
  Receipt,
  CreditCard,
  Building2,
  Store,
} from 'lucide-react';
import { CompanyType, ScreenId } from '../types';
import { LOW_STOCK_ITEMS, SALES_WEEK_DATA } from '../data/mockData';
import { PaintCanImage } from '../components/PaintCanImage';
import { BottomNav } from '../components/BottomNav';

interface Screen3BerandaProps {
  currentCompany?: CompanyType;
  onCompanyChange?: (company: CompanyType) => void;
  onNavigate?: (screen: ScreenId) => void;
}

export const Screen3Beranda: React.FC<Screen3BerandaProps> = ({
  currentCompany = 'pkp',
  onCompanyChange,
  onNavigate,
}) => {
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7 Hari Terakhir');

  const companyTitle =
    currentCompany === 'pkp'
      ? 'Pusat Cat Indonesia (PKP)'
      : 'Pusat Cat Retail';

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 relative overflow-hidden h-full">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Top Blue Header extending under status bar */}
        <div className="bg-blue-600 px-5 pt-11 pb-5 rounded-b-[28px] shadow-sm relative z-20">
          {/* Header Row: Company selector + Notification */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCompanyMenu(!showCompanyMenu)}
                className="flex items-center gap-2 text-white font-semibold text-xs py-1"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  {currentCompany === 'pkp' ? (
                    <Building2 className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Store className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <span>{companyTitle}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {/* Company Switch Dropdown */}
              {showCompanyMenu && (
                <div className="absolute top-10 left-0 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 w-60 z-50 text-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      onCompanyChange?.('pkp');
                      setShowCompanyMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-slate-50 ${
                      currentCompany === 'pkp' ? 'text-blue-600 font-bold' : ''
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Pusat Cat Indonesia (PKP)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onCompanyChange?.('retail');
                      setShowCompanyMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-slate-50 ${
                      currentCompany === 'retail' ? 'text-blue-600 font-bold' : ''
                    }`}
                  >
                    <Store className="w-4 h-4 text-emerald-600" />
                    Pusat Cat Retail
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell with Badge */}
            <button
              type="button"
              onClick={() => onNavigate?.('stok-barang')}
              className="relative p-1 text-white hover:text-white/80"
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-blue-600" />
            </button>
          </div>

          {/* Search bar inside header */}
          <div className="mt-3.5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari produk, kode, atau nama..."
              onClick={() => onNavigate?.('produk')}
              className="w-full bg-white text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none shadow-sm cursor-pointer"
              readOnly
            />
          </div>
        </div>

        {/* Main Content Body */}
        <div className="px-5 py-4 space-y-4">
          {/* 4 Stat Cards in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: Produk */}
            <div
              onClick={() => onNavigate?.('produk')}
              className="p-3 bg-sky-50/70 border border-sky-100 rounded-2xl flex items-center gap-2.5 cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Produk</p>
                <p className="text-base font-extrabold text-slate-900 leading-tight">124</p>
              </div>
            </div>

            {/* Card 2: Stok */}
            <div
              onClick={() => onNavigate?.('stok-barang')}
              className="p-3 bg-teal-50/70 border border-teal-100 rounded-2xl flex items-center gap-2.5 cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Stok</p>
                <p className="text-base font-extrabold text-slate-900 leading-tight">1.250</p>
              </div>
            </div>

            {/* Card 3: Penjualan Hari ini */}
            <div
              onClick={() => onNavigate?.('laporan')}
              className="p-3 bg-orange-50/70 border border-orange-100 rounded-2xl flex items-center gap-2.5 cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                <Receipt className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-500 font-medium truncate">Penjualan Hari ini</p>
                <p className="text-xs font-black text-slate-900 leading-tight truncate">
                  Rp 12.450.000
                </p>
              </div>
            </div>

            {/* Card 4: Pembelian */}
            <div
              onClick={() => onNavigate?.('tambah-pembelian')}
              className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl flex items-center gap-2.5 cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-500 font-medium truncate">Pembelian</p>
                <p className="text-xs font-black text-slate-900 leading-tight truncate">
                  Rp 25.000.000
                </p>
              </div>
            </div>
          </div>

          {/* Section: Grafik Penjualan */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-900">Grafik Penjualan</h2>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 border border-slate-200 rounded-lg px-2 py-0.5">
                <span>{selectedTimeframe}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>

            {/* Bar Chart matching mockup */}
            <div className="relative pt-6 pb-1">
              {/* Floating Tooltip over Sab */}
              <div
                className="absolute -top-1 left-[70%] -translate-x-1/2 bg-sky-100/90 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-10 pointer-events-none"
              >
                Rp 12.450.000
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-sky-100/90" />
              </div>

              {/* Bars Row */}
              <div className="h-28 flex items-end justify-between px-2 gap-2 border-b border-slate-100 pb-1">
                {SALES_WEEK_DATA.map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      style={{ height: `${item.heightPercent}%` }}
                      className={`w-full max-w-[18px] rounded-t-sm transition-all ${
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

          {/* Section: Stok Menipis */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs font-bold text-slate-900">Stok Menipis</h2>
              <button
                type="button"
                onClick={() => onNavigate?.('stok-barang')}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
              >
                Lihat Semua &gt;
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {LOW_STOCK_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate?.('stok-barang')}
                  className="py-2 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 rounded-lg px-1 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <PaintCanImage type={item.imageType} size="sm" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {item.name}
                      </p>
                      <p
                        className={`text-[11px] font-semibold mt-0.5 ${
                          item.badgeType === 'red' ? 'text-red-500' : 'text-orange-500'
                        }`}
                      >
                        {item.remains}
                      </p>
                    </div>
                  </div>

                  {/* Indicator Dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      item.badgeType === 'red' ? 'bg-red-500' : 'bg-orange-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab="beranda" onNavigate={onNavigate} />
    </div>
  );
};
