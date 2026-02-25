(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/anicode/flagvault/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildQrPayload",
    ()=>buildQrPayload,
    "encodeZeroWidth",
    ()=>encodeZeroWidth,
    "formatFileSize",
    ()=>formatFileSize,
    "generateForensicId",
    ()=>generateForensicId,
    "sleep",
    ()=>sleep
]);
function generateForensicId() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const ts = Date.now().toString(36).toUpperCase();
    const arr = new Uint8Array(12);
    crypto.getRandomValues(arr);
    let rand = "";
    for(let i = 0; i < 12; i++)rand += chars[arr[i] % chars.length];
    return `FV-${ts}-${rand.slice(0, 4)}-${rand.slice(4, 8)}-${rand.slice(8, 12)}`;
}
function encodeZeroWidth(text) {
    const binary = text.split("").map((c)=>c.charCodeAt(0).toString(2).padStart(8, "0")).join("");
    const encoded = binary.split("").map((b)=>b === "1" ? "\u200D" : "\u200C").join("");
    return `\u200B${encoded}\u200B`;
}
function buildQrPayload(params) {
    return JSON.stringify({
        id: params.fid,
        to: params.recipient || "N/A",
        org: params.org || "N/A",
        purpose: params.purpose || "Confidential",
        expires: params.expiry || "N/A",
        issued: params.issuedAt,
        doc: params.docName,
        format: "cryptographic"
    });
}
function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
}
function sleep(ms) {
    return new Promise((r)=>setTimeout(r, ms));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/hooks/useAppState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppState",
    ()=>useAppState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function defaultState() {
    return {
        step: 1,
        file: null,
        fileBytes: null,
        watermark: {
            recipient: "",
            organization: "",
            purpose: "",
            expiry: "",
            customText: "",
            style: "diagonal"
        },
        redact: {
            categories: new Set(),
            customTerms: ""
        },
        steg: {
            options: new Set([
                "stegPdfMeta",
                "stegZeroWidth"
            ])
        },
        forensicId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateForensicId"])(),
        forensicTs: new Date().toISOString(),
        outputBytes: null,
        auditRecord: null,
        progress: 0,
        progressLabel: "Initializing...",
        error: null
    };
}
function useAppState() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultState);
    const setStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[setStep]": (step)=>setState({
                "useAppState.useCallback[setStep]": (s)=>({
                        ...s,
                        step
                    })
            }["useAppState.useCallback[setStep]"])
    }["useAppState.useCallback[setStep]"], []);
    const setFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[setFile]": (file, bytes)=>setState({
                "useAppState.useCallback[setFile]": (s)=>({
                        ...s,
                        file,
                        fileBytes: bytes
                    })
            }["useAppState.useCallback[setFile]"])
    }["useAppState.useCallback[setFile]"], []);
    const setWatermark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[setWatermark]": (patch)=>setState({
                "useAppState.useCallback[setWatermark]": (s)=>({
                        ...s,
                        watermark: {
                            ...s.watermark,
                            ...patch
                        }
                    })
            }["useAppState.useCallback[setWatermark]"])
    }["useAppState.useCallback[setWatermark]"], []);
    const setWatermarkStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[setWatermarkStyle]": (style)=>setState({
                "useAppState.useCallback[setWatermarkStyle]": (s)=>({
                        ...s,
                        watermark: {
                            ...s.watermark,
                            style
                        }
                    })
            }["useAppState.useCallback[setWatermarkStyle]"])
    }["useAppState.useCallback[setWatermarkStyle]"], []);
    const toggleRedactCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[toggleRedactCategory]": (cat)=>setState({
                "useAppState.useCallback[toggleRedactCategory]": (s)=>{
                    const next = new Set(s.redact.categories);
                    next.has(cat) ? next.delete(cat) : next.add(cat);
                    return {
                        ...s,
                        redact: {
                            ...s.redact,
                            categories: next
                        }
                    };
                }
            }["useAppState.useCallback[toggleRedactCategory]"])
    }["useAppState.useCallback[toggleRedactCategory]"], []);
    const setCustomTerms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[setCustomTerms]": (customTerms)=>setState({
                "useAppState.useCallback[setCustomTerms]": (s)=>({
                        ...s,
                        redact: {
                            ...s.redact,
                            customTerms
                        }
                    })
            }["useAppState.useCallback[setCustomTerms]"])
    }["useAppState.useCallback[setCustomTerms]"], []);
    const toggleStegOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[toggleStegOption]": (opt)=>setState({
                "useAppState.useCallback[toggleStegOption]": (s)=>{
                    const next = new Set(s.steg.options);
                    next.has(opt) ? next.delete(opt) : next.add(opt);
                    return {
                        ...s,
                        steg: {
                            ...s.steg,
                            options: next
                        }
                    };
                }
            }["useAppState.useCallback[toggleStegOption]"])
    }["useAppState.useCallback[toggleStegOption]"], []);
    const regenForensicId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[regenForensicId]": ()=>setState({
                "useAppState.useCallback[regenForensicId]": (s)=>({
                        ...s,
                        forensicId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateForensicId"])(),
                        forensicTs: new Date().toISOString()
                    })
            }["useAppState.useCallback[regenForensicId]"])
    }["useAppState.useCallback[regenForensicId]"], []);
    const setProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[setProgress]": (progress, progressLabel)=>setState({
                "useAppState.useCallback[setProgress]": (s)=>({
                        ...s,
                        progress,
                        progressLabel
                    })
            }["useAppState.useCallback[setProgress]"])
    }["useAppState.useCallback[setProgress]"], []);
    const setOutput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[setOutput]": (outputBytes, auditRecord)=>setState({
                "useAppState.useCallback[setOutput]": (s)=>({
                        ...s,
                        outputBytes,
                        auditRecord
                    })
            }["useAppState.useCallback[setOutput]"])
    }["useAppState.useCallback[setOutput]"], []);
    const setError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[setError]": (error)=>setState({
                "useAppState.useCallback[setError]": (s)=>({
                        ...s,
                        error
                    })
            }["useAppState.useCallback[setError]"])
    }["useAppState.useCallback[setError]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAppState.useCallback[reset]": ()=>setState(defaultState())
    }["useAppState.useCallback[reset]"], []);
    return {
        state,
        setStep,
        setFile,
        setWatermark,
        setWatermarkStyle,
        toggleRedactCategory,
        setCustomTerms,
        toggleStegOption,
        regenForensicId,
        setProgress,
        setOutput,
        setError,
        reset
    };
}
_s(useAppState, "t7a2cb44DvDrWvI3kYXyeQ1DcFs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/components/ui/StepTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepTracker",
    ()=>StepTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const STEPS = [
    "Upload",
    "Watermark",
    "Redact",
    "Download"
];
function StepTracker({ current }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex mb-9",
        children: STEPS.map((label, i)=>{
            const n = i + 1;
            const isActive = n === current;
            const isDone = n < current;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 flex items-center gap-2 px-3 py-3 border-t-2 transition-colors ${isActive ? "border-theme-cyan text-theme-cyan" : isDone ? "border-[var(--article-border)]" : "border-[var(--article-border)]"}`,
                style: isActive ? {
                    boxShadow: "var(--shadow-inset)",
                    backgroundColor: "var(--article-surface)"
                } : {},
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-5 h-5 flex items-center justify-center text-xs font-mono font-bold border flex-shrink-0 transition-all ${isActive ? "bg-theme-cyan text-black border-theme-cyan" : isDone ? "bg-[var(--article-surface-strong)] text-[var(--muted-foreground)] border-[var(--article-border)]" : "border-[var(--article-border)] text-[var(--muted-foreground)]"}`,
                        style: isActive ? {
                            boxShadow: "var(--shadow-neumorphic)"
                        } : {},
                        children: isDone ? "✓" : n
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/ui/StepTracker.tsx",
                        lineNumber: 18,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-xs font-semibold uppercase tracking-wider hidden sm:block transition-colors ${isActive ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`,
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/ui/StepTracker.tsx",
                        lineNumber: 29,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/ui/StepTracker.tsx",
                lineNumber: 13,
                columnNumber: 21
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/anicode/flagvault/components/ui/StepTracker.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
_c = StepTracker;
var _c;
__turbopack_context__.k.register(_c, "StepTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/components/steps/StepUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepUpload",
    ()=>StepUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const ACCEPTED = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg"
];
function StepUpload({ file, onFile, onRemove, onNext }) {
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dragOver, setDragOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StepUpload.useCallback[handleFile]": (f)=>{
            if (!ACCEPTED.includes(f.type)) {
                setError("Unsupported file. Please upload a PDF, PNG, or JPG.");
                return;
            }
            setError(null);
            const reader = new FileReader();
            reader.onload = ({
                "StepUpload.useCallback[handleFile]": (e)=>{
                    onFile(f, new Uint8Array(e.target.result));
                }
            })["StepUpload.useCallback[handleFile]"];
            reader.readAsArrayBuffer(f);
        }
    }["StepUpload.useCallback[handleFile]"], [
        onFile
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-[var(--article-border)]",
        style: {
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-neumorphic)",
            backdropFilter: "blur(12px)"
        },
        children: [
            !file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `m-6 border-2 border-dashed p-14 text-center cursor-pointer transition-all relative ${dragOver ? "border-theme-cyan bg-theme-cyan/5" : "border-[var(--article-border)] hover:border-theme-cyan hover:bg-theme-cyan/5"}`,
                style: dragOver ? {
                    boxShadow: "var(--shadow-inset)"
                } : {
                    boxShadow: "var(--shadow-neumorphic)",
                    backgroundColor: "var(--card-bg)",
                    backdropFilter: "blur(12px)"
                },
                onDragOver: (e)=>{
                    e.preventDefault();
                    setDragOver(true);
                },
                onDragLeave: ()=>setDragOver(false),
                onDrop: (e)=>{
                    e.preventDefault();
                    setDragOver(false);
                    const f = e.dataTransfer.files[0];
                    if (f) handleFile(f);
                },
                onClick: ()=>inputRef.current?.click(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "file",
                        accept: ".pdf,.png,.jpg,.jpeg",
                        className: "hidden",
                        onChange: (e)=>{
                            const f = e.target.files?.[0];
                            if (f) handleFile(f);
                        }
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 45,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-5xl mb-4",
                        children: "📄"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 52,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold mb-2 text-[var(--foreground)]",
                        children: "Drop your document here"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 53,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[var(--muted-foreground)] text-sm",
                        children: [
                            "PDF, PNG, JPG — processed entirely in your browser.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                                lineNumber: 56,
                                columnNumber: 25
                            }, this),
                            "Nothing leaves your machine."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 54,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                lineNumber: 36,
                columnNumber: 17
            }, this),
            file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-6 mt-6 flex items-center gap-3 p-4 border",
                style: {
                    backgroundColor: "var(--article-surface)",
                    borderColor: "var(--article-border)",
                    boxShadow: "var(--shadow-inset)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-9 h-9 bg-theme-cyan flex items-center justify-center text-black font-black text-xs font-mono flex-shrink-0",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: file.name.split(".").pop()?.toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold flex-1 truncate text-[var(--foreground)]",
                        children: file.name
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 66,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] hidden sm:block",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFileSize"])(file.size)
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 67,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRemove,
                        className: "w-6 h-6 border border-[var(--article-border)] text-[var(--muted-foreground)] hover:border-theme-red hover:text-theme-red flex items-center justify-center text-xs transition-colors",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 68,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                lineNumber: 62,
                columnNumber: 17
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mx-6 mt-3 text-theme-red text-xs font-mono border border-red-800 bg-red-900/20 px-3 py-2",
                children: [
                    "⚠ ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                lineNumber: 76,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-6 py-5 border-t border-[var(--article-border)] mt-6 bg-[var(--article-surface)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] hidden sm:block",
                        children: "// client-side only — zero telemetry"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNext,
                        disabled: !file,
                        className: "ml-auto px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors",
                        style: !file ? {} : {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "Continue →"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 81,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, this);
}
_s(StepUpload, "o86mKlIwDSzFDuUDXT3U4LVim5w=");
_c = StepUpload;
var _c;
__turbopack_context__.k.register(_c, "StepUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/components/ui/Toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toggle",
    ()=>Toggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Toggle({ enabled, onToggle, color = "cyan" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: (e)=>{
            e.stopPropagation();
            onToggle();
        },
        role: "switch",
        "aria-checked": enabled,
        className: `relative w-9 h-5 rounded-full flex-shrink-0 transition-colors duration-200 ${enabled ? color === "cyan" ? "bg-theme-cyan" : "bg-theme-red" : "bg-zinc-700"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${enabled ? `left-[18px] ${color === "cyan" ? "bg-black" : "bg-white"}` : "left-0.5 bg-zinc-400"}`
        }, void 0, false, {
            fileName: "[project]/anicode/flagvault/components/ui/Toggle.tsx",
            lineNumber: 17,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/anicode/flagvault/components/ui/Toggle.tsx",
        lineNumber: 9,
        columnNumber: 9
    }, this);
}
_c = Toggle;
var _c;
__turbopack_context__.k.register(_c, "Toggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/components/steps/StepWatermark.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepWatermark",
    ()=>StepWatermark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/ui/Toggle.tsx [app-client] (ecmascript)");
"use client";
;
;
const PURPOSES = [
    "Review Only",
    "Internal Use Only",
    "Confidential",
    "Do Not Distribute",
    "Draft - Not Final",
    "Attorney-Client Privileged",
    "Under NDA",
    "For Approval",
    "Reference Only"
];
const STYLES = [
    {
        value: "diagonal",
        label: "Diagonal",
        icon: "🔄"
    },
    {
        value: "corner",
        label: "Corner",
        icon: "📌"
    },
    {
        value: "banner",
        label: "Banner",
        icon: "🏷️"
    },
    {
        value: "grid",
        label: "Tiled",
        icon: "▦"
    },
    {
        value: "qr",
        label: "QR stamp",
        icon: "⬛",
        isNew: true
    },
    {
        value: "qr+diagonal",
        label: "Diag + QR",
        icon: "🔄⬛",
        isNew: true
    }
];
const STEG_OPTIONS = [
    {
        id: "stegPdfMeta",
        name: "PDF metadata injection",
        badge: "INVISIBLE",
        desc: "Embeds recipient, purpose, tracking ID in PDF XMP + DocInfo. Invisible to readers; readable via pdfinfo or Acrobat Properties."
    },
    {
        id: "stegZeroWidth",
        name: "Zero-width character encoding",
        badge: "INVISIBLE",
        desc: "Tracking ID encoded as ZWJ/ZWNJ Unicode woven into text. Survives copy-paste. Detectable via hex editor."
    },
    {
        id: "stegInvisText",
        name: "White-on-white text layer",
        badge: "NEAR-INVISIBLE",
        desc: "Full tracking payload as 1pt white text. Extractable with pdftotext, CTRL+A, or screen readers."
    },
    {
        id: "stegMicroQr",
        name: "Micro QR at 2% opacity",
        badge: "NEAR-INVISIBLE",
        desc: "QR code rendered nearly invisible in corner. Recoverable with contrast boost in image editing tools."
    }
];
function buildPreview(w) {
    if (w.customText.trim()) return w.customText.trim();
    const parts = [];
    if (w.purpose) parts.push(w.purpose.toUpperCase());
    if (w.recipient) parts.push(`FOR: ${w.recipient.toUpperCase()}`);
    if (w.expiry) parts.push(`UNTIL: ${w.expiry}`);
    return parts.length ? parts.join(" | ") : "CONFIDENTIAL";
}
function StepWatermark({ watermark, stegOptions, forensicId, forensicTs, onWatermark, onStyleChange, onStegToggle, onRegenId, onNext, onBack }) {
    const previewText = buildPreview(watermark);
    const showQr = watermark.style === "qr" || watermark.style === "qr+diagonal";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-[var(--article-border)]",
        style: {
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-neumorphic)",
            backdropFilter: "blur(12px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 sm:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-theme-cyan",
                                style: {
                                    boxShadow: "0 0 10px rgba(34,211,238,0.5)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 61,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-bold text-base text-[var(--foreground)]",
                                children: "Watermark + forensic configuration"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",
                        children: [
                            [
                                {
                                    id: "recipient",
                                    label: "Recipient / name",
                                    placeholder: "e.g. John Smith",
                                    type: "text"
                                },
                                {
                                    id: "organization",
                                    label: "Organization",
                                    placeholder: "e.g. Acme Corp",
                                    type: "text"
                                },
                                {
                                    id: "expiry",
                                    label: "Valid until",
                                    placeholder: "",
                                    type: "date"
                                }
                            ].map(({ id, label, placeholder, type })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                            lineNumber: 72,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: type,
                                            value: watermark[id],
                                            onChange: (e)=>onWatermark({
                                                    [id]: e.target.value
                                                }),
                                            placeholder: placeholder,
                                            className: "bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-cyan transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                            lineNumber: 73,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, id, true, {
                                    fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                    lineNumber: 71,
                                    columnNumber: 25
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                        children: "Purpose"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 84,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: watermark.purpose,
                                        onChange: (e)=>onWatermark({
                                                purpose: e.target.value
                                            }),
                                        className: "bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-cyan transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select purpose..."
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 90,
                                                columnNumber: 29
                                            }, this),
                                            PURPOSES.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: p,
                                                    children: p
                                                }, p, false, {
                                                    fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 50
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sm:col-span-2 flex flex-col gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                        children: "Custom text (optional override)"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 96,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: watermark.customText,
                                        onChange: (e)=>onWatermark({
                                                customText: e.target.value
                                            }),
                                        placeholder: "e.g. EYES ONLY — BOARD REVIEW 2025",
                                        maxLength: 80,
                                        className: "bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-cyan transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 97,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 95,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-3",
                        children: "Watermark style"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap mb-6",
                        children: STYLES.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onStyleChange(s.value),
                                className: `flex-[1_1_0%] min-w-[30%] sm:min-w-[70px] p-3 border text-center transition-all relative ${watermark.style === s.value ? s.isNew ? "border-theme-cyan bg-theme-cyan/5 shadow-[0_0_15px_rgba(34,211,238,0.1)] text-[var(--foreground)]" : "border-theme-cyan bg-theme-cyan/5 shadow-[0_0_15px_rgba(34,211,238,0.1)] text-[var(--foreground)]" : s.isNew ? "border-dashed border-[var(--article-border)] hover:border-theme-cyan/50 text-[var(--muted-foreground)]" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-cyan/50 text-[var(--muted-foreground)]"}`,
                                style: watermark.style !== s.value && !s.isNew ? {
                                    boxShadow: "var(--shadow-neumorphic)"
                                } : {},
                                children: [
                                    s.isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-1 right-1 bg-theme-cyan text-black text-[8px] font-mono font-bold px-1",
                                        children: "NEW"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 121,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl mb-1",
                                        children: s.icon
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 123,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-semibold",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 124,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, s.value, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 111,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-3",
                        children: "Live preview"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 129,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative border border-[var(--article-border)] h-32 flex items-center justify-center mb-6 overflow-hidden",
                        style: {
                            backgroundColor: "var(--article-surface)",
                            boxShadow: "var(--shadow-inset)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-52 space-y-2 opacity-20",
                                children: [
                                    100,
                                    80,
                                    90,
                                    60,
                                    85,
                                    70
                                ].map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 bg-[var(--foreground)] rounded",
                                        style: {
                                            width: `${w}%`
                                        }
                                    }, i, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 133,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 131,
                                columnNumber: 21
                            }, this),
                            watermark.style !== "qr" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                                children: watermark.style === "banner" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 left-0 right-0 bg-theme-cyan/10 px-2 py-1 font-mono text-xs font-bold text-theme-cyan/80 uppercase tracking-widest text-center truncate backdrop-blur-sm border-b border-theme-cyan/30",
                                    children: previewText
                                }, void 0, false, {
                                    fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                    lineNumber: 139,
                                    columnNumber: 33
                                }, this) : watermark.style === "corner" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-2 right-2 font-mono text-[9px] font-bold text-theme-cyan/60 uppercase drop-shadow",
                                    children: previewText.slice(0, 28)
                                }, void 0, false, {
                                    fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                    lineNumber: 143,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono font-bold text-theme-cyan/20 uppercase tracking-widest text-lg whitespace-nowrap drop-shadow",
                                    style: {
                                        transform: "rotate(-30deg)"
                                    },
                                    children: previewText
                                }, void 0, false, {
                                    fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                    lineNumber: 147,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 137,
                                columnNumber: 25
                            }, this),
                            showQr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-2 right-2 w-9 h-9 bg-zinc-900 border border-theme-cyan flex items-center justify-center text-lg opacity-80",
                                children: "▦"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 154,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 130,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                        className: "border-[var(--article-border)] my-6"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 158,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                children: "Forensic tracking ID"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 161,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-theme-cyan text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(34,211,238,0.4)]",
                                children: "NEW"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 162,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 160,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[var(--article-surface)] border border-[var(--article-border)] border-l-2 border-l-theme-cyan pl-5 pr-4 py-4 mb-4 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-sm font-bold text-theme-cyan tracking-wider break-all mb-1.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]",
                                children: forensicId
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 166,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-4 font-mono text-xs text-[var(--muted-foreground)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "⏱ ",
                                            new Date(forensicTs).toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 168,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "🔑 128-bit entropy"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 169,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:block",
                                        children: "📎 PDF + QR + steg"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 170,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 167,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onRegenId,
                                className: "absolute top-3 right-3 border border-[var(--article-border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-theme-cyan hover:text-theme-cyan px-2 py-1 font-mono text-xs uppercase tracking-wider transition-all",
                                style: {
                                    boxShadow: "var(--shadow-neumorphic)"
                                },
                                children: "↻ Regen"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 172,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[var(--muted-foreground)] leading-relaxed mb-6",
                        children: "A unique cryptographic ID is burned into every copy — visible in PDF properties, encoded in the QR code, and woven invisibly into the document. If a copy leaks, scan the QR or inspect metadata to trace exactly who received it."
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 181,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                        className: "border-[var(--article-border)] my-6"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 186,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                children: "Invisible steganographic layers"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 189,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-theme-cyan text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(34,211,238,0.4)]",
                                children: "NEW"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 190,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 188,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2.5",
                        children: STEG_OPTIONS.map((opt)=>{
                            const enabled = stegOptions.has(opt.id);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>onStegToggle(opt.id),
                                className: `flex items-start justify-between gap-4 px-4 py-3 border cursor-pointer transition-all ${enabled ? "border-theme-cyan bg-theme-cyan/[0.04] shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-cyan/30"}`,
                                style: !enabled ? {
                                    boxShadow: "var(--shadow-neumorphic)"
                                } : {},
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--foreground)]",
                                                children: [
                                                    opt.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-theme-cyan text-black text-[9px] font-mono font-bold px-1 rounded",
                                                        children: opt.badge
                                                    }, void 0, false, {
                                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 205,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-[var(--muted-foreground)] leading-relaxed",
                                                children: opt.desc
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 209,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 204,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                                        enabled: enabled,
                                        onToggle: ()=>onStegToggle(opt.id),
                                        color: "cyan"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 211,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 197,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 193,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-6 sm:px-8 py-5 border-t border-[var(--article-border)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-[var(--article-border)] text-[var(--foreground)] bg-[var(--article-surface)] hover:border-theme-cyan/50 transition-all",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "← Back"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 219,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNext,
                        className: "px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "Continue →"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 220,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                lineNumber: 218,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
        lineNumber: 57,
        columnNumber: 9
    }, this);
}
_c = StepWatermark;
var _c;
__turbopack_context__.k.register(_c, "StepWatermark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/components/steps/StepRedact.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepRedact",
    ()=>StepRedact
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/ui/Toggle.tsx [app-client] (ecmascript)");
"use client";
;
;
const OPTS = [
    {
        cat: "ssn",
        name: "Social Security Numbers",
        desc: "Patterns like XXX-XX-XXXX"
    },
    {
        cat: "phone",
        name: "Phone numbers",
        desc: "US and international formats"
    },
    {
        cat: "email",
        name: "Email addresses",
        desc: "All user@domain.tld patterns"
    },
    {
        cat: "dob",
        name: "Dates of birth",
        desc: "MM/DD/YYYY, YYYY-MM-DD"
    },
    {
        cat: "credit",
        name: "Credit card numbers",
        desc: "16-digit PAN patterns"
    },
    {
        cat: "ip",
        name: "IP addresses",
        desc: "IPv4 and IPv6 patterns"
    },
    {
        cat: "custom",
        name: "Custom terms",
        desc: "Your own keywords or phrases"
    }
];
function StepRedact({ categories, customTerms, onToggle, onCustomTerms, onNext, onBack }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-[var(--article-border)]",
        style: {
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-neumorphic)",
            backdropFilter: "blur(12px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 sm:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-theme-cyan",
                                style: {
                                    boxShadow: "0 0 10px rgba(34,211,238,0.5)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 30,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-bold text-base text-[var(--foreground)]",
                                children: "Redaction settings"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 31,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 29,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[var(--muted-foreground)] leading-relaxed mb-6",
                        children: "Toggle categories to auto-detect and redact. Applies black-bar overlays and scrubs text layer metadata. Skip if not needed — you can still proceed."
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2.5 mb-4",
                        children: OPTS.map((opt)=>{
                            const enabled = categories.has(opt.cat);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>onToggle(opt.cat),
                                className: `flex items-center justify-between gap-4 px-4 py-3 border cursor-pointer transition-all ${enabled ? "border-theme-red bg-theme-red/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-red/30"}`,
                                style: !enabled ? {
                                    boxShadow: "var(--shadow-neumorphic)"
                                } : {},
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-semibold text-[var(--foreground)]",
                                                children: opt.name
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                                lineNumber: 50,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[var(--muted-foreground)]",
                                                children: opt.desc
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                                lineNumber: 51,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                        lineNumber: 49,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                                        enabled: enabled,
                                        onToggle: ()=>onToggle(opt.cat),
                                        color: "red"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                        lineNumber: 53,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, opt.cat, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 42,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    categories.has("custom") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                children: "Terms to redact (comma-separated)"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: customTerms,
                                onChange: (e)=>onCustomTerms(e.target.value),
                                rows: 3,
                                placeholder: "e.g. Project Orion, Board meeting, CEO salary...",
                                className: "bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-red resize-y transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 62,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 60,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-6 sm:px-8 py-5 border-t border-[var(--article-border)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-[var(--article-border)] text-[var(--foreground)] bg-[var(--article-surface)] hover:border-theme-red/50 transition-all",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "← Back"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNext,
                        className: "px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "Process document →"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
_c = StepRedact;
var _c;
__turbopack_context__.k.register(_c, "StepRedact");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/components/steps/StepOutput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepOutput",
    ()=>StepOutput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const REPORT_FIELDS = [
    {
        key: "tracking_id",
        label: "Tracking ID",
        highlight: true
    },
    {
        key: "issued",
        label: "Issued"
    },
    {
        key: "recipient",
        label: "Recipient"
    },
    {
        key: "organization",
        label: "Organization"
    },
    {
        key: "purpose",
        label: "Purpose"
    },
    {
        key: "expires",
        label: "Expires"
    },
    {
        key: "watermark_style",
        label: "Watermark style"
    },
    {
        key: "qr_embedded",
        label: "QR embedded"
    },
    {
        key: "steg_layers",
        label: "Steg layers"
    },
    {
        key: "zerowidth_encoded",
        label: "Zero-width"
    },
    {
        key: "redactions",
        label: "Redactions"
    },
    {
        key: "document",
        label: "Document"
    }
];
function Tag({ text, v }) {
    const c = {
        default: "border-[var(--article-border)] text-[var(--muted-foreground)]",
        active: "border-theme-cyan text-theme-cyan font-semibold bg-theme-cyan/5",
        redact: "border-theme-red text-theme-red font-semibold bg-theme-red/5",
        forensic: "border-theme-cyan text-theme-cyan font-semibold bg-theme-cyan/5"
    }[v];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider shadow-[var(--shadow-neumorphic)] ${c}`,
        children: text
    }, void 0, false, {
        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
        lineNumber: 22,
        columnNumber: 12
    }, this);
}
_c = Tag;
function StepOutput({ progress, progressLabel, done, error, auditRecord, outputBytes, onDownloadPdf, onDownloadAudit, onStartOver }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-[var(--article-border)]",
        style: {
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-neumorphic)",
            backdropFilter: "blur(12px)"
        },
        children: [
            !done && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-16 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-4",
                        children: progressLabel
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                        lineNumber: 42,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-0.5 bg-[var(--article-surface-strong)] max-w-xs mx-auto overflow-hidden mb-2",
                        style: {
                            boxShadow: "var(--shadow-inset)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-theme-cyan transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]",
                            style: {
                                width: `${progress}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                            lineNumber: 44,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                        lineNumber: 43,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs text-[var(--foreground)] mt-2",
                        children: [
                            progress,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                        lineNumber: 46,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                lineNumber: 41,
                columnNumber: 17
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "m-6 border border-red-800 bg-red-900/20 px-4 py-4 font-mono text-xs text-theme-red",
                children: [
                    "⚠ ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                lineNumber: 51,
                columnNumber: 17
            }, this),
            done && auditRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-5xl mb-3 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-full bg-theme-cyan/10 flex items-center justify-center text-theme-cyan border border-theme-cyan/30 shadow-[0_0_30px_rgba(34,211,238,0.2)]",
                                    children: "✓"
                                }, void 0, false, {
                                    fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                    lineNumber: 58,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 57,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold mb-2 text-[var(--foreground)]",
                                children: "Document protected"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 60,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[var(--muted-foreground)] max-w-md mx-auto",
                                children: [
                                    `${auditRecord.watermark_style} watermark`,
                                    auditRecord.qr_embedded === "yes" && "QR embedded",
                                    auditRecord.steg_layers !== "none" && `${auditRecord.steg_layers.split(",").length} steg layer(s)`,
                                    auditRecord.redactions !== "none" && "redactions applied",
                                    "forensic ID burned in"
                                ].filter(Boolean).join(" · ")
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                        lineNumber: 56,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[var(--article-surface)] border border-[var(--article-border)] p-5 mb-5 shadow-[var(--shadow-inset)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-xs text-theme-cyan uppercase tracking-wider drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]",
                                        children: "Forensic audit record"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                        lineNumber: 74,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 h-px bg-[var(--article-border)]"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                        lineNumber: 75,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 73,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                children: REPORT_FIELDS.map(({ key, label, highlight })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider",
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                                lineNumber: 80,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-mono text-xs break-all ${highlight ? "text-theme-cyan font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" : "text-[var(--foreground)]"}`,
                                                children: String(auditRecord[key])
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                                lineNumber: 81,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                        lineNumber: 79,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 77,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5 justify-center mb-5",
                        children: [
                            auditRecord.purpose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: auditRecord.purpose,
                                v: "active"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 90,
                                columnNumber: 49
                            }, this),
                            auditRecord.recipient !== "N/A" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: `For: ${auditRecord.recipient}`,
                                v: "active"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 91,
                                columnNumber: 61
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: `${auditRecord.watermark_style} watermark`,
                                v: "active"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 92,
                                columnNumber: 25
                            }, this),
                            auditRecord.qr_embedded === "yes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: "QR embedded",
                                v: "forensic"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 93,
                                columnNumber: 63
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: "Forensic ID",
                                v: "forensic"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this),
                            auditRecord.steg_layers !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: `${auditRecord.steg_layers.split(",").length} steg layers`,
                                v: "forensic"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 95,
                                columnNumber: 64
                            }, this),
                            auditRecord.zerowidth_encoded.startsWith("yes") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: "Zero-width encoded",
                                v: "forensic"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 96,
                                columnNumber: 77
                            }, this),
                            auditRecord.redactions !== "none" && auditRecord.redactions.split(", ").map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                    text: `${r} redacted`,
                                    v: "redact"
                                }, r, false, {
                                    fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                    lineNumber: 97,
                                    columnNumber: 109
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                        lineNumber: 89,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3 justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onDownloadPdf,
                                disabled: !outputBytes,
                                className: "px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all disabled:opacity-40",
                                style: outputBytes ? {
                                    boxShadow: "var(--shadow-neumorphic)"
                                } : {},
                                children: "⬇ Download protected PDF"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 101,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onDownloadAudit,
                                className: "px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-theme-cyan bg-theme-cyan/5 text-theme-cyan hover:bg-theme-cyan hover:text-black hover:scale-[1.02] transition-all",
                                style: {
                                    boxShadow: "var(--shadow-neumorphic)"
                                },
                                children: "📋 Audit report (.json)"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 104,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onStartOver,
                                className: "px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-[var(--article-border)] text-[var(--foreground)] bg-[var(--article-surface)] hover:border-theme-cyan/50 transition-all",
                                style: {
                                    boxShadow: "var(--shadow-neumorphic)"
                                },
                                children: "Start over"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 107,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                        lineNumber: 100,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                lineNumber: 55,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, this);
}
_c1 = StepOutput;
var _c, _c1;
__turbopack_context__.k.register(_c, "Tag");
__turbopack_context__.k.register(_c1, "StepOutput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/lib/processor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "processDocument",
    ()=>processDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/api/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/api/StandardFonts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/api/colors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/api/rotations.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/utils.ts [app-client] (ecmascript)");
;
;
function buildWatermarkText(config) {
    if (config.customText.trim()) return config.customText.trim();
    const parts = [];
    if (config.purpose) parts.push(config.purpose.toUpperCase());
    if (config.recipient) parts.push(`FOR: ${config.recipient.toUpperCase()}`);
    if (config.expiry) parts.push(`UNTIL: ${config.expiry}`);
    return parts.length ? parts.join(" | ") : "CONFIDENTIAL";
}
async function generateQrDataUrl(payload) {
    try {
        const QRCode = (await __turbopack_context__.A("[project]/anicode/flagvault/node_modules/qrcode/lib/browser.js [app-client] (ecmascript, async loader)")).default;
        return await QRCode.toDataURL(payload, {
            width: 128,
            margin: 1,
            color: {
                dark: "#000000",
                light: "#ffffff"
            }
        });
    } catch (e) {
        console.warn("QR generation failed:", e);
        return null;
    }
}
function dataUrlToUint8Array(dataUrl) {
    const base64 = dataUrl.split(",")[1];
    const binary = atob(base64);
    const arr = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++)arr[i] = binary.charCodeAt(i);
    return arr;
}
async function processDocument({ fileBytes, fileName, fileType, watermark, redact, steg, forensicId, onProgress }) {
    const now = new Date().toISOString();
    const { recipient, organization, purpose, expiry, style } = watermark;
    const wmText = buildWatermarkText(watermark);
    const qrPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildQrPayload"])({
        fid: forensicId,
        recipient,
        org: organization,
        purpose,
        expiry,
        issuedAt: now,
        docName: fileName
    });
    onProgress(8, "Initializing...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(120);
    onProgress(18, "Parsing document...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(180);
    let pdfDoc;
    const isImage = fileType.startsWith("image/");
    if (isImage) {
        pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
        const img = fileType === "image/png" ? await pdfDoc.embedPng(fileBytes) : await pdfDoc.embedJpg(fileBytes);
        const page = pdfDoc.addPage([
            img.width,
            img.height
        ]);
        page.drawImage(img, {
            x: 0,
            y: 0,
            width: img.width,
            height: img.height
        });
    } else {
        pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(fileBytes, {
            ignoreEncryption: true
        });
    }
    const pages = pdfDoc.getPages();
    const fontBold = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].HelveticaBold);
    const fontReg = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].Helvetica);
    const needsQr = style === "qr" || style === "qr+diagonal" || steg.options.has("stegMicroQr");
    let qrImg = null;
    if (needsQr) {
        onProgress(28, "Generating QR code...");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(80);
        try {
            const qrDataUrl = await generateQrDataUrl(qrPayload);
            if (qrDataUrl) {
                const qrBytes = dataUrlToUint8Array(qrDataUrl);
                qrImg = await pdfDoc.embedPng(qrBytes);
            }
        } catch (e) {
            console.warn("QR embed failed:", e);
        }
    }
    onProgress(40, "Applying watermark...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(200);
    for (const page of pages){
        const { width, height } = page.getSize();
        if (style === "diagonal" || style === "grid" || style === "qr+diagonal") {
            const tiles = style === "grid" ? 3 : 1;
            for(let tx = 0; tx < tiles; tx++){
                for(let ty = 0; ty < tiles; ty++){
                    const isGrid = style === "grid";
                    page.drawText(wmText, {
                        x: isGrid ? width / 3 * tx + 18 : Math.max(10, width / 2 - wmText.length * 7),
                        y: isGrid ? height / 3 * (ty + 0.5) : height / 2,
                        font: fontBold,
                        size: isGrid ? 12 : 20,
                        color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(0.9, 1.0, 0.2),
                        opacity: isGrid ? 0.1 : 0.16,
                        rotate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"])(-30)
                    });
                }
            }
        }
        if (style === "corner") {
            page.drawText(wmText.slice(0, 60), {
                x: Math.max(10, width - wmText.length * 5.5 - 12),
                y: height - 25,
                font: fontBold,
                size: 8,
                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(0.9, 1.0, 0.2),
                opacity: 0.65
            });
        }
        if (style === "banner") {
            page.drawRectangle({
                x: 0,
                y: height - 24,
                width,
                height: 24,
                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(0.04, 0.04, 0.07),
                opacity: 0.65
            });
            page.drawText(wmText.slice(0, 80), {
                x: 9,
                y: height - 17,
                font: fontBold,
                size: 8.5,
                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(0.9, 1.0, 0.2),
                opacity: 0.9
            });
        }
        if (qrImg && (style === "qr" || style === "qr+diagonal")) {
            const qs = Math.min(width * 0.17, 95);
            page.drawImage(qrImg, {
                x: width - qs - 10,
                y: 10,
                width: qs,
                height: qs,
                opacity: 0.88
            });
            page.drawText("SCAN TO VERIFY", {
                x: width - qs - 10,
                y: qs + 14,
                font: fontBold,
                size: 5,
                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(0.45, 0.55, 0.45),
                opacity: 0.8
            });
        }
        if (qrImg && steg.options.has("stegMicroQr")) {
            const mqs = Math.min(width * 0.11, 55);
            page.drawImage(qrImg, {
                x: 7,
                y: height - mqs - 7,
                width: mqs,
                height: mqs,
                opacity: 0.02
            });
        }
        if (steg.options.has("stegInvisText")) {
            const payload = `FVSTEG:${forensicId}:${recipient}:${organization}:${purpose}:${now}`;
            page.drawText(payload, {
                x: 8,
                y: height / 3,
                font: fontReg,
                size: 1,
                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(1, 1, 1),
                opacity: 0.01
            });
        }
        const footer = `Watermark | ID:${forensicId} | To:${recipient || "N/A"} | ${now.split("T")[0]}`;
        page.drawText(footer, {
            x: 8,
            y: 6,
            font: fontReg,
            size: 5.5,
            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(0.4, 0.4, 0.5),
            opacity: 0.55
        });
    }
    onProgress(60, "Embedding steganographic metadata...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(220);
    if (steg.options.has("stegPdfMeta")) {
        pdfDoc.setTitle(`[PROTECTED] ${fileName}`);
        pdfDoc.setAuthor(`Watermark | ${recipient || "N/A"}`);
        pdfDoc.setSubject(`Purpose: ${purpose || "Confidential"} | Recipient: ${recipient || "N/A"} | Org: ${organization || "N/A"}`);
        pdfDoc.setKeywords([
            forensicId,
            "watermark-protected",
            recipient,
            organization,
            purpose,
            now
        ]);
        pdfDoc.setProducer("Watermark");
        pdfDoc.setCreator(`Watermark | TrackingID:${forensicId}`);
    } else {
        pdfDoc.setTitle(`[PROTECTED] ${fileName}`);
        pdfDoc.setProducer("Watermark v2");
        pdfDoc.setCreator(`WM:${forensicId}`);
    }
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());
    if (redact.categories.size > 0) {
        pdfDoc.setKeywords([
            forensicId,
            `REDACTED:${Array.from(redact.categories).join(",")}`,
            recipient,
            purpose
        ]);
    }
    onProgress(75, "Processing redactions...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(160);
    onProgress(88, "Finalizing...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(160);
    const pdfBytes = await pdfDoc.save();
    onProgress(100, "Done.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])(280);
    const zwEncoded = steg.options.has("stegZeroWidth") ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeZeroWidth"])(forensicId) : null;
    const auditRecord = {
        tracking_id: forensicId,
        issued: now,
        document: fileName,
        recipient: recipient || "N/A",
        organization: organization || "N/A",
        purpose: purpose || "N/A",
        expires: expiry || "N/A",
        watermark_style: style,
        qr_embedded: needsQr && qrImg ? "yes" : "no",
        steg_layers: Array.from(steg.options).join(", ") || "none",
        zerowidth_encoded: zwEncoded ? `yes (${forensicId})` : "no",
        redactions: Array.from(redact.categories).join(", ") || "none",
        generator: "Watermark"
    };
    return {
        pdfBytes,
        auditRecord
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/anicode/flagvault/components/WatermarkApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WatermarkApp",
    ()=>WatermarkApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/hooks/useAppState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$StepTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/ui/StepTracker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/steps/StepUpload.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepWatermark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/steps/StepWatermark.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepRedact$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/steps/StepRedact.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/steps/StepOutput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$processor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/processor.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function WatermarkApp() {
    _s();
    const { state, setStep, setFile, setWatermark, setWatermarkStyle, toggleRedactCategory, setCustomTerms, toggleStegOption, regenForensicId, setProgress, setOutput, setError, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppState"])();
    const goTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WatermarkApp.useCallback[goTo]": (step)=>setStep(step)
    }["WatermarkApp.useCallback[goTo]"], [
        setStep
    ]);
    const handleFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WatermarkApp.useCallback[handleFile]": (file, bytes)=>setFile(file, bytes)
    }["WatermarkApp.useCallback[handleFile]"], [
        setFile
    ]);
    const handleProcess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WatermarkApp.useCallback[handleProcess]": async ()=>{
            if (!state.file || !state.fileBytes) return;
            goTo(4);
            try {
                const { pdfBytes, auditRecord } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$processor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processDocument"])({
                    fileBytes: state.fileBytes,
                    fileName: state.file.name,
                    fileType: state.file.type,
                    watermark: state.watermark,
                    redact: state.redact,
                    steg: state.steg,
                    forensicId: state.forensicId,
                    onProgress: setProgress
                });
                setOutput(pdfBytes, auditRecord);
            } catch (err) {
                setError(`Processing failed: ${err instanceof Error ? err.message : "Unknown error"}`);
            }
        }
    }["WatermarkApp.useCallback[handleProcess]"], [
        state,
        goTo,
        setProgress,
        setOutput,
        setError
    ]);
    const handleDownloadPdf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WatermarkApp.useCallback[handleDownloadPdf]": ()=>{
            if (!state.outputBytes || !state.file) return;
            const blob = new Blob([
                state.outputBytes.buffer
            ], {
                type: "application/pdf"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = state.file.name.replace(/\.[^.]+$/, "") + "_protected.pdf";
            a.click();
            URL.revokeObjectURL(url);
        }
    }["WatermarkApp.useCallback[handleDownloadPdf]"], [
        state.outputBytes,
        state.file
    ]);
    const handleDownloadAudit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WatermarkApp.useCallback[handleDownloadAudit]": ()=>{
            if (!state.auditRecord) return;
            const blob = new Blob([
                JSON.stringify(state.auditRecord, null, 2)
            ], {
                type: "application/json"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `watermark_audit_${state.auditRecord.tracking_id}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }["WatermarkApp.useCallback[handleDownloadAudit]"], [
        state.auditRecord
    ]);
    const isDone = state.progress === 100 && !state.error;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto px-6 sm:px-10 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$StepTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepTracker"], {
                current: state.step
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            state.step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepUpload"], {
                file: state.file,
                onFile: handleFile,
                onRemove: ()=>setFile(null, null),
                onNext: ()=>goTo(2)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 69,
                columnNumber: 17
            }, this),
            state.step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepWatermark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepWatermark"], {
                watermark: state.watermark,
                stegOptions: state.steg.options,
                forensicId: state.forensicId,
                forensicTs: state.forensicTs,
                onWatermark: setWatermark,
                onStyleChange: setWatermarkStyle,
                onStegToggle: toggleStegOption,
                onRegenId: regenForensicId,
                onNext: ()=>goTo(3),
                onBack: ()=>goTo(1)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 73,
                columnNumber: 17
            }, this),
            state.step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepRedact$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepRedact"], {
                categories: state.redact.categories,
                customTerms: state.redact.customTerms,
                onToggle: toggleRedactCategory,
                onCustomTerms: setCustomTerms,
                onNext: handleProcess,
                onBack: ()=>goTo(2)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 88,
                columnNumber: 17
            }, this),
            state.step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepOutput"], {
                progress: state.progress,
                progressLabel: state.progressLabel,
                done: isDone,
                error: state.error,
                auditRecord: state.auditRecord,
                outputBytes: state.outputBytes,
                onDownloadPdf: handleDownloadPdf,
                onDownloadAudit: handleDownloadAudit,
                onStartOver: reset
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 99,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
_s(WatermarkApp, "fMWUy4X2mfh5EJgcFqfbOZaiXYo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppState"]
    ];
});
_c = WatermarkApp;
var _c;
__turbopack_context__.k.register(_c, "WatermarkApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=anicode_flagvault_14a98701._.js.map