import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import type { WatermarkConfig, RedactConfig, StegConfig, AuditRecord } from "@/types";
import { encodeZeroWidth, buildQrPayload, sleep } from "./utils";
import { flattenPdf } from "./flatten";
import { rasterizeAndRedact } from "./redact";

export interface ProcessDocumentParams {
    fileBytes: Uint8Array;
    fileName: string;
    fileType: string;
    watermark: WatermarkConfig;
    redact: RedactConfig;
    steg: StegConfig;
    forensicId: string;
    onProgress: (pct: number, label: string) => void;
}

export interface ProcessDocumentResult {
    pdfBytes: Uint8Array;
    auditRecord: AuditRecord;
}

function buildWatermarkText(config: WatermarkConfig): string {
    if (config.customText.trim()) return config.customText.trim();
    const parts: string[] = [];
    if (config.purpose) parts.push(config.purpose.toUpperCase());
    if (config.recipient) parts.push(`FOR: ${config.recipient.toUpperCase()}`);
    if (config.expiry) parts.push(`UNTIL: ${config.expiry}`);
    return parts.length ? parts.join(" | ") : "CONFIDENTIAL";
}

async function generateQrDataUrl(payload: string): Promise<string | null> {
    try {
        const QRCode = (await import("qrcode")).default;
        return await QRCode.toDataURL(payload, {
            width: 128,
            margin: 1,
            color: { dark: "#000000", light: "#ffffff" },
        });
    } catch (e) {
        console.warn("QR generation failed:", e);
        return null;
    }
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
    const base64 = dataUrl.split(",")[1];
    const binary = atob(base64);
    const arr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
    return arr;
}

export async function processDocument({
    fileBytes,
    fileName,
    fileType,
    watermark,
    redact,
    steg,
    forensicId,
    onProgress,
}: ProcessDocumentParams): Promise<ProcessDocumentResult> {
    const now = new Date().toISOString();
    const { recipient, organization, purpose, expiry, styles } = watermark;
    const wmText = buildWatermarkText(watermark);

    const qrPayload = buildQrPayload({
        fid: forensicId,
        recipient,
        org: organization,
        purpose,
        expiry,
        issuedAt: now,
        docName: fileName,
    });

    onProgress(8, "Initializing...");
    await sleep(120);

    onProgress(18, "Parsing document...");
    await sleep(180);

    let pdfDoc: PDFDocument;
    const isImage = fileType.startsWith("image/");

    if (isImage) {
        pdfDoc = await PDFDocument.create();
        const img =
            fileType === "image/png"
                ? await pdfDoc.embedPng(fileBytes)
                : await pdfDoc.embedJpg(fileBytes);
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    } else {
        pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
    }

    const pages = pdfDoc.getPages();
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const needsQr = styles.some(s => s === "qr" || s === "qr+diagonal") || steg.options.has("stegMicroQr");
    let qrImg = null;

    if (needsQr) {
        onProgress(28, "Generating QR code...");
        await sleep(80);
        try {
            const qrDataUrl = await generateQrDataUrl(qrPayload);
            if (qrDataUrl) {
                const qrBytes = dataUrlToUint8Array(qrDataUrl);
                qrImg = await pdfDoc.embedPng(qrBytes);
            }
        } catch (e) {
            console.warn("QR embed failed:", e);
        }
    }

    onProgress(40, "Applying watermark...");
    await sleep(200);

    for (const page of pages) {
        const { width, height } = page.getSize();

        for (const style of styles) {
            if (style === "diagonal" || style === "grid" || style === "qr+diagonal") {
                const tiles = style === "grid" ? 3 : 1;
                for (let tx = 0; tx < tiles; tx++) {
                    for (let ty = 0; ty < tiles; ty++) {
                        const isGrid = style === "grid";
                        page.drawText(wmText, {
                            x: isGrid
                                ? (width / 3) * tx + 18
                                : Math.max(10, width / 2 - wmText.length * 7),
                            y: isGrid ? (height / 3) * (ty + 0.5) : height / 2,
                            font: fontBold,
                            size: isGrid ? 12 : 20,
                            color: rgb(0.9, 1.0, 0.2),
                            opacity: isGrid ? 0.1 : 0.16,
                            rotate: degrees(-30),
                        });
                    }
                }
            }

            if (style === "corner") {
                page.drawText(wmText.slice(0, 60), {
                    x: Math.max(10, width - wmText.length * 5.5 - 12),
                    y: height - 25,
                    font: fontBold,
                    size: 8,
                    color: rgb(0.9, 1.0, 0.2),
                    opacity: 0.65,
                });
            }

            if (style === "banner") {
                page.drawRectangle({
                    x: 0, y: height - 24, width, height: 24,
                    color: rgb(0.04, 0.04, 0.07),
                    opacity: 0.65,
                });
                page.drawText(wmText.slice(0, 80), {
                    x: 9, y: height - 17,
                    font: fontBold, size: 8.5,
                    color: rgb(0.9, 1.0, 0.2),
                    opacity: 0.9,
                });
            }

            if (qrImg && (style === "qr" || style === "qr+diagonal")) {
                const qs = Math.min(width * 0.17, 95);
                page.drawImage(qrImg, { x: width - qs - 10, y: 10, width: qs, height: qs, opacity: 0.88 });
                page.drawText("SCAN TO VERIFY", {
                    x: width - qs - 10, y: qs + 14,
                    font: fontBold, size: 5,
                    color: rgb(0.45, 0.55, 0.45), opacity: 0.8,
                });
            }
        } // end for style of styles

        if (qrImg && steg.options.has("stegMicroQr")) {
            const mqs = Math.min(width * 0.11, 55);
            // Tile the micro-QRs across the entire document page (4x6 grid) to survive partial cropping
            const cols = 4;
            const rows = 6;
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    page.drawImage(qrImg, {
                        x: (width / cols) * (c + 0.5) - mqs / 2,
                        y: (height / rows) * (r + 0.5) - mqs / 2,
                        width: mqs,
                        height: mqs,
                        opacity: 0.012
                    });
                }
            }
        }

        if (steg.options.has("stegInvisText")) {
            const payload = `FVSTEG:${forensicId}:${recipient}:${organization}:${purpose}:${now}`;
            page.drawText(payload, {
                x: 8, y: height / 3,
                font: fontReg, size: 1,
                color: rgb(1, 1, 1), opacity: 0.01,
            });
        }

        const footer = `Watermark | ID:${forensicId} | To:${recipient || "N/A"} | ${now.split("T")[0]}`;
        page.drawText(footer, {
            x: 8, y: 6,
            font: fontReg, size: 5.5,
            color: rgb(0.4, 0.4, 0.5), opacity: 0.55,
        });
    }

    onProgress(60, "Embedding steganographic metadata...");
    await sleep(220);

    if (steg.options.has("stegPdfMeta")) {
        pdfDoc.setTitle(`[PROTECTED] ${fileName}`);
        pdfDoc.setAuthor(`Watermark | ${recipient || "N/A"}`);
        pdfDoc.setSubject(`Purpose: ${purpose || "Confidential"} | Recipient: ${recipient || "N/A"} | Org: ${organization || "N/A"}`);
        pdfDoc.setKeywords([forensicId, "watermark-protected", recipient, organization, purpose, now]);
        pdfDoc.setProducer("Watermark");
        pdfDoc.setCreator(`Watermark | TrackingID:${forensicId}`);
    } else {
        pdfDoc.setTitle(`[PROTECTED] ${fileName}`);
        pdfDoc.setProducer("Watermark v2");
        pdfDoc.setCreator(`WM:${forensicId}`);
    }

    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    if (redact.categories.size > 0) {
        pdfDoc.setKeywords([
            forensicId,
            `REDACTED:${Array.from(redact.categories).join(",")}`,
            recipient,
            purpose,
        ]);
    }

    onProgress(75, "Processing redactions...");
    await sleep(160);

    onProgress(88, "Finalizing...");
    await sleep(160);

    // ── Flatten (bake form fields into page content) ──────────────────────────
    if (redact.flatten) {
        onProgress(89, "Flattening PDF...");
        await flattenPdf(pdfDoc);
    }

    let pdfBytes = await pdfDoc.save();

    // ── True redaction via rasterization ─────────────────────────────────────
    // Only runs if redaction categories are actually selected.
    // Replaces the PDF with a pixel-only version — no text layer remains.
    const hasRedaction = redact.categories.size > 0;
    let redactedPages = "none";

    if (hasRedaction) {
        pdfBytes = await rasterizeAndRedact(pdfBytes, redact, (pct, label) => {
            onProgress(89 + Math.round(pct * 0.1), label);
        });
        redactedPages = "all";
    }

    onProgress(100, "Done.");
    await sleep(280);

    const zwEncoded = steg.options.has("stegZeroWidth") ? encodeZeroWidth(forensicId) : null;

    const auditRecord: AuditRecord = {
        tracking_id: forensicId,
        issued: now,
        document: fileName,
        recipient: recipient || "N/A",
        organization: organization || "N/A",
        purpose: purpose || "N/A",
        expires: expiry || "N/A",
        watermark_style: styles.join(" + "),
        qr_embedded: needsQr && qrImg ? "yes" : "no",
        steg_layers: Array.from(steg.options).join(", ") || "none",
        zerowidth_encoded: zwEncoded ? `yes (${forensicId})` : "no",
        redactions: Array.from(redact.categories).join(", ") || "none",
        redacted_pages: redactedPages,
        generator: "Watermark",
    };

    return { pdfBytes, auditRecord };
}
