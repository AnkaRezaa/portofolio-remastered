import React, { useState } from "react";
import { educationData, EducationItem } from "../data/education";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Sparkles,
  Award,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export const Education: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<EducationItem>(
    educationData[0]
  );
  const [activeTab, setActiveTab] = useState<string>(educationData[0].id);

  const handleSelect = (item: EducationItem) => {
    setSelectedMilestone(item);
    setActiveTab(item.id);
  };

  return (
    <section
      id="education"
      className="py-24 relative border-t border-slate-200/80 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider">
                // ACADEMIC EVOLUTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              ACADEMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">EVOLUTION</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Perjalanan pendidikan vokasi dan kejuruan dari dasar hingga jenjang politeknik, dilengkapi lambang resmi almamater dan keahlian yang diperoleh.
          </p>
        </div>

        {/* Interactive Chronological Stepper Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {educationData.map((item, idx) => {
            const stepNum = String(educationData.length - idx).padStart(2, "0");
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold whitespace-nowrap transition-all border relative ${
                  isSelected
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25"
                    : "bg-slate-100/80 dark:bg-dark-card/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-orange-500/40 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className={isSelected ? "text-orange-200" : "text-orange-500"}>
                  #{stepNum}
                </span>
                <span>{item.institution.split(" ")[0]} {item.institution.split(" ")[1]}</span>
                {item.current && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Grid: Timeline Stream (Left) & Spotlight Inspector (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Animated Timeline Stream with Logos */}
          <div className="lg:col-span-7 relative">
            {/* Glowing vertical spine */}
            <div className="absolute left-7 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-500 via-orange-500 to-transparent opacity-30 dark:opacity-40" />

            <div className="space-y-6">
              {educationData.map((item, index) => {
                const stepIndex = String(educationData.length - index).padStart(2, "0");
                const isSelected = activeTab === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    onClick={() => handleSelect(item)}
                    className={`relative pl-16 cursor-pointer group transition-all duration-300 ${
                      isSelected ? "scale-[1.01]" : ""
                    }`}
                  >
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute left-5 top-7 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all ${
                        isSelected
                          ? "bg-orange-500 border-white shadow-lg shadow-orange-500/50 scale-125"
                          : "bg-white dark:bg-dark-bg border-orange-500/60 group-hover:border-orange-500"
                      }`}
                    >
                      {item.current && (
                        <span className="absolute -inset-1 rounded-full bg-orange-400 animate-ping opacity-75" />
                      )}
                    </div>

                    {/* Timeline Card */}
                    {/* Timeline Card */}
                    <div
                      className={`glass-card p-5 sm:p-6 rounded-3xl border transition-all duration-300 shadow-sm relative overflow-hidden ${
                        isSelected
                          ? "border-orange-500 ring-1 ring-orange-500/30 bg-orange-500/5 dark:bg-orange-500/5 shadow-md shadow-orange-500/10"
                          : "border-slate-200/80 dark:border-white/10 hover:border-orange-500/40"
                      }`}
                    >
                      <div className="flex items-start gap-4 sm:gap-5">
                        
                        {/* Almamater Official Logo Container */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 border border-slate-200 dark:border-white/20 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <img
                            src={item.logo}
                            alt={item.institution}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>

                        {/* Card Text Information */}
                        <div className="min-w-0 flex-1">
                          
                          {/* Period & Badges */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{item.period}</span>
                            </span>

                            <div className="flex items-center gap-1.5">
                              {item.badge && (
                                <span
                                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                    item.current
                                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 animate-pulse"
                                      : "bg-slate-100 dark:bg-dark-surface text-slate-500 dark:text-slate-400"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <span className="font-mono text-[11px] font-bold text-slate-400">
                                #{stepIndex}
                              </span>
                            </div>
                          </div>

                          {/* Institution & Degree */}
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                            {item.institution}
                          </h3>

                          {item.degree && (
                            <p className="text-xs sm:text-sm font-mono font-semibold text-gradient mt-0.5">
                              {item.degree}
                            </p>
                          )}

                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                            <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                            <span>{item.location}</span>
                          </div>

                          {/* Skills Pills */}
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-200 dark:border-white/5">
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100/70 dark:bg-dark-surface/70 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-white/5"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Spotlight Inspector Panel */}
          <div className="lg:col-span-5 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMilestone.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-orange-500/30 dark:border-orange-500/20 shadow-2xl relative overflow-hidden"
              >
                {/* Backlight Warm Halo */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

                {/* Spotlight Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-orange-500" />
                    <span className="font-mono text-xs font-bold text-orange-500 uppercase tracking-wider">
                      Detail Almamater
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-orange-500">
                    {selectedMilestone.period}
                  </span>
                </div>

                {/* Large Logo & Institution Details */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2.5 border border-slate-200 dark:border-white/20 shadow-lg flex items-center justify-center shrink-0">
                    <img
                      src={selectedMilestone.logo}
                      alt={selectedMilestone.institution}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                      {selectedMilestone.institution}
                    </h4>
                    {selectedMilestone.degree && (
                      <p className="font-mono text-xs font-bold text-orange-500 mt-0.5">
                        {selectedMilestone.degree}
                      </p>
                    )}
                    <p className="font-mono text-[11px] text-slate-500 mt-0.5">
                      {selectedMilestone.period} • {selectedMilestone.location}
                    </p>
                  </div>
                </div>

                {/* Description Narrative */}
                <div className="mt-6">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                    Fokus & Gambaran Umum
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                    {selectedMilestone.description}
                  </p>
                </div>

                {/* Accreditation & Badge */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-100/70 dark:bg-dark-surface/70 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] text-slate-400 uppercase">
                      Status Akademik
                    </p>
                    <p className="font-mono text-xs font-bold text-slate-800 dark:text-white mt-0.5">
                      {selectedMilestone.accreditation || "Terakreditasi Resmi"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-orange-500 font-mono text-xs font-bold">
                    <Award className="w-4 h-4" />
                    <span>{selectedMilestone.badge || "Verified"}</span>
                  </div>
                </div>

                {/* Acquired Technical Skills Matrix */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2.5">
                    Kompetensi yang Dipelajari
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMilestone.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-mono text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ChevronRight className="w-3 h-3" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Enrolled Footnote */}
                {selectedMilestone.current && (
                  <div className="mt-6 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-emerald-500 font-mono text-xs">
                    <Sparkles className="w-4 h-4 animate-spin-slow shrink-0" />
                    <span>Sedang Aktif Menempuh Studi • D4 Teknologi Informasi</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
