export type CertificateCategory =
  | "Professional"
  | "Competition"
  | "Training"
  | "Course"
  | "Network"
  | "Cloud"
  | "UI/UX"
  | "DevOps"
  | "General";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  image: string;
  category: CertificateCategory;
  badgeLabel?: string;
  pinned?: boolean;
  orderIndex?: number;
}

export const certificatesData: CertificateItem[] = [
  // ==========================================
  // 1. SERTIFIKASI PROFESIONAL & LISENSI
  // ==========================================
  {
    id: "cert-bnsp",
    title: "Internet Interconnection Services",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    issueDate: "20 Maret 2023",
    credentialId: "No. 61924 2522 0000776 2023",
    image: "/assets/certificates/sertifikat_bnsp.jpeg",
    category: "Professional",
    badgeLabel: "Sertifikasi Profesi",
  },
  {
    id: "cert-tkj-icon",
    title: "Teknik Komputer dan Jaringan",
    issuer: "SMK Negeri 01 Kademangan & PT. Indonesia Comnet Plus (ICON+)",
    issueDate: "Maret 2023",
    credentialId: "No. 421.5/052/101.8.11.15/2023",
    image: "/assets/certificates/sertifikat_tkj.jpeg",
    category: "Professional",
    badgeLabel: "Sertifikasi Industri",
  },
  {
    id: "cert-aws",
    title: "AWS Cloud Certification",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Maret 2024",
    credentialId: "AWS Cloud Verified",
    image: "/assets/certificates/awscloud.png",
    category: "Professional",
    badgeLabel: "Cloud Accreditation",
  },
  {
    id: "cert-alibaba",
    title: "Alibaba Cloud Certification",
    issuer: "Alibaba Cloud Academy",
    issueDate: "Januari 2024",
    credentialId: "ACA-123",
    image: "/assets/certificates/img_58d8832de4fee500cdd9a3747ef80e49.png",
    category: "Professional",
    badgeLabel: "Cloud Accreditation",
  },
  {
    id: "cert-dicoding-devops",
    title: "DevOps Practitioner Certification",
    issuer: "Dicoding Indonesia",
    issueDate: "Februari 2024",
    credentialId: "Dicoding DevOps Verified",
    image: "/assets/certificates/dicoding devops.png",
    category: "Professional",
    badgeLabel: "DevOps Certified",
  },
  {
    id: "cert-dicoding-ai",
    title: "AI & Machine Learning Foundations",
    issuer: "Dicoding Indonesia",
    issueDate: "Februari 2024",
    credentialId: "Dicoding AI Verified",
    image: "/assets/certificates/dicodingAI.png",
    category: "Professional",
    badgeLabel: "AI & ML Certified",
  },

  // ==========================================
  // 2. LOMBA & HACKATHON
  // ==========================================
  {
    id: "cert-hackathon-polinema",
    title: "Hackathon & IT Software Innovation",
    issuer: "Politeknik Negeri Malang & Tech Community",
    issueDate: "Desember 2023",
    credentialId: "POLINEMA-HACK-2023",
    image: "/assets/certificates/Muhammad Anka Reza le wagon - 2024-09-29.pdf",
    category: "Competition",
    badgeLabel: "Lomba & Hackathon",
  },
  {
    id: "cert-lks-network",
    title: "IT Network Systems Competition",
    issuer: "Lomba Keterampilan Siswa (LKS) IT Network",
    issueDate: "Februari 2023",
    credentialId: "LKS-NET-2023-VERIFIED",
    image: "/assets/certificates/img_dcdb0abdd06cfc2afd2be7bb8efefd2f.jpg",
    category: "Competition",
    badgeLabel: "Kompetisi IT",
  },

  // ==========================================
  // 3. PELATIHAN & WORKSHOP BOOTCAMP
  // ==========================================
  {
    id: "cert-bootcamp-dibimbing",
    title: "UI/UX Design Intensive Bootcamp",
    issuer: "dibimbing.id Career Platform",
    issueDate: "Agustus 2024",
    credentialId: "DIBIMBING-UIUX-2024",
    image: "/assets/certificates/ui_ux_dibimbing.png",
    category: "Training",
    badgeLabel: "Pelatihan & Bootcamp",
  },
  {
    id: "cert-idn-net",
    title: "Jaringan Komputer Dasar & Routing",
    issuer: "ID-Networkers (IDN)",
    issueDate: "Januari 2024",
    credentialId: "IDN-NET-BASIC",
    image: "/assets/certificates/Muhammad-Anka-Reza-Jaringan-Dasar-Sertifikat-Jaringan-Komputer-Dasar-LMS-ID-Networkers_page-0001.jpg",
    category: "Training",
    badgeLabel: "Pelatihan Jaringan",
  },
  {
    id: "cert-idn-mikrotik",
    title: "MikroTik RouterOS & Traffic Shaping",
    issuer: "ID-Networkers (IDN)",
    issueDate: "Januari 2024",
    credentialId: "IDN-MIKROTIK-TRAFFIC",
    image: "/assets/certificates/idnetwork.png",
    category: "Training",
    badgeLabel: "Workshop MikroTik",
  },

  // ==========================================
  // 4. KURSUS & SPESIALISASI ONLINE
  // ==========================================
  {
    id: "cert-myskill-ux",
    title: "UX Writing Masterclass",
    issuer: "MySkill Learning Platform",
    issueDate: "Februari 2024",
    credentialId: "E-Certif SC UX Writing",
    image: "/assets/certificates/Muhammad Anka Reza - E-Certif SC UX Writing MySkill_page-0001.jpg",
    category: "Course",
    badgeLabel: "Kursus Spesialisasi",
  },
  {
    id: "cert-coursera",
    title: "Coursera Professional Specialization",
    issuer: "Coursera Online Platform",
    issueDate: "Maret 2024",
    credentialId: "P997BV47TM4Z",
    image: "/assets/certificates/Coursera_P997BV47TM4Z_page-0001.jpg",
    category: "Course",
    badgeLabel: "Kursus Online",
  },
  {
    id: "cert-uiux-gl",
    title: "UI/UX for Beginners",
    issuer: "Great Learning Academy",
    issueDate: "Februari 2024",
    credentialId: "GL-UIUX-789",
    image: "/assets/certificates/Muhammad_Anka_Reza20240916-72-jvlnew.jpg",
    category: "Course",
    badgeLabel: "Kursus Online",
  },
];
