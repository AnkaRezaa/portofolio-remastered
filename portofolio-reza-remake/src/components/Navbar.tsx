import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, ArrowUpRight, Terminal, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { cmd: "overview", path: "./home", href: "#home" },
  { cmd: "arsenal", path: "./weapons", href: "#weapons" },
  { cmd: "about", path: "./about", href: "#about" },
  { cmd: "trajectory", path: "./trajectory", href: "#education" },
  { cmd: "services", path: "./services", href: "#services" },
  { cmd: "works", path: "./works", href: "#project" },
  { cmd: "vault", path: "./vault", href: "#certificate" },
  { cmd: "contact", path: "./contact", href: "#contact" },
];

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        "home",
        "weapons",
        "about",
        "education",
        "services",
        "project",
        "certificate",
        "contact",
      ];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-xl transition-all duration-300 ${
            isScrolled
              ? "bg-white/85 dark:bg-dark-bg/85 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/40 border border-slate-200/90 dark:border-white/10"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* CLI Terminal Brand Identifier */}
          <a
            href="#home"
            className="group flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
          >
            <span className="text-orange-500 font-extrabold">&gt;_</span>
            <span className="tracking-tight group-hover:text-orange-500 transition-colors">
              anka@reza<span className="text-slate-400 dark:text-slate-600">:</span><span className="text-orange-500">~</span>
            </span>
            <span className="w-1.5 h-3.5 bg-orange-500 animate-pulse hidden sm:inline-block" />
          </a>

          {/* Minimalist Live Status Monitor */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>SYS:200_OK</span>
          </div>

          {/* Desktop CLI Directory Links */}
          <div className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {navLinks.map((link) => {
              const targetSection = link.href.substring(1);
              const isActive =
                activeSection === targetSection ||
                (targetSection === "education" && activeSection === "education") ||
                (targetSection === "project" && activeSection === "project") ||
                (targetSection === "certificate" && activeSection === "certificate");

              return (
                <a
                  key={link.cmd}
                  href={link.href}
                  className={`px-2.5 py-1 rounded-md transition-all duration-150 relative ${
                    isActive
                      ? "text-orange-600 dark:text-orange-400 font-bold bg-orange-500/10 border border-orange-500/30"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface"
                  }`}
                >
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 mr-0.5">/</span>
                  {link.cmd}
                </a>
              );
            })}
          </div>

          {/* Right Action Tools: Terminal Theme Toggle & Ping CTA */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle in CLI Button Format */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-dark-surface/80 text-slate-700 dark:text-slate-300 font-mono text-xs flex items-center gap-1.5 hover:border-orange-500/40 transition-colors shadow-sm"
              title="Toggle theme mode"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-[10px] font-bold">DARK</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-orange-500" />
                  <span className="hidden sm:inline text-[10px] font-bold">LIGHT</span>
                </>
              )}
            </button>

            {/* CV PDF In-Website Preview Modal Trigger */}
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-dark-surface/80 text-slate-700 dark:text-slate-300 font-mono text-xs hover:border-orange-500/40 hover:text-orange-500 transition-colors shadow-sm cursor-pointer"
              title="Lihat & Unduh Curriculum Vitae (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[10px] font-bold">CV.PDF</span>
            </button>

            {/* Return to Terminal Gateway */}
            <a
              href="../"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-dark-surface/80 text-slate-700 dark:text-slate-300 font-mono text-xs hover:border-orange-500/40 hover:text-orange-500 transition-colors shadow-sm"
              title="Kembali ke Linux Terminal Gateway"
            >
              <Terminal className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[10px] font-bold">TERMINAL</span>
            </a>

            {/* Direct CLI Ping CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:opacity-95 shadow-sm shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              <span>$ ping</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Terminal Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-200 font-mono text-xs"
              aria-label="Open CLI menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile CLI Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="lg:hidden fixed inset-x-4 top-16 z-50 p-5 rounded-2xl bg-white dark:bg-dark-card shadow-2xl border border-slate-200 dark:border-white/10 font-mono"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-orange-500" />
                <span className="font-bold text-slate-900 dark:text-white">
                  bash: ~/navigation
                </span>
              </div>
              <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                ONLINE
              </span>
            </div>

            {/* CLI Command Links */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.cmd}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-100/70 dark:bg-dark-surface/70 border border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-orange-500 hover:border-orange-500/40 transition-colors flex items-center justify-between"
                >
                  <span className="text-orange-500 mr-1">$</span>
                  <span className="font-bold flex-1 text-left">{link.cmd}</span>
                  <span className="text-[10px] text-slate-400">{link.path}</span>
                </a>
              ))}
            </div>

            {/* Mobile Actions: CV Preview & SSH Contact */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume?.();
                }}
                className="w-full text-center py-2.5 rounded-xl font-mono text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-dark-surface flex items-center justify-center gap-2 hover:border-orange-500/40 hover:text-orange-500 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-orange-500" />
                <span>$ cat resume.pdf (Lihat CV)</span>
              </button>
              <a
                href="../"
                className="w-full text-center py-2.5 rounded-xl font-mono text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-dark-surface flex items-center justify-center gap-2 hover:border-orange-500/40 hover:text-orange-500 transition-all"
              >
                <Terminal className="w-4 h-4 text-orange-500" />
                <span>$ exit (Ke Linux Terminal)</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 block shadow-md shadow-orange-500/20"
              >
                $ ssh contact@reza
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
