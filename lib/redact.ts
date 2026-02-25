"use client";

import type { RedactConfig } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Regex patterns per redaction category
// ─────────────────────────────────────────────────────────────────────────────
const PATTERNS: Record<string, RegExp> = {
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    phone: /\b(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g,
    email: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
    dob: /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g,
    credit: /\b(?:\d[ \-]?){13,16}\b/g,
    ip: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,
};

function buildPatterns(config: RedactConfig): RegExp[] {
    const patterns: RegExp[] = [];

    for (const cat of config.categories) {
        if (cat === "custom") continue;
        const p = PATTERNS[cat];
        if (p) patterns.push(new RegExp(p.source, "gi"));
    }

    if (config.categories.has("custom") && config.customTerms.trim()) {
        const terms = config.customTerms
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        for (const t of terms) {
            patterns.push(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));
        }
    }

    return patterns;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export: rasterize PDF pages to canvas, redact, return new PDF bytes
// ─────────────────────────────────────────────────────────────────────────────
export async function rasterizeAndRedact(
    pdfBytes: Uint8Array,
    config: RedactConfig,
    onProgress: (pct: number, label: string) => void,
): Promise<Uint8Array> {
    // Dynamic import so Next.js doesn't try to SSR it
    const [{ getDocument, GlobalWorkerOptions }, { PDFDocument }] = await Promise.all([
        import("pdfjs-dist"),
        import("pdf-lib"),
    ]);

    // Point the worker at the bundled file we'll set up in next.config
    GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    onProgress(5, "Loading document for redaction...");

    const loadingTask = getDocument({ data: pdfBytes.slice() });
    const pdfJsDoc = await loadingTask.promise;
    const numPages = pdfJsDoc.numPages;

    const patterns = buildPatterns(config);
    const newPdf = await PDFDocument.create();

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const pct = 10 + Math.round(((pageNum - 1) / numPages) * 80);
        onProgress(pct, `Redacting page ${pageNum} of ${numPages}...`);

        const pdfPage = await pdfJsDoc.getPage(pageNum);
        const viewport = pdfPage.getViewport({ scale: 2.0 }); // 2× for legible output

        // Render page to offscreen canvas
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;

        await pdfPage.render({ canvasContext: ctx, viewport }).promise;

        // Extract text positions and burn black boxes over matches
        if (patterns.length > 0) {
            const textContent = await pdfPage.getTextContent();

            for (const item of textContent.items as Array<{
                str: string;
                transform: number[];
                width: number;
                height: number;
            }>) {
                if (!item.str.trim()) continue;

                const matchesAny = patterns.some((p) => {
                    p.lastIndex = 0;
                    return p.test(item.str);
                });

                if (matchesAny) {
                    // item.transform is a 6-element matrix [a, b, c, d, e, f]
                    // e = x, f = y (in PDF coordinate space, origin is bottom-left)
                    const [, , , , x, y] = item.transform;
                    const scaledX = x * 2;
                    const scaledY = viewport.height - y * 2 - item.height * 2;
                    const scaledW = item.width * 2;
                    const scaledH = item.height * 2 * 1.3; // slight padding

                    ctx.fillStyle = "#000000";
                    ctx.fillRect(scaledX, scaledY, scaledW, scaledH);
                }
            }
        }

        // Export canvas as PNG and embed into new pdf-lib document
        const pngDataUrl = canvas.toDataURL("image/png");
        const base64 = pngDataUrl.split(",")[1];
        const pngBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        const embeddedImg = await newPdf.embedPng(pngBytes);

        const addedPage = newPdf.addPage([viewport.width / 2, viewport.height / 2]);
        addedPage.drawImage(embeddedImg, {
            x: 0,
            y: 0,
            width: viewport.width / 2,
            height: viewport.height / 2,
        });
    }

    onProgress(95, "Saving redacted document...");
    return newPdf.save();
}
