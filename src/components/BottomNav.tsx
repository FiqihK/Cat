import React from 'react';
import { Home, Package, Receipt, BarChart3, MoreHorizontal } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavProps {
  activeTab: 'beranda' | 'produk' | 'transaksi' | 'laporan' | 'lainnya';
  onNavigate?: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
}) => {
  const tabs = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: Home,
      targetScreen: 'beranda' as ScreenId,
    },
    {
      id: 'produk',
      label: 'Produk',
      icon: Package,
      targetScreen: 'produk' as ScreenId,
    },
    {
      id: 'transaksi',
      label: 'Transaksi',
      icon: Receipt,
      targetScreen: 'penjualan-pkp' as ScreenId,
    },
    {
      id: 'laporan',
      label: 'Laporan',
      icon: BarChart3,
      targetScreen: 'laporan' as ScreenId,
    },
    {
      id: 'lainnya',
      label: 'Lainnya',
      icon: MoreHorizontal,
      targetScreen: 'lainnya' as ScreenId,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="shrink-0 h-16 bg-white border-t border-slate-200/80 px-2 flex items-center justify-around z-30"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onNavigate?.(tab.targetScreen)}
            className={`flex flex-col items-center justify-center gap-1 w-14 py-1 transition-colors ${
              isActive
                ? 'text-blue-600 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] leading-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
