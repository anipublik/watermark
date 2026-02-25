"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { WatermarkConfig, WatermarkStyle, StegOption } from "@/types";
import { Toggle } from "@/components/ui/Toggle";
import { useAppState } from "@/hooks/useAppState";

const PURPOSES = [
    "Review Only", "Internal Use Only", "Confidential", "Do Not Distribute",
    "Draft - Not Final", "Attorney-Client Privileged", "Under NDA", "For Approval", "Reference Only",
];

const STYLES: { value: WatermarkStyle; label: string; icon: string; isNew?: boolean }[] = [
    { value: "diagonal", label: "Diagonal", icon: "🔄" },
    { value: "corner", label: "Corner", icon: "📌" },
    { value: "banner", label: "Banner", icon: "🏷️" },
    { value: "grid", label: "Tiled", icon: "▦" },
    { value: "qr", label: "QR stamp", icon: "⬛", isNew: true },
    { value: "qr+diagonal", label: "Diag + QR", icon: "🔄⬛", isNew: true },
];

const STEG_OPTIONS: { id: StegOption; name: string; badge: string; desc: string }[] = [
    { id: "stegPdfMeta", name: "PDF metadata injection", badge: "INVISIBLE", desc: "Embeds recipient, purpose, tracking ID in PDF XMP + DocInfo. Invisible to readers; readable via pdfinfo or Acrobat Properties." },
    { id: "stegZeroWidth", name: "Zero-width character encoding", badge: "INVISIBLE", desc: "Tracking ID encoded as ZWJ/ZWNJ Unicode woven into text. Survives copy-paste. Detectable via hex editor." },
    { id: "stegInvisText", name: "White-on-white text layer", badge: "NEAR-INVISIBLE", desc: "Full tracking payload as 1pt white text. Extractable with pdftotext, CTRL+A, or screen readers." },
    { id: "stegMicroQr", name: "Micro QR at 2% opacity", badge: "NEAR-INVISIBLE", desc: "QR code rendered nearly invisible in corner. Recoverable with contrast boost in image editing tools." },
];

function buildPreviewText(w: WatermarkConfig): string {
    if (w.customText.trim()) return w.customText.trim();
    const parts: string[] = [];
    if (w.purpose) parts.push(w.purpose.toUpperCase());
    if (w.recipient) parts.push(`FOR: ${w.recipient.toUpperCase()}`);
    if (w.expiry) parts.push(`UNTIL: ${w.expiry}`);
    return parts.length ? parts.join(" | ") : "CONFIDENTIAL";
}

interface Props {
    watermark: WatermarkConfig;
    stegOptions: Set<StegOption>;
    forensicId: string;
    forensicTs: string;
    onWatermark: (patch: Partial<WatermarkConfig>) => void;
    onStyleChange: (styles: WatermarkStyle[]) => void;
    onStegToggle: (opt: StegOption) => void;
    onRegenId: () => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepWatermark({
    watermark, stegOptions, forensicId, forensicTs,
    onWatermark, onStyleChange, onStegToggle, onRegenId, onNext, onBack,
}: Props) {
    const { state } = useAppState();
    const previewText = buildPreviewText(watermark);

    // Live preview canvas state
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [copiedId, setCopiedId] = useState(false);

    // Multi-select logic
    const toggleStyle = (style: WatermarkStyle) => {
        const set = new Set(watermark.styles);
        if (set.has(style)) {
            set.delete(style);
        } else {
            if (set.size >= 2) return; // max 2
            set.add(style);
        }
        onStyleChange(Array.from(set));
    };

    const copyId = useCallback(() => {
        navigator.clipboard.writeText(forensicId);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
    }, [forensicId]);

    // Render live document preview
    useEffect(() => {
        if (!state.fileBytes || !canvasRef.current) return;
        let isStale = false;

        const renderPreview = async () => {
            setPreviewLoading(true);
            try {
                const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
                GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

                const task = getDocument({ data: state.fileBytes!.slice() });
                const pdf = await task.promise;
                const page = await pdf.getPage(1);

                if (isStale) return;

                const viewport = page.getViewport({ scale: 1.0 }); // render at 1x
                const canvas = canvasRef.current;
                if (!canvas) return;

                // We want to fit within the 128px high container while maintaining aspect ratio
                const scale = 120 / viewport.height;
                const scaledViewport = page.getViewport({ scale });

                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
                }
            } catch (e) {
                console.error("Preview render failed:", e);
            } finally {
                if (!isStale) setPreviewLoading(false);
            }
        };

        renderPreview();
        return () => { isStale = true; };
    }, [state.fileBytes]); // Only re-render underlying PDF when file changes

    return (
        <div className="border border-[var(--article-border)]" style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow-neumorphic)", backdropFilter: "blur(12px)" }}>
            <div className="p-6 sm:p-8">

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-theme-cyan" style={{ boxShadow: "0 0 10px rgba(var(--theme-cyan), 0.5)" }} />
                    <h2 className="font-bold text-base text-[var(--foreground)]">Watermark + forensic configuration</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                        { id: "recipient", label: "Recipient / name", placeholder: "e.g. John Smith", type: "text" },
                        { id: "organization", label: "Organization", placeholder: "e.g. Acme Corp", type: "text" },
                        { id: "expiry", label: "Valid until", placeholder: "", type: "date" },
                    ].map(({ id, label, placeholder, type }) => (
                        <div key={id} className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider">{label}</label>
                            <input
                                type={type}
                                value={watermark[id as keyof WatermarkConfig] as string}
                                onChange={(e) => onWatermark({ [id]: e.target.value })}
                                placeholder={placeholder}
                                className="bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-cyan transition-colors"
                            />
                        </div>
                    ))}

                    <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Purpose</label>
                        <select
                            value={watermark.purpose}
                            onChange={(e) => onWatermark({ purpose: e.target.value })}
                            className="bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-cyan transition-colors"
                        >
                            <option value="">Select purpose...</option>
                            {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Custom text (optional override)</label>
                        <input
                            type="text"
                            value={watermark.customText}
                            onChange={(e) => onWatermark({ customText: e.target.value })}
                            placeholder="e.g. EYES ONLY — BOARD REVIEW 2025"
                            maxLength={80}
                            className="bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-cyan transition-colors"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <p className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Watermark style</p>
                    <span className="text-[10px] font-mono font-bold text-theme-cyan bg-theme-cyan/10 px-1.5 py-0.5 rounded">SELECT UP TO 2</span>
                </div>

                <div className="flex gap-2 flex-wrap mb-6">
                    {STYLES.map((s) => {
                        const isSelected = watermark.styles.includes(s.value);
                        const isDisabled = !isSelected && watermark.styles.length >= 2;
                        return (
                            <button
                                key={s.value}
                                onClick={() => toggleStyle(s.value)}
                                disabled={isDisabled}
                                className={`flex-[1_1_0%] min-w-[30%] sm:min-w-[70px] p-3 border text-center transition-all relative ${isSelected
                                    ? "border-theme-cyan bg-theme-cyan/5 shadow-[0_0_15px_rgba(var(--theme-cyan),_0.1)] text-[var(--foreground)]"
                                    : isDisabled
                                        ? "border-[var(--article-border)] bg-[var(--article-surface)] text-[var(--muted-foreground)] opacity-40 cursor-not-allowed"
                                        : s.isNew
                                            ? "border-dashed border-[var(--article-border)] hover:border-theme-cyan/50 text-[var(--muted-foreground)]"
                                            : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-cyan/50 text-[var(--muted-foreground)]"
                                    }`}
                                style={!isSelected && !isDisabled && !s.isNew ? { boxShadow: "var(--shadow-neumorphic)" } : {}}
                            >
                                <div className={`absolute top-2 left-2 flex items-center justify-center w-3 h-3 border rounded-sm transition-colors text-[8px] font-bold ${isSelected ? "bg-theme-cyan border-theme-cyan text-black" : "border-[var(--muted-foreground)] opacity-30"
                                    }`}>
                                    {isSelected && "✓"}
                                </div>
                                {s.isNew && (
                                    <span className="absolute top-2 right-2 bg-theme-cyan text-black text-[8px] font-mono font-bold px-1 rounded-sm">NEW</span>
                                )}
                                <div className="text-xl mb-1 mt-2">{s.icon}</div>
                                <div className="text-xs font-semibold">{s.label}</div>
                            </button>
                        );
                    })}
                </div>

                <div className="text-xs text-[var(--muted-foreground)] font-mono text-center mb-6 px-2">
                    💡 <strong className="text-[var(--foreground)]">Uncheck all boxes</strong> to apply redaction without adding a watermark.
                </div>

                <p className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-3">Live preview</p>
                <div className="relative border border-[var(--article-border)] h-32 flex items-center justify-center mb-6 overflow-hidden bg-[var(--article-surface)]" style={{ boxShadow: "var(--shadow-inset)" }}>

                    {/* The actual underlying PDF page render */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80" style={{ filter: "grayscale(100%) brightness(0.9)" }}>
                        {previewLoading && <span className="text-[10px] font-mono text-[var(--muted-foreground)] animate-pulse">Rendering page 1...</span>}
                        <canvas ref={canvasRef} className="shadow-lg border border-black/10" style={{ display: previewLoading ? "none" : "block" }} />
                    </div>

                    {/* Watermark Overlays */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {watermark.styles.map(style => {
                            if (style === "banner") {
                                return (
                                    <div key={style} className="absolute top-0 left-0 right-0 bg-theme-cyan/20 px-2 py-1 font-mono text-[10px] font-bold text-theme-cyan uppercase tracking-widest text-center truncate backdrop-blur-sm border-b border-theme-cyan/40">
                                        {previewText}
                                    </div>
                                );
                            }
                            if (style === "corner") {
                                return (
                                    <div key={style} className="absolute top-[2px] right-[2px] font-mono text-[8px] font-bold text-theme-cyan uppercase drop-shadow">
                                        {previewText.slice(0, 20)}
                                    </div>
                                );
                            }
                            if (style === "grid") {
                                return (
                                    <div key={style} className="absolute inset-0 grid grid-cols-2 grid-rows-2 items-center justify-items-center opacity-40">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="font-mono font-bold text-theme-cyan uppercase tracking-widest text-[8px] whitespace-nowrap" style={{ transform: "rotate(-30deg)" }}>{previewText.slice(0, 15)}</div>
                                        ))}
                                    </div>
                                );
                            }
                            if (style === "diagonal" || style === "qr+diagonal") {
                                return (
                                    <div key={style} className="font-mono font-bold text-theme-cyan uppercase tracking-widest text-sm whitespace-nowrap drop-shadow-[0_0_2px_#000]" style={{ transform: "rotate(-30deg)", opacity: 0.9 }}>
                                        {previewText}
                                    </div>
                                );
                            }
                            return null;
                        })}

                        {watermark.styles.some(s => s.includes("qr")) && (
                            <div className="absolute bottom-1 right-1 w-8 h-8 bg-white border border-theme-cyan flex items-center justify-center p-0.5">
                                <div className="w-full h-full bg-black/80 flex items-center justify-center text-[8px] text-white">QR</div>
                            </div>
                        )}
                    </div>
                </div>

                <hr className="border-[var(--article-border)] my-6" />

                <div className="flex items-center gap-2 mb-3">
                    <p className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Forensic tracking ID</p>
                    <span className="bg-theme-cyan text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">NEW</span>
                </div>

                <div className="bg-[var(--article-surface)] border border-[var(--article-border)] border-l-2 border-l-theme-cyan pl-5 pr-4 py-4 mb-3 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between mb-1.5">
                        <p className="font-mono text-sm font-bold text-theme-cyan tracking-wider break-all drop-shadow-[0_0_8px_rgba(var(--theme-cyan),_0.4)]">{forensicId}</p>
                        <button
                            onClick={copyId}
                            className={`p-1.5 rounded transition-all flex items-center gap-1 ${copiedId ? "bg-emerald-500/20 text-emerald-500 border-none" : "border border-[var(--article-border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-theme-cyan hover:text-theme-cyan"}`}
                        >
                            {copiedId ? "✓ Copied" : "📋 Copy"}
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-4 font-mono text-xs text-[var(--muted-foreground)]">
                        <span>⏱ {new Date(forensicTs).toLocaleString()}</span>
                        <span>🔑 128-bit entropy</span>
                    </div>

                    <button
                        onClick={onRegenId}
                        className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] hover:text-theme-cyan transition-colors"
                    >
                        ↻ Regenerate
                    </button>
                </div>

                <div className="px-4 py-3 bg-[var(--card-bg)] border border-[var(--article-border)] flex gap-3 text-xs mb-6">
                    <span className="text-xl">💡</span>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">
                        <strong className="text-[var(--foreground)]">Save this tracking ID.</strong> It acts as the immutable cryptographic fingerprint for this specific download.
                        If this document leaks publicly or appears somewhere it shouldn't, you can reverse-search this ID in your records to undeniably prove who it was issued to.
                    </p>
                </div>

                <hr className="border-[var(--article-border)] my-6" />

                <div className="flex items-center gap-2 mb-4">
                    <p className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Invisible steganographic layers</p>
                    <span className="bg-theme-cyan text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">NEW</span>
                </div>

                <div className="space-y-2.5">
                    {STEG_OPTIONS.map((opt) => {
                        const enabled = stegOptions.has(opt.id);
                        return (
                            <div
                                key={opt.id}
                                onClick={() => onStegToggle(opt.id)}
                                className={`flex items-start justify-between gap-4 px-4 py-3 border cursor-pointer transition-all ${enabled ? "border-theme-cyan bg-theme-cyan/[0.04] shadow-[0_0_20px_rgba(var(--theme-cyan),_0.1)]" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-cyan/30"
                                    }`}
                                style={!enabled ? { boxShadow: "var(--shadow-neumorphic)" } : {}}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
                                        {opt.name}
                                        <span className="bg-[var(--article-surface-strong)] text-[var(--muted-foreground)] border border-[var(--article-border)] text-[9px] font-mono font-bold px-1 rounded">{opt.badge}</span>
                                    </div>
                                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{opt.desc}</p>
                                </div>
                                <Toggle enabled={enabled} onToggle={() => onStegToggle(opt.id)} color="cyan" />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-t border-[var(--article-border)]">
                <button onClick={onBack} className="px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-[var(--article-border)] text-[var(--foreground)] bg-[var(--article-surface)] hover:border-theme-cyan/50 transition-all" style={{ boxShadow: "var(--shadow-neumorphic)" }}>← Back</button>
                <button onClick={onNext} className="px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] shadow-[0_0_20px_rgba(var(--theme-cyan),_0.2)] hover:shadow-[0_0_30px_rgba(var(--theme-cyan),_0.4)] transition-all" style={{ boxShadow: "var(--shadow-neumorphic)" }}>Continue →</button>
            </div>
        </div >
    );
}
