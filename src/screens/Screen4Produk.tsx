import React, { useState } from 'react';
import {
  ChevronLeft,
  MoreVertical,
  Search,
  SlidersHorizontal,
  Plus,
} from 'lucide-react';
import { ScreenId } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { PaintCanImage } from '../components/PaintCanImage';
import { BottomNav } from '../components/BottomNav';
import { formatRupiah } from '../utils/conversion';

interface Screen4ProdukProps {
  onNavigate?: (screen: ScreenId) => void;
  onSelectProduct?: (productId: string) => void;
}

export const Screen4Produk: React.FC<Screen4ProdukProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Cat' | 'Thinner' | 'Aksesoris'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua', 'Cat', 'Thinner', 'Aksesoris'] as const;

  const filteredProducts = INITIAL_PRODUCTS.filter((prod) => {
    const matchesCat =
      activeCategory === 'Semua' ||
      (activeCategory === 'Cat' && prod.category.includes('Cat')) ||
      (activeCategory === 'Thinner' && prod.category === 'Thinner') ||
      (activeCategory === 'Aksesoris' && prod.category === 'Aksesoris');

    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.code.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

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
          <span>Produk</span>
        </button>
        <button type="button" className="text-slate-500 hover:text-slate-800" aria-label="Opsi">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar & Filter Icon */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl text-xs outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="button"
            className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"
            aria-label="Filter"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Product Items List */}
        <div className="divide-y divide-slate-100">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                onSelectProduct?.(prod.id);
                onNavigate?.('detail-produk');
              }}
              className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 rounded-xl px-1 transition-all group"
            >
              {/* Left Info */}
              <div className="flex items-center gap-3">
                <PaintCanImage type={prod.imageType} size="md" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Kode: {prod.code}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 text-[10px] font-semibold border border-teal-200/60">
                      {prod.packageType}
                    </span>
                    <span
                      className={`text-[10px] font-semibold ${
                        prod.stock <= 3 ? 'text-red-500 font-bold' : 'text-emerald-600'
                      }`}
                    >
                      Stok: {prod.stock}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Price & Menu */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">
                  {formatRupiah(prod.price)}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Menu Produk"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (+) */}
      <div className="absolute right-5 bottom-20 z-20">
        <button
          type="button"
          onClick={() => onNavigate?.('tambah-pembelian')}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 active:scale-95 transition-all"
          aria-label="Tambah Produk"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab="produk" onNavigate={onNavigate} />
    </div>
  );
};
