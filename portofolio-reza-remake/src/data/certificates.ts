export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  image: string;
  category: "Network" | "Cloud" | "UI/UX" | "DevOps" | "General";
}

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-bnsp",
    title: "Internet Interconnection Services",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    issueDate: "20 Maret 2023",
    credentialId: "No. 61924 2522 0000776 2023",
    image: "/assets/certificates/sertifikat_bnsp.jpeg",
    category: "Network",
  },
  {
    id: "cert-tkj-icon",
    title: "Teknik Komputer dan Jaringan",
    issuer: "SMK Negeri 01 Kademangan & PT. Indonesia Comnet Plus (ICON+)",
    issueDate: "Maret 2023",
    credentialId: "No. 421.5/052/101.8.11.15/2023",
    image: "/assets/certificates/sertifikat_tkj.jpeg",
    category: "Network",
  },
  {
    id: "cert-aws",
    title: "AWS Cloud Certification",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Maret 2024",
    credentialId: "AWS Cloud Verified",
    image: "/assets/certificates/awscloud.png",
    category: "Cloud",
  },
  {
    id: "cert-alibaba",
    title: "Alibaba Cloud Certification",
    issuer: "Alibaba Cloud Academy",
    issueDate: "Januari 2024",
    credentialId: "ACA-123",
    image: "/assets/certificates/img_58d8832de4fee500cdd9a3747ef80e49.png",
    category: "Cloud",
  },
  {
    id: "cert-dicoding-devops",
    title: "DevOps Practitioner Certification",
    issuer: "Dicoding Indonesia",
    issueDate: "Februari 2024",
    credentialId: "Dicoding DevOps Verified",
    image: "/assets/certificates/dicoding devops.png",
    category: "DevOps",
  },
  {
    id: "cert-uiux-gl",
    title: "UI/UX for Beginners",
    issuer: "Great Learning Academy",
    issueDate: "Februari 2024",
    credentialId: "GL-UIUX-789",
    image: "/assets/certificates/Muhammad_Anka_Reza20240916-72-jvlnew.jpg",
    category: "UI/UX",
  },
  {
    id: "cert-myskill-ux",
    title: "UX Writing Masterclass",
    issuer: "MySkill Learning Platform",
    issueDate: "Februari 2024",
    credentialId: "E-Certif SC UX Writing",
    image: "/assets/certificates/Muhammad Anka Reza - E-Certif SC UX Writing MySkill_page-0001.jpg",
    category: "UI/UX",
  },
  {
    id: "cert-coursera",
    title: "Coursera Professional Specialization",
    issuer: "Coursera Online Platform",
    issueDate: "Maret 2024",
    credentialId: "P997BV47TM4Z",
    image: "/assets/certificates/Coursera_P997BV47TM4Z_page-0001.jpg",
    category: "General",
  },
  {
    id: "cert-idn-net",
    title: "Jaringan Komputer Dasar",
    issuer: "ID-Networkers (IDN)",
    issueDate: "Januari 2024",
    credentialId: "IDN-NET-BASIC",
    image: "/assets/certificates/Muhammad-Anka-Reza-Jaringan-Dasar-Sertifikat-Jaringan-Komputer-Dasar-LMS-ID-Networkers_page-0001.jpg",
    category: "Network",
  },
];
