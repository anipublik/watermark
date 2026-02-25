import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "theme-cyan": "rgba(var(--theme-cyan), <alpha-value>)",
                "theme-red": "rgba(var(--theme-red), <alpha-value>)",
            },
        },
    },
    plugins: [],
};

export default config;
