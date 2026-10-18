import React from 'react';
import { Building2, Store, ArrowRight, Database } from 'lucide-react';
import { CompanyType, ScreenId } from '../types';

interface Screen2PilihPerusahaanProps {
  onSelectCompany?: (company: CompanyType) => void;
  onNavigate?: (screen: ScreenId) => void;
}

export const Screen2PilihPerusahaan: React.FC<Screen2PilihPerusahaanProps> = ({
  onSelectCompany,
  onNavigate,
}) => {
  const handleSelect = (company: CompanyType) => {
    onSelectCompany?.(company);
    onNavigate?.('beranda');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white h-full pt-12">
      {/* Header section */}
      <div className="mt-1">
        <h1 className="text-2xl font-bold text-slate-900">Pilih Perusahaan</h1>
        <p className="mt-1 text-xs text-slate-500">
          Gunakan aplikasi sesuai jenis penjualan
        </p>

        {/* Company Selection Cards */}
        <div className="mt-6 flex flex-col gap-4">
          {/* Card 1: Pusat Cat Indonesia (PKP) */}
          <div
            onClick={() => handleSelect('pkp')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSelect('pkp')}
            className="group relative p-4 rounded-2xl bg-white border border-sky-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-sky-600" />
              </div>
              <div className="text-left">
                <h2 className="text-sm font-bold text-slate-900 leading-tight">
                  Pusat Cat Indonesia<br />(PKP)
                </h2>
                <p className="text-[11px] text-slate-500 mt-1">
                  Untuk penjualan dengan Faktur Pajak (PKP)
                </p>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Card 2: Pusat Cat Retail */}
          <div
            onClick={() => handleSelect('retail')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSelect('retail')}
            className="group relative p-4 rounded-2xl bg-white border border-emerald-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <Store className="w-6 h-6 text-rose-500" />
              </div>
              <div className="text-left">
                <h2 className="text-sm font-bold text-slate-900 leading-tight">
                  Pusat Cat Retail
                </h2>
                <p className="text-[11px] text-slate-500 mt-1">
                  Untuk penjualan eceran (non PKP)
                </p>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="mb-4 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100/80 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
          <Database className="w-4 h-4" />
        </div>
        <p className="text-xs text-indigo-950/80 font-medium leading-relaxed">
          Data stok, gudang, dan produk tersinkron dalam 1 sistem.
        </p>
      </div>
    </div>
  );
};
