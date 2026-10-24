export interface ProjectItem {
  id: string;
  title: string;
  category: "Web" | "UI/UX" | "Network" | "All";
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Website Peminjaman Alat Lab (ALAB)",
    category: "Web",
    featured: true,
    description:
      "Dashboard komprehensif untuk digitalisasi dan pengelolaan peminjaman alat laboratorium kampus. Memungkinkan admin melacak inventaris alat, mengelola persetujuan permohonan peminjaman, serta memantau status ketersediaan secara real-time.",
    image: "/assets/projects/Dashboard Desktop.png",
    tags: ["Web System", "Dashboard", "Inventory Management", "UI Design"],
  },
  {
    id: "proj-2",
    title: "Hotelier: Hotel Booking Dashboard",
    category: "Web",
    featured: true,
    description:
      "Sistem pemesanan kamar hotel terpadu dengan antarmuka modern. Menyediakan visualisasi ketersediaan kamar, manajemen reservasi tamu, pelaporan okupansi, dan alur pemesanan yang efisien.",
    image: "/assets/projects/hotel.jpg",
    tags: ["Reservation System", "Dashboard", "Frontend", "User Experience"],
  },
  {
    id: "proj-3",
    title: "myGARDEN — Smart Garden IoT & App",
    category: "UI/UX",
    featured: true,
    description:
      "Konsep aplikasi pintar untuk pemantauan dan otomasi kebun cerdas. Dirancang dengan visual interface intuitif untuk memantau kelembaban tanah, temperatur, jadwal penyiraman otomatis, dan grafik produktivitas tanaman.",
    image: "/assets/projects/project_figma_kebun.PNG",
    tags: ["Figma", "UI/UX", "Smart Farming", "IoT Monitoring"],
  },
  {
    id: "proj-4",
    title: "Maxim App Redesign",
    category: "UI/UX",
    featured: false,
    description:
      "Redesain antarmuka aplikasi ride-hailing Maxim untuk meningkatkan kenyamanan visual dan kemudahan navigasi pengguna (user-friendly). Mengoptimalkan alur penentuan titik jemput dan hierarki informasi tarif.",
    image: "/assets/projects/project_ui_ux dibimbing.PNG",
    tags: ["UI/UX Redesign", "Mobile App", "User Flow", "Figma"],
  },
  {
    id: "proj-5",
    title: "Library Webs Concept",
    category: "UI/UX",
    featured: false,
    description:
      "Eksplorasi desain antarmuka perpustakaan digital interaktif. Menghadirkan katalog buku berbasis kategori, visualisasi status pinjam, dan rekomendasi buku yang bersih dan minimalis.",
    image: "/assets/projects/project_library.PNG",
    tags: ["UI Concept", "Digital Library", "Web Layout"],
  },
  {
    id: "proj-6",
    title: "Enterprise Network Design (Cisco Packet Tracer)",
    category: "Network",
    featured: true,
    description:
      "Perancangan arsitektur jaringan enterprise skala besar. Mengimplementasikan segmentasi VLAN antar-departemen, dynamic routing protocols (OSPF/EIGRP), DHCP server terpusat, Access Control List (ACL) keamanan, dan redundansi link.",
    image: "/assets/projects/project_topologi.png",
    tags: ["Cisco Packet Tracer", "Enterprise Network", "VLAN", "Routing Protocols"],
  },
];
