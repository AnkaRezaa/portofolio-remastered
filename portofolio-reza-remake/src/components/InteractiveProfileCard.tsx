import React, { useState, useRef } from "react";
import { profileData } from "../data/profile";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Copy,
  Scan,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Layers,
} from "lucide-react";

type PhotoMode = "normal" | "blueprint" | "hud";

interface HotspotPin {
  id: string;
  label: string;
  code: string;
  top: string; // percentage
  left: string; // percentage
  category: string;
  title: string;
  description: string;
  tags: string[];
}

const HOTSPOT_PINS: HotspotPin[] = [
  {
    id: "pin-academic",
    label: "01. AKADEMIK",
    code: "POLINEMA // D4-TI",
    top: "22%",
    left: "50%",
    category: "Pendidikan & Studi",
    title: "Mahasiswa D4 Teknologi Informasi",
    description:
      "Sedang menempuh studi sarjana terapan (D4) di Politeknik Negeri Malang. Mempelajari fondasi komputasi, algoritma pemrograman, dan rekayasa perangkat lunak.",
    tags: ["Polinema", "Mahasiswa Aktif", "D4 TI", "Algoritma"],
  },
  {
    id: "pin-stack",
    label: "02. FULL-STACK",
    code: "WEB & MOBILE",
    top: "52%",
    left: "44%",
    category: "Pengembangan Aplikasi",
    title: "Web & Mobile Development",
    description:
      "Membangun aplikasi web dan mobile fungsional menggunakan ekosistem Laravel, React, Tailwind CSS, Supabase, dan Flutter.",
    tags: ["React", "Laravel", "Tailwind", "Supabase", "Flutter"],
  },
  {
    id: "pin-infra",
    label: "03. JARINGAN",
    code: "NETWORKING // LAB",
    top: "76%",
    left: "64%",
    category: "Infrastruktur Jaringan",
    title: "Jaringan Komputer & IT Support",
    description:
      "Praktik konfigurasi MikroTik RouterOS, simulasi Cisco di GNS3/Packet Tracer, penataan jaringan lokal (LAN/VLAN), dan troubleshooting teknis.",
    tags: ["MikroTik", "Cisco", "GNS3", "VLAN", "IT Support"],
  },
];

export const InteractiveProfileCard: React.FC = () => {
  const [photoMode, setPhotoMode] = useState<PhotoMode>("normal");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [activePin, setActivePin] = useState<HotspotPin | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mouse tracking state for 3D tilt & crosshair
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, percentX: 50, percentY: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio synthesizer via Web Audio API (soft tech clicks)
  const playSfx = (freq = 600, type: OscillatorType = "sine", duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted or supported; silent fail
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopiedEmail(true);
    playSfx(880, "sine", 0.1);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const triggerScan = () => {
    setIsScanning(true);
    playSfx(420, "triangle", 0.3);
    setTimeout(() => {
      setIsScanning(false);
      playSfx(840, "sine", 0.15);
    }, 1400);
  };

  const handleModeChange = (mode: PhotoMode) => {
    setPhotoMode(mode);
    playSfx(mode === "normal" ? 520 : mode === "blueprint" ? 680 : 820, "sine", 0.1);
    triggerScan();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const percentX = Math.round((x / rect.width) * 100);
    const percentY = Math.round((y / rect.height) * 100);
    setMousePos({ x, y, percentX, percentY });
  };

  // 3D Tilt calculation
  const tiltX = isHovering ? ((mousePos.percentY - 50) / 50) * -7 : 0;
  const tiltY = isHovering ? ((mousePos.percentX - 50) / 50) * 7 : 0;

  return (
    <>
      <div className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden group">
        {/* Header Toolbar: Interactive Mode Switcher & Utility Tools */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              FOTO PROFIL
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              [{photoMode.toUpperCase()}]
            </span>
          </div>

          {/* Interactive Mode Pills & Quick Toggles */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center bg-slate-100 dark:bg-dark-surface p-1 rounded-xl border border-slate-200 dark:border-white/5 font-mono text-[10px]">
              <button
                onClick={() => handleModeChange("normal")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  photoMode === "normal"
                    ? "bg-orange-500 text-white font-bold shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                NORMAL
              </button>
              <button
                onClick={() => handleModeChange("blueprint")}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  photoMode === "blueprint"
                    ? "bg-cyan-600 text-white font-bold shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                BLUEPRINT
              </button>
              <button
                onClick={() => handleModeChange("hud")}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  photoMode === "hud"
                    ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                HUD TEKNIS
              </button>
            </div>

            {/* Quick Interactive Actions (Scan, Pins, Sound, Zoom) */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-surface p-1 rounded-xl border border-slate-200 dark:border-white/5">
              <button
                onClick={triggerScan}
                title="Pindai / Animasi Scan"
                className={`p-1.5 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-orange-500 hover:bg-white dark:hover:bg-white/10 ${
                  isScanning ? "text-orange-500 bg-orange-500/10" : ""
                }`}
              >
                <Scan className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setShowPins(!showPins);
                  playSfx(550, "sine", 0.05);
                }}
                title={showPins ? "Sembunyikan Titik Interaktif" : "Tampilkan Titik Interaktif"}
                className={`p-1.5 rounded-lg transition-colors hover:bg-white dark:hover:bg-white/10 ${
                  showPins
                    ? "text-orange-500 bg-orange-500/10 font-bold"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  const nextState = !soundEnabled;
                  setSoundEnabled(nextState);
                  if (nextState) playSfx(880, "sine", 0.1);
                }}
                title={soundEnabled ? "Nonaktifkan Efek Suara SFX" : "Aktifkan Efek Suara SFX"}
                className={`p-1.5 rounded-lg transition-colors hover:bg-white dark:hover:bg-white/10 ${
                  soundEnabled
                    ? "text-emerald-500 bg-emerald-500/10"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => {
                  setIsFullscreen(true);
                  playSfx(750, "sine", 0.1);
                }}
                title="Lihat Foto Ukuran Penuh"
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-orange-500 hover:bg-white dark:hover:bg-white/10 transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Interactive Portrait Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setActivePin(null);
          }}
          style={{
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          }}
          className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 dark:border-white/10 select-none shadow-inner cursor-crosshair group/portrait"
        >
          {/* Base Photo with Dynamic Filter Modes */}
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              photoMode === "blueprint"
                ? "filter grayscale contrast-150 invert-[0.15] sepia-[0.35] hue-rotate-[180deg] brightness-95"
                : photoMode === "hud"
                ? "filter contrast-125 saturate-150 brightness-90 hue-rotate-[15deg]"
                : "filter contrast-105 brightness-100"
            }`}
          />

          {/* BLUEPRINT OVERLAY: CAD Grid & Schematic Blueprint Markings */}
          {photoMode === "blueprint" && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Drafting Grid */}
              <div className="absolute inset-0 bg-grid-pattern opacity-60" />
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.4) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Cyan Blueprint Vignette */}
              <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color" />

              {/* Technical CAD Dimension Callouts */}
              <div className="absolute top-3 left-3 font-mono text-[9px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                SKEMA TEKNIS // D4-TI
              </div>
              <div className="absolute top-3 right-3 font-mono text-[9px] text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                POLINEMA // MALANG
              </div>

              {/* Blueprint Corner Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
            </div>
          )}

          {/* HUD OVERLAY: Modern Telemetry Grid */}
          {photoMode === "hud" && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Scanline pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 3px)",
                }}
              />

              {/* Warm Amber Hologram Tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/50 via-transparent to-transparent opacity-80" />

              {/* Status Pills */}
              <div className="absolute top-3 left-3 font-mono text-[9px] text-amber-400 bg-black/80 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                STATUS: AKTIF
              </div>
              <div className="absolute top-3 right-3 font-mono text-[9px] text-emerald-400 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30">
                OPEN TO WORK
              </div>
            </div>
          )}

          {/* DYNAMIC LASER SCANNER BEAM */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: "-5%" }}
                animate={{ top: "105%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-1 pointer-events-none z-30"
              >
                {/* Laser line glowing beam */}
                <div
                  className={`w-full h-full shadow-lg ${
                    photoMode === "blueprint"
                      ? "bg-cyan-400 shadow-cyan-400/80"
                      : "bg-orange-500 shadow-orange-500/80"
                  }`}
                />
                <div
                  className={`w-full h-14 -mt-7 bg-gradient-to-b opacity-30 ${
                    photoMode === "blueprint"
                      ? "from-transparent via-cyan-400 to-transparent"
                      : "from-transparent via-orange-500 to-transparent"
                  }`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* INTERACTIVE MOUSE CROSSHAIR & LIVE COORDINATES */}
          {isHovering && (
            <>
              {/* Subtle Crosshair Lines */}
              <div
                className="absolute top-0 bottom-0 w-[1px] pointer-events-none z-20 opacity-30 transition-opacity"
                style={{
                  left: `${mousePos.x}px`,
                  backgroundColor:
                    photoMode === "blueprint"
                      ? "#38bdf8"
                      : photoMode === "hud"
                      ? "#f59e0b"
                      : "#ffffff",
                }}
              />
              <div
                className="absolute left-0 right-0 h-[1px] pointer-events-none z-20 opacity-30 transition-opacity"
                style={{
                  top: `${mousePos.y}px`,
                  backgroundColor:
                    photoMode === "blueprint"
                      ? "#38bdf8"
                      : photoMode === "hud"
                      ? "#f59e0b"
                      : "#ffffff",
                }}
              />

              {/* Live Coordinate Badge at Cursor */}
              <div
                className="absolute z-20 pointer-events-none font-mono text-[9px] px-1.5 py-0.5 rounded backdrop-blur-md border shadow-sm transition-transform -translate-y-6 translate-x-2"
                style={{
                  top: `${mousePos.y}px`,
                  left: `${mousePos.x}px`,
                  backgroundColor:
                    photoMode === "blueprint"
                      ? "rgba(8, 47, 73, 0.85)"
                      : photoMode === "hud"
                      ? "rgba(69, 26, 3, 0.85)"
                      : "rgba(15, 23, 42, 0.85)",
                  borderColor:
                    photoMode === "blueprint"
                      ? "rgba(56, 189, 248, 0.3)"
                      : photoMode === "hud"
                      ? "rgba(245, 158, 11, 0.3)"
                      : "rgba(255, 255, 255, 0.15)",
                  color:
                    photoMode === "blueprint"
                      ? "#7dd3fc"
                      : photoMode === "hud"
                      ? "#fde68a"
                      : "#ffffff",
                }}
              >
                X:{mousePos.percentX}% Y:{mousePos.percentY}%
              </div>
            </>
          )}

          {/* INTERACTIVE HOTSPOT PINS */}
          {showPins &&
            HOTSPOT_PINS.map((pin) => {
              const isActive = activePin?.id === pin.id;
              return (
                <div
                  key={pin.id}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-25 group/pin"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePin(isActive ? null : pin);
                      playSfx(isActive ? 440 : 720, "sine", 0.08);
                    }}
                    onMouseEnter={() => {
                      setActivePin(pin);
                      playSfx(660, "sine", 0.04);
                    }}
                    className="relative flex items-center justify-center p-2 cursor-pointer focus:outline-none"
                    aria-label={pin.title}
                  >
                    {/* Pulsing Outer Radar Ring */}
                    <span
                      className={`absolute w-7 h-7 rounded-full animate-ping opacity-75 ${
                        photoMode === "blueprint"
                          ? "bg-cyan-400"
                          : photoMode === "hud"
                          ? "bg-amber-400"
                          : "bg-orange-500"
                      }`}
                    />

                    {/* Middle Glowing Ring */}
                    <span
                      className={`relative w-4 h-4 rounded-full border-2 flex items-center justify-center transition-transform ${
                        isActive ? "scale-125" : "group-hover/pin:scale-110"
                      } ${
                        photoMode === "blueprint"
                          ? "bg-cyan-950 border-cyan-400 text-cyan-300"
                          : photoMode === "hud"
                          ? "bg-amber-950 border-amber-400 text-amber-300"
                          : "bg-slate-900 border-orange-500 text-orange-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          photoMode === "blueprint"
                            ? "bg-cyan-300"
                            : photoMode === "hud"
                            ? "bg-amber-300"
                            : "bg-orange-400"
                        }`}
                      />
                    </span>
                  </button>

                  {/* Hotspot Floating Pill Callout */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-2xl bg-slate-900/95 text-white backdrop-blur-xl border border-white/15 shadow-2xl z-40 pointer-events-auto"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-[9px] font-bold text-orange-400 tracking-wider">
                            {pin.category.toUpperCase()}
                          </span>
                          <span className="font-mono text-[8px] text-slate-400">
                            {pin.code}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-white mb-1">
                          {pin.title}
                        </h5>
                        <p className="text-[10px] text-slate-300 leading-relaxed mb-2">
                          {pin.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {pin.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[8px] text-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

          {/* Bottom Permanent Status Bar inside portrait */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-dark-bg/95 via-dark-bg/60 to-transparent flex items-center justify-between font-mono text-[10px] text-white pointer-events-none z-10">
            <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE // MAHASISWA D4 TI
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-slate-300">
              MALANG, ID
            </span>
          </div>
        </div>

        {/* Bio & One-Click Copy Actions */}
        <div className="mt-5 space-y-3">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {profileData.name}
            </h4>
            <p className="font-mono text-xs text-orange-500 font-semibold">
              {profileData.headline}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-500 truncate max-w-[200px]">
              {profileData.contact.email}
            </span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1 font-mono text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Technical Preview Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-3xl bg-slate-900 border border-white/15 overflow-hidden shadow-2xl p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    PREVIEW FOTO // {profileData.name}
                  </span>
                </div>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[4/5] max-h-[60vh] w-full mx-auto rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className={`w-full h-full object-cover ${
                    photoMode === "blueprint"
                      ? "filter grayscale contrast-150 invert-[0.15] sepia-[0.35] hue-rotate-[180deg]"
                      : photoMode === "hud"
                      ? "filter contrast-125 saturate-150 brightness-90 hue-rotate-[15deg]"
                      : "filter contrast-105"
                  }`}
                />
                {photoMode === "blueprint" && (
                  <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
                )}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-300">
                <div>
                  <span className="text-orange-400 font-bold">STATUS:</span> Mahasiswa Aktif D4 TI • Polinema
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">MODE AKTIF:</span>
                  <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold uppercase">
                    {photoMode}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
