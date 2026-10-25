import React, { useState } from "react";
import { profileData } from "../data/profile";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Maximize2, X } from "lucide-react";

type PhotoMode = "normal" | "blueprint";

export const InteractiveProfileCard: React.FC = () => {
  const [photoMode, setPhotoMode] = useState<PhotoMode>("normal");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleModeSwitch = (mode: PhotoMode) => {
    if (mode === photoMode) return;
    setPhotoMode(mode);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 900);
  };

  return (
    <>
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden transition-all duration-300">
        
        {/* Simple & Clean Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Foto Profil
          </span>

          {/* Minimalist Segmented Pill Switcher */}
          <div className="inline-flex items-center bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200/80 dark:border-white/5 font-mono text-[11px]">
            <button
              onClick={() => handleModeSwitch("normal")}
              className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                photoMode === "normal"
                  ? "bg-white dark:bg-dark-card text-orange-500 dark:text-orange-400 font-bold shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              NORMAL
            </button>
            <button
              onClick={() => handleModeSwitch("blueprint")}
              className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                photoMode === "blueprint"
                  ? "bg-cyan-600 text-white font-bold shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              BLUEPRINT
            </button>
          </div>
        </div>

        {/* Clean Portrait Container */}
        <div
          onClick={() => handleModeSwitch(photoMode === "normal" ? "blueprint" : "normal")}
          title="Klik foto untuk beralih mode"
          className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 dark:border-white/10 select-none shadow-md cursor-pointer group/portrait transition-all"
        >
          {/* Base Photo with Smooth Filter Transition */}
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className={`w-full h-full object-cover object-center transition-all duration-500 group-hover/portrait:scale-[1.02] ${
              photoMode === "blueprint"
                ? "filter grayscale contrast-150 invert-[0.12] sepia-[0.3] hue-rotate-[180deg] brightness-95"
                : "filter contrast-105"
            }`}
          />

          {/* Elegant Blueprint Overlay */}
          <AnimatePresence>
            {photoMode === "blueprint" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Subtle CAD Grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-40" />

                {/* Cyan Architectural Tint */}
                <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color" />

                {/* Minimalist CAD Corner Markers */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-cyan-400" />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-cyan-400" />
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-cyan-400" />
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-cyan-400" />

                {/* Blueprint Label Pill */}
                <div className="absolute top-3 left-3 font-mono text-[9px] text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/30">
                  SCHEMATIC // D4-TI
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gentle Laser Sweep on Mode Change */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: "-5%", opacity: 1 }}
                animate={{ top: "105%", opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-0.5 pointer-events-none z-20"
              >
                <div
                  className={`w-full h-full shadow-md ${
                    photoMode === "blueprint"
                      ? "bg-cyan-400 shadow-cyan-400/80"
                      : "bg-orange-500 shadow-orange-500/80"
                  }`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand Fullscreen Button on Hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(true);
            }}
            title="Perbesar foto"
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/80 hover:text-white opacity-0 group-hover/portrait:opacity-100 transition-opacity z-20 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Bottom Clean Status Strip */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between font-mono text-[10px] text-white pointer-events-none z-10">
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-slate-300">
              MALANG, ID
            </span>
          </div>
        </div>

        {/* Bio & Information Content */}
        <div className="mt-5 space-y-3">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base tracking-tight">
              {profileData.name}
            </h4>
            <p className="font-mono text-xs text-orange-500 font-semibold mt-0.5">
              {profileData.headline}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {profileData.status.subtext}
            </p>
          </div>

          {/* Email Copy Pill */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-slate-600 dark:text-slate-400 truncate max-w-[210px]">
              {profileData.contact.email}
            </span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>SALIN</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Fullscreen Photo Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-3xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl p-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  {profileData.name}
                </span>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className={`w-full h-full object-cover ${
                    photoMode === "blueprint"
                      ? "filter grayscale contrast-150 invert-[0.12] sepia-[0.3] hue-rotate-[180deg] brightness-95"
                      : "filter contrast-105"
                  }`}
                />
                {photoMode === "blueprint" && (
                  <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{profileData.status.subtext}</span>
                <span className="text-orange-400 uppercase font-bold">{photoMode} MODE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
