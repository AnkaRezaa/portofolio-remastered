import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveProfileCard } from "./InteractiveProfileCard";
import {
  Sparkles,
  Terminal,
  Shield,
  Eye,
  Laptop,
  Compass,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"philosophy" | "story" | "workspace">("philosophy");
  const [activeChapter, setActiveChapter] = useState(0);

  const philosophies = [
    {
      num: "01",
      title: "Systems First Architecture",
      icon: <Terminal className="w-5 h-5 text-orange-500" />,
      tag: "INFRASTRUCTURE",
      detail:
        "Sebagus apa pun antarmuka web, kehandalannya bergantung pada kestabilan jaringan di bawahnya. Pemahaman mendalam mengenai routing, switching, dan latensi membuat arsitektur aplikasi lebih tahan terhadap gangguan nyata.",
      quote: "Tanpa konektivitas yang reliabel, aplikasi terbaik di dunia tidak ada artinya.",
    },
    {
      num: "02",
      title: "Pixel & Interaction Precision",
      icon: <Eye className="w-5 h-5 text-amber-500" />,
      tag: "USER INTERFACE",
      detail:
        "Desain bukan sekadar polesan visual, melainkan bagaimana komponen merespons sentuhan pengguna. Setiap mikro-animasi, margin, dan auto-layout dihitung untuk memberikan kejelasan hierarki informasi.",
      quote: "Pengguna tidak hanya melihat antarmuka; mereka merasakan responsivitasnya.",
    },
    {
      num: "03",
      title: "Scalable & Resilient Engineering",
      icon: <Shield className="w-5 h-5 text-rose-500" />,
      tag: "ENGINEERING",
      detail:
        "Menulis kode dengan tipe ketat (TypeScript), komponen modular, dan pemisahan concerns memastikan sistem dapat dipelihara dan diperluas dengan percaya diri saat proyek bertumbuh besar.",
      quote: "Kode yang baik adalah kode yang dapat dipahami dan diuji oleh tim mana pun.",
    },
  ];

  const chapters = [
    {
      title: "Bab 1: Eksplorasi Perangkat Keras & Jaringan",
      year: "2020 - 2022",
      badge: "ROOTS",
      content:
        "Ketertarikan saya berawal dari rasa ingin tahu bagaimana perangkat keras komputer bekerja bersama dan saling bertukar paket data. Dari merakit PC mandiri, mengonfigurasi firmware BIOS/UEFI, hingga crimping kabel UTP dan menyimulasikan topologi jaringan pertama di Cisco Packet Tracer.",
    },
    {
      title: "Bab 2: Memasuki Dunia Rekayasa Web & UI Modern",
      year: "2022 - 2024",
      badge: "EXPANSION",
      content:
        "Melihat kebutuhan sistem yang dapat diakses pengguna melalui browser, saya memperluas keahlian ke rekayasa perangkat lunak modern. Mempelajari JavaScript, React.js, Tailwind CSS, serta perancangan desain sistem berbasis Figma untuk menciptakan web responsif yang elegan.",
    },
    {
      title: "Bab 3: Konvergensi di D4 Teknologi Informasi Polinema",
      year: "2024 - Sekarang",
      badge: "MASTERY",
      content:
        "Di Politeknik Negeri Malang, dua dunia ini bersatu secara utuh. Saya merancang aplikasi full-stack yang tidak hanya cantik di layar, tetapi juga dioptimasi di sisi arsitektur jaringan, database relasional MySQL, dan manajemen server.",
    },
  ];

  const workspaceItems = [
    {
      category: "Operating Environment",
      items: ["Windows 11 Pro (Custom Workstation)", "Ubuntu Linux Server", "PowerShell & WSL2"],
    },
    {
      category: "Code & Runtimes",
      items: ["VS Code (Tailwind & TS Setup)", "React 18 & TypeScript", "Node.js & Vite", "Git & GitHub"],
    },
    {
      category: "Networks & Infrastructure",
      items: ["Cisco Packet Tracer (L2/L3)", "MikroTik Winbox & RouterOS", "Wireshark Packet Analyzer"],
    },
    {
      category: "Design & Prototyping",
      items: ["Figma (Design Tokens & AutoLayout)", "FigJam Flowcharts", "Canvas Micro-Interactions"],
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider">
                // ABOUT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">ANKA REZA</span>
            </h2>
          </div>

          {/* Interactive Lens Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab("philosophy")}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                activeTab === "philosophy"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20"
                  : "bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5"
              }`}
            >
              Filosofi
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                activeTab === "story"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20"
                  : "bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5"
              }`}
            >
              Perjalanan
            </button>
            <button
              onClick={() => setActiveTab("workspace")}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                activeTab === "workspace"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20"
                  : "bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5"
              }`}
            >
              Workspace
            </button>
          </div>
        </div>

        {/* Main Grid: Interactive Profile Card (Left) & Lens Display (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Interactive Profile & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <InteractiveProfileCard />
          </div>

          {/* Right: Dynamic Interactive Lens Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              
              {/* LENS 1: PHILOSOPHY */}
              {activeTab === "philosophy" && (
                <motion.div
                  key="philosophy"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-slate-500">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>3 Prinsip Utama Arsitektur</span>
                  </div>

                  {philosophies.map((item) => (
                    <div
                      key={item.num}
                      className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                            PILLAR {item.num}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                            {item.tag}
                          </span>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-dark-surface flex items-center justify-center">
                          {item.icon}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                        {item.detail}
                      </p>

                      <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-dark-surface/60 border-l-2 border-orange-500 text-xs font-mono text-slate-600 dark:text-slate-300 italic">
                        "{item.quote}"
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* LENS 2: JOURNEY CHRONICLES */}
              {activeTab === "story" && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-orange-500" />
                      <span className="font-mono text-xs font-bold text-orange-500 uppercase tracking-wider">
                        Kronologi Perjalanan
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      {chapters.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveChapter(idx)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold transition-all ${
                            activeChapter === idx
                              ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                              : "bg-slate-100 dark:bg-dark-surface text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Chapter Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-bold">
                        {chapters[activeChapter].badge}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{chapters[activeChapter].year}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {chapters[activeChapter].title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {chapters[activeChapter].content}
                    </p>
                  </div>

                  {/* Navigation Footer */}
                  <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <button
                      disabled={activeChapter === 0}
                      onClick={() => setActiveChapter((prev) => Math.max(0, prev - 1))}
                      className="font-mono text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                    >
                      &lt; Bab Sebelumnya
                    </button>

                    <button
                      disabled={activeChapter === chapters.length - 1}
                      onClick={() => setActiveChapter((prev) => Math.min(chapters.length - 1, prev + 1))}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 disabled:opacity-30 transition-colors"
                    >
                      <span>Bab Selanjutnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* LENS 3: WORKSPACE & RIG SPECIFICATIONS */}
              {activeTab === "workspace" && (
                <motion.div
                  key="workspace"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-slate-500">
                    <Laptop className="w-3.5 h-3.5 text-orange-500" />
                    <span>Workstation & Perangkat Kerja</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {workspaceItems.map((ws) => (
                      <div
                        key={ws.category}
                        className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Compass className="w-4 h-4 text-orange-500" />
                            <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase">
                              {ws.category}
                            </h4>
                          </div>

                          <div className="space-y-2">
                            {ws.items.map((item) => (
                              <div
                                key={item}
                                className="p-2 rounded-xl bg-slate-100/60 dark:bg-dark-surface/60 border border-slate-200/50 dark:border-white/5 font-mono text-xs text-slate-700 dark:text-slate-300"
                              >
                                &bull; {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
