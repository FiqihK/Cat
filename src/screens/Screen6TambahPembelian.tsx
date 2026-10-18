import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  Calendar,
  Search,
  ScanLine,
  Trash2,
  Minus,
  Plus,
} from 'lucide-react';
import { ScreenId } from '../types';
import { PaintCanImage } from '../components/PaintCanImage';
import { formatRupiah } from '../utils/conversion';
import { sendPurchaseToSpreadsheet } from '../services/appsScriptApi';

interface Screen6TambahPembelianProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const Screen6TambahPembelian: React.FC<Screen6TambahPembelianProps> = ({
  onNavigate,
}) => {
  const [supplier, setSupplier] = useState('');
  const [date, setDate] = useState('18 Okt 2026');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const unitPrice = 600000;
  const totalPurchase = quantity * unitPrice;

  const handleSavePurchase = async () => {
    setIsSubmitting(true);
    setSubmitFeedback(null);
    const result = await sendPurchaseToSpreadsheet({
      date,
      supplier: supplier || 'PT Kimia Nusantara Abadi',
      productName: 'Thinner A Special',
      packageType: 'Drum 20L',
      quantity,
      unitPrice,
      total: totalPurchase,
    });
    setIsSubmitting(false);
    setSubmitFeedback(result.message);
    setTimeout(() => {
      onNavigate?.('beranda');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="px-5 pt-11 pb-2 flex items-center justify-between border-b border-slate-100">
        <button
          type="button"
          onClick={() => onNavigate?.('beranda')}
          className="flex items-center gap-1 text-slate-800 font-bold text-sm hover:text-slate-600"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Tambah Pembelian</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-2.5 space-y-2.5">
        {/* Field: Supplier */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Supplier</label>
          <div className="relative">
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs appearance-none outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="">Pilih Supplier</option>
              <option value="pt-kimia-abadi">PT Kimia Nusantara Abadi</option>
              <option value="cv-warna-indah">CV Warna Indah Perkasa</option>
              <option value="pt-solven-jaya">PT Solvenindo Mandiri</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Field: Tanggal */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Tanggal</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
            <Calendar className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 outline-none"
            />
          </div>
        </div>

        {/* Section: Pilih Produk */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-semibold text-slate-700">Pilih Produk</label>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 pl-9 pr-10 py-2.5 rounded-xl outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 text-slate-500 hover:text-slate-800"
              aria-label="Scan Barcode"
            >
              <ScanLine className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Added Product Card */}
        {quantity > 0 && (
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <PaintCanImage type="thinner-a-20l" size="md" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Thinner A Special
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Drum 20L</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuantity(0)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Hapus Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500">Jumlah</span>
              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-200 rounded-lg px-2 py-0.5 gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-500 hover:text-slate-800"
                  aria-label="Kurang"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-slate-800">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-500 hover:text-slate-800"
                  aria-label="Tambah"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span className="text-slate-500">Harga Beli</span>
              <span className="font-semibold text-slate-900">{formatRupiah(unitPrice)}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-semibold">Total</span>
              <span className="font-bold text-slate-900">{formatRupiah(totalPurchase)}</span>
            </div>
          </div>
        )}

        {/* Outline Button: + Tambah Produk */}
        <button
          type="button"
          onClick={() => setQuantity((q) => (q === 0 ? 1 : q + 1))}
          className="w-full py-2.5 border-2 border-dashed border-blue-400 hover:bg-blue-50/50 text-blue-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Footer Summary */}
      <div className="p-5 border-t border-slate-100 space-y-3 bg-white">
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Total Item</span>
            <span className="font-semibold text-slate-900">{quantity > 0 ? 1 : 0}</span>
          </div>
          <div className="flex justify-between items-center pt-0.5">
            <span className="text-slate-700 font-semibold">Total Pembelian</span>
            <span className="text-sm font-black text-slate-900">
              {formatRupiah(totalPurchase)}
            </span>
          </div>
        </div>

        {submitFeedback && (
          <p className="text-[10px] text-center font-semibold text-emerald-600 bg-emerald-50 py-1 rounded-lg">
            {submitFeedback}
          </p>
        )}

        <button
          type="button"
          onClick={handleSavePurchase}
          disabled={isSubmitting || quantity === 0}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
        >
          {isSubmitting ? 'Menyimpan ke Sheets...' : 'Simpan Pembelian'}
        </button>
      </div>
    </div>
  );
};
