export interface EducationItem {
  id: string;
  period: string;
  institution: string;
  degree?: string;
  description: string;
  badge?: string;
  current?: boolean;
  logo: string;
  location: string;
  skills: string[];
  accreditation?: string;
}

export const educationData: EducationItem[] = [
  {
    id: "edu-5",
    period: "2025 — Sekarang",
    institution: "Politeknik Negeri Malang",
    degree: "D4 Teknologi Informasi",
    description:
      "Fokus pada penguasaan kompetensi tingkat lanjut di bidang rekayasa perangkat lunak modern, arsitektur infrastruktur jaringan enterprise, cloud computing, dan integrasi sistem.",
    badge: "Pendidikan Saat Ini",
    current: true,
    logo: "/assets/education/polinema.png",
    location: "Malang, Jawa Timur",
    skills: ["Full-Stack Engineering", "Cisco Enterprise Topology", "System Architecture", "Cloud Computing"],
    accreditation: "Akreditasi Unggul",
  },
  {
    id: "edu-4",
    period: "2023 — 2025",
    institution: "Akademi Komunitas Negeri Putra Sang Fajar",
    degree: "D2 Komputer dan Jaringan",
    description:
      "Pengembangan keahlian profesional terapan dalam manajemen jaringan komputer, administrasi server Linux/Windows, routing MikroTik, serta implementasi proyek IT di lapangan.",
    badge: "Lulus",
    logo: "/assets/education/akn-blitar.png",
    location: "Kota Blitar, Jawa Timur",
    skills: ["MikroTik RouterOS", "Server Administration", "Bandwidth Management", "Network Troubleshooting"],
    accreditation: "Perguruan Tinggi Negeri Vokasi",
  },
  {
    id: "edu-3",
    period: "2021 — 2023",
    institution: "SMK Negeri 01 Kademangan",
    degree: "Teknik Komputer dan Jaringan (TKJ)",
    description:
      "Mendalami fondasi teknis komputasi, perakitan hardware, crimping & kabel serat optik/UTP, instalasi OS, serta sertifikasi kejuruan bersama mitra industri telekomunikasi (ICON+ & BNSP).",
    badge: "Lulus Kejuruan",
    logo: "/assets/education/smkn1-kademangan.png",
    location: "Kademangan, Blitar",
    skills: ["Hardware Assembly", "LAN & VLAN Setup", "Fiber Optic / UTP Cabling", "Sertifikasi BNSP"],
    accreditation: "Akreditasi A",
  },
  {
    id: "edu-2",
    period: "2018 — 2021",
    institution: "SMP Negeri 01 Kademangan",
    degree: "Pendidikan Menengah Pertama",
    description:
      "Pertumbuhan akademik dasar, keaktifan organisasi kesiswaan, dan pengenalan awal fondasi logika komputasi dan matematika terapan.",
    badge: "Lulus",
    logo: "/assets/education/tut-wuri-handayani.png",
    location: "Kademangan, Blitar",
    skills: ["Logika Dasar Komputasi", "Kepemimpinan & Organisasi", "Matematika Sains"],
    accreditation: "Akreditasi A",
  },
  {
    id: "edu-1",
    period: "2011 — 2017",
    institution: "SDN Pasiraman 03",
    degree: "Pendidikan Dasar",
    description:
      "Fondasi awal pembentukan karakter disiplin belajar, keingintahuan intelektual, dan pengembangan keterampilan sosial dasar.",
    badge: "Lulus",
    logo: "/assets/education/tut-wuri-handayani.png",
    location: "Pasiraman, Blitar",
    skills: ["Disiplin & Etika Belajar", "Fondasi Literasi & Numerasi"],
    accreditation: "Pendidikan Dasar Nasional",
  },
];
