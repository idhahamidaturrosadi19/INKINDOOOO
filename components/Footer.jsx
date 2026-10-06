import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1727] text-white pt-12 pb-6 px-6 border-t-2 border-emerald-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kolom Profil */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#0066cc] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-wide">INKINDO YOGYAKARTA</h3>
              <p className="text-[10px] font-semibold text-emerald-400 tracking-wider">IKATAN NASIONAL KONSULTAN INDONESIA</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
            Ikatan Nasional Konsultan Indonesia (INKINDO) D.I. Yogyakarta adalah asosiasi perusahaan jasa konsultansi independen yang berdiri sejak 20 Juni 1979. Wadah perjuangan dan pemberdayaan 214 perusahaan konsultan anggota di Daerah Istimewa Yogyakarta.
          </p>
        </div>

        {/* Kolom Kontak */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-white tracking-wider">KONTAK</h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 mt-0.5">✉</span>
              <div>
                <div className="font-semibold text-slate-200">Email:</div>
                <div className="text-slate-300">inkindo@inkindo.org</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 mt-0.5">📞</span>
              <div>
                <div className="font-semibold text-slate-200">Telepon:</div>
                <div className="text-slate-300">081315289207</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 mt-0.5">📍</span>
              <div>
                <div className="font-semibold text-slate-200">Alamat:</div>
                <div className="text-slate-300 leading-relaxed">
                  Jl. Godean KM. 5 Nogosaren Baru No. 32, Banyuraden, Gamping, Sleman, Yogyakarta 55293
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Sosial Media */}
        <div>
          <h4 className="font-bold text-sm text-white tracking-wider mb-2">SOSIAL MEDIA</h4>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Ikuti dan terhubung dengan Sekretariat INKINDO D.I. Yogyakarta di saluran resmi media sosial:
          </p>
          <div className="flex flex-col gap-2 max-w-xs">
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-xs text-white transition-colors">
              <span>f</span> <span>Facebook</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-xs text-white transition-colors">
              <span>📷</span> <span>Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-xs text-white transition-colors">
              <span className="font-bold">𝕏</span> <span>Twitter</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-xs text-white transition-colors">
              <span>💬</span> <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
        © 2026 INKINDO YOGYAKARTA – All Right Reserved
      </div>
    </footer>
  );
}
