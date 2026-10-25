import { createClient } from "@supabase/supabase-js";
import { ProjectItem, projectsData } from "../data/projects";
import { CertificateItem, certificatesData } from "../data/certificates";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hkcrdpzyrgchkmmuwgrl.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrY3JkcHp5cmdjaGttbXV3Z3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5Mjg5MTAsImV4cCI6MjEwODUwNDkxMH0.MdlmDGnnzK_0waC7n4UOg7ORtXDPa56OJUSikTKByNk";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/* ==========================================================================
   PROJECTS (CRUD)
   ========================================================================== */

interface DbProjectRow {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  demo_url?: string | null;
  github_url?: string | null;
  featured?: boolean;
}

function mapRowToProject(row: DbProjectRow): ProjectItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category as ProjectItem["category"],
    description: row.description || "",
    image: row.image || "",
    tags: Array.isArray(row.tags) ? row.tags : [],
    demoUrl: row.demo_url || undefined,
    githubUrl: row.github_url || undefined,
    featured: Boolean(row.featured),
  };
}

function mapProjectToRow(item: ProjectItem): DbProjectRow {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    description: item.description,
    image: item.image,
    tags: item.tags || [],
    demo_url: item.demoUrl || null,
    github_url: item.githubUrl || null,
    featured: Boolean(item.featured),
  };
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Supabase fetchProjects error, falling back to local:", error.message);
      return getLocalProjects();
    }

    if (data && data.length > 0) {
      const mapped = data.map(mapRowToProject);
      localStorage.setItem("anka-portfolio-projects", JSON.stringify(mapped));
      return mapped;
    }

    return getLocalProjects();
  } catch (err) {
    console.error("fetchProjects exception:", err);
    return getLocalProjects();
  }
}

export async function saveProject(project: ProjectItem): Promise<boolean> {
  try {
    const row = mapProjectToRow(project);
    const { error } = await supabase.from("projects").upsert(row, { onConflict: "id" });
    if (error) {
      console.error("Supabase saveProject error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("saveProject exception:", err);
    return false;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteProject error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("deleteProject exception:", err);
    return false;
  }
}

function getLocalProjects(): ProjectItem[] {
  const saved = localStorage.getItem("anka-portfolio-projects");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return projectsData;
}

/* ==========================================================================
   CERTIFICATES (CRUD)
   ========================================================================== */

interface DbCertRow {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_id?: string | null;
  image: string;
  category: string;
}

function mapRowToCert(row: DbCertRow): CertificateItem {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    issueDate: row.issue_date,
    credentialId: row.credential_id || undefined,
    image: row.image || "",
    category: row.category as CertificateItem["category"],
  };
}

function mapCertToRow(item: CertificateItem): DbCertRow {
  return {
    id: item.id,
    title: item.title,
    issuer: item.issuer,
    issue_date: item.issueDate,
    credential_id: item.credentialId || null,
    image: item.image,
    category: item.category,
  };
}

export async function fetchCertificates(): Promise<CertificateItem[]> {
  try {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Supabase fetchCertificates error, falling back to local:", error.message);
      return getLocalCertificates();
    }

    if (data && data.length > 0) {
      const mapped = data.map(mapRowToCert);
      localStorage.setItem("anka-portfolio-certificates", JSON.stringify(mapped));
      return mapped;
    }

    return getLocalCertificates();
  } catch (err) {
    console.error("fetchCertificates exception:", err);
    return getLocalCertificates();
  }
}

export async function saveCertificate(cert: CertificateItem): Promise<boolean> {
  try {
    const row = mapCertToRow(cert);
    const { error } = await supabase.from("certificates").upsert(row, { onConflict: "id" });
    if (error) {
      console.error("Supabase saveCertificate error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("saveCertificate exception:", err);
    return false;
  }
}

export async function deleteCertificate(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("certificates").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteCertificate error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("deleteCertificate exception:", err);
    return false;
  }
}

function getLocalCertificates(): CertificateItem[] {
  const saved = localStorage.getItem("anka-portfolio-certificates");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return certificatesData;
}

/* ==========================================================================
   ADMIN SETTINGS (Password & Cloud Config)
   ========================================================================== */

export async function getAdminPassword(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "admin_password")
      .single();

    if (!error && data?.value) {
      localStorage.setItem("reza_admin_pwd", data.value);
      return data.value;
    }
  } catch (err) {
    console.warn("Could not fetch remote password, using local:", err);
  }
  return localStorage.getItem("reza_admin_pwd") || "reza2026";
}

export async function updateAdminPassword(newPassword: string): Promise<boolean> {
  try {
    localStorage.setItem("reza_admin_pwd", newPassword);
    const { error } = await supabase
      .from("admin_settings")
      .upsert({ key: "admin_password", value: newPassword, updated_at: new Date().toISOString() });

    if (error) {
      console.error("Supabase updateAdminPassword error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("updateAdminPassword exception:", err);
    return false;
  }
}
