module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DarkModeToggle",
    ()=>DarkModeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function DarkModeToggle() {
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("system");
    const [resolvedTheme, setResolvedTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("light");
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedMode = localStorage.getItem("theme-mode") || "system";
        setMode(savedMode);
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const applySystemTheme = ()=>{
            const theme = mediaQuery.matches ? "dark" : "light";
            setResolvedTheme(theme);
            document.documentElement.setAttribute("data-theme", theme);
        };
        const applyTheme = (m)=>{
            if (m === "system") {
                applySystemTheme();
            } else {
                setResolvedTheme(m);
                document.documentElement.setAttribute("data-theme", m);
            }
        };
        applyTheme(savedMode);
        const handleSystemChange = ()=>{
            const currentMode = localStorage.getItem("theme-mode") || "system";
            if (currentMode === "system") {
                applySystemTheme();
            }
        };
        mediaQuery.addEventListener("change", handleSystemChange);
        return ()=>mediaQuery.removeEventListener("change", handleSystemChange);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return ()=>document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [
        isOpen
    ]);
    const selectMode = (newMode)=>{
        setMode(newMode);
        setIsOpen(false);
        try {
            localStorage.setItem("theme-mode", newMode);
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const theme = newMode === "system" ? mediaQuery.matches ? "dark" : "light" : newMode;
            setResolvedTheme(theme);
            document.documentElement.setAttribute("data-theme", theme);
        } catch  {
        // no-op
        }
    };
    const getModeLabel = (m)=>{
        if (m === "system") return "System";
        return m.charAt(0).toUpperCase() + m.slice(1);
    };
    const getModeIcon = (m, resolved)=>{
        if (m === "system") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                }, void 0, false, {
                    fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                    lineNumber: 83,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                lineNumber: 82,
                columnNumber: 17
            }, this);
        }
        const theme = resolved || m;
        if (theme === "light" || m === "light") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                }, void 0, false, {
                    fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                    lineNumber: 91,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                lineNumber: 90,
                columnNumber: 17
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "h-5 w-5",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                lineNumber: 97,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
            lineNumber: 96,
            columnNumber: 13
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setIsOpen(!isOpen),
                "aria-label": "Theme settings",
                "aria-expanded": isOpen,
                className: "inline-flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)] bg-[var(--article-surface)] border border-[var(--article-border)] text-[var(--foreground)] shadow-[var(--shadow-neumorphic)]",
                children: mode === "system" ? getModeIcon("system") : getModeIcon(resolvedTheme === "light" ? "dark" : "light")
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 mt-2 w-48 rounded-2xl z-50 overflow-hidden",
                style: {
                    backgroundColor: "var(--background)",
                    boxShadow: "var(--shadow-neumorphic)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-2",
                    children: [
                        "light",
                        "dark",
                        "system"
                    ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>selectMode(m),
                            className: "w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-[var(--article-surface)] transition-all duration-200",
                            style: {
                                color: mode === m ? "var(--color-primary)" : "var(--foreground)",
                                fontWeight: mode === m ? 600 : 400
                            },
                            children: [
                                getModeIcon(m),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex-1",
                                    children: getModeLabel(m)
                                }, void 0, false, {
                                    fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                                    lineNumber: 134,
                                    columnNumber: 33
                                }, this),
                                mode === m && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-4 w-4",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    strokeWidth: 2,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M5 13l4 4L19 7"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                                        lineNumber: 137,
                                        columnNumber: 41
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                                    lineNumber: 136,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, m, true, {
                            fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                            lineNumber: 124,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                    lineNumber: 122,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
                lineNumber: 115,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/ui/DarkModeToggle.tsx",
        lineNumber: 103,
        columnNumber: 9
    }, this);
}
}),
"[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fe3ad2b0._.js.map