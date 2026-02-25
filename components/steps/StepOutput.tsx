"use client";

import type { AuditRecord } from "@/types";

const REPORT_FIELDS: { key: keyof AuditRecord; label: string; highlight?: boolean }[] = [
    { key: "tracking_id", label: "Tracking ID", highlight: true },
    { key: "issued", label: "Issued" },
    { key: "recipient", label: "Recipient" },
    { key: "organization", label: "Organization" },
    { key: "purpose", label: "Purpose" },
    { key: "expires", label: "Expires" },
    { key: "watermark_style", label: "Watermark style" },
    { key: "qr_embedded", label: "QR embedded" },
    { key: "steg_layers", label: "Steg layers" },
    { key: "zerowidth_encoded", label: "Zero-width" },
    { key: "redactions", label: "Redactions" },
    { key: "document", label: "Document" },
];

function Tag({ text, v }: { text: string; v: "default" | "active" | "redact" | "forensic" }) {
    const c = { default: "border-[var(--article-border)] text-[var(--muted-foreground)]", active: "border-theme-cyan text-theme-cyan font-semibold bg-theme-cyan/5", redact: "border-theme-red text-theme-red font-semibold bg-theme-red/5", forensic: "border-theme-cyan text-theme-cyan font-semibold bg-theme-cyan/5" }[v];
    return <span className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider shadow-[var(--shadow-neumorphic)] ${c}`}>{text}</span>;
}

interface Props {
    progress: number;
    progressLabel: string;
    done: boolean;
    error: string | null;
    auditRecord: AuditRecord | null;
    outputBytes: Uint8Array | null;
    onDownloadPdf: () => void;
    onDownloadAudit: () => void;
    onStartOver: () => void;
}

export function StepOutput({ progress, progressLabel, done, error, auditRecord, outputBytes, onDownloadPdf, onDownloadAudit, onStartOver }: Props) {
    const handlePrint = () => {
        if (!outputBytes) return;
        const blob = new Blob([outputBytes.buffer as ArrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = url;
        document.body.appendChild(iframe);

        iframe.onload = () => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            setTimeout(() => {
                document.body.removeChild(iframe);
                URL.revokeObjectURL(url);
            }, 1000);
        };
    };

    return (
        <div className="border border-[var(--article-border)]" style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow-neumorphic)", backdropFilter: "blur(12px)" }}>
            {!done && !error && (
                <div className="p-16 text-center">
                    <p className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-4">{progressLabel}</p>
                    <div className="h-0.5 bg-[var(--article-surface-strong)] max-w-xs mx-auto overflow-hidden mb-2" style={{ boxShadow: "var(--shadow-inset)" }}>
                        <div className="h-full bg-theme-cyan transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="font-mono text-xs text-[var(--foreground)] mt-2">{progress}%</p>
                </div>
            )}

            {error && (
                <div className="m-6 border border-red-800 bg-red-900/20 px-4 py-4 font-mono text-xs text-theme-red">⚠ {error}</div>
            )}

            {done && auditRecord && (
                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-3 flex justify-center">
                            <div className="w-16 h-16 rounded-full bg-theme-cyan/10 flex items-center justify-center text-theme-cyan border border-theme-cyan/30 shadow-[0_0_30px_rgba(34,211,238,0.2)]">✓</div>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-[var(--foreground)]">Document protected</h2>
                        <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                            {[
                                `${auditRecord.watermark_style} watermark`,
                                auditRecord.qr_embedded === "yes" && "QR embedded",
                                auditRecord.steg_layers !== "none" && `${auditRecord.steg_layers.split(",").length} steg layer(s)`,
                                auditRecord.redactions !== "none" && "redactions applied",
                                "forensic ID burned in",
                            ].filter(Boolean).join(" · ")}
                        </p>
                    </div>

                    <div className="bg-[var(--article-surface)] border border-[var(--article-border)] p-5 mb-5 shadow-[var(--shadow-inset)]">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-mono text-xs text-theme-cyan uppercase tracking-wider drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">Forensic audit record</span>
                            <div className="flex-1 h-px bg-[var(--article-border)]" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {REPORT_FIELDS.map(({ key, label, highlight }) => (
                                <div key={key} className="flex flex-col gap-0.5">
                                    <span className="font-mono text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">{label}</span>
                                    <span className={`font-mono text-xs break-all ${highlight ? "text-theme-cyan font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" : "text-[var(--foreground)]"}`}>
                                        {String(auditRecord[key])}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                        {auditRecord.purpose && <Tag text={auditRecord.purpose} v="active" />}
                        {auditRecord.recipient !== "N/A" && <Tag text={`For: ${auditRecord.recipient}`} v="active" />}
                        <Tag text={`${auditRecord.watermark_style} watermark`} v="active" />
                        {auditRecord.qr_embedded === "yes" && <Tag text="QR embedded" v="forensic" />}
                        <Tag text="Forensic ID" v="forensic" />
                        {auditRecord.steg_layers !== "none" && <Tag text={`${auditRecord.steg_layers.split(",").length} steg layers`} v="forensic" />}
                        {auditRecord.zerowidth_encoded.startsWith("yes") && <Tag text="Zero-width encoded" v="forensic" />}
                        {auditRecord.redactions !== "none" && auditRecord.redactions.split(", ").map((r) => <Tag key={r} text={`${r} redacted`} v="redact" />)}
                    </div>

                    <button onClick={onDownloadPdf} disabled={!outputBytes} className="px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all disabled:opacity-40" style={outputBytes ? { boxShadow: "var(--shadow-neumorphic)" } : {}}>
                        ⬇ Download
                    </button>
                    <button onClick={handlePrint} disabled={!outputBytes} className="px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all disabled:opacity-40" style={outputBytes ? { boxShadow: "var(--shadow-neumorphic)" } : {}}>
                        🖨 Print
                    </button>
                    <button onClick={onDownloadAudit} className="px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-theme-cyan bg-theme-cyan/5 text-theme-cyan hover:bg-theme-cyan hover:text-black hover:scale-[1.02] transition-all" style={{ boxShadow: "var(--shadow-neumorphic)" }}>
                        📋 Audit report
                    </button>
                    <button onClick={onStartOver} className="px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-[var(--article-border)] text-[var(--foreground)] bg-[var(--article-surface)] hover:border-theme-cyan/50 transition-all" style={{ boxShadow: "var(--shadow-neumorphic)" }}>
                        Start over
                    </button>
                </div>
            )}
        </div>
    );
}
