import React, { useState } from "react";
import {
  Network,
  Code2,
  Palette,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Laptop,
  Server,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface TechArsenalItem {
  id: string;
  name: string;
  category: "all" | "network" | "web" | "uiux" | "hardware";
  categoryName: string;
  level: string;
  percentage: number;
  logoUrl?: string;
  fallbackIcon: React.ReactNode;
  summary: string;
  useCase: string;
  tags: string[];
  externalDocUrl?: string;
}

export const QuickHighlights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "network" | "web" | "uiux" | "hardware"
  >("all");

  const techStack: TechArsenalItem[] = [
    // 1. NETWORK & INFRASTRUCTURE
    {
      id: "cisco",
      name: "Cisco Packet Tracer",
      category: "network",
      categoryName: "Infrastructure & Network",
      level: "Enterprise Topology & Switching",
      percentage: 95,
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cisco/cisco-original.svg",
      fallbackIcon: <Network className="w-5 h-5 text-orange-500" />,
      summary:
        "Perancangan arsitektur jaringan kampus multi-gedung, routing dinamis OSPF, dan konfigurasi switching L2/L3.",
      useCase: "Topologi Jaringan Enterprise Lab & Kampus Polinema",
      tags: ["OSPF Routing", "VLAN Trunking", "HSRP", "L2/L3 Switching"],
      externalDocUrl: "https://www.cisco.com/",
    },
    {
      id: "mikrotik",
      name: "MikroTik RouterOS",
      category: "network",
      categoryName: "Infrastructure & Network",
      level: "Gateway, Firewall & QoS",
      percentage: 92,
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      fallbackIcon: <Server className="w-5 h-5 text-amber-500" />,
      summary:
        "Manajemen bandwidth antrian (Queue), captive portal hotspot berkecepatan tinggi, dan firewall NAT dual-ISP failover.",
      useCase: "Gateway Akses Internet & Manajemen QoS Warnet/Kampus",
      tags: ["Queue Tree", "Firewall NAT", "Hotspot", "Dual-ISP Failover"],
      externalDocUrl: "https://mikrotik.com/",
    },
    {
      id: "vlan-routing",
      name: "VLAN & Subnetting VLSM",
      category: "network",
      categoryName: "Infrastructure & Network",
      level: "IEEE 802.1Q & IP Calculation",
      percentage: 94,
      fallbackIcon: <Network className="w-5 h-5 text-orange-500" />,
      summary:
        "Segmentasi lalu lintas broadcast departemen, efisiensi alokasi IP berbasis VLSM, dan keamanan lalu lintas lokal.",
      useCase: "Isolasi Departemen & Keamanan Jaringan Laboratorium",
      tags: ["IEEE 802.1Q", "VLSM Subnetting", "Access & Trunk", "Broadcast Isolation"],
    },

    // 2. WEB & SOFTWARE ENGINEERING
    {
      id: "react",
      name: "React.js",
      category: "web",
      categoryName: "Web & Software",
      level: "Component Systems & Modern SPA",
      percentage: 94,
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      fallbackIcon: <Code2 className="w-5 h-5 text-sky-400" />,
      summary:
        "Pengembangan Single Page Application interaktif dengan arsitektur komponen modular, custom hooks, dan fluid state flow.",
      useCase: "Web Portal ALAB, myGARDEN App, & Admin Console",
      tags: ["Custom Hooks", "Context API", "Virtual DOM", "SPA Architecture"],
      externalDocUrl: "https://react.dev/",
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "web",
      categoryName: "Web & Software",
      level: "Strict Type Safety",
      percentage: 90,
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      fallbackIcon: <Code2 className="w-5 h-5 text-blue-500" />,
      summary:
        "Menjamin kehandalan kode jangka panjang, mencegah runtime bug, dan menyusun kontrak data interface yang kokoh.",
      useCase: "Portofolio Remake & Full-Stack Core Runtimes",
      tags: ["Strict Typing", "Generics", "Interface Contracts", "Clean Code"],
      externalDocUrl: "https://www.typescriptlang.org/",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "web",
      categoryName: "Web & Software",
      level: "Design Token Architecture",
      percentage: 96,
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      fallbackIcon: <Palette className="w-5 h-5 text-cyan-400" />,
      summary:
        "Implementasi antarmuka ultra responsif, sistem token warna cyber-sunset kustom, dan dark mode instan tanpa CSS bloated.",
      useCase: "Sistem Desain Portofolio & Antarmuka Aplikasi Web",
      tags: ["Utility-First", "Dark Theme", "Responsive", "Glassmorphism"],
      externalDocUrl: "https://tailwindcss.com/",
    },
    {
      id: "nodejs",
      name: "Node.js & Express",
      category: "web",
      categoryName: "Web & Software",
      level: "RESTful API & Middleware",
      percentage: 88,
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      fallbackIcon: <Server className="w-5 h-5 text-emerald-500" />,
      summary:
        "Pembangunan layanan backend asynchronous, otentikasi JWT, sanitasi payload, dan integrasi database performa tinggi.",
      useCase: "Backend Layanan Reservasi Hotelier & Sistem Inventaris",
      tags: ["RESTful API", "Express.js", "JWT Auth", "Async I/O"],
      externalDocUrl: "https://nodejs.org/",
    },
    {
      id: "supabase",
      name: "Supabase & PostgreSQL",
      category: "web",
      categoryName: "Web & Software",
      level: "Cloud Database & Realtime Sync",
      percentage: 90,
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      fallbackIcon: <Database className="w-5 h-5 text-emerald-400" />,
      summary:
        "Arsitektur database relasional di cloud, keamanan Row Level Security (RLS), dan sinkronisasi data live untuk CMS portofolio.",
      useCase: "Live Database Portofolio & Cloud Admin Console",
      tags: ["PostgreSQL", "RLS Security", "Realtime CRUD", "Cloud BaaS"],
      externalDocUrl: "https://supabase.com/",
    },

    // 3. UI/UX & PRODUCT DESIGN
    {
      id: "figma",
      name: "Figma Architecture",
      category: "uiux",
      categoryName: "UI/UX & Product Design",
      level: "Design Systems & Tokens",
      percentage: 95,
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      fallbackIcon: <Palette className="w-5 h-5 text-purple-400" />,
      summary:
        "Penyusunan komponen atomik, variant interaktif, auto-layout responsif, dan panduan handoff siap implementasi developer.",
      useCase: "High-Fidelity Mockup Redesign Maxim & myGARDEN App",
      tags: ["Auto-Layout", "Design Tokens", "Component Variants", "Design Systems"],
      externalDocUrl: "https://www.figma.com/",
    },
    {
      id: "prototyping",
      name: "Interactive Prototyping",
      category: "uiux",
      categoryName: "UI/UX & Product Design",
      level: "Micro-Transitions & User Testing",
      percentage: 90,
      fallbackIcon: <Sparkles className="w-5 h-5 text-rose-500" />,
      summary:
        "Simulasi transisi antar layar (Smart Animate) untuk memvalidasi kenyamanan interaksi pengguna sebelum masuk ke tahap coding.",
      useCase: "Validasi Alur Pemesanan Hotelier & Sistem Perpustakaan",
      tags: ["Smart Animate", "User Testing", "Micro-Interactions", "User Flow"],
    },
    {
      id: "wireframing",
      name: "Wireframing & IA",
      category: "uiux",
      categoryName: "UI/UX & Product Design",
      level: "Information Architecture",
      percentage: 92,
      fallbackIcon: <Layers className="w-5 h-5 text-orange-400" />,
      summary:
        "Penataan tata letak bertahap (progressive disclosure) untuk mengurangi beban kognitif pengguna dan mempercepat penyelesaian tugas.",
      useCase: "Alur Pembelian myGARDEN E-Commerce Flora",
      tags: ["User Journey", "Low-Fidelity", "Cognitive Flow", "Hierarchy"],
    },

    // 4. HARDWARE & SYSTEMS
    {
      id: "pc-assembly",
      name: "Workstation & PC Rig Assembly",
      category: "hardware",
      categoryName: "Hardware & Systems",
      level: "Hardware Engineering",
      percentage: 95,
      fallbackIcon: <Cpu className="w-5 h-5 text-amber-500" />,
      summary:
        "Perakitan komputer workstation komputasi tinggi, penataan alur pendinginan (airflow) optimal, dan manajemen kabel profesional.",
      useCase: "Perakitan Rig Komputer Laboratorium & PC Pribadi",
      tags: ["Airflow Optimization", "Cable Routing", "POST Check", "Hardware Setup"],
    },
    {
      id: "uefi-bios",
      name: "BIOS / UEFI & Dual-Boot OS",
      category: "hardware",
      categoryName: "Hardware & Systems",
      level: "Firmware Profiling & OS Deploy",
      percentage: 92,
      fallbackIcon: <Laptop className="w-5 h-5 text-orange-500" />,
      summary:
        "Konfigurasi profil XMP/DOCP memori, proteksi Secure Boot, partisi GPT/UEFI, dan deployment dual-boot Windows & Linux Ubuntu.",
      useCase: "Deployment Workstation Dual-Boot Windows 11 & Linux",
      tags: ["XMP Profiling", "Secure Boot", "NVMe PCIe Gen4", "Dual-Boot Linux"],
    },
    {
      id: "diagnostics",
      name: "Hardware Diagnostics & Repair",
      category: "hardware",
      categoryName: "Hardware & Systems",
      level: "Stress Testing & Benchmarking",
      percentage: 93,
      fallbackIcon: <Zap className="w-5 h-5 text-rose-500" />,
      summary:
        "Diagnostik kegagalan komponen (RAM faulty, thermal throttling, kestabilan voltase PSU) menggunakan stress test terstandar.",
      useCase: "Troubleshooting & Reparasi Perangkat Keras Laboratorium",
      tags: ["Prime95", "FurMark", "MemTest86", "Thermal Analysis"],
    },
  ];

  const filterCategories = [
    { id: "all", label: "Semua Instrumen", count: techStack.length },
    {
      id: "network",
      label: "Infrastruktur & Jaringan",
      count: techStack.filter((t) => t.category === "network").length,
    },
    {
      id: "web",
      label: "Web & Software",
      count: techStack.filter((t) => t.category === "web").length,
    },
    {
      id: "uiux",
      label: "UI/UX & Desain",
      count: techStack.filter((t) => t.category === "uiux").length,
    },
    {
      id: "hardware",
      label: "Hardware & Sistem",
      count: techStack.filter((t) => t.category === "hardware").length,
    },
  ];

  const displayedItems =
    activeCategory === "all"
      ? techStack
      : techStack.filter((item) => item.category === activeCategory);

  return (
    <section
      id="weapons"
      className="py-24 relative z-10 border-t border-b border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-dark-surface/30 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Clean, Authoritative & Recruiter-Friendly */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider uppercase">
                // TECHNICAL ARSENAL & PROFICIENCY MATRIX
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              WEAPONS OF{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
                CHOICE
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-sans">
            Katalog teknologi, arsitektur jaringan, dan instrumen rekayasa digital yang saya kuasai dan implementasikan langsung pada proyek dunia nyata.
          </p>
        </div>

        {/* Executive Summary Metrics Strip (Recruiter Quick Stats) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-dark-card/60 border border-slate-200/90 dark:border-white/10 backdrop-blur-sm shadow-sm">
            <div className="font-mono text-2xl sm:text-3xl font-black text-orange-500">
              4+
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
              Bidang Rekayasa
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Network, Web, UI/UX, HW
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-dark-card/60 border border-slate-200/90 dark:border-white/10 backdrop-blur-sm shadow-sm">
            <div className="font-mono text-2xl sm:text-3xl font-black text-amber-500">
              {techStack.length}+
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
              Tools & Teknologi
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Standar Industri Aktif
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-dark-card/60 border border-slate-200/90 dark:border-white/10 backdrop-blur-sm shadow-sm">
            <div className="font-mono text-2xl sm:text-3xl font-black text-emerald-500">
              100%
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
              Hands-On Projects
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Implementasi Riil Teruji
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-dark-card/60 border border-slate-200/90 dark:border-white/10 backdrop-blur-sm shadow-sm">
            <div className="font-mono text-2xl sm:text-3xl font-black text-rose-500">
              BNSP
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
              Tersertifikasi Resmi
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Interconnection & Cloud
            </div>
          </div>
        </div>

        {/* Clean, Elegant Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-slate-200/90 dark:border-white/10">
          {filterCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all relative flex items-center gap-2 ${
                  isActive
                    ? "text-white shadow-md shadow-orange-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-dark-card/60 border border-slate-200/80 dark:border-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeArsenalTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clean, Modern Bento Grid: High Readability & No Distraction */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {displayedItems.map((tech) => (
              <motion.div
                layout
                key={tech.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-dark-card/75 border border-slate-200/90 dark:border-white/10 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Official Icon & Category Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-dark-surface/90 border border-slate-200/80 dark:border-white/10 flex items-center justify-center p-2 group-hover:border-orange-500/40 transition-colors shrink-0">
                      {tech.logoUrl ? (
                        <img
                          src={tech.logoUrl}
                          alt={`${tech.name} logo`}
                          className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            // Gracefully fallback to SVG icon if image fails
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        tech.fallbackIcon
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400">
                        {tech.categoryName.split("&")[0].trim()}
                      </span>
                      <span className="font-mono text-xs font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                        {tech.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Title & Technical Role */}
                  <div className="mb-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center gap-1.5">
                        <span>{tech.name}</span>
                        {tech.externalDocUrl && (
                          <a
                            href={tech.externalDocUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-orange-500 transition-colors opacity-0 group-hover:opacity-100"
                            title={`Dokumentasi resmi ${tech.name}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </h3>
                    </div>
                    <p className="font-mono text-xs text-orange-500 font-semibold mt-0.5">
                      {tech.level}
                    </p>
                  </div>

                  {/* Concise, Clear Technical Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                    {tech.summary}
                  </p>
                </div>

                {/* Card Footer: Real-world Implementation & Tags */}
                <div className="pt-3.5 border-t border-slate-100 dark:border-white/5 space-y-3">
                  {/* Verified Project Implementations */}
                  <div className="flex items-start gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white font-bold">Teruji di:</strong> {tech.useCase}
                    </span>
                  </div>

                  {/* Clean Technical Tag Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {tech.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-surface/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Assurance Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-dark-card/60 border border-slate-200/80 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Seluruh keahlian di atas didukung oleh dokumentasi proyek nyata & sertifikasi terverifikasi.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
