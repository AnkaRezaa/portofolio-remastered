import React, { useState } from "react";
import {
  Network,
  Code2,
  Palette,
  Cpu,
  Database,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Server,
  Binary,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ConsolidatedArsenalItem {
  id: string;
  name: string;
  domain: "fullstack" | "mobile" | "network" | "core";
  domainLabel: string;
  level: string;
  proficiency: number;
  mainLogo?: string;
  secondaryLogos?: string[];
  fallbackIcon: React.ReactNode;
  summary: string;
  useCase: string;
  ecosystemTags: string[];
  docUrl?: string;
}

const TechLogoBadge: React.FC<{
  src?: string;
  alt: string;
  fallback: React.ReactNode;
}> = ({ src, alt, fallback }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <div className="flex items-center justify-center w-full h-full">{fallback}</div>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

const SecondaryLogoBadge: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);
  if (hasError) return null;

  return (
    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 p-1 flex items-center justify-center shrink-0 shadow-sm">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export const QuickHighlights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "fullstack" | "mobile" | "network" | "core"
  >("all");

  const consolidatedArsenal: ConsolidatedArsenalItem[] = [
    // 1. FULL-STACK & WEB
    {
      id: "laravel-fullstack",
      name: "Laravel & PHP Full-Stack",
      domain: "fullstack",
      domainLabel: "Full-Stack Engineering",
      level: "MVC Architecture & RESTful APIs",
      proficiency: 93,
      mainLogo: "/assets/tech/laravel.svg",
      secondaryLogos: [
        "/assets/tech/php.svg",
        "/assets/tech/mysql.svg",
      ],
      fallbackIcon: <Server className="w-5 h-5 text-red-500" />,
      summary:
        "Pengembangan web modular berbasis MVC, Eloquent ORM, migrasi database, autentikasi sesi, middleware, dan perancangan REST API siap pakai.",
      useCase: "Sistem Manajemen Peminjaman Alat Lab (ALAB) & Backend Hotelier",
      ecosystemTags: ["Laravel 10/11", "PHP", "Eloquent ORM", "Blade", "REST APIs", "MVC"],
      docUrl: "https://laravel.com/",
    },
    {
      id: "react-typescript-tailwind",
      name: "React, TypeScript & Tailwind",
      domain: "fullstack",
      domainLabel: "Frontend Architecture",
      level: "Modern SPA & Component Systems",
      proficiency: 95,
      mainLogo: "/assets/tech/react.svg",
      secondaryLogos: [
        "/assets/tech/typescript.svg",
        "/assets/tech/tailwind.svg",
      ],
      fallbackIcon: <Code2 className="w-5 h-5 text-sky-400" />,
      summary:
        "Pembangunan antarmuka Single Page Application interaktif, type-safe data flow, custom hooks, dan arsitektur token desain dark-mode kustom.",
      useCase: "Web Portofolio Remake, myGARDEN Web, & Admin Console",
      ecosystemTags: ["React.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
      docUrl: "https://react.dev/",
    },
    {
      id: "databases-sql-cloud",
      name: "MySQL, PostgreSQL & Supabase",
      domain: "fullstack",
      domainLabel: "Database & Cloud BaaS",
      level: "Relational Schema & Cloud Sync",
      proficiency: 91,
      mainLogo: "/assets/tech/mysql.svg",
      secondaryLogos: [
        "/assets/tech/supabase.svg",
        "/assets/tech/postgresql.svg",
      ],
      fallbackIcon: <Database className="w-5 h-5 text-blue-500" />,
      summary:
        "Normalisasi skema relasional, optimasi query, integritas foreign key, migrasi cloud database, serta penerapan Row Level Security (RLS).",
      useCase: "Live Database Portofolio Cloud, Reservasi Hotelier, & ALAB Database",
      ecosystemTags: ["MySQL", "PostgreSQL", "Supabase BaaS", "Row Level Security", "Cloud SQL"],
      docUrl: "https://supabase.com/",
    },

    // 2. MOBILE APPLICATION
    {
      id: "flutter-dart",
      name: "Flutter & Dart Mobile",
      domain: "mobile",
      domainLabel: "Cross-Platform Mobile",
      level: "Clean Architecture & State Management",
      proficiency: 90,
      mainLogo: "/assets/tech/flutter.svg",
      secondaryLogos: [
        "/assets/tech/dart.svg",
      ],
      fallbackIcon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      summary:
        "Pembuatan aplikasi mobile Android & iOS berperforma tinggi dengan prinsip Clean Architecture, pemisahan domain layer, dan penanganan notifikasi kampus.",
      useCase: "Campus Notify Mobile App & Proyek Mobile Course Polinema",
      ecosystemTags: ["Flutter SDK", "Dart", "Clean Architecture", "BLoC/Provider", "Android & iOS"],
      docUrl: "https://flutter.dev/",
    },

    // 3. NETWORKING & INFRASTRUCTURE
    {
      id: "cisco-gns3-simulation",
      name: "Cisco Packet Tracer & GNS3",
      domain: "network",
      domainLabel: "Enterprise Network Simulation",
      level: "Topologi L2/L3 & Emulasi Real-Device",
      proficiency: 95,
      mainLogo: "/assets/tech/cisco.svg",
      secondaryLogos: [
        "/assets/tech/gns3.svg",
      ],
      fallbackIcon: <Network className="w-5 h-5 text-orange-500" />,
      summary:
        "Simulasi dan emulasi jaringan enterprise skala besar menggunakan Packet Tracer dan GNS3. Konfigurasi routing OSPF multi-area, inter-VLAN trunking, dan redundansi link.",
      useCase: "Desain Jaringan Multi-Gedung Kampus & Pengujian Protokol Enterprise",
      ecosystemTags: ["Cisco IOS", "GNS3", "Packet Tracer", "OSPF Multi-Area", "VLAN 802.1Q"],
      docUrl: "https://www.gns3.com/",
    },
    {
      id: "mikrotik-network-routing",
      name: "MikroTik RouterOS & Networking",
      domain: "network",
      domainLabel: "Network Infrastructure",
      level: "Bandwidth QoS, Hotspot & Firewall",
      proficiency: 93,
      mainLogo: "/assets/tech/mikrotik.svg",
      fallbackIcon: <Server className="w-5 h-5 text-amber-500" />,
      summary:
        "Pengaturan gateway internet, manajemen antrian bandwidth (Queue Simple/Tree), firewall filter & NAT, captive portal hotspot, serta failover dual-ISP.",
      useCase: "Konfigurasi Gateway Internet, QoS Bandwidth, & Sertifikasi BNSP Jaringan",
      ecosystemTags: ["RouterOS", "Queue QoS", "Firewall NAT", "Hotspot Server", "Dual-ISP Failover"],
      docUrl: "https://mikrotik.com/",
    },

    // 4. CORE SYSTEMS & DESIGN
    {
      id: "java-cpp-core",
      name: "Java, C++ & Core Algorithms",
      domain: "core",
      domainLabel: "Systems & OOP Fundamentals",
      level: "Object-Oriented & Algorithmic Problem Solving",
      proficiency: 89,
      mainLogo: "/assets/tech/java.svg",
      secondaryLogos: [
        "/assets/tech/cpp.svg",
      ],
      fallbackIcon: <Binary className="w-5 h-5 text-orange-500" />,
      summary:
        "Fondasi kuat dalam paradigma Object-Oriented Programming (OOP), struktur data, algoritma komputasi, dan pemrograman sistem tingkat menengah ke rendah.",
      useCase: "Implementasi Struktur Data, Algoritma Pemrograman, & Core Runtimes",
      ecosystemTags: ["Java OOP", "C++", "Data Structures", "Algorithms", "Memory Mgmt"],
      docUrl: "https://dev.java/",
    },
    {
      id: "figma-product-design",
      name: "Figma UI/UX & Design Systems",
      domain: "core",
      domainLabel: "Interface & Product Design",
      level: "Auto-Layout, Tokens & Prototyping",
      proficiency: 94,
      mainLogo: "/assets/tech/figma.svg",
      fallbackIcon: <Palette className="w-5 h-5 text-purple-400" />,
      summary:
        "Perancangan antarmuka digital dari wireframe ke high-fidelity mockup dengan Auto-Layout terstandar, token warna terstruktur, dan prototipe interaktif.",
      useCase: "Redesign Aplikasi Maxim, myGARDEN UI/UX, & Design System Terpadu",
      ecosystemTags: ["Figma", "Auto-Layout", "Design Tokens", "Wireframing", "Smart Animate"],
      docUrl: "https://www.figma.com/",
    },
    {
      id: "hardware-systems-diagnostics",
      name: "Hardware Engineering & Diagnostics",
      domain: "core",
      domainLabel: "Hardware & Systems",
      level: "Workstation Rig & UEFI/BIOS",
      proficiency: 93,
      fallbackIcon: <Cpu className="w-6 h-6 text-amber-500" />,
      summary:
        "Perakitan rig workstation berperforma tinggi, optimasi pendinginan & kabel, konfigurasi firmware UEFI/BIOS (XMP, Secure Boot), dan stress test diagnostik.",
      useCase: "Perakitan Rig Workstation Lab & Troubleshooting Perangkat Keras",
      ecosystemTags: ["PC Assembly", "UEFI/BIOS", "Dual-Boot Linux/Win", "Stress Testing"],
    },
  ];

  const filterTabs = [
    { id: "all", label: "Semua Stack", count: consolidatedArsenal.length },
    {
      id: "fullstack",
      label: "Full-Stack Web",
      count: consolidatedArsenal.filter((t) => t.domain === "fullstack").length,
    },
    {
      id: "mobile",
      label: "Mobile App",
      count: consolidatedArsenal.filter((t) => t.domain === "mobile").length,
    },
    {
      id: "network",
      label: "Jaringan & GNS3",
      count: consolidatedArsenal.filter((t) => t.domain === "network").length,
    },
    {
      id: "core",
      label: "Core OOP & Hardware",
      count: consolidatedArsenal.filter((t) => t.domain === "core").length,
    },
  ];

  const displayedItems =
    activeTab === "all"
      ? consolidatedArsenal
      : consolidatedArsenal.filter((item) => item.domain === activeTab);

  return (
    <section
      id="weapons"
      className="py-24 relative z-10 border-t border-b border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-dark-surface/30 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Clean, Authoritative & Recruiter-Focused */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider uppercase">
                // TECHNICAL ARSENAL & CONSOLIDATED STACK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
              WEAPONS OF{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
                CHOICE
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md sm:text-right leading-relaxed font-sans">
              Ekosistem teknologi terintegrasi yang saya kuasai dan terapkan dalam pengembangan Full-Stack, Mobile App, Jaringan Enterprise, dan Rekayasa Sistem.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 dark:text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>9 EKOSISTEM UTAMA • PRODUCTION-TESTED</span>
            </div>
          </div>
        </div>

        {/* Clean, Non-Distracting Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-slate-200/90 dark:border-white/10">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all relative flex items-center gap-2 ${
                  isActive
                    ? "text-white shadow-md shadow-orange-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-dark-card/60 border border-slate-200/80 dark:border-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeArsenalTabGroup"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Consolidated Power-Stack Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative p-6 rounded-2xl bg-white dark:bg-dark-card/80 border border-slate-200/90 dark:border-white/10 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Main Ecosystem Logo + Secondary Badges */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      {/* Main Logo Container */}
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-dark-surface/90 border border-slate-200/80 dark:border-white/10 flex items-center justify-center p-2 group-hover:border-orange-500/40 transition-colors shrink-0">
                        <TechLogoBadge
                          src={item.mainLogo}
                          alt={`${item.name} logo`}
                          fallback={item.fallbackIcon}
                        />
                      </div>

                      {/* Secondary Ecosystem Partner Badges */}
                      {item.secondaryLogos && item.secondaryLogos.length > 0 && (
                        <div className="flex items-center -space-x-1.5">
                          {item.secondaryLogos.map((sLogo, idx) => (
                            <SecondaryLogoBadge
                              key={idx}
                              src={sLogo}
                              alt={`${item.name} ecosystem badge ${idx + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Domain & Proficiency Badge */}
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                        {item.proficiency}%
                      </span>
                    </div>
                  </div>

                  {/* Title & Domain Role */}
                  <div className="mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.docUrl && (
                        <a
                          href={item.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-orange-500 transition-colors opacity-0 group-hover:opacity-100"
                          title={`Kunjungi dokumentasi ${item.name}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h3>
                    <p className="font-mono text-xs text-orange-500 font-semibold mt-0.5">
                      {item.level}
                    </p>
                  </div>

                  {/* Clear, Professional Technical Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                    {item.summary}
                  </p>
                </div>

                {/* Card Footer: Real-world Implementation & Tech Pills */}
                <div className="pt-3.5 border-t border-slate-100 dark:border-white/5 space-y-3">
                  {/* Verified Project Implementation */}
                  <div className="flex items-start gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white font-bold">Teruji di:</strong> {item.useCase}
                    </span>
                  </div>

                  {/* Clean Technical Tag Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.ecosystemTags.map((tag) => (
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
            <span>Seluruh stack teknologi didukung oleh repositori kode, simulasi aktif, dan sertifikasi BNSP resmi.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
