import React, { useState } from "react";
import { certificatesData, CertificateItem } from "../data/certificates";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  Calendar,
  ChevronDown,
  ShieldCheck,
  ArrowUpRight,
  Trophy,
  GraduationCap,
  BookOpen,
} from "lucide-react";

interface CertificatesProps {
  items?: CertificateItem[];
}

export const Certificates: React.FC<CertificatesProps> = ({ items = certificatesData }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Helper function to match category with tab
  const isCategoryMatch = (certCategory: string, tabId: string): boolean => {
    if (tabId === "all") return true;
    if (tabId === "professional") {
      return (
        certCategory === "Professional" ||
        certCategory === "Network" ||
        certCategory === "Cloud" ||
        certCategory === "DevOps"
      );
    }
    if (tabId === "competition") {
      return certCategory === "Competition";
    }
    if (tabId === "training") {
      return certCategory === "Training";
    }
    if (tabId === "course") {
      return (
        certCategory === "Course" ||
        certCategory === "General" ||
        certCategory === "UI/UX"
      );
    }
    return false;
  };

  // Helper metadata for badges
  const getCategoryMeta = (cat: string) => {
    if (
      cat === "Professional" ||
      cat === "Network" ||
      cat === "Cloud" ||
      cat === "DevOps"
    ) {
      return {
        label: "Sertifikasi Profesi",
        pillClass: "bg-orange-500/10 text-orange-400 border-orange-500/30",
        icon: <ShieldCheck className="w-3 h-3 text-orange-400" />,
      };
    }
    if (cat === "Competition") {
      return {
        label: "Lomba & Hackathon",
        pillClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
        icon: <Trophy className="w-3 h-3 text-rose-400" />,
      };
    }
    if (cat === "Training") {
      return {
        label: "Pelatihan & Bootcamp",
        pillClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        icon: <GraduationCap className="w-3 h-3 text-emerald-400" />,
      };
    }
    // Course
    return {
      label: "Kursus & Spesialisasi",
      pillClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      icon: <BookOpen className="w-3 h-3 text-blue-400" />,
    };
  };

  const filterTabs = [
    { id: "all", label: "Semua Kredensial", count: items.length },
    {
      id: "professional",
      label: "Sertifikasi Profesi",
      count: items.filter((c) => isCategoryMatch(c.category, "professional")).length,
    },
    {
      id: "competition",
      label: "Lomba & Hackathon",
      count: items.filter((c) => isCategoryMatch(c.category, "competition")).length,
    },
    {
      id: "training",
      label: "Pelatihan & Workshop",
      count: items.filter((c) => isCategoryMatch(c.category, "training")).length,
    },
    {
      id: "course",
      label: "Kursus & Spesialisasi",
      count: items.filter((c) => isCategoryMatch(c.category, "course")).length,
    },
  ];

  const filteredCertificates = items.filter((cert) =>
    isCategoryMatch(cert.category, activeCategory)
  );

  const displayedCertificates =
    activeCategory === "all" && !showAll
      ? filteredCertificates.slice(0, 6)
      : filteredCertificates;

  return (
    <section
      id="certificate"
      className="py-24 relative bg-slate-100/50 dark:bg-dark-surface/40 border-t border-b border-slate-200/80 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Clean & Minimalist */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-xs font-bold text-orange-500 tracking-wider uppercase">
              // CREDENTIALS & ACCREDITATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            CREDENTIAL{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
              VAULT
            </span>
          </h2>
        </div>

        {/* Monospace Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-slate-200 dark:border-white/10 pb-4">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="certCategoryPill"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-xl -z-10 shadow-md shadow-orange-500/30"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? "bg-black/20 text-white"
                      : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certificate Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedCertificates.map((cert, index) => {
              const certIndex = String(index + 1).padStart(2, "0");
              const meta = getCategoryMeta(cert.category);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={cert.id}
                  className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-orange-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-sm group"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-white/5">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback image placeholder if not loaded
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Dark vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Top tags */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] z-10">
                      <span className="px-2 py-0.5 rounded-lg bg-black/60 text-white border border-white/10 backdrop-blur-md">
                        #{certIndex}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-lg border backdrop-blur-md font-bold flex items-center gap-1.5 ${meta.pillClass}`}
                      >
                        {meta.icon}
                        <span>{cert.badgeLabel || meta.label}</span>
                      </span>
                    </div>

                    {/* Hover Button */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 z-20">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-mono font-bold flex items-center gap-2 shadow-xl hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
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
                        className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 inline-flex items-center gap-1 group/btn cursor-pointer"
                      >
                        <span>Lihat</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State if category is empty */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/40 dark:bg-dark-card/40 border border-slate-200/80 dark:border-white/5">
            <Trophy className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-50" />
            <h4 className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
              Belum ada sertifikat di kategori ini
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Tambahkan sertifikat baru melalui Admin Panel.
            </p>
          </div>
        )}

        {/* View More / Less Toggle Button for All Tab */}
        {activeCategory === "all" && filteredCertificates.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-slate-200 dark:border-white/10 font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-white hover:border-orange-500/40 transition-all shadow-sm cursor-pointer"
            >
              <span>
                {showAll
                  ? "Tampilkan Lebih Sedikit"
                  : `Lihat Semua Sertifikat (${filteredCertificates.length})`}
              </span>
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white dark:bg-dark-card rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
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
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-dark-hover transition-colors cursor-pointer"
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
