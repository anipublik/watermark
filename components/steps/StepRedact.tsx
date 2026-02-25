"use client";

import type { RedactCategory } from "@/types";
import { Toggle } from "@/components/ui/Toggle";

const OPTS: { cat: RedactCategory; name: string; desc: string }[] = [
    { cat: "ssn", name: "Social Security Numbers", desc: "Patterns like XXX-XX-XXXX" },
    { cat: "phone", name: "Phone numbers", desc: "US and international formats" },
    { cat: "email", name: "Email addresses", desc: "All user@domain.tld patterns" },
    { cat: "dob", name: "Dates of birth", desc: "MM/DD/YYYY, YYYY-MM-DD" },
    { cat: "credit", name: "Credit card numbers", desc: "16-digit PAN patterns" },
    { cat: "ip", name: "IP addresses", desc: "IPv4 patterns" },
    { cat: "custom", name: "Custom terms", desc: "Your own keywords or phrases" },
];

interface Props {
    categories: Set<RedactCategory>;
    customTerms: string;
    flatten: boolean;
    onToggle: (cat: RedactCategory) => void;
    onCustomTerms: (v: string) => void;
    onFlatten: (v: boolean) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepRedact({ categories, customTerms, flatten, onToggle, onCustomTerms, onFlatten, onNext, onBack }: Props) {
    const hasRedaction = categories.size > 0;

    return (
        <div className="border border-[var(--article-border)]" style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow-neumorphic)", backdropFilter: "blur(12px)" }}>
            <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-theme-cyan" style={{ boxShadow: "0 0 10px rgba(34,211,238,0.5)" }} />
                    <h2 className="font-bold text-base text-[var(--foreground)]">Redaction &amp; Flattening</h2>
                </div>

                {/* Flatten toggle */}
                <div
                    onClick={() => onFlatten(!flatten)}
                    className={`flex items-center justify-between gap-4 px-4 py-3 border cursor-pointer transition-all mb-6 ${flatten ? "border-theme-cyan bg-theme-cyan/5" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-cyan/30"}`}
                    style={!flatten ? { boxShadow: "var(--shadow-neumorphic)" } : {}}
                >
                    <div>
                        <div className="text-sm font-semibold text-[var(--foreground)]">Flatten PDF</div>
                        <div className="text-xs text-[var(--muted-foreground)]">Bake form fields &amp; annotations into page — removes interactivity &amp; editability</div>
                    </div>
                    <Toggle enabled={flatten} onToggle={() => onFlatten(!flatten)} color="cyan" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-theme-red" />
                    <h3 className="font-bold text-sm text-[var(--foreground)]">PII Redaction</h3>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                    Select categories to permanently redact. The output PDF will be <strong className="text-[var(--foreground)]">rasterized to pixels</strong> — no text layer remains, making extraction impossible.
                </p>

                {hasRedaction && (
                    <div className="mb-4 px-4 py-3 border border-theme-red/40 bg-theme-red/5 text-xs font-mono text-theme-red leading-relaxed">
                        ⚠ Redacted output is image-only. Text will not be selectable or searchable.
                    </div>
                )}

                <div className="space-y-2.5 mb-4">
                    {OPTS.map((opt) => {
                        const enabled = categories.has(opt.cat);
                        return (
                            <div
                                key={opt.cat}
                                onClick={() => onToggle(opt.cat)}
                                className={`flex items-center justify-between gap-4 px-4 py-3 border cursor-pointer transition-all ${enabled ? "border-theme-red bg-theme-red/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-red/30"}`}
                                style={!enabled ? { boxShadow: "var(--shadow-neumorphic)" } : {}}
                            >
                                <div>
                                    <div className="text-sm font-semibold text-[var(--foreground)]">{opt.name}</div>
                                    <div className="text-xs text-[var(--muted-foreground)]">{opt.desc}</div>
                                </div>
                                <Toggle enabled={enabled} onToggle={() => onToggle(opt.cat)} color="red" />
                            </div>
                        );
                    })}
                </div>

                {categories.has("custom") && (
                    <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Terms to redact (comma-separated)</label>
                        <textarea
                            value={customTerms}
                            onChange={(e) => onCustomTerms(e.target.value)}
                            rows={3}
                            placeholder="e.g. Project Orion, Board meeting, CEO salary..."
                            className="bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-red resize-y transition-colors"
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-t border-[var(--article-border)] bg-[var(--article-surface)]">
                <button onClick={onBack} className="px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-[var(--article-border)] text-[var(--foreground)] bg-[var(--article-surface)] hover:border-theme-red/50 transition-all" style={{ boxShadow: "var(--shadow-neumorphic)" }}>← Back</button>
                <button onClick={onNext} className="px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] transition-all" style={{ boxShadow: "var(--shadow-neumorphic)" }}>Process document →</button>
            </div>
        </div>
    );
}
