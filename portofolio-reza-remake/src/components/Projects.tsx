import React, { useState } from "react";
import { projectsData, ProjectItem } from "../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, ArrowUpRight, Terminal } from "lucide-react";

interface ProjectsProps {
  items?: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ items = projectsData }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: "All", label: "Semua Proyek" },
    { id: "Web", label: "Web Systems" },
    { id: "UI/UX", label: "UI/UX Design" },
    { id: "Network", label: "Jaringan Komputer" },
  ];

  const filteredProjects =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="project" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider">
                // SELECTED WORKS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">WORKS</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Kurasi proyek pilihan mencakup implementasi full-stack web, desain prototipe sistem cerdas, dan perancangan infrastruktur jaringan.
          </p>
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
                  className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 group flex flex-col justify-between hover:border-orange-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-sm"
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

                    {/* Top Index & Category */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-lg bg-black/60 text-white border border-white/10 backdrop-blur-md">
                        #{numIndex}
                      </span>
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

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 inline-flex items-center gap-1 group/btn"
                      >
                        <span>INSPECT</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
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

              {/* Modal Image */}
              <div className="w-full max-h-96 overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>

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
                  <span className="font-mono text-xs text-slate-400">
                    ID: {selectedProject.id}
                  </span>
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
