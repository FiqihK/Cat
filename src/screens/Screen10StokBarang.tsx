import React, { useState } from 'react';
import {
  ChevronLeft,
  Search,
  AlertTriangle,
  MoreVertical,
} from 'lucide-react';
import { ScreenId } from '../types';
import { STOCK_INVENTORY_ITEMS } from '../data/mockData';
import { PaintCanImage } from '../components/PaintCanImage';

interface Screen10StokBarangProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const Screen10StokBarang: React.FC<Screen10StokBarangProps> = ({
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<'Semua' | 'Stok Menipis' | 'Stok Habis'>('Stok Menipis');
  const [searchQuery, setSearchQuery] = useState('');

  const filterList = ['Semua', 'Stok Menipis', 'Stok Habis'] as const;

  const filteredItems = STOCK_INVENTORY_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <span>Stok Barang</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {filterList.map((filter) => {
            const isActive = activeFilter === filter;
            const isRedActive = isActive && filter === 'Stok Menipis';
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isRedActive
                    ? 'bg-red-500 text-white shadow-sm'
                    : isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl text-xs outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Stock List */}
        <div className="divide-y divide-slate-100">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="py-3 flex items-center justify-between hover:bg-slate-50/70 rounded-xl px-1 transition-all"
            >
              <div className="flex items-center gap-3">
                <PaintCanImage type={item.imageType} size="md" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {item.name}
                  </h4>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${item.badgeColor}`}
                    >
                      {item.stockText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Icon */}
              <div>
                {item.iconType === 'alert-red' && (
                  <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}
                {item.iconType === 'alert-orange' && (
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                  </div>
                )}
                {item.iconType === 'more' && (
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Opsi Stok"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
