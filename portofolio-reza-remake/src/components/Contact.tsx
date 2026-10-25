import React, { useState } from "react";
import { profileData } from "../data/profile";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  ExternalLink,
  Terminal,
  Radio,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import { WhatsappIcon } from "./ui/BrandIcons";

interface ContactProps {
  onOpenAdmin: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAdmin }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage(null);

    const templateParams = {
      to_name: "Reza",
      from_name: formState.name,
      email_id: formState.email,
      phone: formState.phone,
      subject: formState.subject,
      message: formState.message,
      reply_to: formState.email,
    };

    try {
      const response = await emailjs.send(
        "service_63nmo8z",
        "template_tawt5dq",
        templateParams,
        "cZ0EUx1Addn3i7KAM"
      );
      console.log("EmailJS SUCCESS!", response.status, response.text);
      setIsSending(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#f97316", "#fbbf24", "#ea580c"],
      });
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error("EmailJS FAILED...", error);
      setIsSending(false);
      const isInvalidGrant =
        (typeof error?.text === "string" && error.text.includes("Invalid grant")) ||
        (typeof error?.message === "string" && error.message.includes("Invalid grant"));
      if (isInvalidGrant) {
        setErrorMessage(
          "Akun Gmail pada dashboard EmailJS perlu di-reconnect (otorisasi ulang). Anda tetap dapat langsung mengirim pesan ini dengan tombol di bawah."
        );
      } else {
        const errText =
          error?.text ||
          error?.message ||
          "Terjadi kendala saat menghubungkan ke server email.";
        setErrorMessage(`Kendala pengiriman: ${errText}`);
      }
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background warm orange glow orb */}
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-orange-500 tracking-wider">
                // CONTACT & INQUIRIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
              GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">TOUCH</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-500 dark:text-slate-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Status: Terbuka untuk Kolaborasi</span>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm space-y-6">
              
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Kontak Langsung
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Terbuka untuk tawaran magang, pekerjaan full-time/kontrak, kolaborasi proyek web, atau perancangan infrastruktur jaringan.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100/60 dark:bg-dark-surface/60 border border-slate-200 dark:border-white/5 hover:border-orange-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">
                      Email
                    </p>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-slate-800 dark:text-white">
                      {profileData.contact.email}
                    </p>
                  </div>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/6285334347482?text=Halo%20Reza,%20saya%20tertarik%20berkolaborasi%20proyek."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100/60 dark:bg-dark-surface/60 border border-slate-200 dark:border-white/5 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <WhatsappIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">
                      WhatsApp
                    </p>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-slate-800 dark:text-white">
                      +62 853-3434-7482
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100/60 dark:bg-dark-surface/60 border border-slate-200 dark:border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">
                      Lokasi
                    </p>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-slate-800 dark:text-white">
                      {profileData.contact.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast Connect LinkedIn Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <a
                  href="https://www.linkedin.com/in/muhammad-anka-reza-620a0b2b7/?isSelfProfile=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold text-center bg-[#0a66c2] text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md"
                >
                  <span>Terhubung di LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-4 h-4 text-orange-500" />
                <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Kirim Pesan
                </h3>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold">Gagal Mengirim via Server Email</p>
                      <p className="text-[11px] leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-rose-500/20 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${profileData.contact.email}?subject=${encodeURIComponent(formState.subject || "Pesan dari Portofolio")}&body=${encodeURIComponent(`Nama: ${formState.name}\nEmail: ${formState.email}\nNomor Telepon: ${formState.phone}\n\nPesan:\n${formState.message}`)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors text-[11px] shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Kirim Langsung ke {profileData.contact.email}</span>
                    </a>
                  </div>
                </div>
              )}

              {isSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    Pesan Berhasil Terkirim!
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto font-sans">
                    Terima kasih telah menghubungi saya. Tanggapan balasan akan segera dikirimkan ke email Anda.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-slate-100 dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-dark-hover transition-colors"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Nama Anda"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-sm font-sans text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-sm font-sans text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Nomor WhatsApp / HP
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        placeholder="+62 812-3456-7890"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-sm font-sans text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Subjek Pesan
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({ ...formState, subject: e.target.value })
                        }
                        placeholder="Kolaborasi Proyek / Tawaran Pekerjaan"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-sm font-sans text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Isi Pesan
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tuliskan pesan, rincian proyek, atau pertanyaan Anda..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-sm font-sans text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 px-6 rounded-xl font-mono font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSending ? (
                      <span>Mengirimkan Pesan...</span>
                    ) : (
                      <>
                        <span>Kirim Pesan Sekarang</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Industrial Footer */}
      <footer className="mt-24 pt-8 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-0.5">
            <span>© {new Date().getFullYear()} MUHAMMAD ANKA REZA. ALL RIGHTS RESERVED</span>
            {/* Secret Easter Egg: Clickable period */}
            <a
              href="?admin=true#admin"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenAdmin?.()}
              className="text-slate-400 dark:text-slate-600 hover:text-orange-500 transition-colors cursor-default hover:cursor-pointer select-none"
              title="sys.console"
            >
              .
            </a>
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">REACT 18 • TAILWIND • FRAMER MOTION</span>
            {/* Secret Easter Egg: Subtle technical telemetry link */}
            <a
              href="?admin=true#admin"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenAdmin?.()}
              className="opacity-25 hover:opacity-100 text-[11px] text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-all flex items-center gap-1 font-mono tracking-wider cursor-default hover:cursor-pointer select-none"
              title="system terminal (Ctrl+Shift+A)"
            >
              <span>sys.root</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};
