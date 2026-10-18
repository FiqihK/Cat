import React from 'react';
import {
  X,
  Download,
  FileCode,
  Globe,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadHtml = () => {
    const link = document.createElement('a');
    link.href = '/pusat-cat-indonesia.html';
    link.download = 'pusat-cat-indonesia.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAppsScript = () => {
    const link = document.createElement('a');
    link.href = '/google-apps-script/Code.gs';
    link.download = 'Code.gs';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Download File Web &amp; HTML
              </h2>
              <p className="text-xs text-slate-400">
                Pusat Cat Indonesia - Aplikasi Manajemen Cat &amp; Thinner
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

        {/* Body */}
        <div className="p-6 space-y-4 text-xs text-slate-300">
          {/* Card 1: Standalone Single File HTML */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    pusat-cat-indonesia.html
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Single-File Standalone HTML (CSS, JS, dan Gambar sudah terbundle di dalam)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Bisa dibuka langsung offline di komputer / HP Anda (cukup double click).</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Sudah terhubung ke database Google Spreadsheet Anda!</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadHtml}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-600/20 text-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download File HTML (.html)</span>
              </button>

              <a
                href="/pusat-cat-indonesia.html"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-semibold rounded-xl transition-all flex items-center justify-center"
                title="Buka di tab baru"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Backend Code.gs */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <FileCode className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xs text-white">
                  Code.gs (Google Apps Script Backend)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Skrip Apps Script backend untuk Google Spreadsheet
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadAppsScript}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl text-[11px] transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .gs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
