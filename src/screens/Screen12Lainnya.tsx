import React from 'react';
import {
  User,
  Users,
  Truck,
  Package,
  Layers,
  Building,
  CloudDownload,
  RefreshCw,
  Sliders,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { ScreenId } from '../types';
import { BottomNav } from '../components/BottomNav';

interface Screen12LainnyaProps {
  onNavigate?: (screen: ScreenId) => void;
  onOpenSyncModal?: () => void;
}

export const Screen12Lainnya: React.FC<Screen12LainnyaProps> = ({
  onNavigate,
  onOpenSyncModal,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="px-5 pt-11 pb-3 bg-white border-b border-slate-100">
        <h1 className="text-base font-bold text-slate-900">Lainnya</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* User Profile Card */}
        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xs font-bold text-slate-900">Admin</h2>
            <p className="text-[11px] text-slate-500 truncate">
              admin@pusatcatindonesia.com
            </p>
          </div>
        </div>

        {/* Menu Group 1: Master Data */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
          <button
            type="button"
            onClick={() => onNavigate?.('penjualan-pkp')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-500">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-800">
                Data Pelanggan
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('tambah-pembelian')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-500">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-800">
                Data Supplier
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('produk')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-500">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-800">
                Produk &amp; Satuan
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('konversi-satuan')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-500">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-800">
                Konversi Satuan
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Menu Group 2: System & Settings */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
          <button
            type="button"
            onClick={() => onNavigate?.('pilih-perusahaan')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-500">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-800">
                Pengaturan Perusahaan
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-500">
                <CloudDownload className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-800">
                Backup &amp; Restore
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => onOpenSyncModal?.()}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-emerald-600">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-800">
                  Sinkronisasi Data
                </span>
                <span className="text-[10px] text-emerald-600">
                  Google Spreadsheet &amp; Apps Script
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-500">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-800">
                Pengaturan Aplikasi
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Menu Group 3: Logout */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => onNavigate?.('splash')}
            className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-red-50 text-red-600 font-semibold text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab="lainnya" onNavigate={onNavigate} />
    </div>
  );
};
