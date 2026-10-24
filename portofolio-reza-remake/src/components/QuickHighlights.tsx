import React, { useState } from "react";
import {
  Network,
  Code2,
  Palette,
  Cpu,
  CheckCircle2,
  Terminal,
  Activity,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface SkillDetail {
  name: string;
  level: string;
  percentage: number;
  protocolSnippet: string;
  summary: string;
  useCase: string;
}

interface MatrixCategory {
  id: string;
  code: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  skills: SkillDetail[];
}

export const QuickHighlights: React.FC = () => {
  const matrices: MatrixCategory[] = [
    {
      id: "network",
      code: "A / 01",
      category: "Infrastructure & Networks",
      description:
        "Perancangan topologi enterprise, routing adaptif, VLAN trunking, dan manajemen bandwidth.",
      icon: <Network className="w-5 h-5 text-orange-500" />,
      accent: "from-orange-500/20 to-amber-500/10",
      skills: [
        {
          name: "Cisco Packet Tracer",
          level: "Enterprise Topology",
          percentage: 95,
          protocolSnippet: "Router(config)# router ospf 1\nRouter(config-router)# network 10.0.0.0 0.255.255.255 area 0",
          summary: "Simulasi jaringan enterprise multi-router dengan redundansi HSRP dan switching L2/L3.",
          useCase: "Desain Jaringan Multi-Lantai Polinema & Enterprise Lab",
        },
        {
          name: "MikroTik RouterOS",
          level: "Queue & Hotspot",
          percentage: 92,
          protocolSnippet: "/ip firewall nat add chain=srcnat action=masquerade out-interface=ether1\n/queue simple add name=Guest max-limit=10M/20M",
          summary: "Manajemen alokasi bandwidth, captive portal hotspot, dan failover dual-ISP.",
          useCase: "Konfigurasi Gateway Internet & QoS Warnet/Kampus",
        },
        {
          name: "VLAN & Subnetting",
          level: "IEEE 802.1Q",
          percentage: 94,
          protocolSnippet: "Switch(config)# vlan 20\nSwitch(config-vlan)# name IT_INFRA\nSwitch(config-if)# switchport mode trunk",
          summary: "Segmentasi trafik broadcast dan penghematan alokasi IP menggunakan VLSM.",
          useCase: "Isolasi Departemen & Keamanan Jaringan Lokal",
        },
        {
          name: "Routing Protocols",
          level: "OSPF, RIP, Static",
          percentage: 90,
          protocolSnippet: "ip route 192.168.20.0 255.255.255.0 10.10.10.2\nping 192.168.20.1 source 10.10.10.1",
          summary: "Penyusunan tabel rute dinamis untuk failover otomatis tanpa interupsi transmisi.",
          useCase: "Interkoneksi Antar Gedung & Campus Core",
        },
      ],
    },
    {
      id: "web",
      code: "B / 02",
      category: "Web & Software Engineering",
      description:
        "Pengembangan web modular modern berbasis komponen reaktif, type-safe TypeScript, dan database relasional.",
      icon: <Code2 className="w-5 h-5 text-amber-500" />,
      accent: "from-amber-500/20 to-orange-500/10",
      skills: [
        {
          name: "React.js & Hooks",
          level: "Component Systems",
          percentage: 92,
          protocolSnippet: "const [state, dispatch] = useReducer(systemReducer, initial);\nuseEffect(() => syncTelemetry(state.id), [state.id]);",
          summary: "Arsitektur frontend reaktif dengan state management bersih dan zero prop-drilling.",
          useCase: "Web Portal ALAB, myGARDEN, & Admin Console",
        },
        {
          name: "TypeScript",
          level: "Strict Type Safety",
          percentage: 90,
          protocolSnippet: "interface NetworkPacket<T> {\n  header: { src: IPAddress; dst: IPAddress };\n  payload: T;\n}",
          summary: "Mencegah runtime bug dan memastikan konsistensi antarmuka data di seluruh modul.",
          useCase: "Portofolio Remake & Full-Stack Core Runtimes",
        },
        {
          name: "Node.js & Express",
          level: "Backend REST APIs",
          percentage: 88,
          protocolSnippet: "app.get('/api/telemetry', authGuard, async (req, res) => {\n  const metrics = await db.query('SELECT * FROM sys_stats');\n  res.json(metrics);\n});",
          summary: "Pembangunan endpoint API asynchronous dengan otentikasi JWT dan middleware rate-limiting.",
          useCase: "Layanan Backend Manajemen Kamar Hotelier & Inventaris",
        },
        {
          name: "Tailwind CSS",
          level: "Design Token Architecture",
          percentage: 96,
          protocolSnippet: "className=\"glass-card p-6 border border-orange-500/30 backdrop-blur-md hover:-translate-y-1 transition-all\"",
          summary: "Implementasi desain responsif, dark mode instan, dan sistem token warna sunset orange kustom.",
          useCase: "Sistem Desain Antarmuka Web Portofolio & Proyek Kampus",
        },
      ],
    },
    {
      id: "uiux",
      code: "C / 03",
      category: "Interface & Experience Design",
      description:
        "Desain antarmuka berestetika editorial, wireframing teliti, interaksi mikro, dan sistem token Figma.",
      icon: <Palette className="w-5 h-5 text-rose-500" />,
      accent: "from-rose-500/20 to-orange-500/10",
      skills: [
        {
          name: "Figma Architecture",
          level: "AutoLayout & Tokens",
          percentage: 94,
          protocolSnippet: "Frame [Horizontal AutoLayout, Padding: 24px, Gap: 12px]\nFill: var(--bg-surface-elevated), Stroke: var(--border-subtle)",
          summary: "Penyusunan komponen atomik, variant interaktif, dan auto-layout yang siap ditransfer ke kode.",
          useCase: "High-Fidelity Mockup Redesign Maxim & myGARDEN",
        },
        {
          name: "Interactive Prototyping",
          level: "Micro-Transitions",
          percentage: 90,
          protocolSnippet: "Trigger: On Hover -> Smart Animate (Ease-Out, 200ms)\nOverlay: Modal Center with Background Blur 20px",
          summary: "Eksplorasi rasa sentuhan komponen antarmuka sebelum tahap penulisan kode dilakukan.",
          useCase: "User Testing Alur Reservasi Hotel & Sistem Perpustakaan",
        },
        {
          name: "Wireframing & UX Flow",
          level: "Information Hierarchy",
          percentage: 92,
          protocolSnippet: "User Goal: Rapid Checkout -> Wireframe: 3 Step Stepper\nReduced Cognitive Load by 40% with progressive disclosure.",
          summary: "Menata struktur hierarki informasi agar pengguna dapat menyelesaikan tugas tanpa kebingungan.",
          useCase: "Alur Pembelian myGARDEN E-Commerce Flora",
        },
      ],
    },
    {
      id: "hardware",
      code: "D / 04",
      category: "Hardware & Diagnostics",
      description:
        "Perakitan perangkat keras PC, konfigurasi firmware BIOS/UEFI, diagnostik stres komponen, dan OS deploy.",
      icon: <Cpu className="w-5 h-5 text-orange-400" />,
      accent: "from-orange-500/20 to-rose-500/10",
      skills: [
        {
          name: "PC Assembly & Hardware",
          level: "Workstation & Server",
          percentage: 95,
          protocolSnippet: "Checklist: CPU Socket Alignment -> Thermal Paste Spread (Pea Method)\nCable Routing: Clean Airflow Channel -> POST Test: 1 Beep OK",
          summary: "Perakitan rig komputer workstation bertenaga tinggi dengan manajemen kabel dan pendinginan efisien.",
          useCase: "Perakitan Workstation Lab Kampus & PC Pribadi",
        },
        {
          name: "BIOS/UEFI Configuration",
          level: "Boot & Security",
          percentage: 92,
          protocolSnippet: "UEFI Settings: XMP/DOCP Enabled -> Secure Boot: Enabled\nSATA Mode: AHCI -> NVMe PCIe Gen4 Bus Verified",
          summary: "Optimalisasi profil memori (XMP), urutan boot multi-OS, dan proteksi firmware.",
          useCase: "Konfigurasi Dual-Boot Windows 11 / Linux Ubuntu",
        },
        {
          name: "System Diagnostics",
          level: "Benchmarking & Repair",
          percentage: 93,
          protocolSnippet: "Stress Test: Prime95 (30m No Error) + FurMark (72°C Max)\nMemory Test: MemTest86 0 Errors passed.",
          summary: "Identifikasi kegagalan perangkat keras (RAM faulty, thermal throttling, PSU instabilitas).",
          useCase: "Troubleshooting & Reparasi Perangkat Keras Laboratorium",
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail>(
    matrices[0].skills[0]
  );
  const [copied, setCopied] = useState(false);

  const handleCopySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayedCategories =
    activeCategory === "all"
      ? matrices
      : matrices.filter((m) => m.id === activeCategory);

  return (
    <section
      id="weapons"
      className="py-24 relative z-10 border-t border-b border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-dark-surface/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider">
                // TECHNICAL ARSENAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              WEAPONS OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">CHOICE</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Pilih instrumen atau keahlian teknis di bawah untuk melihat tingkat penguasaan, implementasi nyata, dan contoh konfigurasinya.
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-white/10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all relative ${
              activeCategory === "all"
                ? "text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-white/5"
            }`}
          >
            {activeCategory === "all" && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-xl -z-10 shadow-md shadow-orange-500/25"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            Semua Bidang
          </button>

          {matrices.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all relative ${
                activeCategory === cat.id
                  ? "text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-white/5"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-xl -z-10 shadow-md shadow-orange-500/25"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {cat.category}
            </button>
          ))}
        </div>

        {/* Two-Column Interactive Layout: Matrix Explorer (Left) & Live Telemetry Inspector HUD (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Skills Matrix */}
          <div className="lg:col-span-7 space-y-6">
            {displayedCategories.map((matrix) => (
              <motion.div
                layout
                key={matrix.id}
                className="terminal-window shadow-sm group"
              >
                {/* Terminal Window Header Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-100/90 dark:bg-dark-surface/90 border-b border-slate-200 dark:border-white/10 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-semibold truncate ml-2">
                    bash: ~/arsenal/{matrix.id}.sh
                  </span>
                  <span className="font-bold text-orange-500">{matrix.code}</span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-dark-surface flex items-center justify-center">
                        {matrix.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {matrix.category}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {matrix.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clickable Skill Pills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 dark:border-white/5">
                    {matrix.skills.map((skill) => {
                      const isSelected = selectedSkill.name === skill.name;
                      return (
                        <button
                          key={skill.name}
                          onClick={() => setSelectedSkill(skill)}
                          className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between group/skill relative ${
                            isSelected
                              ? "bg-orange-500/10 border-orange-500 text-orange-600 dark:text-orange-400 shadow-md shadow-orange-500/10"
                              : "bg-slate-100/60 dark:bg-dark-card/60 border-slate-200/60 dark:border-white/5 hover:border-orange-500/40 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <p className="font-mono text-xs font-bold truncate group-hover/skill:text-orange-500 transition-colors">
                              {skill.name}
                            </p>
                            <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {skill.level}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="font-mono text-[11px] font-bold">
                              {skill.percentage}%
                            </span>
                            <ChevronRight
                              className={`w-3.5 h-3.5 transition-transform ${
                                isSelected ? "translate-x-0.5 text-orange-500" : "text-slate-400"
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Live Telemetry Inspector HUD */}
          <div className="lg:col-span-5 sticky top-28">
            <motion.div
              layout
              className="terminal-window border-2 border-orange-500/30 dark:border-orange-500/25 shadow-2xl relative overflow-hidden"
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/95 dark:bg-dark-surface/95 border-b border-slate-200 dark:border-white/10 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-orange-500" />
                  <span>hud: ~/telemetry_inspector.exe</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                  <Activity className="w-3 h-3" />
                  <span>LIVE</span>
                </div>
              </div>

              {/* Ambient backlight glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

              <div className="p-5 sm:p-6 space-y-4">
                {/* Dynamic Skill Details */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedSkill.name}
                  </h4>
                  <p className="font-mono text-xs text-orange-500 font-semibold mt-0.5">
                    {selectedSkill.level}
                  </p>
                </div>

                {/* Animated Proficiency Bar */}
                <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-dark-surface/70 border border-slate-200 dark:border-white/5 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-600 dark:text-slate-300">Tingkat Kemampuan</span>
                    <span className="font-bold text-orange-500">{selectedSkill.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-dark-card overflow-hidden">
                    <motion.div
                      key={selectedSkill.name}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.percentage}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-full"
                    />
                  </div>
                </div>

                {/* Real-world Application */}
                <div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    Implementasi Nyata
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                    {selectedSkill.summary}
                  </p>
                </div>

                {/* Key Case Study / Rig */}
                <div className="p-3 rounded-2xl bg-slate-100/60 dark:bg-dark-card/60 border border-slate-200 dark:border-white/5">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-orange-500" />
                    <span>Digunakan Pada</span>
                  </p>
                  <p className="font-mono text-xs font-semibold text-slate-800 dark:text-white">
                    {selectedSkill.useCase}
                  </p>
                </div>

                {/* Live CLI / Code Snippet Simulation */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      Contoh Kode / Konfigurasi
                    </p>
                    <button
                      onClick={() => handleCopySnippet(selectedSkill.protocolSnippet)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-orange-500 hover:text-orange-400 transition-colors"
                      title="Salin cuplikan kode"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto border border-white/10 selection:bg-orange-500/30">
                    <code>{selectedSkill.protocolSnippet}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
