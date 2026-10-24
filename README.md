# Muhammad Anka Reza — Portfolio Ecosystem

Monorepo portofolio resmi **Muhammad Anka Reza** (IT Support Specialist • Cisco Network Engineer • Web Developer). Terdiri dari 2 aplikasi yang saling terintegrasi:

---

## 📂 Struktur Repositori

```
portofolio/
├── portofolio-portal/         # Terminal Gateway CLI (Linux TTY / Retro Shell)
│   ├── index.html             # Shell interface & Systemd bootloader
│   ├── css/portal.css         # Authentic CRT & Linux Terminal styling
│   ├── js/portal.js           # Virtual FS, Web Audio API SFX, Easter Eggs
│   └── resumeCV/              # Berkas resmi Curriculum Vitae (PDF)
│
├── portofolio-reza-remake/     # Web Portofolio Utama (Modern Interactive App)
│   ├── src/                   # React 18 + TypeScript + Tailwind CSS
│   │   ├── components/        # Hero, Bento, Vault, CV Viewer Modal, dll.
│   │   └── data/              # Data profil, proyek, & sertifikasi
│   └── public/                # Static assets, gambar sertifikasi, resume.pdf
│
└── .gitignore                 # Root ignore rules (node_modules, dist, etc.)
```

---

## 🚀 Fitur Utama

### 1. Terminal Portal (`portofolio-portal`)
- **Authentic Linux Experience**: Animasi boot systemd, login prompt tty1, CRT mode-switch, dan suara PC Speaker / mechanical keyboard via Web Audio API.
- **Interactive CLI Shell**: Dilengkapi perintah `help`, `ls`, `cat`, `neofetch`, `skills`, `cowsay`, `ping`, dan numeric quick dispatch `[ 1 ]` s.d `[ 8 ]`.
- **Easter Eggs**: `sl` (kereta uap), `coffee`, `matrix`, `hack`, `rickroll`, dan Konami Code.
- **In-Website CV Viewer**: Pratinjau langsung berkas CV resmi (PDF) di dalam jendela viewer terminal tanpa meninggalkan halaman.

### 2. Modern Web Portfolio (`portofolio-reza-remake`)
- **Tech Stack**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.
- **Dynamic Telemetry Stream**: Background grid minimalis dengan real-time CLI telemetry stream.
- **Interactive CV Viewer**: Modal pratinjau dokumen CV PDF dengan tombol unduh langsung dan tab baru.
- **Admin Portal**: Panel interaktif untuk mengelola dan menambahkan proyek/sertifikat dinamis dengan persistensi local storage.

---

## 🛠️ Panduan Menjalankan Lokal

### Menjalankan Web Portofolio (React + Vite):
```bash
cd portofolio-reza-remake
npm install
npm run dev
```
Aplikasi berjalan di: `http://localhost:5173/`

### Menjalankan Terminal Portal:
Cukup buka berkas `portofolio-portal/index.html` langsung di browser, atau jalankan melalui web server lokal (seperti Laragon, Live Server, atau Nginx).

### Build Unified Ecosystem (Production):
```bash
npm run build
```
Hasil build akan terkumpul di folder `dist/`:
- `/` -> Linux Terminal Gateway
- `/portfolio/` -> React Web Portfolio

---

## 🌐 Panduan Deployment ke Vercel

Repositori ini telah disiapkan dengan konfigurasi Vercel otomatis (`vercel.json` dan `package.json`):

1. **Push ke GitHub**:
   ```bash
   git push -u origin main
   ```
2. **Import ke Vercel**:
   - Buka [vercel.com](https://vercel.com) dan login via GitHub.
   - Klik **"Add New..."** > **"Project"**.
   - Pilih repositori `portofolio-remastered`.
   - **Framework Preset**: Biarkan `Other` (atau otomatis terdeteksi).
   - **Root Directory**: `./` (biarkan default root).
   - **Output Directory**: Otomatis `dist` dari `vercel.json`.
   - Klik **Deploy**! 🚀
3. Hasilnya:
   - Akses `https://<nama-project>.vercel.app/` -> **Linux Terminal Portal Gateway**.
   - Tekan `[ 1 ]` -> Langsung masuk ke **Web Portofolio Lengkap** (`/portfolio`).
   - Tekan tombol `TERMINAL` di navbar -> Kembali ke Linux Terminal Gateway.

---

## 📬 Kontak & Profil

- **LinkedIn**: [muhammad-anka-reza](https://www.linkedin.com/in/muhammad-anka-reza-620a0b2b7/)
- **GitHub**: [AnkaRezaa](https://github.com/AnkaRezaa)
- **WhatsApp**: [+62 853-3434-7482](https://wa.me/6285334347482)
- **Email**: [rezawalker02@gmail.com](mailto:rezawalker02@gmail.com)
