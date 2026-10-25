import React, { useState } from "react";
import { ProjectItem } from "../data/projects";
import { CertificateItem, CertificateCategory } from "../data/certificates";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  FolderPlus,
  ShieldCheck,
  KeyRound,
  Search,
  Globe,
  LogOut,
  RotateCcw,
  Cloud,
  Loader2,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  saveProject,
  deleteProject,
  saveCertificate,
  deleteCertificate,
  getAdminPassword,
  updateAdminPassword,
} from "../lib/supabase";
import { ImageUploadInput } from "./ImageUploadInput";

interface AdminDashboardProps {
  projects: ProjectItem[];
  certificates: CertificateItem[];
  onSaveProjects: (updated: ProjectItem[]) => void;
  onSaveCertificates: (updated: CertificateItem[]) => void;
  onResetDefault: () => void;
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  certificates,
  onSaveProjects,
  onSaveCertificates,
  onResetDefault,
  onBackToSite,
}) => {
  // Authentication State: Always require master password on every visit
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // Active Section Tab
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "security">("projects");
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Search queries
  const [projectSearch, setProjectSearch] = useState("");
  const [certSearch, setCertSearch] = useState("");
  const [projectCatFilter, setProjectCatFilter] = useState<string>("All");

  // Project Form State (Add / Edit)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "Web" as "Web" | "UI/UX" | "Network",
    demoUrl: "",
    githubUrl: "",
    image: "",
    tags: "",
    description: "",
  });

  // Certificate Form State (Add / Edit)
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    credentialId: "",
    image: "",
    category: "Professional" as CertificateCategory,
  });

  // Security Form State (Change Password)
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Loading states for Cloud Operations
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isSavingCert, setIsSavingCert] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Helper notification toaster
  const showToast = (text: string, type: "success" | "error" = "success") => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  // Login handler with Supabase Cloud check
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError("");
    try {
      const storedPwd = await getAdminPassword();
      if (passwordInput === storedPwd) {
        setIsAuthenticated(true);
        setPasswordInput("");
        confetti({ particleCount: 50, spread: 60 });
      } else {
        setAuthError("Kata sandi otorisasi tidak valid. Akses ditolak.");
      }
    } catch {
      setAuthError("Gagal menghubungi server database. Periksa koneksi internet.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    showToast("Anda telah keluar dari sesi admin.");
  };

  // ==========================================
  // PROJECT CRUD OPERATIONS
  // ==========================================

  // Populate form for editing
  const handleStartEditProject = (item: ProjectItem) => {
    setEditingProjectId(item.id);
    setProjectForm({
      title: item.title,
      category: item.category === "All" ? "Web" : item.category,
      demoUrl: item.demoUrl || "",
      githubUrl: item.githubUrl || "",
      image: item.image,
      tags: item.tags.join(", "),
      description: item.description,
    });
    // Smooth scroll to form
    const formEl = document.getElementById("projectFormSection");
    if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: "",
      category: "Web",
      demoUrl: "",
      githubUrl: "",
      image: "",
      tags: "",
      description: "",
    });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      showToast("Judul proyek tidak boleh kosong!", "error");
      return;
    }

    const tagsArray = projectForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setIsSavingProject(true);
    try {
      if (editingProjectId) {
        // UPDATE existing project
        const updatedItem: ProjectItem = {
          id: editingProjectId,
          title: projectForm.title.trim(),
          category: projectForm.category,
          demoUrl: projectForm.demoUrl.trim() || undefined,
          githubUrl: projectForm.githubUrl.trim() || undefined,
          image: projectForm.image.trim() || "/assets/projects/Dashboard Desktop.png",
          tags: tagsArray.length > 0 ? tagsArray : ["Web"],
          description: projectForm.description.trim(),
        };

        const updatedList = projects.map((p) =>
          p.id === editingProjectId ? updatedItem : p
        );

        onSaveProjects(updatedList);
        await saveProject(updatedItem);
        showToast(`Proyek "${projectForm.title}" berhasil diperbarui di Cloud Supabase!`);
        handleCancelEditProject();
      } else {
        // CREATE new project
        const newProject: ProjectItem = {
          id: `proj-${Date.now()}`,
          title: projectForm.title.trim(),
          category: projectForm.category,
          demoUrl: projectForm.demoUrl.trim() || undefined,
          githubUrl: projectForm.githubUrl.trim() || undefined,
          image: projectForm.image.trim() || "/assets/projects/Dashboard Desktop.png",
          tags: tagsArray.length > 0 ? tagsArray : ["Web"],
          description: projectForm.description.trim(),
        };

        onSaveProjects([newProject, ...projects]);
        await saveProject(newProject);
        showToast(`Proyek "${newProject.title}" berhasil disimpan ke Cloud Supabase!`);
        handleCancelEditProject();
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan ke cloud. Coba periksa koneksi.", "error");
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus proyek "${title}" dari database cloud?`)) {
      const updatedList = projects.filter((p) => p.id !== id);
      onSaveProjects(updatedList);
      await deleteProject(id);
      showToast(`Proyek "${title}" telah dihapus.`);
      if (editingProjectId === id) handleCancelEditProject();
    }
  };

  // ==========================================
  // CERTIFICATE CRUD OPERATIONS
  // ==========================================

  const handleStartEditCert = (item: CertificateItem) => {
    setEditingCertId(item.id);
    setCertForm({
      title: item.title,
      issuer: item.issuer,
      issueDate: item.issueDate,
      credentialId: item.credentialId || "",
      image: item.image,
      category: item.category,
    });
    const formEl = document.getElementById("certFormSection");
    if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEditCert = () => {
    setEditingCertId(null);
    setCertForm({
      title: "",
      issuer: "",
      issueDate: "",
      credentialId: "",
      image: "",
      category: "Network",
    });
  };

  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title.trim() || !certForm.issuer.trim()) {
      showToast("Nama sertifikat dan penerbit wajib diisi!", "error");
      return;
    }

    setIsSavingCert(true);
    try {
      if (editingCertId) {
        // UPDATE certificate
        const updatedItem: CertificateItem = {
          id: editingCertId,
          title: certForm.title.trim(),
          issuer: certForm.issuer.trim(),
          issueDate: certForm.issueDate.trim() || "2024",
          credentialId: certForm.credentialId.trim() || undefined,
          image: certForm.image.trim() || "/assets/certificates/sertifikat_bnsp.jpeg",
          category: certForm.category,
        };

        const updatedList = certificates.map((c) =>
          c.id === editingCertId ? updatedItem : c
        );

        onSaveCertificates(updatedList);
        await saveCertificate(updatedItem);
        showToast(`Sertifikat "${certForm.title}" berhasil diperbarui di Cloud Supabase!`);
        handleCancelEditCert();
      } else {
        // CREATE certificate
        const newCert: CertificateItem = {
          id: `cert-${Date.now()}`,
          title: certForm.title.trim(),
          issuer: certForm.issuer.trim(),
          issueDate: certForm.issueDate.trim() || "2024",
          credentialId: certForm.credentialId.trim() || undefined,
          image: certForm.image.trim() || "/assets/certificates/sertifikat_bnsp.jpeg",
          category: certForm.category,
        };

        onSaveCertificates([newCert, ...certificates]);
        await saveCertificate(newCert);
        showToast(`Sertifikat "${newCert.title}" berhasil disimpan ke Cloud Supabase!`);
        handleCancelEditCert();
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan sertifikat ke cloud.", "error");
    } finally {
      setIsSavingCert(false);
    }
  };

  const handleDeleteCertificate = async (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus sertifikat "${title}" dari database cloud?`)) {
      const updatedList = certificates.filter((c) => c.id !== id);
      onSaveCertificates(updatedList);
      await deleteCertificate(id);
      showToast(`Sertifikat "${title}" telah dihapus.`);
      if (editingCertId === id) handleCancelEditCert();
    }
  };

  // ==========================================
  // CHANGE PASSWORD HANDLER
  // ==========================================
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPassword(true);

    try {
      const storedPwd = await getAdminPassword();

      if (securityForm.currentPassword !== storedPwd) {
        showToast("Kata sandi saat ini salah!", "error");
        return;
      }
      if (securityForm.newPassword.length < 5) {
        showToast("Kata sandi baru minimal 5 karakter!", "error");
        return;
      }
      if (securityForm.newPassword !== securityForm.confirmPassword) {
        showToast("Konfirmasi kata sandi baru tidak cocok!", "error");
        return;
      }

      const success = await updateAdminPassword(securityForm.newPassword);
      if (success) {
        setSecurityForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        showToast("Kata sandi admin berhasil diperbarui secara rahasia di Cloud Supabase!");
      } else {
        showToast("Gagal memperbarui di database cloud. Coba lagi.", "error");
      }
    } catch {
      showToast("Terjadi kendala saat update password ke cloud.", "error");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Filtered lists
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(projectSearch.toLowerCase()));
    const matchesCategory =
      projectCatFilter === "All" || p.category === projectCatFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredCertificates = certificates.filter((c) => {
    return (
      c.title.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.issuer.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(certSearch.toLowerCase())
    );
  });

  // ==========================================
  // 1. AUTHENTICATION VIEW (MASKED & SECRET)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 selection:bg-orange-500/20 font-mono relative overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 mx-auto flex items-center justify-center border border-orange-500/20 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-orange-500 uppercase">
                SECURITY CHECKPOINT
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                RezaOS Admin Console
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Masukkan kata sandi otorisasi rahasia untuk mengelola konten dan proyek portofolio.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoFocus
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (authError) setAuthError("");
                }}
                placeholder="••••••••••••"
                className="w-full px-4 py-3.5 pr-12 rounded-xl bg-slate-950/80 border border-white/10 text-white font-mono text-center text-base tracking-widest focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                title={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Sandi ke Cloud...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Buka Akses Console</span>
                </>
              )}
            </button>
          </form>

          {/* Back to main website */}
          <div className="pt-4 border-t border-white/10 text-center">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-orange-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Web Portofolio</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. MAIN FULL-PAGE DASHBOARD EXPERIENCE
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/20">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Terminal Identifier */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-mono transition-all"
              title="Kembali ke Portofolio Pengunjung"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-orange-500" />
              <span>Web Utama</span>
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-white">
              <span className="text-orange-500">&gt;_</span>
              <span>anka@reza-station:~/admin-console</span>
            </div>
          </div>

          {/* Quick Metrics & Logout */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>SUPABASE:CONNECTED</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold"
              title="Keluar dari sesi admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 right-4 sm:right-8 z-50 p-4 rounded-2xl shadow-2xl border text-xs font-mono flex items-center gap-2.5 ${
              notification.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300"
                : "bg-rose-950/90 border-rose-500/30 text-rose-300"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === "projects"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FolderPlus className="w-4 h-4" />
              <span>Proyek Portofolio ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("certificates")}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === "certificates"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sertifikasi ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === "security"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Keamanan Sandi</span>
            </button>
          </div>

          <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
            <span>Penyimpanan:</span>
            <span className="text-emerald-400 font-bold">LocalStorage Browser</span>
          </div>
        </div>

        {/* ====================================================
            TAB 1: PROJECTS FULL CRUD
            ==================================================== */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            {/* Form Section (Create / Update) */}
            <div
              id="projectFormSection"
              className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-orange-500 font-bold tracking-wider">
                    {editingProjectId ? "UPDATE MODE" : "CREATION MODE"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {editingProjectId
                      ? `Edit Proyek: ${projectForm.title}`
                      : "Tambah Proyek Baru ke Portofolio"}
                  </h3>
                </div>

                {editingProjectId && (
                  <button
                    onClick={handleCancelEditProject}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProject} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Judul Proyek <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="Contoh: Hotelier Dashboard Management"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Kategori Proyek
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, category: e.target.value as any })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="Web">Web Development</option>
                      <option value="UI/UX">UI/UX Design</option>
                      <option value="Network">Network & Cloud Infrastructure</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Website Link (Optional) - HIGHLIGHTED */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Link Website / Live Demo (Opsional)</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-normal">Tampil tombol live</span>
                    </label>
                    <input
                      type="url"
                      value={projectForm.demoUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                      placeholder="https://aplikasi-saya.vercel.app"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-mono text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
                    />
                  </div>

                  {/* GitHub Repo Link (Optional) */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Link Repositori GitHub (Opsional)
                    </label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/AnkaRezaa/nama-repo"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-orange-500 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Tags Teknologi (Pisahkan koma)
                  </label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    placeholder="React, TypeScript, Tailwind, REST API"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-orange-500 placeholder:text-slate-600"
                  />
                </div>

                {/* Project Image: Drag & Drop File Upload & URL with Live Preview */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/40 border border-white/10">
                  <ImageUploadInput
                    label="Gambar / Thumbnail Dokumen Proyek (JPG, PNG, PDF)"
                    value={projectForm.image}
                    onChange={(newImg) => setProjectForm({ ...projectForm, image: newImg })}
                    placeholder="/assets/projects/hotelier.png atau https://..."
                    previewAspect="video"
                    helpText="Pilih foto/screenshot atau file PDF dokumen proyek. Halaman 1 PDF otomatis dirender menjadi gambar thumbnail!"
                    docTitle={projectForm.title || "Dokumen Proyek"}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Deskripsi Lengkap Proyek <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Jelaskan tujuan proyek, teknologi yang digunakan, dan fitur utama..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSavingProject}
                    className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSavingProject ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Menyimpan ke Cloud Supabase...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{editingProjectId ? "Simpan Perubahan Proyek" : "Publish Proyek ke Portofolio"}</span>
                      </>
                    )}
                  </button>

                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={handleCancelEditProject}
                      className="px-5 py-3 rounded-xl font-mono text-xs font-bold bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Project List Section (Read / Update / Delete) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Daftar Semua Proyek ({filteredProjects.length})</h3>
                  <p className="text-xs text-slate-400">Kelola, edit, atau hapus proyek yang tampil di website utama.</p>
                </div>

                {/* Search Bar & Category Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder="Cari proyek..."
                      className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 font-mono w-48"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 font-mono text-xs">
                    {["All", "Web", "UI/UX", "Network"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProjectCatFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          projectCatFilter === cat
                            ? "bg-orange-500 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects Grid Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-500/30 transition-all space-y-3"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 mb-3 border border-white/5">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/assets/projects/Dashboard Desktop.png";
                          }}
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold">
                          {proj.category}
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm line-clamp-1">{proj.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{proj.description}</p>

                      {/* Live Link Indicator */}
                      {proj.demoUrl && (
                        <div className="mt-2.5 flex items-center gap-1.5">
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold hover:bg-emerald-500/20 transition-colors"
                          >
                            <Globe className="w-3 h-3" />
                            <span className="line-clamp-1">Website Live ↗</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Actions: Edit & Delete */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                      <span className="text-[10px] text-slate-500">ID: {proj.id}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEditProject(proj)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-orange-400 hover:border-orange-500/30 transition-all flex items-center gap-1 text-[11px]"
                          title="Edit Proyek"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-[11px]"
                          title="Hapus Proyek"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-white/5 text-slate-500 font-mono text-xs">
                  Tidak ada proyek yang sesuai dengan pencarian Anda.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 2: CERTIFICATES FULL CRUD
            ==================================================== */}
        {activeTab === "certificates" && (
          <div className="space-y-8">
            {/* Certificate Form */}
            <div
              id="certFormSection"
              className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-500 font-bold tracking-wider">
                    {editingCertId ? "UPDATE MODE" : "CREATION MODE"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {editingCertId
                      ? `Edit Sertifikasi: ${certForm.title}`
                      : "Tambah Sertifikat / Lisensi Baru"}
                  </h3>
                </div>

                {editingCertId && (
                  <button
                    onClick={handleCancelEditCert}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveCertificate} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Nama Sertifikasi <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      placeholder="Contoh: Certified Network Associate"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Institusi Penerbit <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      placeholder="Cisco / BNSP / AWS / Dicoding"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Kategori
                    </label>
                    <select
                      value={certForm.category}
                      onChange={(e) => setCertForm({ ...certForm, category: e.target.value as CertificateCategory })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="Professional">Sertifikasi Profesional / Lisensi</option>
                      <option value="Competition">Lomba & Hackathon</option>
                      <option value="Training">Pelatihan & Workshop / Bootcamp</option>
                      <option value="Course">Kursus & Spesialisasi Online</option>
                      <option value="Network">Jaringan Komputer (Network)</option>
                      <option value="Cloud">Cloud Infrastructure</option>
                      <option value="UI/UX">UI/UX Design</option>
                      <option value="DevOps">DevOps Engineering</option>
                      <option value="General">Umum / Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      Tahun / Tanggal Terbit
                    </label>
                    <input
                      type="text"
                      value={certForm.issueDate}
                      onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                      placeholder="Maret 2024"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      ID Kredensial (Opsional)
                    </label>
                    <input
                      type="text"
                      value={certForm.credentialId}
                      onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                      placeholder="No. Sertifikat"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Certificate Image: File Upload & URL with Live Preview */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/40 border border-white/10">
                  <ImageUploadInput
                    label="File / Gambar / PDF Sertifikat"
                    value={certForm.image}
                    onChange={(newImg) => setCertForm({ ...certForm, image: newImg })}
                    placeholder="/assets/certificates/sertifikat_bnsp.jpeg atau https://..."
                    previewAspect="cert"
                    helpText="Pilih scan sertifikat (JPG, PNG) atau dokumen PDF sertifikat. Halaman 1 PDF otomatis dirender menjadi gambar thumbnail!"
                    docTitle={certForm.title || "Sertifikat"}
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSavingCert}
                    className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSavingCert ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Menyimpan ke Cloud Supabase...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{editingCertId ? "Simpan Perubahan Sertifikat" : "Publish Sertifikat"}</span>
                      </>
                    )}
                  </button>

                  {editingCertId && (
                    <button
                      type="button"
                      onClick={handleCancelEditCert}
                      className="px-5 py-3 rounded-xl font-mono text-xs font-bold bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Certificates List */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Daftar Sertifikasi ({filteredCertificates.length})</h3>
                  <p className="text-xs text-slate-400">Daftar kredensial dan lisensi yang tampil di bagian Vault.</p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    placeholder="Cari sertifikat..."
                    className="pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 font-mono w-52"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCertificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                          {cert.category}
                        </span>
                        <span className="text-slate-400">{cert.issueDate}</span>
                      </div>

                      <h4 className="font-bold text-white text-sm line-clamp-1">{cert.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">Penerbit: {cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-[10px] text-slate-500 font-mono mt-1">ID: {cert.credentialId}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                      <span className="text-[10px] text-slate-500">ID: {cert.id}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEditCert(cert)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-all flex items-center gap-1 text-[11px]"
                          title="Edit Sertifikat"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCertificate(cert.id, cert.title)}
                          className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-[11px]"
                          title="Hapus Sertifikat"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 3: SECURITY & SETTINGS
            ==================================================== */}
        {activeTab === "security" && (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Change Password Card */}
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-orange-500 font-bold tracking-wider">
                  CONFIDENTIAL CREDENTIALS
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Ubah Kata Sandi Admin Rahasia
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Kata sandi baru akan disimpan secara aman di browser Anda dan menggantikan sandi lama.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Kata Sandi Saat Ini
                  </label>
                  <input
                    type="password"
                    required
                    value={securityForm.currentPassword}
                    onChange={(e) =>
                      setSecurityForm({ ...securityForm, currentPassword: e.target.value })
                    }
                    placeholder="Masukkan sandi saat ini"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="relative">
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Kata Sandi Baru (Min. 5 karakter)
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={securityForm.newPassword}
                    onChange={(e) =>
                      setSecurityForm({ ...securityForm, newPassword: e.target.value })
                    }
                    placeholder="Masukkan sandi baru"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-8 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={securityForm.confirmPassword}
                    onChange={(e) =>
                      setSecurityForm({ ...securityForm, confirmPassword: e.target.value })
                    }
                    placeholder="Ulangi sandi baru"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="w-full py-3 rounded-xl font-mono text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-md shadow-orange-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isUpdatingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan Kata Sandi ke Cloud...</span>
                    </>
                  ) : (
                    <span>Simpan Kata Sandi Baru ke Cloud</span>
                  )}
                </button>
              </form>
            </div>

            {/* Reset to Factory Defaults */}
            <div className="bg-rose-950/20 border border-rose-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
              <div>
                <h4 className="text-base font-bold text-rose-400 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Konten ke Pengaturan Awal (Default)</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Jika Anda ingin mengembalikan daftar proyek dan sertifikasi ke data bawaan awal, Anda dapat menekan tombol di bawah. Perubahan khusus Anda akan direset.
                </p>
              </div>

              <button
                onClick={() => {
                  if (window.confirm("Apakah Anda yakin ingin me-reset seluruh proyek dan sertifikat ke data bawaan awal?")) {
                    onResetDefault();
                    showToast("Seluruh data telah di-reset ke pengaturan awal.");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all font-mono text-xs font-bold"
              >
                Reset Semua Data ke Default
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
