import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Link2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  FileText,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { renderPdfCoverToThumbnail } from "../lib/pdfThumbnail";

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  previewAspect?: "video" | "cert" | "square";
  helpText?: string;
  docTitle?: string;
}

/**
 * Optimizes and converts image file to compressed Base64 Data URL
 */
export const compressImageFile = (
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 800,
  quality: number = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If SVG, read as text directly
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const outputFormat =
          file.type === "image/png" && file.size < 400000
            ? "image/png"
            : "image/jpeg";
        const dataUrl = canvas.toDataURL(outputFormat, quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "https://... atau /assets/...",
  previewAspect = "video",
  helpText = "Format didukung: JPG, PNG, WEBP, SVG, PDF. File PDF otomatis dirender halaman pertamanya sebagai thumbnail.",
  docTitle = "Dokumen",
}) => {
  const [mode, setMode] = useState<"file" | "url">("file");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processStatus, setProcessStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPdfSource, setIsPdfSource] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File selection handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processFile(files[0]);
  };

  // Drag & Drop handler
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    const isImage = file.type.startsWith("image/");

    if (!isImage && !isPdf) {
      setErrorMsg("File harus berupa Gambar (JPG, PNG, WEBP, SVG) atau Dokumen PDF!");
      return;
    }

    // Max 15MB input check
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg("Ukuran file terlalu besar! Maksimal 15MB.");
      return;
    }

    setErrorMsg("");
    setIsProcessing(true);

    try {
      if (isPdf) {
        setIsPdfSource(true);
        setProcessStatus("Merender halaman 1 PDF menjadi thumbnail...");
        const pdfThumbnail = await renderPdfCoverToThumbnail(
          file,
          docTitle || file.name
        );
        onChange(pdfThumbnail);
      } else {
        setIsPdfSource(false);
        setProcessStatus("Mengoptimasi dan mengompresi gambar...");
        const isCert = previewAspect === "cert";
        const compressedDataUrl = await compressImageFile(
          file,
          isCert ? 1000 : 1200,
          isCert ? 800 : 750,
          0.85
        );
        onChange(compressedDataUrl);
      }
    } catch (err) {
      console.error("Upload process error:", err);
      setErrorMsg("Gagal memproses file. Pastikan file valid.");
    } finally {
      setIsProcessing(false);
      setProcessStatus("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Process PDF from direct URL
  const handleProcessPdfUrl = async () => {
    if (!value || !value.toLowerCase().includes(".pdf")) return;
    setIsProcessing(true);
    setProcessStatus("Merender halaman 1 PDF dari tautan...");
    setErrorMsg("");
    try {
      const pdfThumbnail = await renderPdfCoverToThumbnail(value, docTitle);
      onChange(pdfThumbnail);
      setIsPdfSource(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal mengambil PDF dari tautan. Pastikan link dapat diakses publik.");
    } finally {
      setIsProcessing(false);
      setProcessStatus("");
    }
  };

  // Trigger hidden file picker
  const triggerPicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Clear file
  const handleRemoveImage = () => {
    onChange("");
    setIsPdfSource(false);
    setErrorMsg("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasValue = Boolean(value && value.trim().length > 0);
  const isBase64 = value?.startsWith("data:image");
  const isDirectPdfUrl = value?.toLowerCase().endsWith(".pdf");

  return (
    <div className="space-y-3">
      {/* Label & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block text-xs font-mono font-bold text-slate-300">
          {label}
        </label>

        {/* Dual Input Mode Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-white/10 text-[11px] font-mono self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode("file")}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === "file"
                ? "bg-orange-500 text-white font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload File / PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === "url"
                ? "bg-orange-500 text-white font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Link URL</span>
          </button>
        </div>
      </div>

      {/* Input Mode 1: File Upload / Drag & Drop */}
      {mode === "file" && (
        <div>
          {/* Hidden HTML input supporting images AND pdfs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml,.pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={triggerPicker}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 group ${
              isDragging
                ? "border-orange-500 bg-orange-500/10 scale-[1.01]"
                : "border-slate-700/80 hover:border-orange-500/60 bg-slate-950/40 hover:bg-slate-950/70"
            }`}
          >
            {isProcessing ? (
              <div className="py-4 flex flex-col items-center gap-2">
                <Loader2 className="w-7 h-7 text-orange-500 animate-spin" />
                <span className="font-mono text-xs text-slate-300">
                  {processStatus || "Memproses dan mengoptimasi file..."}
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500/40 transition-all text-orange-500">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-red-500/40 transition-all text-red-400">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono font-bold text-slate-200">
                    <span className="text-orange-400 underline decoration-orange-500/50 underline-offset-2">
                      Pilih Gambar atau PDF
                    </span>{" "}
                    atau seret file ke sini
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 mt-1 max-w-md">
                    {helpText}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Input Mode 2: Direct Text / URL */}
      {mode === "url" && (
        <div className="space-y-2">
          <div className="relative">
            <Link2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-orange-500 placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono text-slate-500">
            <span>Bisa link gambar online (.jpg, .png) atau tautan PDF (.pdf).</span>

            {isDirectPdfUrl && (
              <button
                type="button"
                onClick={handleProcessPdfUrl}
                disabled={isProcessing}
                className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-all flex items-center gap-1.5 cursor-pointer font-bold disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" />
                <span>Konversi PDF URL ke Thumbnail</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Live Preview Card */}
      {hasValue && (
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 flex flex-col sm:flex-row items-center gap-3.5">
          {/* Thumbnail box */}
          <div
            className={`w-full sm:w-32 h-24 rounded-xl overflow-hidden bg-slate-900 border border-white/15 shrink-0 relative flex items-center justify-center ${
              previewAspect === "cert" ? "aspect-[4/3]" : "aspect-video"
            }`}
          >
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            {/* If PDF badge indicator */}
            {isPdfSource && (
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-bold shadow-md flex items-center gap-1">
                <FileCheck className="w-2.5 h-2.5" />
                <span>PDF COVER</span>
              </div>
            )}

            {/* Fallback icon if image broken */}
            <ImageIcon className="w-6 h-6 text-slate-700 -z-10 absolute" />
          </div>

          {/* Image Information & Quick Actions */}
          <div className="flex-1 min-w-0 w-full space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {isPdfSource
                  ? "Halaman 1 PDF Berhasil Dikonversi Jadi Thumbnail"
                  : "Thumbnail Siap Ditampilkan"}
              </span>
            </div>

            <p className="text-[11px] font-mono text-slate-400 truncate max-w-full">
              {isBase64
                ? isPdfSource
                  ? "Dokumen PDF ter-render (Base64 Web-Optimized)"
                  : "File Unggahan Gambar (Base64 Web-Optimized)"
                : value}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={triggerPicker}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              >
                <UploadCloud className="w-3 h-3 text-orange-400" />
                <span>Ganti File / PDF</span>
              </button>

              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-[11px] font-mono text-rose-400 hover:text-rose-300 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
