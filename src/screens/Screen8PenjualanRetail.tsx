import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  UserPlus,
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
import { sendSaleToSpreadsheet } from '../services/appsScriptApi';

interface Screen8PenjualanRetailProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const Screen8PenjualanRetail: React.FC<Screen8PenjualanRetailProps> = ({
  onNavigate,
}) => {
  const [customer, setCustomer] = useState('umum');
  const [date, setDate] = useState('18 Okt 2026');
  const [quantity, setQuantity] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const unitPrice = 55000;
  const totalAmount = quantity * unitPrice;

  const handleSaveSale = async () => {
    setIsSubmitting(true);
    setSubmitFeedback(null);
    const result = await sendSaleToSpreadsheet({
      date,
      company: 'Pusat Cat Retail',
      customer: customer === 'umum' ? 'Umum (Cash)' : customer,
      items: [
        {
          code: 'TH-S-1L',
          name: 'Thinner Super 1 Liter',
          quantity,
          price: unitPrice,
        },
      ],
      subtotal: totalAmount,
      ppnAmount: 0,
      total: totalAmount,
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
          <span>Penjualan</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-2.5 space-y-2.5">
        {/* Segmented Company Toggle */}
        <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1">
          <button
            type="button"
            onClick={() => onNavigate?.('penjualan-pkp')}
            className="flex-1 py-1.5 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-semibold transition-all"
          >
            PKP (Faktur Pajak)
          </button>
          <button
            type="button"
            className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            Retail (Eceran)
          </button>
        </div>

        {/* Pelanggan */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Pelanggan</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 py-2 px-3 rounded-xl text-xs appearance-none outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="umum">Umum (Cash)</option>
                <option value="pak-budi">Pak Budi - Tukang Cat</option>
                <option value="bengkel-jaya">Bengkel Mobil Berkah</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="button"
              className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"
              aria-label="Tambah Pelanggan"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tanggal */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Tanggal</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 outline-none"
            />
          </div>
        </div>

        {/* Pilih Produk */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Pilih Produk</label>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 pl-9 pr-10 py-2 rounded-xl outline-none focus:border-blue-500"
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

        {/* Selected Item Card */}
        {quantity > 0 && (
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <PaintCanImage type="thinner-super-1l" size="md" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Thinner Super
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">1 Liter</p>
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
              {/* Counter */}
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
              <span className="text-slate-500">Harga Jual</span>
              <span className="font-semibold text-slate-900">{formatRupiah(unitPrice)}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-semibold">Total</span>
              <span className="font-bold text-slate-900">{formatRupiah(totalAmount)}</span>
            </div>
          </div>
        )}

        {/* Outline Button */}
        <button
          type="button"
          onClick={() => setQuantity((q) => (q === 0 ? 1 : q + 1))}
          className="w-full py-2.5 border-2 border-dashed border-blue-400 hover:bg-blue-50/50 text-blue-600 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Footer Summary (Retail: No PPN row, direct Total) */}
      <div className="p-5 border-t border-slate-100 space-y-3 bg-white">
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Total Item</span>
            <span className="font-semibold text-slate-900">{quantity > 0 ? 1 : 0}</span>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-slate-100">
            <span className="text-slate-800 font-bold">Total</span>
            <span className="text-sm font-black text-slate-900">
              {formatRupiah(totalAmount)}
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
          onClick={handleSaveSale}
          disabled={isSubmitting || quantity === 0}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
        >
          {isSubmitting ? 'Menyimpan ke Sheets...' : 'Simpan Penjualan'}
        </button>
      </div>
    </div>
  );
};
