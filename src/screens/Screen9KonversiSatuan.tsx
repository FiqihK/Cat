import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ArrowUpDown } from 'lucide-react';
import { ScreenId } from '../types';
import { PaintCanImage } from '../components/PaintCanImage';
import { UnitType, UNIT_LABELS, convertUnit } from '../utils/conversion';

interface Screen9KonversiSatuanProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const Screen9KonversiSatuan: React.FC<Screen9KonversiSatuanProps> = ({
  onNavigate,
}) => {
  const [fromUnit, setFromUnit] = useState<UnitType>('drum');
  const [toUnit, setToUnit] = useState<UnitType>('ember');
  const [quantity, setQuantity] = useState<number>(1);

  const convertedValue = convertUnit(quantity, fromUnit, toUnit);

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
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
          <span>Konversi Satuan</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {/* Selected Product Card */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
          <PaintCanImage type="cat-interior-20l" size="sm" />
          <div>
            <h3 className="text-xs font-bold text-slate-900">
              Cat Tembok Interior
            </h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Kode: CT-INT-20L</p>
          </div>
        </div>

        {/* Section: Pilih Satuan Asal */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Pilih Satuan Asal
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as UnitType)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs appearance-none outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="drum">Drum (20L)</option>
                <option value="ember">Ember (5L)</option>
                <option value="liter">Liter (1L)</option>
                <option value="ml">ml</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 bg-slate-50 border border-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs text-center font-bold outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Center Swap Button */}
        <div className="flex justify-center -my-1">
          <button
            type="button"
            onClick={handleSwapUnits}
            className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all shadow-xs"
            aria-label="Tukar Satuan"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* Section: Pilih Satuan Tujuan */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Pilih Satuan Tujuan
          </label>
          <div className="relative">
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as UnitType)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs appearance-none outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="drum">Drum (20L)</option>
              <option value="ember">Ember (5L)</option>
              <option value="liter">Liter (1L)</option>
              <option value="ml">ml</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Card: Hasil Konversi */}
        <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl text-center space-y-1">
          <p className="text-[11px] font-semibold text-slate-500">Hasil Konversi</p>
          <div className="py-1">
            <p className="text-base font-black text-blue-600">
              {quantity} {UNIT_LABELS[fromUnit]}
            </p>
            <p className="text-base font-black text-blue-600">
              = {convertedValue} {UNIT_LABELS[toUnit]}
            </p>
          </div>
        </div>

        {/* Reference Breakdown List */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>1 Drum</span>
            <span className="text-slate-400">=</span>
            <span>20 Liter</span>
            <span className="text-slate-400">=</span>
            <span className="font-semibold text-slate-800">20.000 ml</span>
          </div>
          <div className="flex justify-between">
            <span>1 Ember</span>
            <span className="text-slate-400">=</span>
            <span>5 Liter</span>
            <span className="text-slate-400">=</span>
            <span className="font-semibold text-slate-800">5.000 ml</span>
          </div>
          <div className="flex justify-between">
            <span>1 Liter</span>
            <span className="text-slate-400">=</span>
            <span className="font-semibold text-slate-800">1.000 ml</span>
          </div>
          <div className="flex justify-between">
            <span>1 ml</span>
            <span className="text-slate-400">=</span>
            <span className="font-semibold text-slate-800">1 ml</span>
          </div>
        </div>
      </div>
    </div>
  );
};
