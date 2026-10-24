import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl bg-white dark:bg-dark-card rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 dark:bg-dark-surface/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                    Curriculum Vitae — Muhammad Anka Reza
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED_PDF
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  IT Support Specialist • Network Engineer • Web Developer // D4 TI POLINEMA
                </p>
              </div>
            </div>

            {/* Actions: Download, Open in New Tab, Close */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Direct Download Button */}
              <a
                href="/resume.pdf"
                download="CV_Muhammad_Anka_Reza.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md shadow-orange-500/20 hover:opacity-95 transition-all"
                title="Unduh CV PDF ke Perangkat Anda"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Unduh PDF</span>
              </a>

              {/* Open New Tab Button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-surface hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
                title="Buka PDF di Tab Baru"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden md:inline">Tab Baru</span>
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Tutup preview CV"
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-surface text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Embedded PDF Previewer */}
          <div className="flex-1 p-3 sm:p-5 overflow-hidden flex flex-col bg-slate-100/50 dark:bg-black/30">
            <iframe
              src="/resume.pdf#toolbar=1&navpanes=0"
              className="w-full flex-1 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-surface shadow-inner min-h-[500px]"
              title="Curriculum Vitae Muhammad Anka Reza Preview"
            />

            {/* Mobile Fallback Notice */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 px-2 gap-2">
              <span>
                💡 Tip: Jika preview di atas tidak tampil di ponsel Anda, klik tombol <strong>Unduh PDF</strong> atau <strong>Tab Baru</strong>.
              </span>
              <span className="text-[11px] text-slate-400">
                Ukuran Dokumen: ~610 KB (PDF)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
