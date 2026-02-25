interface ToggleProps {
    enabled: boolean;
    onToggle: () => void;
    color?: "cyan" | "red";
}

export function Toggle({ enabled, onToggle, color = "cyan" }: ToggleProps) {
    return (
        <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            role="switch"
            aria-checked={enabled}
            className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors duration-200 ${enabled ? (color === "cyan" ? "bg-theme-cyan" : "bg-theme-red") : "bg-zinc-700"
                }`}
        >
            <span
                className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${enabled
                        ? `left-[18px] ${color === "cyan" ? "bg-black" : "bg-white"}`
                        : "left-0.5 bg-zinc-400"
                    }`}
            />
        </button>
    );
}
