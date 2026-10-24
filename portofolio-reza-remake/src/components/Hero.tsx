import React, { useState, useEffect } from "react";
import { profileData } from "../data/profile";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, Layers, FileText } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TwitterIcon,
} from "./ui/BrandIcons";

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % profileData.roles.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <GithubIcon className="w-4 h-4" />;
      case "linkedin":
        return <LinkedinIcon className="w-4 h-4" />;
      case "instagram":
        return <InstagramIcon className="w-4 h-4" />;
      case "twitter / x":
      case "twitter":
        return <TwitterIcon className="w-4 h-4" />;
      default:
        return <Send className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-grid-pattern"
    >
      {/* Background Soft Ambient Warm Glow */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-orange-500/10 dark:bg-orange-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Minimalist Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Minimalist Status Index */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Terbuka untuk Peluang Kerja & Kolaborasi</span>
              </div>
            </motion.div>

            {/* High-Impact Typographic Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-[0.98]">
                MUHAMMAD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
                  ANKA REZA.
                </span>
              </h1>
            </motion.div>

            {/* Dynamic Sleek Role Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 flex items-center gap-2 font-mono text-sm sm:text-base text-slate-500 dark:text-slate-400"
            >
              <span className="text-orange-500 font-bold">&gt;</span>
              <span>Spesialisasi:</span>
              <div className="relative inline-block overflow-hidden h-6 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-bold text-slate-900 dark:text-white border-b-2 border-orange-500"
                  >
                    {profileData.roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Concise Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
            >
              {profileData.summary}
            </motion.p>

            {/* Clean Actions & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Hubungi Saya</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#project"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-dark-surface/60 hover:bg-slate-100 dark:hover:bg-dark-hover transition-all"
              >
                <Layers className="w-4 h-4 text-orange-500" />
                <span>Lihat Proyek</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-dark-surface/60 hover:border-orange-500/40 hover:text-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                title="Buka & Lihat Curriculum Vitae (PDF)"
              >
                <FileText className="w-4 h-4 text-orange-500" />
                <span>Lihat CV</span>
              </button>

              {/* Minimalist Social Row */}
              <div className="flex items-center gap-2 sm:ml-auto">
                {profileData.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-dark-card/70 text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/30 hover:-translate-y-0.5 transition-all"
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Minimalist Bottom Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 pt-6 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg"
            >
              <div>
                <p className="font-mono text-2xl font-black text-slate-900 dark:text-white">
                  09<span className="text-orange-500">+</span>
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
                  Sertifikasi
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-black text-slate-900 dark:text-white">
                  12<span className="text-orange-500">+</span>
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
                  Proyek Selesai
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-black text-slate-900 dark:text-white">
                  04<span className="text-orange-500">+</span>
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
                  Tahun Pengalaman
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Clean Minimalist Portrait */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem]">
              
              {/* Back Glow Blur matching image2.jpg golden orange */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 opacity-20 dark:opacity-30 blur-2xl transform rotate-3" />

              {/* Clean Portrait Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl glass-card group"
              >
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Minimalist Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-white/90">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                    D4 TI POLINEMA
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                    MALANG, ID
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
