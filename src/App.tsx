import { useState, useEffect } from 'react';
import {
  Smartphone,
  LayoutGrid,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Sparkles,
  FileSpreadsheet,
  Download,
} from 'lucide-react';
import { ScreenId, CompanyType } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { SpreadsheetSyncModal } from './components/SpreadsheetSyncModal';
import { DownloadModal } from './components/DownloadModal';
import { getAppsScriptUrl } from './services/appsScriptApi';
import { Screen1Splash } from './screens/Screen1Splash';
import { Screen2PilihPerusahaan } from './screens/Screen2PilihPerusahaan';
import { Screen3Beranda } from './screens/Screen3Beranda';
import { Screen4Produk } from './screens/Screen4Produk';
import { Screen5DetailProduk } from './screens/Screen5DetailProduk';
import { Screen6TambahPembelian } from './screens/Screen6TambahPembelian';
import { Screen7PenjualanPKP } from './screens/Screen7PenjualanPKP';
import { Screen8PenjualanRetail } from './screens/Screen8PenjualanRetail';
import { Screen9KonversiSatuan } from './screens/Screen9KonversiSatuan';
import { Screen10StokBarang } from './screens/Screen10StokBarang';
import { Screen11Laporan } from './screens/Screen11Laporan';
import { Screen12Lainnya } from './screens/Screen12Lainnya';

export default function App() {
  const [viewMode, setViewMode] = useState<'app' | 'grid' | 'interactive'>('app');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('splash');
  const [currentCompany, setCurrentCompany] = useState<CompanyType>('pkp');
  const [zoomScale, setZoomScale] = useState<number>(0.58);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [hasSpreadsheetUrl, setHasSpreadsheetUrl] = useState<boolean>(false);

  useEffect(() => {
    // If opened on mobile phone screen, start in direct app mode
    if (window.innerWidth < 768) {
      setViewMode('app');
    }
  }, []);

  useEffect(() => {
    setHasSpreadsheetUrl(Boolean(getAppsScriptUrl()));
  }, [isSyncModalOpen]);

  const screenOptions: Array<{ id: ScreenId; label: string }> = [
    { id: 'splash', label: '1. Welcome & Splash' },
    { id: 'pilih-perusahaan', label: '2. Pilih Perusahaan' },
    { id: 'beranda', label: '3. Beranda (Dashboard)' },
    { id: 'produk', label: '4. Katalog Produk' },
    { id: 'detail-produk', label: '5. Detail Produk' },
    { id: 'tambah-pembelian', label: '6. Tambah Pembelian' },
    { id: 'penjualan-pkp', label: '7. Penjualan (PKP Faktur Pajak)' },
    { id: 'penjualan-retail', label: '8. Penjualan (Retail Eceran)' },
    { id: 'konversi-satuan', label: '9. Konversi Satuan' },
    { id: 'stok-barang', label: '10. Stok Barang Menipis' },
    { id: 'laporan', label: '11. Laporan & Statistik' },
    { id: 'lainnya', label: '12. Lainnya & Profil' },
  ];

  const handleScreenChange = (screen: ScreenId) => {
    setActiveScreen(screen);
  };

  const handleCompanyChange = (company: CompanyType) => {
    setCurrentCompany(company);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation & Control Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-black text-sm">PC</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-wide">
                Pusat Cat Indonesia
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                100% Persis Mockup
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Aplikasi Manajemen Stok Cat &amp; Thinner
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          <button
            type="button"
            onClick={() => setViewMode('app')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'app'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Pakai Aplikasi</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>12 Mockup</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('interactive')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'interactive'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Simulator Frame</span>
          </button>
        </div>

        {/* Actions & Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Download HTML Button */}
          <button
            type="button"
            onClick={() => setIsDownloadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all active:scale-95 shadow-md shadow-blue-600/25 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download HTML</span>
          </button>

          {/* Google Sheets Integration Button */}
          <button
            type="button"
            onClick={() => setIsSyncModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Database Spreadsheet</span>
            <span
              className={`w-2 h-2 rounded-full ${
                hasSpreadsheetUrl ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
              title={hasSpreadsheetUrl ? 'Spreadsheet Terkonfigurasi' : 'Belum Terhubung'}
            />
          </button>

          {/* Quick Jump Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="hidden sm:inline">Pilih Layar:</span>
            <select
              value={activeScreen}
              onChange={(e) => {
                setActiveScreen(e.target.value as ScreenId);
                setViewMode('interactive');
              }}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-500 cursor-pointer"
            >
              {screenOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Zoom controls for Grid view */}
          {viewMode === 'grid' && (
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-slate-300">
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.max(0.4, prev - 0.1))}
                className="p-1 hover:text-white rounded"
                title="Perkecil"
                aria-label="Perkecil"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.min(1.2, prev + 0.1))}
                className="p-1 hover:text-white rounded"
                title="Perbesar"
                aria-label="Perbesar"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(0.85)}
                className="p-1 hover:text-white rounded ml-0.5"
                title="Reset Ukuran"
                aria-label="Reset"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-x-auto w-full">
        {viewMode === 'app' ? (
          /* ========================================================
             MODE 0: DIRECT LIVE APP (READY TO USE)
             ======================================================== */
          <div className="w-full h-full flex-1 flex flex-col items-center justify-center sm:p-4">
            <div className="w-full sm:max-w-[420px] h-full sm:h-[840px] max-h-[100dvh] bg-white sm:rounded-[36px] sm:shadow-2xl sm:border sm:border-slate-800 overflow-hidden flex flex-col relative text-slate-900">
              {activeScreen === 'splash' && (
                <Screen1Splash onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'pilih-perusahaan' && (
                <Screen2PilihPerusahaan
                  onSelectCompany={handleCompanyChange}
                  onNavigate={handleScreenChange}
                />
              )}
              {activeScreen === 'beranda' && (
                <Screen3Beranda
                  currentCompany={currentCompany}
                  onCompanyChange={handleCompanyChange}
                  onNavigate={handleScreenChange}
                />
              )}
              {activeScreen === 'produk' && (
                <Screen4Produk onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'detail-produk' && (
                <Screen5DetailProduk onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'tambah-pembelian' && (
                <Screen6TambahPembelian onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'penjualan-pkp' && (
                <Screen7PenjualanPKP onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'penjualan-retail' && (
                <Screen8PenjualanRetail onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'konversi-satuan' && (
                <Screen9KonversiSatuan onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'stok-barang' && (
                <Screen10StokBarang onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'laporan' && (
                <Screen11Laporan onNavigate={handleScreenChange} />
              )}
              {activeScreen === 'lainnya' && (
                <Screen12Lainnya
                  onNavigate={handleScreenChange}
                  onOpenSyncModal={() => setIsSyncModalOpen(true)}
                />
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* ========================================================
             MODE 1: ALL 12 SCREENS DISPLAYED SIDE-BY-SIDE (MATCHING MOCKUP)
             ======================================================== */
          <div className="w-full max-w-[1900px] flex flex-col items-center space-y-8">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                <span>Tampilan 12 Layar Aplikasi Manajemen Cat &amp; Thinner</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl">
                Desain dan fungsionalitas identik sesuai mockup asli. Klik layar mana saja untuk mencobanya langsung dalam mode simulator interaktif.
              </p>
            </div>

            {/* Grid Container scaled */}
            <div
              style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
              className="transition-transform duration-200"
            >
              {/* Row 1: Screens 1 to 6 */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Baris 1: Welcome, Perusahaan, Beranda, Katalog, Detail &amp; Pembelian
                  </h3>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6">
                  {/* Screen 1: Splash */}
                  <div
                    onClick={() => {
                      setActiveScreen('splash');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      1. Welcome &amp; Splash
                    </span>
                    <PhoneFrame>
                      <Screen1Splash onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>

                  {/* Screen 2: Pilih Perusahaan */}
                  <div
                    onClick={() => {
                      setActiveScreen('pilih-perusahaan');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      2. Pilih Perusahaan
                    </span>
                    <PhoneFrame>
                      <Screen2PilihPerusahaan
                        onSelectCompany={handleCompanyChange}
                        onNavigate={handleScreenChange}
                      />
                    </PhoneFrame>
                  </div>

                  {/* Screen 3: Beranda (Blue Status Bar) */}
                  <div
                    onClick={() => {
                      setActiveScreen('beranda');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      3. Beranda
                    </span>
                    <PhoneFrame darkStatusBar>
                      <Screen3Beranda
                        currentCompany={currentCompany}
                        onCompanyChange={handleCompanyChange}
                        onNavigate={handleScreenChange}
                      />
                    </PhoneFrame>
                  </div>

                  {/* Screen 4: Produk */}
                  <div
                    onClick={() => {
                      setActiveScreen('produk');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      4. Produk
                    </span>
                    <PhoneFrame>
                      <Screen4Produk onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>

                  {/* Screen 5: Detail Produk */}
                  <div
                    onClick={() => {
                      setActiveScreen('detail-produk');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      5. Detail Produk
                    </span>
                    <PhoneFrame>
                      <Screen5DetailProduk onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>

                  {/* Screen 6: Tambah Pembelian */}
                  <div
                    onClick={() => {
                      setActiveScreen('tambah-pembelian');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      6. Tambah Pembelian
                    </span>
                    <PhoneFrame>
                      <Screen6TambahPembelian onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>
                </div>
              </div>

              {/* Row 2: Screens 7 to 12 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Baris 2: Penjualan PKP &amp; Retail, Konversi, Stok, Laporan &amp; Lainnya
                  </h3>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6">
                  {/* Screen 7: Penjualan PKP */}
                  <div
                    onClick={() => {
                      setActiveScreen('penjualan-pkp');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      7. Penjualan (PKP Faktur Pajak)
                    </span>
                    <PhoneFrame>
                      <Screen7PenjualanPKP onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>

                  {/* Screen 8: Penjualan Retail */}
                  <div
                    onClick={() => {
                      setActiveScreen('penjualan-retail');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      8. Penjualan (Retail Eceran)
                    </span>
                    <PhoneFrame>
                      <Screen8PenjualanRetail onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>

                  {/* Screen 9: Konversi Satuan */}
                  <div
                    onClick={() => {
                      setActiveScreen('konversi-satuan');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      9. Konversi Satuan
                    </span>
                    <PhoneFrame>
                      <Screen9KonversiSatuan onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>

                  {/* Screen 10: Stok Barang */}
                  <div
                    onClick={() => {
                      setActiveScreen('stok-barang');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      10. Stok Barang
                    </span>
                    <PhoneFrame>
                      <Screen10StokBarang onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>

                  {/* Screen 11: Laporan */}
                  <div
                    onClick={() => {
                      setActiveScreen('laporan');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      11. Laporan
                    </span>
                    <PhoneFrame>
                      <Screen11Laporan onNavigate={handleScreenChange} />
                    </PhoneFrame>
                  </div>

                  {/* Screen 12: Lainnya */}
                  <div
                    onClick={() => {
                      setActiveScreen('lainnya');
                      setViewMode('interactive');
                    }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                      12. Lainnya
                    </span>
                    <PhoneFrame>
                      <Screen12Lainnya
                        onNavigate={handleScreenChange}
                        onOpenSyncModal={() => setIsSyncModalOpen(true)}
                      />
                    </PhoneFrame>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             MODE 2: SINGLE INTERACTIVE PHONE SIMULATOR
             ======================================================== */
          <div className="flex flex-col items-center justify-start gap-4 w-full py-2">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                Mode Simulator Handphone Aktif
              </span>
              <p className="text-[11px] text-slate-400">
                Gunakan tombol navigasi, tab di bawah, atau input untuk berinteraksi langsung!
              </p>
            </div>

            <div className="scale-[0.78] sm:scale-[0.82] origin-top transition-transform shrink-0 -mb-28">
              <PhoneFrame darkStatusBar={activeScreen === 'beranda'}>
                {activeScreen === 'splash' && (
                  <Screen1Splash onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'pilih-perusahaan' && (
                  <Screen2PilihPerusahaan
                    onSelectCompany={handleCompanyChange}
                    onNavigate={handleScreenChange}
                  />
                )}
                {activeScreen === 'beranda' && (
                  <Screen3Beranda
                    currentCompany={currentCompany}
                    onCompanyChange={handleCompanyChange}
                    onNavigate={handleScreenChange}
                  />
                )}
                {activeScreen === 'produk' && (
                  <Screen4Produk onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'detail-produk' && (
                  <Screen5DetailProduk onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'tambah-pembelian' && (
                  <Screen6TambahPembelian onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'penjualan-pkp' && (
                  <Screen7PenjualanPKP onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'penjualan-retail' && (
                  <Screen8PenjualanRetail onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'konversi-satuan' && (
                  <Screen9KonversiSatuan onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'stok-barang' && (
                  <Screen10StokBarang onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'laporan' && (
                  <Screen11Laporan onNavigate={handleScreenChange} />
                )}
                {activeScreen === 'lainnya' && (
                  <Screen12Lainnya
                    onNavigate={handleScreenChange}
                    onOpenSyncModal={() => setIsSyncModalOpen(true)}
                  />
                )}
              </PhoneFrame>
            </div>

            {/* Quick Screen Switcher Tabs at Bottom of Simulator */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-xl bg-slate-800/80 p-2 rounded-2xl border border-slate-700 -mt-16 2xl:mt-0 z-30">
              {screenOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveScreen(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    activeScreen === opt.id
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Google Spreadsheet & Apps Script Sync Modal */}
      <SpreadsheetSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      {/* Download Web App & HTML Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
