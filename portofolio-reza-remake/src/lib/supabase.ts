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

export const STORAGE_PROJECTS = "anka-portfolio-projects";
export const STORAGE_PINNED_PROJECTS = "anka-pinned-projects";
export const STORAGE_PROJECT_ORDER = "anka-project-order";
export const STORAGE_DELETED_PROJECTS = "anka-deleted-projects";

export const STORAGE_CERTS = "anka-portfolio-certificates";
export const STORAGE_PINNED_CERTS = "anka-pinned-certificates";
export const STORAGE_CERT_ORDER = "anka-certificate-order";
export const STORAGE_DELETED_CERTS = "anka-deleted-certificates";

export function getDeletedIds(storageKey: string): Set<string> {
  if (typeof window === "undefined") return new Set<string>();
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) return new Set(JSON.parse(saved));
  } catch (e) {}
  return new Set<string>();
}

export function markItemAsDeleted(id: string, storageKey: string) {
  if (typeof window === "undefined") return;
  try {
    const set = getDeletedIds(storageKey);
    set.add(id);
    localStorage.setItem(storageKey, JSON.stringify(Array.from(set)));
  } catch (e) {}
}

// Auto-sanitize known deleted items so legacy client localStorages are immediately cleaned
if (typeof window !== "undefined") {
  try {
    markItemAsDeleted("cert-hackathon-polinema", STORAGE_DELETED_CERTS);
    markItemAsDeleted("cert-lks-network", STORAGE_DELETED_CERTS);

    const cleanStorageList = (key: string, removeIds: string[]) => {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((item: any) => {
            const id = typeof item === "string" ? item : item?.id;
            return !removeIds.includes(id);
          });
          localStorage.setItem(key, JSON.stringify(filtered));
        }
      }
    };
    cleanStorageList(STORAGE_CERTS, ["cert-hackathon-polinema", "cert-lks-network"]);
    cleanStorageList(STORAGE_PINNED_CERTS, ["cert-hackathon-polinema", "cert-lks-network"]);
    cleanStorageList(STORAGE_CERT_ORDER, ["cert-hackathon-polinema", "cert-lks-network"]);
  } catch (e) {}
}

/**
 * Persists user's explicit reordering and pin / unpin actions.
 * If user unpins a card, it is immediately removed from pinned storage
 * so it will NEVER be forced back to pinned state.
 */
export function saveItemsWithOrderAndPins<T extends { id: string; pinned?: boolean }>(
  updatedItems: T[],
  pinnedStorageKey: string,
  orderStorageKey: string,
  localItemsStorageKey: string
): T[] {
  if (typeof window === "undefined") return updatedItems;

  // 1. Explicitly extract ONLY the items that are currently pinned
  const activePins = updatedItems
    .filter((item) => Boolean(item.pinned))
    .map((item) => item.id);

  const pinnedSet = new Set(activePins);

  // 2. Ensure each item's boolean accurately reflects pinnedSet
  const itemsWithPinned = updatedItems.map((item) => ({
    ...item,
    pinned: pinnedSet.has(item.id),
  }));

  // 3. Pinned items always float to the top; unpinned maintain their relative position
  const sorted = [...itemsWithPinned].sort((a, b) => {
    const aPinned = Boolean(a.pinned);
    const bPinned = Boolean(b.pinned);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });

  // 4. Immediately write to localStorage so unpin is instantly persisted
  try {
    localStorage.setItem(pinnedStorageKey, JSON.stringify(activePins));
    localStorage.setItem(orderStorageKey, JSON.stringify(sorted.map((s) => s.id)));
    localStorage.setItem(localItemsStorageKey, JSON.stringify(sorted));
  } catch (e) {}

  return sorted;
}

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
  let userPinsConfigured = false;

  // 1. Read explicitly stored pinned IDs
  try {
    const savedPins = localStorage.getItem(pinnedStorageKey);
    if (savedPins !== null) {
      userPinsConfigured = true;
      const parsedPins: string[] = JSON.parse(savedPins);
      parsedPins.forEach((id) => pinnedSet.add(id));
    }
  } catch (e) {}

  // 2. Read explicitly stored ordering IDs
  try {
    const savedOrder = localStorage.getItem(orderStorageKey);
    if (savedOrder !== null) {
      const parsedOrder: string[] = JSON.parse(savedOrder);
      parsedOrder.forEach((id) => orderList.push(id));
    }
  } catch (e) {}

  // 3. Fallback: only if user has NEVER interacted with pins (no storage key set yet)
  if (!userPinsConfigured) {
    try {
      const savedLocal = localStorage.getItem(localItemsStorageKey);
      if (savedLocal) {
        const parsedLocal: T[] = JSON.parse(savedLocal);
        parsedLocal.forEach((item) => {
          if (item.pinned) pinnedSet.add(item.id);
        });
      }
    } catch (e) {}
  }

  // 4. Annotate every item with its correct pinned status:
  // If user has saved pins (even empty []), ONLY items present in pinnedSet are pinned!
  const itemsWithPinned = items.map((item) => {
    const isPinned = userPinsConfigured
      ? pinnedSet.has(item.id)
      : pinnedSet.has(item.id) || Boolean(item.pinned);
    return {
      ...item,
      pinned: isPinned,
    };
  });

  // 5. Build index map for orderList
  const orderMap = new Map<string, number>();
  orderList.forEach((id, idx) => orderMap.set(id, idx));

  // 6. Sort: Pinned items ALWAYS at the very top (index 0, 1, ...), preserving relative order
  const sorted = [...itemsWithPinned].sort((a, b) => {
    const aPinned = Boolean(a.pinned);
    const bPinned = Boolean(b.pinned);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;

    const aIdx = orderMap.has(a.id) ? orderMap.get(a.id)! : 9999;
    const bIdx = orderMap.has(b.id) ? orderMap.get(b.id)! : 9999;
    return aIdx - bIdx;
  });

  // 7. Re-persist the synchronized state
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
  let images: string[] = [];
  let primaryImage = row.image || "";

  if (row.image && row.image.trim().startsWith("[") && row.image.trim().endsWith("]")) {
    try {
      const parsed = JSON.parse(row.image);
      if (Array.isArray(parsed) && parsed.length > 0) {
        images = parsed;
        primaryImage = images[0] || "";
      }
    } catch (e) {}
  } else if (row.image) {
    images = [row.image];
  }

  return {
    id: row.id,
    title: row.title,
    category: row.category as ProjectItem["category"],
    description: row.description || "",
    image: primaryImage,
    images: images.length > 0 ? images : (primaryImage ? [primaryImage] : []),
    tags: Array.isArray(row.tags) ? row.tags : [],
    demoUrl: row.demo_url || undefined,
    githubUrl: row.github_url || undefined,
    featured: Boolean(row.featured),
    pinned: false, // Pinning is managed by user state in pinnedStorageKey
  };
}

function mapProjectToRow(item: ProjectItem): DbProjectRow {
  const allImages = item.images && item.images.length > 0
    ? item.images
    : (item.image ? [item.image] : []);

  const imageValue = allImages.length > 1
    ? JSON.stringify(allImages)
    : (allImages[0] || item.image || "");

  return {
    id: item.id,
    title: item.title,
    category: item.category,
    description: item.description,
    image: imageValue,
    tags: item.tags || [],
    demo_url: item.demoUrl || null,
    github_url: item.githubUrl || null,
    featured: Boolean(item.pinned !== undefined ? item.pinned : item.featured),
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
      const deletedSet = getDeletedIds(STORAGE_DELETED_PROJECTS);
      const activeProjects = mapped.filter((p) => !deletedSet.has(p.id));
      // Guarantee that remote fetch never overrides local pins and custom positions
      const aligned = alignWithSavedOrderAndPins(
        activeProjects,
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
  markItemAsDeleted(id, STORAGE_DELETED_PROJECTS);

  // Clean from localStorage immediately
  try {
    const pins = JSON.parse(localStorage.getItem(STORAGE_PINNED_PROJECTS) || "[]").filter((pid: string) => pid !== id);
    localStorage.setItem(STORAGE_PINNED_PROJECTS, JSON.stringify(pins));
    const order = JSON.parse(localStorage.getItem(STORAGE_PROJECT_ORDER) || "[]").filter((oid: string) => oid !== id);
    localStorage.setItem(STORAGE_PROJECT_ORDER, JSON.stringify(order));
    const list = JSON.parse(localStorage.getItem(STORAGE_PROJECTS) || "[]").filter((item: any) => item.id !== id);
    localStorage.setItem(STORAGE_PROJECTS, JSON.stringify(list));
  } catch (e) {}

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
  const deletedSet = getDeletedIds(STORAGE_DELETED_PROJECTS);
  let list = projectsData.filter((p) => !deletedSet.has(p.id));
  const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_PROJECTS) : null;
  if (saved) {
    try {
      const parsed: ProjectItem[] = JSON.parse(saved);
      list = parsed.filter((p) => !deletedSet.has(p.id));
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
      const deletedSet = getDeletedIds(STORAGE_DELETED_CERTS);
      const activeCerts = mapped.filter((c) => !deletedSet.has(c.id));
      // Guarantee that remote fetch never overrides local pins and custom positions
      const aligned = alignWithSavedOrderAndPins(
        activeCerts,
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
  markItemAsDeleted(id, STORAGE_DELETED_CERTS);

  // Clean from localStorage immediately
  try {
    const pins = JSON.parse(localStorage.getItem(STORAGE_PINNED_CERTS) || "[]").filter((cid: string) => cid !== id);
    localStorage.setItem(STORAGE_PINNED_CERTS, JSON.stringify(pins));
    const order = JSON.parse(localStorage.getItem(STORAGE_CERT_ORDER) || "[]").filter((oid: string) => oid !== id);
    localStorage.setItem(STORAGE_CERT_ORDER, JSON.stringify(order));
    const list = JSON.parse(localStorage.getItem(STORAGE_CERTS) || "[]").filter((item: any) => item.id !== id);
    localStorage.setItem(STORAGE_CERTS, JSON.stringify(list));
  } catch (e) {}

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
  const deletedSet = getDeletedIds(STORAGE_DELETED_CERTS);
  let list = certificatesData.filter((c) => !deletedSet.has(c.id));
  const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_CERTS) : null;
  if (saved) {
    try {
      const parsed: CertificateItem[] = JSON.parse(saved);
      list = parsed.filter((c) => !deletedSet.has(c.id));
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
