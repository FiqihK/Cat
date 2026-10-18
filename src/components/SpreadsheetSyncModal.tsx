import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  Database,
  ArrowDownToLine,
  Layers,
  ChevronRight,
} from 'lucide-react';
import {
  getAppsScriptUrl,
  saveAppsScriptUrl,
  testAppsScriptConnection,
  fetchSpreadsheetData,
} from '../services/appsScriptApi';

interface SpreadsheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataSynced?: (data: any) => void;
}

export const SpreadsheetSyncModal: React.FC<SpreadsheetSyncModalProps> = ({
  isOpen,
  onClose,
  onDataSynced,
}) => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [spreadsheetName, setSpreadsheetName] = useState('');
  const [activeTab, setActiveTab] = useState<'sync' | 'guide' | 'code' | 'schema'>('sync');
  const [copied, setCopied] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const currentUrl = getAppsScriptUrl();
      setUrl(currentUrl);
      if (currentUrl) {
        checkConnection(currentUrl);
      }
    }
  }, [isOpen]);

  const checkConnection = async (targetUrl?: string) => {
    setStatus('checking');
    setStatusMessage('Memeriksa koneksi ke Google Spreadsheet...');
    const result = await testAppsScriptConnection(targetUrl || url);
    if (result.connected) {
      setStatus('connected');
      setStatusMessage(result.message);
      if (result.spreadsheetName) setSpreadsheetName(result.spreadsheetName);
    } else {
      setStatus('error');
      setStatusMessage(result.message);
    }
  };

  const handleSaveUrl = async () => {
    saveAppsScriptUrl(url);
    await checkConnection(url);
  };

  const handleSyncData = async () => {
    setSyncing(true);
    setStatusMessage('Menarik data terbaru dari Google Sheets...');
    const result = await fetchSpreadsheetData();
    setSyncing(false);
    if (result.success) {
      setStatusMessage('Data berhasil disinkronkan dari Google Spreadsheet!');
      if (onDataSynced) onDataSynced(result);
    } else {
      setStatusMessage(`Gagal sinkron: ${result.error}`);
    }
  };

  const handleCopyCode = async () => {
    try {
      const response = await fetch('/google-apps-script/Code.gs');
      let text = '';
      if (response.ok) {
        text = await response.text();
      } else {
        text = `// Silakan buka file google-apps-script/Code.gs di repositori aplikasi`;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Integrasi Google Spreadsheet &amp; Apps Script</span>
              </h2>
              <p className="text-xs text-slate-400">
                Gunakan Google Spreadsheet sebagai database live via Google Apps Script Web App
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="px-6 border-b border-slate-800 bg-slate-900/40 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('sync')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'sync'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Koneksi &amp; Status
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'guide'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Panduan 5 Langkah
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Kode Apps Script (Code.gs)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'schema'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Struktur Tabel Sheets
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-300">
          {activeTab === 'sync' && (
            <div className="space-y-4">
              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  status === 'connected'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : status === 'error'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : status === 'checking'
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300'
                }`}
              >
                {status === 'connected' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : status === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : status === 'checking' ? (
                  <RefreshCw className="w-5 h-5 text-blue-400 animate-spin shrink-0 mt-0.5" />
                ) : (
                  <Database className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {status === 'connected'
                      ? 'Terhubung ke Google Spreadsheet'
                      : status === 'error'
                      ? 'Belum Terhubung / Ada Masalah'
                      : status === 'checking'
                      ? 'Memeriksa Koneksi...'
                      : 'Mode Database Lokal (Belum Terhubung)'}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed opacity-90">
                    {statusMessage ||
                      'Masukkan URL Web App dari Google Apps Script untuk menghubungkan data stok, penjualan, dan pembelian langsung ke Google Sheets Anda.'}
                  </p>
                  {spreadsheetName && (
                    <p className="mt-1 font-semibold text-emerald-300">
                      Nama Dokumen: {spreadsheetName}
                    </p>
                  )}
                </div>
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <label className="font-bold text-slate-200">
                  URL Google Apps Script Web App (Berakhiran /exec)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleSaveUrl}
                    disabled={status === 'checking'}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap"
                  >
                    Simpan &amp; Tes
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  URL ini didapatkan setelah Anda memilih &quot;Deploy&quot; &gt; &quot;Aplikasi Web&quot; di Google Apps Script editor.
                </p>
              </div>

              {/* Actions Button Group */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSyncData}
                  disabled={syncing || !url}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 rounded-xl text-white font-semibold transition-all disabled:opacity-50"
                >
                  <ArrowDownToLine className={`w-4 h-4 ${syncing ? 'animate-bounce' : ''}`} />
                  <span>Tarik Data Terbaru dari Sheets</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('guide')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 font-semibold transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                  <span>Lihat Panduan Deploy</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">
                5 Langkah Mudah Menghubungkan Google Spreadsheet:
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white">Buat Google Spreadsheet Baru</h4>
                    <p className="text-slate-400 mt-0.5">
                      Buka <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-blue-400 underline">sheets.new</a> di browser Anda dan beri nama dokumen misal &quot;Database Pusat Cat Indonesia&quot;.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white">Buka Apps Script</h4>
                    <p className="text-slate-400 mt-0.5">
                      Di Google Sheets Anda, klik menu <strong>Ekstensi (Extensions)</strong> &gt; <strong>Apps Script</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white">Salin &amp; Tempelkan Kode Code.gs</h4>
                    <p className="text-slate-400 mt-0.5">
                      Buka tab <strong>&quot;Kode Apps Script&quot;</strong> di atas, klik tombol <strong>Salin Seluruh Kode</strong>, lalu hapus isi default di Apps Script dan tempelkan. Simpan (Ctrl+S).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-white">Deploy Sebagai Aplikasi Web</h4>
                    <p className="text-slate-400 mt-0.5">
                      Klik tombol biru <strong>Deploy (Terapkan)</strong> &gt; <strong>Deployment baru</strong>. Pilih tipe roda gigi <strong>Aplikasi Web</strong>:<br />
                      • <em>Jalankan sebagai:</em> <strong>Saya (Me)</strong><br />
                      • <em>Yang memiliki akses:</em> <strong className="text-emerald-400">Siapa saja (Anyone)</strong> (Wajib agar tidak error CORS!)
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    5
                  </span>
                  <div>
                    <h4 className="font-bold text-white">Tempelkan URL Web App ke Aplikasi</h4>
                    <p className="text-slate-400 mt-0.5">
                      Salin URL Web App yang berakhiran <code className="text-blue-400 font-mono">/exec</code>, kembali ke aplikasi ini pada tab <strong>Koneksi &amp; Status</strong>, lalu klik <strong>Simpan &amp; Tes</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Backend Apps Script (Code.gs)</h3>
                  <p className="text-slate-400 text-[11px]">
                    File sumber tersimpan di folder <code className="text-blue-400">google-apps-script/Code.gs</code>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Kode'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-72 overflow-y-auto space-y-1">
                <p className="text-slate-500">// Backend Google Apps Script - Pusat Cat Indonesia</p>
                <p className="text-slate-500">// Menghubungkan Google Sheets dengan Web App via REST JSON API</p>
                <p className="text-blue-400">var SHEET_PRODUK = &quot;Produk&quot;;</p>
                <p className="text-blue-400">var SHEET_PENJUALAN = &quot;Penjualan&quot;;</p>
                <p className="text-blue-400">var SHEET_PEMBELIAN = &quot;Pembelian&quot;;</p>
                <p className="text-emerald-400">function doGet(e) &#123; ... &#125;</p>
                <p className="text-emerald-400">function doPost(e) &#123; ... &#125;</p>
                <p className="text-indigo-400">function initDatabase() &#123; ... &#125;</p>
                <p className="text-slate-500">// Klik tombol &quot;Salin Kode&quot; di kanan atas untuk mendapatkan kode lengkap.</p>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Struktur Tabel Database Spreadsheet:</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80">
                  <div className="flex items-center gap-2 text-blue-400 font-bold mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Sheet &quot;Produk&quot;</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Kolom: ID, Kode, Nama, Kategori, Satuan Utama, Kemasan, Stok, Satuan Stok, Harga, Image Type.
                  </p>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Sheet &quot;Penjualan&quot;</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Kolom: ID Transaksi, Tanggal, Perusahaan, Pelanggan, Item, Subtotal, PPN 11%, Total, Waktu Simpan.
                  </p>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80">
                  <div className="flex items-center gap-2 text-orange-400 font-bold mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Sheet &quot;Pembelian&quot;</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Kolom: ID Pembelian, Tanggal, Supplier, Nama Produk, Kemasan, Jumlah, Harga Beli, Total, Waktu Simpan.
                  </p>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80">
                  <div className="flex items-center gap-2 text-purple-400 font-bold mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Sinkronisasi Otomatis</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Setiap penjualan otomatis memotong stok produk di sheet Produk, dan pembelian otomatis menambah stok!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span
              className={`w-2 h-2 rounded-full ${
                status === 'connected' ? 'bg-emerald-400' : 'bg-slate-500'
              }`}
            />
            <span>{status === 'connected' ? 'Online (Tersambung)' : 'Offline / Standalone'}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
