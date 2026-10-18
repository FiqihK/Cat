import React from 'react';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import { ScreenId } from '../types';
import { PaintCanImage } from '../components/PaintCanImage';

interface Screen5DetailProdukProps {
  onNavigate?: (screen: ScreenId) => void;
  productId?: string;
}

export const Screen5DetailProduk: React.FC<Screen5DetailProdukProps> = ({
  onNavigate,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between bg-white relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="px-5 pt-11 pb-3 flex items-center justify-between border-b border-slate-100">
        <button
          type="button"
          onClick={() => onNavigate?.('produk')}
          className="flex items-center gap-1 text-slate-800 font-bold text-sm hover:text-slate-600"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Detail Produk</span>
        </button>
        <button type="button" className="text-slate-500 hover:text-slate-800" aria-label="Opsi">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
        {/* Large Hero Image Box */}
        <div className="w-full h-52 bg-slate-100/80 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden border border-slate-200/60">
          <PaintCanImage type="cat-interior-20l" size="hero" className="w-44 h-44" />
        </div>

        {/* Product Title */}
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-snug">
            Cat Tembok Interior 20L
          </h1>

          {/* Specs List */}
          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex">
              <span className="w-28 text-slate-500">Kode Produk</span>
              <span className="w-4 text-slate-400">:</span>
              <span className="font-semibold text-slate-900">CT-INT-20L</span>
            </div>
            <div className="flex">
              <span className="w-28 text-slate-500">Kategori</span>
              <span className="w-4 text-slate-400">:</span>
              <span className="font-semibold text-slate-900">Cat Tembok</span>
            </div>
            <div className="flex">
              <span className="w-28 text-slate-500">Satuan Utama</span>
              <span className="w-4 text-slate-400">:</span>
              <span className="font-semibold text-slate-900">Drum (20L)</span>
            </div>
          </div>
        </div>

        {/* Card: Konversi Satuan */}
        <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-slate-800">Konversi Satuan</h2>
            <button
              type="button"
              onClick={() => onNavigate?.('konversi-satuan')}
              className="text-[10px] text-blue-600 font-semibold hover:underline"
            >
              Lihat Kalkulator &gt;
            </button>
          </div>

          <div className="space-y-1 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="font-medium">1 Drum</span>
              <span className="text-slate-400 font-bold">=</span>
              <span className="font-semibold">20.000 ml</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">1 Ember (5L)</span>
              <span className="text-slate-400 font-bold">=</span>
              <span className="font-semibold">5.000 ml</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">1 Liter</span>
              <span className="text-slate-400 font-bold">=</span>
              <span className="font-semibold">1.000 ml</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">1 ml</span>
              <span className="text-slate-400 font-bold">=</span>
              <span className="font-semibold">1 ml</span>
            </div>
          </div>
        </div>

        {/* Section: Harga Jual */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-900">Harga Jual</h2>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Drum (20L)</span>
              <span className="font-bold text-slate-900">Rp 850.000</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Ember (5L)</span>
              <span className="font-bold text-slate-900">Rp 230.000</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Liter (1L)</span>
              <span className="font-bold text-slate-900">Rp 65.000</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">ml</span>
              <span className="font-bold text-slate-900">Rp 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-5 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onNavigate?.('produk')}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all"
        >
          Edit Produk
        </button>
      </div>
    </div>
  );
};
