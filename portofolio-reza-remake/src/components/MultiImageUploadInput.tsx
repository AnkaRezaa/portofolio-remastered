import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Link2,
  Trash2,
  Star,
  ArrowLeft,
  ArrowRight,
  Plus,
  Loader2,
  AlertCircle,
  Images,
  Eye,
} from "lucide-react";
import { compressImageFile } from "./ImageUploadInput";
import { renderPdfCoverToThumbnail } from "../lib/pdfThumbnail";

interface MultiImageUploadInputProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  helpText?: string;
}

export const MultiImageUploadInput: React.FC<MultiImageUploadInputProps> = ({
  label,
  images = [],
  onChange,
  helpText = "Tambahkan beberapa gambar/tangkapan layar untuk proyek ini. Gambar pertama otomatis menjadi Cover utama.",
}) => {
  const [mode, setMode] = useState<"file" | "url">("file");
  const [urlInput, setUrlInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Process a single file (image or PDF)
  const processSingleFile = async (file: File): Promise<string> => {
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    const isImage = file.type.startsWith("image/");

    if (!isImage && !isPdf) {
      throw new Error(`File "${file.name}" bukan format gambar atau PDF yang didukung.`);
    }

    if (file.size > 20 * 1024 * 1024) {
      throw new Error(`Ukuran file "${file.name}" melebihi 20MB.`);
    }

    if (isPdf) {
      const renderedCover = await renderPdfCoverToThumbnail(file);
      return renderedCover;
    } else {
      const compressed = await compressImageFile(file, 1600, 1000, 0.85);
      return compressed;
    }
  };

  // Process multiple selected files
  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMsg("");
    setIsProcessing(true);

    try {
      const filesArray = Array.from(fileList);
      const newUrls: string[] = [];

      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        setProcessStatus(`Memproses ${i + 1}/${filesArray.length}: ${file.name}...`);
        try {
          const result = await processSingleFile(file);
          if (result) newUrls.push(result);
        } catch (err: any) {
          console.error("Error processing file:", err);
          setErrorMsg(err.message || "Gagal memproses salah satu file.");
        }
      }

      if (newUrls.length > 0) {
        onChange([...images, ...newUrls]);
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Gagal mengunggah file.");
    } finally {
      setIsProcessing(false);
      setProcessStatus("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle URL addition
  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (images.includes(trimmed)) {
      setErrorMsg("URL gambar ini sudah ada di daftar.");
      return;
    }
    onChange([...images, trimmed]);
    setUrlInput("");
    setErrorMsg("");
  };

  // Drag and Drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  // Set an image as primary cover (move to index 0)
  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const target = images[index];
    const filtered = images.filter((_, idx) => idx !== index);
    onChange([target, ...filtered]);
  };

  // Remove an image
  const handleRemove = (index: number) => {
    const filtered = images.filter((_, idx) => idx !== index);
    onChange(filtered);
  };

  // Move image left (earlier in order)
  const handleMoveLeft = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onChange(updated);
  };

  // Move image right (later in order)
  const handleMoveRight = (index: number) => {
    if (index >= images.length - 1) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Label and Count Header */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
          <Images className="w-4 h-4 text-orange-400" />
          <span>{label}</span>
        </label>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-orange-400">
          Total: {images.length} Gambar
        </span>
      </div>

      {/* Tabs: File Upload vs URL */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 w-fit text-xs font-mono">
        <button
          type="button"
          onClick={() => setMode("file")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            mode === "file"
              ? "bg-orange-500 text-white font-bold shadow-md shadow-orange-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload File (Bisa Pilih Banyak)</span>
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            mode === "url"
              ? "bg-orange-500 text-white font-bold shadow-md shadow-orange-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Input Link URL</span>
        </button>
      </div>

      {/* Mode 1: File Upload (Multi-Select Drag & Drop) */}
      {mode === "file" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-orange-500 bg-orange-500/10 scale-[1.01]"
              : "border-white/15 bg-slate-950/60 hover:border-orange-500/50 hover:bg-slate-900/60"
          } ${isProcessing ? "opacity-60 cursor-wait" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/svg+xml,application/pdf"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={isProcessing}
          />

          <div className="flex flex-col items-center justify-center gap-2">
            {isProcessing ? (
              <>
                <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
                <p className="text-xs font-mono text-orange-400 font-bold">
                  {processStatus || "Mengoptimalkan gambar..."}
                </p>
                <p className="text-[11px] text-slate-400">
                  Mengompresi dan merender thumbnail secara otomatis...
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 mb-1">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-white">
                  Pilih atau Drag & Drop Gambar di sini
                </div>
                <p className="text-xs text-slate-400 max-w-md font-sans">
                  Pilih beberapa gambar sekaligus (JPG, PNG, WEBP, SVG) atau dokumen PDF.
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 mt-1">
                  <Plus className="w-3.5 h-3.5 text-orange-400" />
                  <span>Klik untuk browse file dari komputer</span>
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: Input URL */}
      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder="https://... atau /assets/projects/screenshot1.png"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-orange-500 placeholder:text-slate-600"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2.5 rounded-xl bg-orange-500 text-white font-mono text-xs font-bold hover:bg-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Image Gallery Grid & Management */}
      {images.length > 0 ? (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Daftar Gambar Terunggah ({images.length}):</span>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Kosongkan semua gambar proyek ini?")) {
                  onChange([]);
                }
              }}
              className="text-[11px] text-rose-400 hover:text-rose-300 font-mono transition-colors"
            >
              Hapus Semua
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgUrl, index) => {
              const isCover = index === 0;
              return (
                <div
                  key={`${imgUrl.slice(0, 30)}-${index}`}
                  className={`group relative rounded-2xl overflow-hidden border bg-slate-950 transition-all flex flex-col justify-between ${
                    isCover
                      ? "border-amber-500/80 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                      {isCover ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-mono text-[10px] font-black flex items-center gap-1 shadow-md">
                          <Star className="w-3 h-3 fill-current" />
                          <span>COVER</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded-md bg-black/60 text-white font-mono text-[10px] border border-white/10">
                          #{index + 1}
                        </span>
                      )}

                      {/* Quick Preview Button */}
                      <button
                        type="button"
                        onClick={() => setPreviewImage(imgUrl)}
                        className="p-1 rounded-md bg-black/60 text-slate-300 hover:text-white transition-colors"
                        title="Perbesar gambar"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-2 bg-slate-900/90 border-t border-white/5 flex items-center justify-between gap-1 text-[11px] font-mono">
                    <div className="flex items-center gap-1">
                      {/* Move Left */}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMoveLeft(index)}
                          className="p-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                          title="Geser ke kiri"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                      )}

                      {/* Move Right */}
                      {index < images.length - 1 && (
                        <button
                          type="button"
                          onClick={() => handleMoveRight(index)}
                          className="p-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                          title="Geser ke kanan"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}

                      {/* Set as Cover */}
                      {!isCover && (
                        <button
                          type="button"
                          onClick={() => handleSetCover(index)}
                          className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors text-[10px] flex items-center gap-0.5"
                          title="Jadikan Cover Utama"
                        >
                          <Star className="w-2.5 h-2.5" />
                          <span>Cover</span>
                        </button>
                      )}
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                      title="Hapus gambar ini"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center text-xs text-slate-500 font-mono">
          Belum ada gambar yang ditambahkan. Silakan pilih atau unggah gambar di atas.
        </div>
      )}

      {/* Help text */}
      {helpText && (
        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
          💡 {helpText}
        </p>
      )}

      {/* Zoom Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 bg-slate-950">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-colors z-10"
            >
              ✕
            </button>
            <img
              src={previewImage}
              alt="Zoom Preview"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
