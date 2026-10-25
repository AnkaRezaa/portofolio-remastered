import * as pdfjsLib from "pdfjs-dist";

// Configure worker using unpkg or cdnjs corresponding to installed pdfjs-dist version
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "3.11.174"}/pdf.worker.min.js`;
}

/**
 * Creates an elegant SVG/Canvas fallback card thumbnail for a PDF document
 */
export const createPdfFallbackThumbnail = (title: string = "Dokumen PDF"): string => {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Background subtle gradient
  const grad = ctx.createLinearGradient(0, 0, 800, 600);
  grad.addColorStop(0, "#0f172a");
  grad.addColorStop(1, "#1e293b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 600);

  // Border & Grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 760, 560);

  // PDF Badge
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.roundRect(50, 50, 90, 36, 8);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 16px 'JetBrains Mono', monospace";
  ctx.fillText("PDF", 78, 74);

  // Document Icon representation
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.beginPath();
  ctx.roundRect(250, 100, 300, 380, 16);
  ctx.fill();
  ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
  ctx.stroke();

  // Document title inside
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
  const displayTitle = title.length > 36 ? title.substring(0, 33) + "..." : title;
  ctx.fillText(displayTitle, 60, 530);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "14px 'JetBrains Mono', monospace";
  ctx.fillText("Pratinjau Dokumen Portofolio", 60, 555);

  return canvas.toDataURL("image/jpeg", 0.9);
};

/**
 * Renders the first page of a PDF file to a compressed image data URL
 */
export const renderPdfCoverToThumbnail = async (
  fileOrUrl: File | string,
  docTitle?: string
): Promise<string> => {
  try {
    let arrayBuffer: ArrayBuffer;

    if (typeof fileOrUrl === "string") {
      if (fileOrUrl.startsWith("data:application/pdf;base64,")) {
        const base64Data = fileOrUrl.replace("data:application/pdf;base64,", "");
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        arrayBuffer = bytes.buffer;
      } else {
        const response = await fetch(fileOrUrl);
        arrayBuffer = await response.arrayBuffer();
      }
    } else {
      arrayBuffer = await fileOrUrl.arrayBuffer();
    }

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    // Render with crisp scale for high-DPI displays
    const unscaledViewport = page.getViewport({ scale: 1 });
    const targetWidth = 1000;
    const scale = targetWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return createPdfFallbackThumbnail(docTitle);
    }

    // White page background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    return canvas.toDataURL("image/jpeg", 0.88);
  } catch (err) {
    console.warn("PDF rasterization failed, using dynamic stylized card fallback:", err);
    return createPdfFallbackThumbnail(docTitle);
  }
};
