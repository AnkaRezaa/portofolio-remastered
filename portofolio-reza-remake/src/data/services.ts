export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  tags: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    category: "Design",
    iconName: "Figma",
    description:
      "Perancangan antarmuka pengguna yang intuitif dan modern menggunakan Figma. Mencakup riset alur pengguna, wireframing, prototyping interaktif, dan pengujian kegunaan untuk menciptakan pengalaman digital terbaik.",
    tags: ["Figma", "Wireframing", "Prototyping", "Design System"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    category: "Development",
    iconName: "Layout",
    description:
      "Pembangunan antarmuka web modern, responsif, dan interaktif menggunakan teknologi modern seperti React.js, Tailwind CSS, TypeScript, dan JavaScript modern dengan optimasi performa tinggi di semua perangkat.",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    id: "backend",
    title: "Backend Development",
    category: "Development",
    iconName: "Server",
    description:
      "Pengembangan layanan server-side yang tangguh dan aman. Meliputi perancangan API RESTful, integrasi database relasional dan non-relasional, autentikasi, serta manajemen keamanan sistem.",
    tags: ["Node.js", "Express", "RESTful API", "MySQL"],
  },
  {
    id: "network",
    title: "Network Engineer",
    category: "Infrastructure",
    iconName: "Network",
    description:
      "Perancangan dan implementasi infrastruktur jaringan komputer berskala enterprise. Meliputi konfigurasi router, switch Cisco/MikroTik, VLAN, routing protokol dinamis, serta troubleshooting keamanan jaringan.",
    tags: ["Cisco Packet Tracer", "MikroTik", "VLAN", "Routing Protocols"],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    category: "Development",
    iconName: "Smartphone",
    description:
      "Pengembangan aplikasi mobile berbasis Android dan cross-platform dengan fokus pada antarmuka yang responsif, efisien dalam konsumsi daya/memori, serta pengalaman pengguna yang mulus.",
    tags: ["Android", "Flutter", "Mobile UI"],
  },
  {
    id: "database",
    title: "Database Administrator",
    category: "Data",
    iconName: "Database",
    description:
      "Manajemen dan optimasi basis data terstruktur. Keahlian mencakup normalisasi skema data, indexing, optimasi query performa tinggi, serta prosedur backup dan pemulihan data berkala.",
    tags: ["MySQL", "PostgreSQL", "Database Tuning"],
  },
  {
    id: "it-support",
    title: "IT Support Specialist",
    category: "Support",
    iconName: "Headphones",
    description:
      "Dukungan teknis komprehensif untuk infrastruktur TI organisasi. Troubleshooting hardware dan software, perakitan dan instalasi sistem operasi, pemeliharaan workstation, dan penanganan isu pengguna secara cepat.",
    tags: ["Hardware Troubleshooting", "OS Deployment", "Helpdesk", "IT Maintenance"],
  },
  {
    id: "qa-testing",
    title: "QA Engineer & Testing",
    category: "Quality",
    iconName: "CheckCircle",
    description:
      "Pengujian fungsional dan performa aplikasi untuk menjamin kualitas perangkat lunak bebas dari bug kritis dan sesuai dengan kebutuhan operasional pengguna.",
    tags: ["Manual Testing", "Functional Testing", "Bug Reporting"],
  },
];
