import React, { useState } from "react";
import { certificatesData, CertificateItem } from "../data/certificates";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Calendar, ChevronDown, ShieldCheck, ArrowUpRight } from "lucide-react";

interface CertificatesProps {
  items?: CertificateItem[];
}

export const Certificates: React.FC<CertificatesProps> = ({ items = certificatesData }) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedCertificates = showAll
    ? items
    : items.slice(0, 6);

  return (
    <section id="certificate" className="py-24 relative bg-slate-100/50 dark:bg-dark-surface/40 border-t border-b border-slate-200/80 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider">
                // CREDENTIALS & LICENSES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              CREDENTIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">VAULT</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Pengakuan kompetensi dan sertifikasi berstandar industri dari institusi terakreditasi nasional dan internasional.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCertificates.map((cert, index) => {
            const certIndex = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-orange-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-sm group"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-white/5">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Top tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-lg bg-black/60 text-white border border-white/10 backdrop-blur-md">
                      #{certIndex}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-orange-500/90 text-white font-bold backdrop-blur-md">
                      {cert.category}
                    </span>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-mono font-bold flex items-center gap-2 shadow-xl hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Lihat Sertifikat</span>
                    </button>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      <span>{cert.issueDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 font-sans">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-[170px]">
                      {cert.credentialId || "TERVERIFIKASI"}
                    </span>

                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 inline-flex items-center gap-1 group/btn"
                    >
                      <span>Lihat</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View More / Less Toggle Button */}
        {items.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-slate-200 dark:border-white/10 font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-white hover:border-orange-500/40 transition-all shadow-sm"
            >
              <span>{showAll ? "Tampilkan Lebih Sedikit" : `Lihat Semua Sertifikat (${items.length})`}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}

      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-white dark:bg-dark-card rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full bg-slate-950 p-2 sm:p-4 flex items-center justify-center min-h-[300px]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />
              </div>

              <div className="p-6 sm:p-8 flex items-center justify-between flex-wrap gap-4 border-t border-slate-200 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-1.5 text-orange-500 font-mono text-xs font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>AUTHENTICATED ACCREDITATION</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {selectedCert.issuer} • {selectedCert.issueDate}
                  </p>
                  {selectedCert.credentialId && (
                    <p className="text-xs font-mono text-emerald-500 mt-1">
                      No. Kredensial: {selectedCert.credentialId}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-dark-hover transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
