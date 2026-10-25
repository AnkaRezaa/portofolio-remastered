import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { QuickHighlights } from "./components/QuickHighlights";
import { About } from "./components/About";
import { Education } from "./components/Education";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { AdminDashboard } from "./components/AdminDashboard";
import { ResumeModal } from "./components/ResumeModal";
import { TerminalStreamBg } from "./components/TerminalStreamBg";
import { projectsData, ProjectItem } from "./data/projects";
import { certificatesData, CertificateItem } from "./data/certificates";
import {
  fetchProjects,
  fetchCertificates,
  getLocalProjects,
  getLocalCertificates,
  alignWithSavedOrderAndPins,
  STORAGE_PROJECTS,
  STORAGE_PINNED_PROJECTS,
  STORAGE_PROJECT_ORDER,
  STORAGE_CERTS,
  STORAGE_PINNED_CERTS,
  STORAGE_CERT_ORDER,
} from "./lib/supabase";

export function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.location.hash === "#admin" ||
        new URLSearchParams(window.location.search).has("admin")
      );
    }
    return false;
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Listen for route changes (e.g. hash or back/forward)
  useEffect(() => {
    const handleRouteCheck = () => {
      setIsAdminOpen(
        window.location.hash === "#admin" ||
        new URLSearchParams(window.location.search).has("admin")
      );
    };
    window.addEventListener("hashchange", handleRouteCheck);
    window.addEventListener("popstate", handleRouteCheck);
    return () => {
      window.removeEventListener("hashchange", handleRouteCheck);
      window.removeEventListener("popstate", handleRouteCheck);
    };
  }, []);

  // Secret Easter Egg Shortcut: Ctrl + Shift + A opens Admin Console in new tab
  useEffect(() => {
    const handleSecretShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        window.open("?admin=true#admin", "_blank");
      }
    };
    window.addEventListener("keydown", handleSecretShortcut);
    return () => window.removeEventListener("keydown", handleSecretShortcut);
  }, []);

  // Fetch live projects and certificates from Supabase Cloud (never wipes local pins/order)
  useEffect(() => {
    let isMounted = true;
    fetchProjects().then((items) => {
      if (isMounted && items && items.length > 0) {
        setProjects(items);
      }
    });
    fetchCertificates().then((items) => {
      if (isMounted && items && items.length > 0) {
        setCertificates(items);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic projects with localStorage & pin persistence (Full CRUD)
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    return getLocalProjects();
  });

  // Dynamic certificates with localStorage & pin persistence (Full CRUD)
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    return getLocalCertificates();
  });

  const handleSaveProjects = (updated: ProjectItem[]) => {
    const aligned = alignWithSavedOrderAndPins(
      updated,
      STORAGE_PINNED_PROJECTS,
      STORAGE_PROJECT_ORDER,
      STORAGE_PROJECTS
    );
    setProjects(aligned);
  };

  const handleSaveCertificates = (updated: CertificateItem[]) => {
    const aligned = alignWithSavedOrderAndPins(
      updated,
      STORAGE_PINNED_CERTS,
      STORAGE_CERT_ORDER,
      STORAGE_CERTS
    );
    setCertificates(aligned);
  };

  const handleResetDefault = () => {
    setProjects(projectsData);
    setCertificates(certificatesData);
    localStorage.removeItem(STORAGE_PROJECTS);
    localStorage.removeItem(STORAGE_PINNED_PROJECTS);
    localStorage.removeItem(STORAGE_PROJECT_ORDER);
    localStorage.removeItem(STORAGE_CERTS);
    localStorage.removeItem(STORAGE_PINNED_CERTS);
    localStorage.removeItem(STORAGE_CERT_ORDER);
    localStorage.removeItem("custom-projects");
    localStorage.removeItem("custom-certificates");
  };

  // Dedicated Full-Page / Tab View: Reimagined Admin Dashboard
  if (isAdminOpen) {
    return (
      <ThemeProvider>
        <AdminDashboard
          projects={projects}
          certificates={certificates}
          onSaveProjects={handleSaveProjects}
          onSaveCertificates={handleSaveCertificates}
          onResetDefault={handleResetDefault}
          onBackToSite={() => {
            if (window.history.pushState) {
              window.history.pushState(null, "", window.location.pathname);
            } else {
              window.location.hash = "";
            }
            setIsAdminOpen(false);
          }}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-slate-100 transition-colors duration-300 relative selection:bg-orange-500/20 selection:text-orange-400">
        
        {/* Moving Terminal CLI Telemetry Stream Background */}
        <TerminalStreamBg />

        {/* Floating Navigation */}
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        {/* Main Content Sections */}
        <main>
          {/* Section 1: Hero (Home) */}
          <Hero onOpenResume={() => setIsResumeOpen(true)} />

          {/* Bento Quick Highlights (Stats & Focus Pillars) */}
          <QuickHighlights />

          {/* Section 2: About Me */}
          <About />

          {/* Section 3: Education Timeline */}
          <Education />

          {/* Section 4: Services */}
          <Services />

          {/* Section 5: Projects */}
          <Projects items={projects} />

          {/* Section 6: Certificates */}
          <Certificates items={certificates} />

          {/* Section 7: Contact & Footer */}
          <Contact onOpenAdmin={() => setIsAdminOpen(true)} />
        </main>

        {/* Interactive In-Website Resume/CV Viewer Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
