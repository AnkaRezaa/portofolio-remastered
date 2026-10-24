import { useState } from "react";
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
import { AdminPortal } from "./components/AdminPortal";
import { ResumeModal } from "./components/ResumeModal";
import { TerminalStreamBg } from "./components/TerminalStreamBg";
import { projectsData, ProjectItem } from "./data/projects";
import { certificatesData, CertificateItem } from "./data/certificates";

export function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Dynamic projects with localStorage persistence
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem("custom-projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...projectsData];
      } catch (e) {
        return projectsData;
      }
    }
    return projectsData;
  });

  // Dynamic certificates with localStorage persistence
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    const saved = localStorage.getItem("custom-certificates");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...certificatesData];
      } catch (e) {
        return certificatesData;
      }
    }
    return certificatesData;
  });

  const handleAddProject = (newProject: ProjectItem) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    const customOnly = updated.filter((p) => p.id.startsWith("proj-"));
    localStorage.setItem("custom-projects", JSON.stringify(customOnly));
  };

  const handleAddCertificate = (newCert: CertificateItem) => {
    const updated = [newCert, ...certificates];
    setCertificates(updated);
    const customOnly = updated.filter((c) => c.id.startsWith("cert-"));
    localStorage.setItem("custom-certificates", JSON.stringify(customOnly));
  };

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

        {/* Dynamic Content Admin Portal Modal */}
        <AdminPortal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onAddProject={handleAddProject}
          onAddCertificate={handleAddCertificate}
        />

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
