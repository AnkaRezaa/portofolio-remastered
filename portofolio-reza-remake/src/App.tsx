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
import { fetchProjects, fetchCertificates } from "./lib/supabase";

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

  // Fetch live projects and certificates from Supabase Cloud
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

  // Dynamic projects with localStorage persistence (Full CRUD: Create, Read, Update, Delete)
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem("anka-portfolio-projects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return projectsData;
      }
    }
    const legacy = localStorage.getItem("custom-projects");
    if (legacy) {
      try {
        return [...JSON.parse(legacy), ...projectsData];
      } catch (e) {}
    }
    return projectsData;
  });

  // Dynamic certificates with localStorage persistence (Full CRUD)
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    const saved = localStorage.getItem("anka-portfolio-certificates");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return certificatesData;
      }
    }
    const legacy = localStorage.getItem("custom-certificates");
    if (legacy) {
      try {
        return [...JSON.parse(legacy), ...certificatesData];
      } catch (e) {}
    }
    return certificatesData;
  });

  const handleSaveProjects = (updated: ProjectItem[]) => {
    setProjects(updated);
    localStorage.setItem("anka-portfolio-projects", JSON.stringify(updated));
  };

  const handleSaveCertificates = (updated: CertificateItem[]) => {
    setCertificates(updated);
    localStorage.setItem("anka-portfolio-certificates", JSON.stringify(updated));
  };

  const handleResetDefault = () => {
    setProjects(projectsData);
    setCertificates(certificatesData);
    localStorage.removeItem("anka-portfolio-projects");
    localStorage.removeItem("anka-portfolio-certificates");
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
