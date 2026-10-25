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

// Storage keys for persistent pins & custom ordering
export const STORAGE_PROJECTS = "anka-portfolio-projects";
export const STORAGE_PINNED_PROJECTS = "anka-pinned-projects";
export const STORAGE_PROJECT_ORDER = "anka-project-order";

export const STORAGE_CERTS = "anka-portfolio-certificates";
export const STORAGE_PINNED_CERTS = "anka-pinned-certificates";
export const STORAGE_CERT_ORDER = "anka-certificate-order";

/**
 * Ensures items maintain pinned priority (pinned cards always on top)
 * and preserve user-defined custom ordering across refreshes and cloud syncs.
 */
export function alignWithSavedOrderAndPins<T extends { id: string; pinned?: boolean }>(
  items: T[],
  pinnedStorageKey: string,
  orderStorageKey: string,
  localItemsStorageKey: string
): T[] {
  if (typeof window === "undefined") return items;

  const pinnedSet = new Set<string>();
  const orderList: string[] = [];

  // 1. Read explicitly stored pinned IDs
  try {
    const savedPins = localStorage.getItem(pinnedStorageKey);
    if (savedPins) {
      const parsedPins: string[] = JSON.parse(savedPins);
      parsedPins.forEach((id) => pinnedSet.add(id));
    }
  } catch (e) {}

  // 2. Read explicitly stored ordering IDs
  try {
    const savedOrder = localStorage.getItem(orderStorageKey);
    if (savedOrder) {
      const parsedOrder: string[] = JSON.parse(savedOrder);
      parsedOrder.forEach((id) => orderList.push(id));
    }
  } catch (e) {}

  // 3. Fallback: inspect any pinned items already saved in local full list
  try {
    const savedLocal = localStorage.getItem(localItemsStorageKey);
    if (savedLocal) {
      const parsedLocal: T[] = JSON.parse(savedLocal);
      parsedLocal.forEach((item) => {
        if (item.pinned) pinnedSet.add(item.id);
        if (!orderList.includes(item.id)) orderList.push(item.id);
      });
    }
  } catch (e) {}

  // 4. Also inspect current items passed in (e.g. from cloud or default data)
  items.forEach((item) => {
    if (item.pinned) pinnedSet.add(item.id);
    if (!orderList.includes(item.id)) orderList.push(item.id);
  });

  // 5. Annotate every item with its correct pinned status
  const itemsWithPinned = items.map((item) => {
    const isPinned = pinnedSet.has(item.id) || Boolean(item.pinned);
    return {
      ...item,
      pinned: isPinned,
    };
  });

  // 6. Build index map for orderList
  const orderMap = new Map<string, number>();
  orderList.forEach((id, idx) => orderMap.set(id, idx));

  // 7. Sort: Pinned items ALWAYS at the very top (index 0, 1, ...), preserving relative order
  const sorted = [...itemsWithPinned].sort((a, b) => {
    const aPinned = Boolean(a.pinned);
    const bPinned = Boolean(b.pinned);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;

    const aIdx = orderMap.has(a.id) ? orderMap.get(a.id)! : 9999;
    const bIdx = orderMap.has(b.id) ? orderMap.get(b.id)! : 9999;
    return aIdx - bIdx;
  });

  // 8. Re-persist the synchronized state so next refresh has immediate access
  try {
    const activePins = sorted.filter((s) => s.pinned).map((s) => s.id);
    localStorage.setItem(pinnedStorageKey, JSON.stringify(activePins));
    localStorage.setItem(orderStorageKey, JSON.stringify(sorted.map((s) => s.id)));
    localStorage.setItem(localItemsStorageKey, JSON.stringify(sorted));
  } catch (e) {}

  return sorted;
}

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
  const isFeatured = Boolean(row.featured);
  return {
    id: row.id,
    title: row.title,
    category: row.category as ProjectItem["category"],
    description: row.description || "",
    image: row.image || "",
    tags: Array.isArray(row.tags) ? row.tags : [],
    demoUrl: row.demo_url || undefined,
    githubUrl: row.github_url || undefined,
    featured: isFeatured,
    pinned: isFeatured, // In Supabase, the boolean 'featured' column mirrors pinned state
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
    featured: Boolean(item.pinned !== undefined ? item.pinned : item.featured),
  };
}

function mergeWithDefaults<T extends { id: string }>(remoteItems: T[], defaultItems: T[]): T[] {
  const map = new Map<string, T>();
  defaultItems.forEach((item) => map.set(item.id, item));
  remoteItems.forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
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
      const merged = mergeWithDefaults(mapped, projectsData);
      // Guarantee that remote fetch never overrides local pins and custom positions
      const aligned = alignWithSavedOrderAndPins(
        merged,
        STORAGE_PINNED_PROJECTS,
        STORAGE_PROJECT_ORDER,
        STORAGE_PROJECTS
      );
      return aligned;
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

export function getLocalProjects(): ProjectItem[] {
  let list = projectsData;
  const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_PROJECTS) : null;
  if (saved) {
    try {
      list = JSON.parse(saved);
    } catch (e) {}
  }
  return alignWithSavedOrderAndPins(
    list,
    STORAGE_PINNED_PROJECTS,
    STORAGE_PROJECT_ORDER,
    STORAGE_PROJECTS
  );
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
      const merged = mergeWithDefaults(mapped, certificatesData);
      // Guarantee that remote fetch never overrides local pins and custom positions
      const aligned = alignWithSavedOrderAndPins(
        merged,
        STORAGE_PINNED_CERTS,
        STORAGE_CERT_ORDER,
        STORAGE_CERTS
      );
      return aligned;
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

export function getLocalCertificates(): CertificateItem[] {
  let list = certificatesData;
  const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_CERTS) : null;
  if (saved) {
    try {
      list = JSON.parse(saved);
    } catch (e) {}
  }
  return alignWithSavedOrderAndPins(
    list,
    STORAGE_PINNED_CERTS,
    STORAGE_CERT_ORDER,
    STORAGE_CERTS
  );
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
