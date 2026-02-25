"use client";

import { useRef, useState, useCallback } from "react";
import { formatFileSize } from "@/lib/utils";

const ACCEPTED = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

interface StepUploadProps {
    file: File | null;
    onFile: (file: File, bytes: Uint8Array) => void;
    onRemove: () => void;
    onNext: () => void;
}

export function StepUpload({ file, onFile, onRemove, onNext }: StepUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = useCallback((f: File) => {
        if (!ACCEPTED.includes(f.type)) {
            setError("Unsupported file. Please upload a PDF, PNG, or JPG.");
            return;
        }
        setError(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            onFile(f, new Uint8Array(e.target!.result as ArrayBuffer));
        };
        reader.readAsArrayBuffer(f);
    }, [onFile]);

    return (
        <div className="border border-[var(--article-border)]" style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow-neumorphic)", backdropFilter: "blur(12px)" }}>
            {!file && (
                <div
                    className={`m-6 border-2 border-dashed p-14 text-center cursor-pointer transition-all relative ${dragOver ? "border-theme-cyan bg-theme-cyan/5" : "border-[var(--article-border)] hover:border-theme-cyan hover:bg-theme-cyan/5"
                        }`}
                    style={dragOver ? { boxShadow: "var(--shadow-inset)" } : { boxShadow: "var(--shadow-neumorphic)", backgroundColor: "var(--card-bg)", backdropFilter: "blur(12px)" }}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                    />
                    <div className="text-5xl mb-4">📄</div>
                    <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">Drop your document here</h3>
                    <p className="text-[var(--muted-foreground)] text-sm">
                        PDF, PNG, JPG — processed entirely in your browser.
                        <br />Nothing leaves your machine.
                    </p>
                </div>
            )}

            {file && (
                <div className="mx-6 mt-6 flex items-center gap-3 p-4 border" style={{ backgroundColor: "var(--article-surface)", borderColor: "var(--article-border)", boxShadow: "var(--shadow-inset)" }}>
                    <div className="w-9 h-9 bg-theme-cyan flex items-center justify-center text-black font-black text-xs font-mono flex-shrink-0" style={{ boxShadow: "var(--shadow-neumorphic)" }}>
                        {file.name.split(".").pop()?.toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold flex-1 truncate text-[var(--foreground)]">{file.name}</span>
                    <span className="font-mono text-xs text-[var(--muted-foreground)] hidden sm:block">{formatFileSize(file.size)}</span>
                    <button
                        onClick={onRemove}
                        className="w-6 h-6 border border-[var(--article-border)] text-[var(--muted-foreground)] hover:border-theme-red hover:text-theme-red flex items-center justify-center text-xs transition-colors"
                    >✕</button>
                </div>
            )}

            {error && (
                <p className="mx-6 mt-3 text-theme-red text-xs font-mono border border-red-800 bg-red-900/20 px-3 py-2">⚠ {error}</p>
            )}

            <div className="flex items-center justify-between px-6 py-5 border-t border-[var(--article-border)] mt-6 bg-[var(--article-surface)]">
                <span className="font-mono text-xs text-[var(--muted-foreground)] hidden sm:block">// client-side only — zero telemetry</span>
                <button
                    onClick={onNext}
                    disabled={!file}
                    className="ml-auto px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                    style={!file ? {} : { boxShadow: "var(--shadow-neumorphic)" }}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
