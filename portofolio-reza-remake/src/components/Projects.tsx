import React, { useState, useEffect } from "react";
import { projectsData, ProjectItem } from "../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  ArrowUpRight,
  Terminal,
  ExternalLink,
  Globe,
  Pin,
  Images,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GithubIcon } from "./ui/BrandIcons";

interface ProjectsProps {
  items?: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ items = projectsData }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);

  // Reset active image index whenever a new project is selected
  useEffect(() => {
    setActiveImgIndex(0);
  }, [selectedProject?.id]);

  const categories = [
    { id: "All", label: "Semua Proyek" },
    { id: "Web", label: "Web Systems" },
    { id: "UI/UX", label: "UI/UX Design" },
    { id: "Network", label: "Jaringan Komputer" },
  ];

  // Prioritize pinned items first, then maintain order
  const sortedItems = [...items].sort((a, b) => {
    const aPinned = Boolean(a.pinned);
    const bPinned = Boolean(b.pinned);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });

  const filteredProjects =
    activeCategory === "All"
      ? sortedItems
      : sortedItems.filter((item) => item.category === activeCategory);

  return (
    <section id="project" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Clean & Minimalist */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-xs font-bold text-orange-500 tracking-wider uppercase">
              // SELECTED WORKS & ENGINEERING PORTFOLIO
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">WORKS</span>
          </h2>
        </div>

        {/* Monospace Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-slate-200 dark:border-white/10 pb-4">
          {categories.map((cat) => (
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
                  layoutId="projectCategoryPill"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-xl -z-10 shadow-md shadow-orange-500/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const numIndex = String(index + 1).padStart(2, "0");
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className={`glass-card rounded-3xl overflow-hidden border group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-sm ${
                    project.pinned
                      ? "border-orange-500/60 dark:border-orange-500/50 shadow-orange-500/10 shadow-lg ring-1 ring-orange-500/20"
                      : "border-slate-200/80 dark:border-white/10 hover:border-orange-500/40"
                  }`}
                >
                  {/* Image Container with Aspect Ratio */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Top Index, Pinned Badge & Category */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-black/60 text-white border border-white/10 backdrop-blur-md">
                          #{numIndex}
                        </span>
                        {project.pinned && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white font-mono text-[10px] font-black tracking-wider shadow-md shadow-orange-500/30 flex items-center gap-1 border border-amber-300/40">
                            <Pin className="w-2.5 h-2.5 fill-current" />
                            <span>PINNED</span>
                          </span>
                        )}
                        {project.images && project.images.length > 1 && (
                          <span className="px-2 py-0.5 rounded-lg bg-black/60 text-amber-400 font-mono text-[10px] border border-amber-400/20 backdrop-blur-md flex items-center gap-1 shadow-sm">
                            <Images className="w-3 h-3" />
                            <span>{project.images.length} Foto</span>
                          </span>
                        )}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-orange-500/90 text-white font-bold backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Review Action Button */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-mono font-bold flex items-center gap-2 shadow-xl hover:bg-orange-500 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Lihat Detail</span>
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-sans">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags & Action */}
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-500">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                            title="Buka Website Live (Demo)"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors"
                            title="Buka Repositori GitHub"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GithubIcon className="w-3 h-3" />
                            <span>Repo</span>
                          </a>
                        )}

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 inline-flex items-center gap-1 group/btn"
                        >
                          <span>INSPECT</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-dark-card rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image & Multi-Image Gallery Carousel */}
              {(() => {
                const modalImages =
                  selectedProject.images && selectedProject.images.length > 0
                    ? selectedProject.images
                    : [selectedProject.image];
                const currentImg = modalImages[activeImgIndex] || modalImages[0] || "";

                return (
                  <div className="relative w-full bg-slate-950 flex flex-col items-center justify-center border-b border-slate-200 dark:border-white/10">
                    {/* Main Active Image Display */}
                    <div className="relative w-full h-64 sm:h-96 flex items-center justify-center overflow-hidden bg-slate-950">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImg}
                          src={currentImg}
                          alt={`${selectedProject.title} preview ${activeImgIndex + 1}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="w-full h-full object-contain"
                        />
                      </AnimatePresence>

                      {/* Navigation Arrows (if multiple images) */}
                      {modalImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImgIndex((prev) =>
                                prev > 0 ? prev - 1 : modalImages.length - 1
                              );
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-orange-500 transition-colors z-20 backdrop-blur-md cursor-pointer"
                            title="Gambar Sebelumnya"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImgIndex((prev) =>
                                prev < modalImages.length - 1 ? prev + 1 : 0
                              );
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-orange-500 transition-colors z-20 backdrop-blur-md cursor-pointer"
                            title="Gambar Selanjutnya"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Top-left Indicator: Counter */}
                      {modalImages.length > 1 && (
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white font-mono text-xs border border-white/10 shadow-sm">
                          <Images className="w-3.5 h-3.5 text-orange-400" />
                          <span>
                            {activeImgIndex + 1} / {modalImages.length} Foto
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Thumbnail Strip (if multiple images) */}
                    {modalImages.length > 1 && (
                      <div className="w-full p-2.5 sm:p-3 bg-slate-900/95 border-t border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-thin">
                        {modalImages.map((img, idx) => (
                          <button
                            type="button"
                            key={`${img.slice(0, 30)}-${idx}`}
                            onClick={() => setActiveImgIndex(idx)}
                            className={`relative rounded-xl overflow-hidden h-12 sm:h-16 aspect-video shrink-0 border-2 transition-all cursor-pointer ${
                              idx === activeImgIndex
                                ? "border-orange-500 scale-105 shadow-md shadow-orange-500/30"
                                : "border-white/10 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Modal Details */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-orange-500" />
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    CATEGORY: {selectedProject.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2.5">
                    TECHNICAL SPECIFICATIONS & PROTOCOLS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-8 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center flex-wrap gap-3">
                    <span className="font-mono text-xs text-slate-400">
                      ID: {selectedProject.id}
                    </span>
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-sm shadow-emerald-500/20 hover:opacity-95 transition-all cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Kunjungi Website Live ↗</span>
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/15 hover:bg-slate-200 dark:hover:bg-white/20 shadow-sm transition-all cursor-pointer"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Repositori GitHub ↗</span>
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-dark-hover transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
