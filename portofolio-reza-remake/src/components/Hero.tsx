import React, { useState, useEffect } from "react";
import { profileData } from "../data/profile";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Send,
  Layers,
  FileText,
  Network,
  Code2,
  Cpu,
  Database,
  Terminal,
  ShieldCheck,
} from "lucide-react";
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
              {/* <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Terbuka untuk Peluang Kerja & Kolaborasi</span>
              </div> */}
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
                className="inline-flex items-center gap-1.5 px-3 py-3 font-mono text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
                title="Lihat Curriculum Vitae (PDF)"
              >
                <FileText className="w-4 h-4 text-orange-500" />
                <span className="underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:decoration-orange-500">Lihat CV</span>
                <span className="text-[10px] text-slate-400">↗</span>
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

          {/* Right Column: Epic Character with Cybernetic Arcane Portal Animation */}
          <div className="lg:col-span-5 flex justify-center items-center relative select-none">
            <div className="relative flex items-center justify-center w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] min-h-[440px] sm:min-h-[520px] lg:min-h-[580px]">
              
              {/* 1. Deep Atmospheric Ambient Nebular Glow */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-orange-500/30 to-rose-500/20 blur-3xl animate-pulse-portal pointer-events-none -z-10" />

              {/* 2. Outer Rotating Cybernetic Ring with Cardinal Markers */}
              <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full border border-dashed border-orange-500/35 dark:border-cyan-400/30 animate-spin-portal pointer-events-none -z-10 flex items-center justify-center">
                {/* 4 Cardinal Energy Nodes */}
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-orange-500 shadow-md shadow-orange-500/80" />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80" />
                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-md shadow-amber-400/80" />
                <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rose-500 shadow-md shadow-rose-500/80" />
              </div>

              {/* 3. Middle Counter-Rotating Tech Ring with Degree Markings */}
              <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full border border-cyan-400/30 dark:border-orange-500/25 animate-spin-portal-reverse pointer-events-none -z-10 flex items-center justify-center">
                <span className="absolute top-2 right-4 font-mono text-[9px] text-cyan-400/70 tracking-widest font-bold">
                  // SYS.01
                </span>
                <span className="absolute bottom-2 left-4 font-mono text-[9px] text-orange-400/70 tracking-widest font-bold">
                  // ENG.02
                </span>
              </div>

              {/* 4. Inner Radiant Core Ring */}
              <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] rounded-full border border-white/20 dark:border-white/10 bg-gradient-to-b from-orange-500/10 via-transparent to-cyan-500/10 backdrop-blur-[2px] pointer-events-none -z-10" />

              {/* 5. Holographic Pedestal Disc Glow under Character */}
              <div className="absolute bottom-0 w-64 sm:w-80 h-14 rounded-[100%] bg-gradient-to-r from-orange-500/40 via-cyan-400/50 to-blue-600/40 blur-xl pointer-events-none transform -rotate-1 -z-10" />

              {/* 6A. 3D Saturn Ring Arc: BACK HALF (Positioned behind Character PNG, z-index: 6) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[6]">
                <div
                  className="w-[340px] h-[150px] sm:w-[440px] sm:h-[190px] lg:w-[490px] lg:h-[210px] rounded-[100%] border-2 border-dashed border-cyan-400/35 dark:border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.25)] transform -rotate-[22deg]"
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)",
                  }}
                />
              </div>

              {/* 6B. True 3D Diagonal Saturn Orbiting Icons (Weaves behind PNG at z:5 and in front at z:25) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group/saturn">
                {[
                  {
                    id: "tech-network",
                    name: "Cisco & MikroTik",
                    role: "Routing & VLAN",
                    icon: <Network className="w-4 h-4 text-cyan-400" />,
                    borderHover: "hover:border-cyan-400 hover:shadow-cyan-400/50",
                    delay: "0s",
                  },
                  {
                    id: "tech-code",
                    name: "Full-Stack Dev",
                    role: "Laravel, React, Next.js",
                    icon: <Code2 className="w-4 h-4 text-orange-400" />,
                    borderHover: "hover:border-orange-400 hover:shadow-orange-400/50",
                    delay: "-3.66s",
                  },
                  {
                    id: "tech-terminal",
                    name: "Linux & Server",
                    role: "System Administration",
                    icon: <Terminal className="w-4 h-4 text-emerald-400" />,
                    borderHover: "hover:border-emerald-400 hover:shadow-emerald-400/50",
                    delay: "-7.33s",
                  },
                  {
                    id: "tech-cpu",
                    name: "Hardware & IoT",
                    role: "Core Architecture",
                    icon: <Cpu className="w-4 h-4 text-amber-400" />,
                    borderHover: "hover:border-amber-400 hover:shadow-amber-400/50",
                    delay: "-11.0s",
                  },
                  {
                    id: "tech-database",
                    name: "Database Systems",
                    role: "PostgreSQL & Supabase",
                    icon: <Database className="w-4 h-4 text-sky-400" />,
                    borderHover: "hover:border-sky-400 hover:shadow-sky-400/50",
                    delay: "-14.66s",
                  },
                  {
                    id: "tech-security",
                    name: "Network Security",
                    role: "Firewall & QoS Bandwidth",
                    icon: <ShieldCheck className="w-4 h-4 text-rose-400" />,
                    borderHover: "hover:border-rose-400 hover:shadow-rose-400/50",
                    delay: "-18.33s",
                  },
                ].map((tech) => (
                  <div
                    key={tech.id}
                    style={{
                      animationDelay: tech.delay,
                    }}
                    className="absolute animate-saturn-orbit saturn-node pointer-events-auto cursor-pointer"
                  >
                    {/* Micro Glassmorphic Sphere Node */}
                    <div
                      className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/90 dark:bg-black/85 backdrop-blur-md border border-white/25 ${tech.borderHover} shadow-xl shadow-black/50 flex items-center justify-center transition-all duration-300 hover:scale-135`}
                    >
                      {tech.icon}
                      <span className="absolute inset-0 rounded-full bg-white/5 hover:bg-white/15 animate-pulse pointer-events-none" />
                    </div>

                    {/* Floating Tooltip upon hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 pointer-events-none hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                      <div className="px-2.5 py-1 rounded-lg bg-slate-900/95 dark:bg-black/95 backdrop-blur-md border border-white/20 shadow-2xl text-center font-mono">
                        <p className="text-[11px] font-bold text-white leading-tight">
                          {tech.name}
                        </p>
                        <p className="text-[9px] text-slate-400">
                          {tech.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 6C. 3D Saturn Ring Arc: FRONT HALF (Crosses in front of Character PNG, z-index: 18) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[18]">
                <div
                  className="w-[340px] h-[150px] sm:w-[440px] sm:h-[190px] lg:w-[490px] lg:h-[210px] rounded-[100%] border-2 border-dashed border-orange-400/40 dark:border-orange-400/45 shadow-[0_0_20px_rgba(249,115,22,0.35)] transform -rotate-[22deg]"
                  style={{
                    clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
                  }}
                />
              </div>

              {/* 7. Character Persona: Placed at z-index 10 (Between Back & Front Ring Arcs) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [-8, 8, -8],
                }}
                transition={{
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative z-10 flex items-end justify-center group cursor-pointer"
              >
                <img
                  src="/assets/profile/download.png"
                  alt="Muhammad Anka Reza - Persona"
                  className="h-[360px] sm:h-[440px] md:h-[490px] lg:h-[540px] w-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] drop-shadow-[0_0_25px_rgba(249,115,22,0.25)] group-hover:drop-shadow-[0_0_40px_rgba(56,189,248,0.45)] group-hover:scale-[1.02] transition-all duration-500"
                />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
