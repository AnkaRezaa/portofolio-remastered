export interface ProfileData {
  name: string;
  nickname: string;
  headline: string;
  roles: string[];
  status: {
    available: boolean;
    text: string;
    subtext: string;
  };
  summary: string;
  aboutFull: string;
  avatar: string;
  stats: {
    label: string;
    value: string;
  }[];
  socials: {
    platform: string;
    url: string;
    icon: string;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}

export const profileData: ProfileData = {
  name: "Muhammad Anka Reza",
  nickname: "Reza",
  headline: "IT Support, Network Engineer & Web Developer",
  roles: [
    "IT Support Specialist",
    "Network Engineer",
    "Frontend Developer",
    "UI/UX Designer",
    "System Administrator",
  ],
  status: {
    available: true,
    text: "Tersedia untuk Peluang Karir & Proyek",
    subtext: "D4 Teknologi Informasi — Politeknik Negeri Malang",
  },
  summary:
    "Saya adalah seorang IT Support, teknisi jaringan, dan pengembang web yang berdedikasi dengan fokus pada solusi teknologi yang efisien, handal, dan berkinerja tinggi.",
  aboutFull:
    "Memiliki keahlian teruji dalam instalasi, konfigurasi, dan pemeliharaan perangkat IT serta infrastruktur jaringan komputer berskala enterprise (Cisco / MikroTik). Di bidang pengembangan web, saya menguasai HTML, CSS, JavaScript modern, React, dan Node.js untuk menciptakan sistem interaktif, responsif, dan aman. Menggabungkan wawasan operasional IT hardware/jaringan dengan kemampuan rekayasa perangkat lunak modern.",
  avatar: "/assets/profile/image2.jpg",
  stats: [
    { label: "Sertifikasi Resmi", value: "9+" },
    { label: "Proyek Selesai", value: "12+" },
    { label: "Tahun Eksplorasi", value: "4+" },
  ],
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/AnkaRezaa",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammad-anka-reza-620a0b2b7/?isSelfProfile=true",
      icon: "linkedin",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/toxickers002/",
      icon: "instagram",
    },
    {
      platform: "Twitter / X",
      url: "https://x.com/Toxickers1",
      icon: "twitter",
    },
  ],
  contact: {
    email: "rezawalker02@gmail.com",
    phone: "+62 853-3434-7482",
    location: "Malang / Blitar, Jawa Timur, Indonesia",
  },
};
