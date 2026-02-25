import type { Step } from "@/types";

const STEPS = ["Upload", "Watermark", "Redact", "Download"];

export function StepTracker({ current }: { current: Step }) {
    return (
        <div className="flex mb-9">
            {STEPS.map((label, i) => {
                const n = (i + 1) as Step;
                const isActive = n === current;
                const isDone = n < current;
                return (
                    <div
                        key={label}
                        className={`flex-1 flex items-center gap-2 px-3 py-3 border-t-2 transition-colors ${isActive ? "border-theme-cyan text-theme-cyan" : isDone ? "border-[var(--article-border)]" : "border-[var(--article-border)]"
                            }`}
                        style={isActive ? { boxShadow: "var(--shadow-inset)", backgroundColor: "var(--article-surface)" } : {}}
                    >
                        <div
                            className={`w-5 h-5 flex items-center justify-center text-xs font-mono font-bold border flex-shrink-0 transition-all ${isActive
                                ? "bg-theme-cyan text-black border-theme-cyan"
                                : isDone
                                    ? "bg-[var(--article-surface-strong)] text-[var(--muted-foreground)] border-[var(--article-border)]"
                                    : "border-[var(--article-border)] text-[var(--muted-foreground)]"
                                }`}
                            style={isActive ? { boxShadow: "var(--shadow-neumorphic)" } : {}}
                        >
                            {isDone ? "✓" : n}
                        </div>
                        <span
                            className={`text-xs font-semibold uppercase tracking-wider hidden sm:block transition-colors ${isActive ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                                }`}
                        >
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
