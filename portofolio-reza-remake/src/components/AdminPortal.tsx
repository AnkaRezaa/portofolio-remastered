import React, { useState } from "react";
import { ProjectItem } from "../data/projects";
import { CertificateItem } from "../data/certificates";
import { motion } from "framer-motion";
import { X, Lock, CheckCircle2, ShieldCheck, FolderPlus } from "lucide-react";
import confetti from "canvas-confetti";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (newProject: ProjectItem) => void;
  onAddCertificate: (newCert: CertificateItem) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onAddProject,
  onAddCertificate,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<"project" | "certificate">("project");

  // Project Form
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "Web" as "Web" | "UI/UX" | "Network",
    description: "",
    image: "",
    tags: "",
  });

  // Certificate Form
  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    credentialId: "",
    image: "",
    category: "Network" as "Network" | "Cloud" | "UI/UX" | "DevOps" | "General",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 atau 'reza'
    if (pinInput === "1234" || pinInput.toLowerCase() === "reza") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      image: projectForm.image || "/assets/projects/Dashboard Desktop.png",
      tags: projectForm.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onAddProject(newProj);
    confetti({ particleCount: 70, spread: 60 });
    setSuccessMessage(`Proyek "${projectForm.title}" berhasil ditambahkan!`);
    setProjectForm({
      title: "",
      category: "Web",
      description: "",
      image: "",
      tags: "",
    });
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      title: certForm.title,
      issuer: certForm.issuer,
      issueDate: certForm.issueDate || "2024",
      credentialId: certForm.credentialId,
      image: certForm.image || "/assets/certificates/sertifikat_bnsp.jpeg",
      category: certForm.category,
    };

    onAddCertificate(newCert);
    confetti({ particleCount: 70, spread: 60 });
    setSuccessMessage(`Sertifikat "${certForm.title}" berhasil ditambahkan!`);
    setCertForm({
      title: "",
      issuer: "",
      issueDate: "",
      credentialId: "",
      image: "",
      category: "Network",
    });
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Main Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-dark-card rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8 p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-dark-surface text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="max-w-sm mx-auto py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 mx-auto flex items-center justify-center border border-orange-500/20">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Admin Portal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Masukkan PIN Admin untuk menambah projek atau sertifikat terbaru (Default PIN: <code>1234</code>).
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN"
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />

              {pinError && (
                <p className="text-xs text-rose-500 font-semibold">
                  PIN Salah! Gunakan PIN: 1234
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md shadow-orange-500/20 hover:opacity-95"
              >
                Masuk ke Panel Konten
              </button>
            </form>
          </div>
        ) : (
          /* Admin Content Form */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-orange-500 font-bold">
                  Content Management
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Tambah Konten Portofolio Baru
                </h3>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/5 mb-6">
              <button
                onClick={() => setActiveTab("project")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === "project"
                    ? "bg-white dark:bg-dark-card text-orange-500 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                <span>Tambah Proyek</span>
              </button>
              <button
                onClick={() => setActiveTab("certificate")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === "certificate"
                    ? "bg-white dark:bg-dark-card text-amber-500 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Tambah Sertifikat</span>
              </button>
            </div>

            {/* Notification message */}
            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMessage}</span>
              </div>
            )}

            {activeTab === "project" ? (
              /* Add Project Form */
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Judul Proyek
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, title: e.target.value })
                    }
                    placeholder="Contoh: Aplikasi Monitoring Server IoT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Kategori
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="Web">Web Development</option>
                      <option value="UI/UX">UI/UX Design</option>
                      <option value="Network">Network & Cloud</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      URL Gambar / Path
                    </label>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, image: e.target.value })
                      }
                      placeholder="/assets/projects/nama-file.png"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tags Teknologi (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, tags: e.target.value })
                    }
                    placeholder="React, TypeScript, Tailwind CSS, API"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Deskripsi Lengkap Proyek
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Jelaskan fitur utama, peran Anda, dan hasil projek ini..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md shadow-orange-500/20 hover:opacity-95"
                >
                  Publish Proyek ke Portofolio
                </button>
              </form>
            ) : (
              /* Add Certificate Form */
              <form onSubmit={handleCreateCertificate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Sertifikasi
                  </label>
                  <input
                    type="text"
                    required
                    value={certForm.title}
                    onChange={(e) =>
                      setCertForm({ ...certForm, title: e.target.value })
                    }
                    placeholder="Contoh: Certified Network Associate"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Institusi Penerbit
                    </label>
                    <input
                      type="text"
                      required
                      value={certForm.issuer}
                      onChange={(e) =>
                        setCertForm({ ...certForm, issuer: e.target.value })
                      }
                      placeholder="Contoh: Cisco / BNSP / AWS"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Bulan / Tahun Terbit
                    </label>
                    <input
                      type="text"
                      value={certForm.issueDate}
                      onChange={(e) =>
                        setCertForm({ ...certForm, issueDate: e.target.value })
                      }
                      placeholder="Maret 2024"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Kategori
                    </label>
                    <select
                      value={certForm.category}
                      onChange={(e) =>
                        setCertForm({
                          ...certForm,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="Network">Network</option>
                      <option value="Cloud">Cloud</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="DevOps">DevOps</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Credential ID (Opsional)
                    </label>
                    <input
                      type="text"
                      value={certForm.credentialId}
                      onChange={(e) =>
                        setCertForm({
                          ...certForm,
                          credentialId: e.target.value,
                        })
                      }
                      placeholder="No. Sertifikat / ID"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md shadow-orange-500/20 hover:opacity-95"
                >
                  Publish Sertifikat ke Portofolio
                </button>
              </form>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
