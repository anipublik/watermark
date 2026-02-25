import { DarkModeToggle } from "@/components/ui/DarkModeToggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[var(--article-border)] bg-[var(--card-bg)] backdrop-blur-md">
            <div className="flex items-center gap-3">
                <div
                    className="w-8 h-8 bg-theme-cyan flex items-center justify-center text-black font-black text-sm flex-shrink-0 animate-pulse-hex"
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                    ⬡
                </div>
                <span className="font-mono font-bold text-lg tracking-tight text-[var(--foreground)]">
                    Water<span className="text-theme-cyan">mark</span>
                </span>
            </div>
            <div className="flex items-center gap-3">
                <DarkModeToggle />
            </div>
        </header>
    );
}
