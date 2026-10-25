import React, { useState, useEffect } from "react";
import {
  Boxes,
  Layers3,
  Waypoints,
  SlidersHorizontal,
  Shapes,
  TableProperties,
  CircuitBoard,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  ShieldCheck,
  Send,
  X,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ServiceDossier {
  id: string;
  code: string;
  title: string;
  category: string;
  tagline: string;
  icon: React.ReactNode;
  accentGradient: string;
  accentBorder: string;
  description: string;
  deliverables: string[];
  workflow: { phase: string; title: string; desc: string }[];
  techLogos: { name: string; path: string }[];
  scope: string;
}

export const Services: React.FC = () => {
  const dossiers: ServiceDossier[] = [
    {
      id: "fullstack",
      code: "01",
      title: "Full-Stack Web Engineering",
      category: "Web & Software",
      tagline: "Arsitektur Modern SPA, Robust REST APIs & Relational Database",
      icon: <Boxes className="w-5 h-5 text-orange-500" strokeWidth={1.75} />,
      accentGradient: "from-orange-500/20 via-amber-500/10 to-transparent",
      accentBorder: "border-orange-500/40",
      scope: "End-to-End Web App Delivery",
      description:
        "Pembangunan sistem aplikasi web menyeluruh dari antarmuka frontend reaktif hingga arsitektur backend andal. Menggabungkan arsitektur MVC Laravel dan ekosistem modern React/TypeScript untuk menghasilkan platform berkinerja tinggi, aman, dan siap pakai.",
      deliverables: [
        "Single Page Application (SPA) responsif & type-safe dengan React + TypeScript",
        "Backend RESTful API modular berbasis Laravel / Node.js dengan autentikasi aman",
        "Integrasi database relasional terstandarisasi (MySQL / PostgreSQL / Supabase)",
        "Sistem token desain dark mode terpadu dengan Tailwind CSS",
        "Penanganan keamanan data, sanitasi request, & rate-limiting middleware",
      ],
      workflow: [
        {
          phase: "01",
          title: "Analisis & Modeling",
          desc: "Perancangan skema database ERD, alur use-case, dan kontrak endpoint API.",
        },
        {
          phase: "02",
          title: "Rekayasa Kode",
          desc: "Implementasi antarmuka komponen reaktif, custom hooks, dan controller backend.",
        },
        {
          phase: "03",
          title: "QA & Deployment",
          desc: "Uji performa loading, validasi keamanan, dan deployment cloud produksi.",
        },
      ],
      techLogos: [
        { name: "Laravel", path: "/assets/tech/laravel.svg" },
        { name: "PHP", path: "/assets/tech/php.svg" },
        { name: "React", path: "/assets/tech/react.svg" },
        { name: "TypeScript", path: "/assets/tech/typescript.svg" },
        { name: "Tailwind CSS", path: "/assets/tech/tailwind.svg" },
        { name: "MySQL", path: "/assets/tech/mysql.svg" },
      ],
    },
    {
      id: "mobile",
      code: "02",
      title: "Mobile App Development",
      category: "Mobile Engineering",
      tagline: "Cross-Platform Native Android & iOS dengan Clean Architecture",
      icon: <Layers3 className="w-5 h-5 text-cyan-400" strokeWidth={1.75} />,
      accentGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      accentBorder: "border-cyan-500/40",
      scope: "Production-Ready Mobile App",
      description:
        "Pengembangan aplikasi mobile multiplatform (Android & iOS) berdaya guna tinggi menggunakan Flutter dan Dart. Menitikberatkan pada pemisahan layer Clean Architecture yang rapi, kemudahan pemeliharaan, serta performa 60fps tanpa lagging.",
      deliverables: [
        "Aplikasi native Android & iOS dari satu basis kode terpusat (Flutter)",
        "Struktur Clean Architecture: pemisahan Data, Domain, & Presentation Layer",
        "State management terstruktur dan reaktif (BLoC / Provider)",
        "Integrasi REST API backend, push notifications, & local caching storage",
        "Antarmuka elegan adaptif mengikuti panduan Material Design 3 & iOS HIG",
      ],
      workflow: [
        {
          phase: "01",
          title: "Wireframe & State Map",
          desc: "Pemetaan alur navigasi layar pengguna dan arsitektur state management.",
        },
        {
          phase: "02",
          title: "Coding Clean Arch",
          desc: "Pembuatan entity, use-cases, repositories, dan implementasi UI widgets.",
        },
        {
          phase: "03",
          title: "Device Testing",
          desc: "Pengujian pada perangkat fisik nyata, profiling memori, dan kompilasi APK/Release.",
        },
      ],
      techLogos: [
        { name: "Flutter", path: "/assets/tech/flutter.svg" },
        { name: "Dart", path: "/assets/tech/dart.svg" },
      ],
    },
    {
      id: "network-simulation",
      code: "03",
      title: "Enterprise Network & GNS3",
      category: "Network Infrastructure",
      tagline: "Simulasi Topologi L2/L3, OSPF Routing & Emulasi Real-Device",
      icon: <Waypoints className="w-5 h-5 text-orange-500" strokeWidth={1.75} />,
      accentGradient: "from-orange-500/20 via-rose-500/10 to-transparent",
      accentBorder: "border-orange-500/40",
      scope: "Campus & Enterprise Network Design",
      description:
        "Perancangan infrastruktur jaringan komputer skala menengah hingga besar menggunakan Cisco Packet Tracer dan GNS3. Menyusun topologi interkoneksi kampus multi-gedung, routing adaptif OSPF, trunking VLAN 802.1Q, serta redundansi link berkecepatan tinggi.",
      deliverables: [
        "Desain blueprint topologi jaringan multi-lantai / multi-gedung terstandar",
        "Konfigurasi routing dinamis OSPF multi-area untuk konvergensi jalur otomatis",
        "Segmentasi VLAN (IEEE 802.1Q) dan penghematan alokasi IP menggunakan VLSM",
        "Uji emulasi real-device firmware pada GNS3 sebelum deployment fisik di lapangan",
        "Dokumentasi skema IP addressing komprehensif dan redundansi gateway (HSRP)",
      ],
      workflow: [
        {
          phase: "01",
          title: "Audit Kebutuhan Trafik",
          desc: "Perhitungan estimasi host per departemen dan pembagian subnet VLSM.",
        },
        {
          phase: "02",
          title: "Simulasi GNS3 / Cisco",
          desc: "Pembangunan topologi virtual, konfigurasi CLI router/switch, dan routing OSPF.",
        },
        {
          phase: "03",
          title: "Verifikasi & Redundansi",
          desc: "Uji failover jalur, pengujian ping latensi rendah, dan dokumentasi jaringan.",
        },
      ],
      techLogos: [
        { name: "Cisco IOS", path: "/assets/tech/cisco.svg" },
        { name: "GNS3", path: "/assets/tech/gns3.svg" },
      ],
    },
    {
      id: "mikrotik-qos",
      code: "04",
      title: "MikroTik Gateway & Bandwidth QoS",
      category: "Network Infrastructure",
      tagline: "Manajemen Bandwidth Adil, Captive Portal Hotspot & Dual-ISP Failover",
      icon: <SlidersHorizontal className="w-5 h-5 text-amber-500" strokeWidth={1.75} />,
      accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      accentBorder: "border-amber-500/40",
      scope: "Gateway, Hotspot & Traffic Shaping",
      description:
        "Penyetelan gateway internet profesional berbasis MikroTik RouterOS. Menangani manajemen antrian bandwidth adil (Queue Simple / Tree) untuk mencegah bufferbloat, captive portal login voucher hotspot, firewall filter NAT, dan ketersediaan tinggi lewat failover dual-ISP.",
      deliverables: [
        "Setup gateway internet terpusat dan captive portal hotspot bersistem voucher",
        "Manajemen bandwidth prioritas (QoS) untuk streaming, browsing, & operasional",
        "Firewall filter canggih, NAT masquerade, dan proteksi serangan port scanning",
        "Konfigurasi failover otomatis dual-ISP (jalur cadangan saat link utama putus)",
        "Monitoring pemakaian bandwidth pengguna secara transparan dan realtime",
      ],
      workflow: [
        {
          phase: "01",
          title: "Analisis Kebutuhan Bandwidth",
          desc: "Identifikasi kapasitas ISP dan pembagian kuota per divisi/tamu.",
        },
        {
          phase: "02",
          title: "Penerapan RouterOS",
          desc: "Konfigurasi IP, DNS, DHCP server, mangle, queue tree, dan captive portal.",
        },
        {
          phase: "03",
          title: "Stres Test Beban",
          desc: "Pengujian saat jam sibuk untuk memastikan throughput stabil tanpa jitter.",
        },
      ],
      techLogos: [{ name: "MikroTik RouterOS", path: "/assets/tech/mikrotik.svg" }],
    },
    {
      id: "uiux-design",
      code: "05",
      title: "UI/UX & Digital Product Design",
      category: "Interface & Product Design",
      tagline: "Desain Sistem Terstandar, Wireframing Intuitif & Interaktif Prototyping",
      icon: <Shapes className="w-5 h-5 text-purple-400" strokeWidth={1.75} />,
      accentGradient: "from-purple-500/20 via-rose-500/10 to-transparent",
      accentBorder: "border-purple-500/40",
      scope: "Design System & Figma Architecture",
      description:
        "Perancangan antarmuka visual produk digital berbasis data pengguna dan kebutuhan bisnis. Mulai dari wireframe alur logis hingga mockup fidelitas tinggi di Figma menggunakan Auto-Layout terstandarisasi, token warna terstruktur, dan prototipe mikro-animasi siap serah terima.",
      deliverables: [
        "Riset pengguna, user journey map, dan arsitektur informasi terstruktur",
        "Wireframe alur pengguna bertahap (progressive disclosure) bebas kebingungan",
        "High-Fidelity Mockup pixel-perfect dengan Figma Auto-Layout & Component Variants",
        "Design System terpusat (Typography, Color Tokens, Button Variants, Form Kits)",
        "Prototipe interaktif (Smart Animate) untuk uji kegunaan sebelum penulisan kode",
      ],
      workflow: [
        {
          phase: "01",
          title: "Riset & User Flow",
          desc: "Memahami tujuan bisnis dan menyusun alur penggunaan paling efisien.",
        },
        {
          phase: "02",
          title: "Design System & UI Kit",
          desc: "Pembuatan komponen atomik, palet warna berestetika, dan mockup visual.",
        },
        {
          phase: "03",
          title: "Prototyping & Handoff",
          desc: "Penyusunan prototipe interaktif dan dokumentasi spesifikasi teknis bagi developer.",
        },
      ],
      techLogos: [{ name: "Figma", path: "/assets/tech/figma.svg" }],
    },
    {
      id: "databases-cloud",
      code: "06",
      title: "Database Architecture & Cloud BaaS",
      category: "Database & Cloud",
      tagline: "Skema Normalisasi Relasional, Optimasi Query SQL & Supabase Cloud",
      icon: <TableProperties className="w-5 h-5 text-blue-500" strokeWidth={1.75} />,
      accentGradient: "from-blue-500/20 via-emerald-500/10 to-transparent",
      accentBorder: "border-blue-500/40",
      scope: "Database Design & Cloud Sync",
      description:
        "Perancangan dan optimalisasi struktur basis data relasional. Menangani normalisasi skema 3NF untuk integritas data, penyusunan query SQL cepat, serta integrasi platform database cloud realtime (Supabase PostgreSQL) dengan proteksi Row Level Security (RLS).",
      deliverables: [
        "Normalisasi skema relasional (3NF) dengan integritas foreign key ketat",
        "Optimasi indeks database dan penyusunan query kompleks performa tinggi",
        "Setup cloud database realtime berbasis PostgreSQL & Supabase BaaS",
        "Implementasi aturan keamanan server-side Row Level Security (RLS)",
        "Penyusunan prosedur cadangan berkala (backup) & dokumentasi relasi tabel",
      ],
      workflow: [
        {
          phase: "01",
          title: "Perancangan ERD",
          desc: "Analisis entitas, kardinalitas relasi, dan penentuan tipe data presisi.",
        },
        {
          phase: "02",
          title: "DDL & Implementasi",
          desc: "Pembuatan skema tabel, indexing kolom kunci, dan pembuatan fungsi/trigger.",
        },
        {
          phase: "03",
          title: "Security & Benchmarking",
          desc: "Penerapan policy otorisasi RLS dan pengujian latensi query.",
        },
      ],
      techLogos: [
        { name: "MySQL", path: "/assets/tech/mysql.svg" },
        { name: "Supabase", path: "/assets/tech/supabase.svg" },
        { name: "PostgreSQL", path: "/assets/tech/postgresql.svg" },
      ],
    },
    {
      id: "hardware-support",
      code: "07",
      title: "IT Support, Hardware & Rig Assembly",
      category: "Hardware & Systems",
      tagline: "Perakitan Workstation, Optimasi Firmware UEFI/BIOS & Troubleshooting",
      icon: <CircuitBoard className="w-5 h-5 text-amber-500" strokeWidth={1.75} />,
      accentGradient: "from-amber-500/20 via-rose-500/10 to-transparent",
      accentBorder: "border-amber-500/40",
      scope: "Workstation Build & System Diagnostics",
      description:
        "Layanan perakitan perangkat keras komputer workstation komputasi tinggi dan penanganan teknis TI. Memastikan pendinginan maksimal melalui manajemen airflow dan kabel rapi, penyetelan profil memori XMP/DOCP firmware BIOS, deployment dual-boot Linux/Windows, serta pengujian stres diagnostik komponen.",
      deliverables: [
        "Perakitan rig workstation berperforma tinggi dengan airflow & kabel rapi",
        "Konfigurasi firmware UEFI/BIOS (XMP/DOCP, Secure Boot, & partisi GPT)",
        "Deployment sistem operasi dual-boot (Windows 11 & Linux Ubuntu) stabil",
        "Diagnostik kegagalan hardware menggunakan stress test standar (Prime95, MemTest)",
        "Troubleshooting hardware laboratorium dan optimalisasi performa termal",
      ],
      workflow: [
        {
          phase: "01",
          title: "Kesesuaian Komponen",
          desc: "Pemeriksaan kompatibilitas soket, daya PSU, dan dimensi airflow.",
        },
        {
          phase: "02",
          title: "Perakitan Presisi",
          desc: "Pemasangan CPU, pasta termal optimal, dan perapian jalur kabel kabel.",
        },
        {
          phase: "03",
          title: "Stress Testing",
          desc: "Pengujian beban penuh 100% untuk memvalidasi suhu aman dan stabilitas.",
        },
      ],
      techLogos: [
        { name: "Java", path: "/assets/tech/java.svg" },
        { name: "C++", path: "/assets/tech/cpp.svg" },
      ],
    },
  ];

  // State untuk Pop-up Modal Detail (Expanded View)
  const [activeModal, setActiveModal] = useState<ServiceDossier | null>(null);

  // Duplikasi item 3x agar animasi infinite bergerak ke kanan selalu mulus tanpa jeda
  const marqueeItems = [...dossiers, ...dossiers, ...dossiers];

  // Handle ESC key to close modal & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };

    if (activeModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  // Scroll to contact section
  const handleScrollToContact = () => {
    setActiveModal(null);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <section
      id="services"
      className="py-24 relative bg-slate-100/60 dark:bg-dark-surface/40 border-t border-b border-slate-200/80 dark:border-white/5 transition-colors overflow-hidden"
    >
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Section Header: Clean & Minimalist */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-xs font-bold text-orange-500 tracking-wider uppercase">
              // CAPABILITIES & SERVICE DOSSIER
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            SERVICES &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
              EXPERTISE
            </span>
          </h2>
        </div>
      </div>

      {/* CONTINUOUS RIGHTWARD MOVING CAROUSEL TRACK */}
      <div className="relative w-full overflow-x-hidden py-4 select-none group">
        {/* Soft edge blur masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-100 dark:from-[#0c0e15] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-100 dark:from-[#0c0e15] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track moving to the right */}
        <div className="flex gap-5 w-max animate-marquee-right hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setActiveModal(item)}
              className="w-[280px] sm:w-[320px] shrink-0 p-5 rounded-2xl bg-white/70 dark:bg-[#12151e]/80 border border-slate-200/80 dark:border-white/5 hover:border-orange-500/50 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 backdrop-blur-md transition-all duration-300 cursor-pointer group/card flex flex-col justify-between hover:-translate-y-1 relative"
            >
              {/* Card Top Row: Code & Minimalist Arrow */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-orange-500">
                      [{item.code}]
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 truncate max-w-[170px]">
                      {item.category}
                    </span>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/card:text-orange-500 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
                </div>

                {/* Service Icon & Title */}
                <div className="w-10 h-10 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-center mb-3.5 group-hover/card:scale-105 group-hover/card:border-orange-500/40 group-hover/card:bg-orange-500/5 transition-all shadow-sm">
                  {item.icon}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover/card:text-orange-500 transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-sans">
                  {item.tagline}
                </p>
              </div>

              {/* Card Bottom Row: Subtle Tech Badges & Minimalist Hint */}
              <div className="pt-3.5 mt-4 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {item.techLogos.slice(0, 3).map((tech) => (
                    <div
                      key={tech.name}
                      className="w-5 h-5 rounded-md bg-slate-100 dark:bg-dark-surface/80 border border-slate-200/50 dark:border-white/5 flex items-center justify-center p-0.5"
                      title={tech.name}
                    >
                      <img
                        src={tech.path}
                        alt={tech.name}
                        className="w-3.5 h-3.5 object-contain"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ))}
                  {item.techLogos.length > 3 && (
                    <span className="text-[9px] font-mono text-slate-400">
                      +{item.techLogos.length - 3}
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-mono text-slate-400 group-hover/card:text-orange-500 transition-colors">
                  Detail ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXPANDED POP-UP MODAL (POP UP MENU) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-dark-card border-2 border-orange-500/40 shadow-2xl shadow-orange-500/20 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Ambient Glow in Modal */}
              <div
                className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${activeModal.accentGradient} rounded-full blur-3xl pointer-events-none -z-10`}
              />

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/90 dark:bg-dark-surface/90 shrink-0">
                <div className="flex items-center gap-3">
                  {/* macOS style dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-orange-500" />
                    <span className="font-bold">spec: ~/dossier/{activeModal.id}.json</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-mono text-[10px] font-bold">
                    <Activity className="w-3 h-3" />
                    <span>CAPABILITY:READY</span>
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    title="Tutup (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Header Information */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                      [{activeModal.code}] {activeModal.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      • {activeModal.scope}
                    </span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      {activeModal.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                        {activeModal.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-orange-500 font-semibold mt-1">
                        {activeModal.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4 font-sans bg-slate-50 dark:bg-dark-surface/40 p-4 rounded-xl border border-slate-200/60 dark:border-white/5">
                    {activeModal.description}
                  </p>
                </div>

                {/* Concrete Deliverables Checklist */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-surface/70 border border-slate-200/80 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>DELIVERABLES KONKRET (OUTPUT YANG ANDA DAPATKAN):</span>
                  </div>
                  <div className="space-y-2.5">
                    {activeModal.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3-Phase Execution Workflow Stepper */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white mb-3">
                    <Layers className="w-4 h-4 text-orange-500" />
                    <span>ALUR PENGERJAAN (WORKFLOW PIPELINE):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeModal.workflow.map((step) => (
                      <div
                        key={step.phase}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-surface/50 border border-slate-200/80 dark:border-white/5"
                      >
                        <div className="font-mono text-[10px] font-bold text-orange-500 mb-1">
                          PHASE {step.phase}
                        </div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                          {step.title}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Ecosystem Badges */}
                <div>
                  <div className="text-[10px] font-mono text-slate-400 mb-2 uppercase font-semibold">
                    Teknologi & Tools Utama yang Digunakan:
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeModal.techLogos.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-dark-surface border border-slate-200/80 dark:border-white/5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300"
                      >
                        <img
                          src={tech.path}
                          alt={tech.name}
                          className="w-4 h-4 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Bar */}
              <div className="px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/90 dark:bg-dark-surface/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Tutup [ESC]
                </button>

                <button
                  onClick={handleScrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Konsultasikan Kebutuhan Ini</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
