"use client";

import { useEffect, useState, useRef } from "react";

type ThemeMode = "light" | "dark" | "system";

export function DarkModeToggle() {
    const [mode, setMode] = useState<ThemeMode>("system");
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedMode = (localStorage.getItem("theme-mode") as ThemeMode | null) || "system";
        setMode(savedMode);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applySystemTheme = () => {
            const theme = mediaQuery.matches ? "dark" : "light";
            setResolvedTheme(theme);
            document.documentElement.setAttribute("data-theme", theme);
        };

        const applyTheme = (m: ThemeMode) => {
            if (m === "system") {
                applySystemTheme();
            } else {
                setResolvedTheme(m);
                document.documentElement.setAttribute("data-theme", m);
            }
        };

        applyTheme(savedMode);

        const handleSystemChange = () => {
            const currentMode = localStorage.getItem("theme-mode") || "system";
            if (currentMode === "system") {
                applySystemTheme();
            }
        };

        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    const selectMode = (newMode: ThemeMode) => {
        setMode(newMode);
        setIsOpen(false);
        try {
            localStorage.setItem("theme-mode", newMode);
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const theme = newMode === "system" ? (mediaQuery.matches ? "dark" : "light") : newMode;
            setResolvedTheme(theme);
            document.documentElement.setAttribute("data-theme", theme);
        } catch {
            // no-op
        }
    };

    const getModeLabel = (m: ThemeMode) => {
        if (m === "system") return "System";
        return m.charAt(0).toUpperCase() + m.slice(1);
    };

    const getModeIcon = (m: ThemeMode, resolved?: "light" | "dark") => {
        if (m === "system") {
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        }
        const theme = resolved || m;
        if (theme === "light" || m === "light") {
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            );
        }
        return (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        );
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Theme settings"
                aria-expanded={isOpen}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)] bg-[var(--article-surface)] border border-[var(--article-border)] text-[var(--foreground)] shadow-[var(--shadow-neumorphic)]"
            >
                {mode === "system" ? getModeIcon("system") : getModeIcon(resolvedTheme === "light" ? "dark" : "light")}
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 rounded-2xl z-50 overflow-hidden"
                    style={{
                        backgroundColor: "var(--background)",
                        boxShadow: "var(--shadow-neumorphic)",
                    }}
                >
                    <div className="py-2">
                        {(["light", "dark", "system"] as ThemeMode[]).map((m) => (
                            <button
                                key={m}
                                onClick={() => selectMode(m)}
                                className="w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-[var(--article-surface)] transition-all duration-200"
                                style={{
                                    color: mode === m ? "var(--color-primary)" : "var(--foreground)",
                                    fontWeight: mode === m ? 600 : 400,
                                }}
                            >
                                {getModeIcon(m)}
                                <span className="flex-1">{getModeLabel(m)}</span>
                                {mode === m && (
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
