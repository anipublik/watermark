export function Footer() {
    return (
        <footer className="border-t border-[var(--article-border)] px-6 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-3 bg-[var(--background)]">
            <p className="font-mono text-xs text-[var(--muted-foreground)]">
                © {new Date().getFullYear()} Watermark —{" "}
                <a href="https://anisri.dev" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--muted-foreground)] hover:text-theme-cyan transition-colors">
                    built with ❤️ by Ani
                </a>
            </p>
            <p className="font-mono text-xs text-[var(--muted-foreground)]">
                100% browser-based · No server · No storage ·{" "}
                <a
                    href="https://github.com/anipublik/watermark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                    Open source ↗
                </a>
            </p>
        </footer>
    );
}
