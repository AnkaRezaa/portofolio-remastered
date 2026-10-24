import React from "react";
import { servicesData } from "../data/services";
import { motion } from "framer-motion";
import {
  Layout,
  Server,
  Network,
  Smartphone,
  Database,
  Headphones,
  CheckCircle,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { FigmaIcon } from "./ui/BrandIcons";

export const Services: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Figma":
        return <FigmaIcon className="w-5 h-5 text-orange-500" />;
      case "Layout":
        return <Layout className="w-5 h-5 text-orange-500" />;
      case "Server":
        return <Server className="w-5 h-5 text-amber-500" />;
      case "Network":
        return <Network className="w-5 h-5 text-orange-400" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-rose-500" />;
      case "Database":
        return <Database className="w-5 h-5 text-amber-400" />;
      case "Headphones":
        return <Headphones className="w-5 h-5 text-orange-500" />;
      case "CheckCircle":
        return <CheckCircle className="w-5 h-5 text-rose-400" />;
      default:
        return <Wrench className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-slate-100/50 dark:bg-dark-surface/40 border-t border-b border-slate-200/80 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider">
                // CAPABILITIES & SERVICES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              SERVICES & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">EXPERTISE</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Spektrum layanan menyeluruh dari perancangan pengalaman digital, rekayasa kode front-end/back-end, hingga tata kelola jaringan komputer.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const numIndex = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-orange-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Card Index & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                      /{numIndex}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Tags & Arrow */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200 dark:border-white/5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-end text-[11px] font-mono text-slate-400 group-hover:text-orange-500 transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
