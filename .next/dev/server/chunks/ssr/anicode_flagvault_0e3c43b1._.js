module.exports = [
"[project]/anicode/flagvault/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/anicode/flagvault/hooks/useAppState.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppState",
    ()=>useAppState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/utils.ts [app-ssr] (ecmascript)");
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
            styles: [
                "diagonal"
            ]
        },
        redact: {
            categories: new Set(),
            customTerms: "",
            flatten: false
        },
        steg: {
            options: new Set([
                "stegPdfMeta",
                "stegZeroWidth"
            ])
        },
        forensicId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateForensicId"])(),
        forensicTs: new Date().toISOString(),
        outputBytes: null,
        auditRecord: null,
        progress: 0,
        progressLabel: "Initializing...",
        error: null
    };
}
function useAppState() {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultState);
    const setStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((step)=>setState((s)=>({
                ...s,
                step
            })), []);
    const setFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((file, bytes)=>setState((s)=>({
                ...s,
                file,
                fileBytes: bytes
            })), []);
    const setWatermark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((patch)=>setState((s)=>({
                ...s,
                watermark: {
                    ...s.watermark,
                    ...patch
                }
            })), []);
    const setWatermarkStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((styles)=>setState((s)=>({
                ...s,
                watermark: {
                    ...s.watermark,
                    styles
                }
            })), []);
    const toggleRedactCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((cat)=>setState((s)=>{
            const next = new Set(s.redact.categories);
            next.has(cat) ? next.delete(cat) : next.add(cat);
            return {
                ...s,
                redact: {
                    ...s.redact,
                    categories: next
                }
            };
        }), []);
    const setCustomTerms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((customTerms)=>setState((s)=>({
                ...s,
                redact: {
                    ...s.redact,
                    customTerms
                }
            })), []);
    const setFlatten = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((flatten)=>setState((s)=>({
                ...s,
                redact: {
                    ...s.redact,
                    flatten
                }
            })), []);
    const toggleStegOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((opt)=>setState((s)=>{
            const next = new Set(s.steg.options);
            next.has(opt) ? next.delete(opt) : next.add(opt);
            return {
                ...s,
                steg: {
                    ...s.steg,
                    options: next
                }
            };
        }), []);
    const regenForensicId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setState((s)=>({
                ...s,
                forensicId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateForensicId"])(),
                forensicTs: new Date().toISOString()
            })), []);
    const setProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((progress, progressLabel)=>setState((s)=>({
                ...s,
                progress,
                progressLabel
            })), []);
    const setOutput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((outputBytes, auditRecord)=>setState((s)=>({
                ...s,
                outputBytes,
                auditRecord
            })), []);
    const setError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((error)=>setState((s)=>({
                ...s,
                error
            })), []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setState(defaultState()), []);
    return {
        state,
        setStep,
        setFile,
        setWatermark,
        setWatermarkStyles,
        toggleRedactCategory,
        setCustomTerms,
        setFlatten,
        toggleStegOption,
        regenForensicId,
        setProgress,
        setOutput,
        setError,
        reset
    };
}
}),
"[project]/anicode/flagvault/components/ui/StepTracker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepTracker",
    ()=>StepTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const STEPS = [
    "Upload",
    "Watermark",
    "Redact",
    "Download"
];
function StepTracker({ current }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex mb-9",
        children: STEPS.map((label, i)=>{
            const n = i + 1;
            const isActive = n === current;
            const isDone = n < current;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 flex items-center gap-2 px-3 py-3 border-t-2 transition-colors ${isActive ? "border-theme-cyan text-theme-cyan" : isDone ? "border-[var(--article-border)]" : "border-[var(--article-border)]"}`,
                style: isActive ? {
                    boxShadow: "var(--shadow-inset)",
                    backgroundColor: "var(--article-surface)"
                } : {},
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-5 h-5 flex items-center justify-center text-xs font-mono font-bold border flex-shrink-0 transition-all ${isActive ? "bg-theme-cyan text-black border-theme-cyan" : isDone ? "bg-[var(--article-surface-strong)] text-[var(--muted-foreground)] border-[var(--article-border)]" : "border-[var(--article-border)] text-[var(--muted-foreground)]"}`,
                        style: isActive ? {
                            boxShadow: "var(--shadow-neumorphic)"
                        } : {},
                        children: isDone ? "✓" : n
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/ui/StepTracker.tsx",
                        lineNumber: 19,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-xs font-semibold uppercase tracking-wider hidden sm:block transition-colors ${isActive ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`,
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/ui/StepTracker.tsx",
                        lineNumber: 30,
                        columnNumber: 25
                    }, this)
                ]
            }, label, true, {
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
}),
"[project]/anicode/flagvault/components/steps/StepUpload.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepUpload",
    ()=>StepUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const ACCEPTED = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg"
];
function StepUpload({ file, onFile, onRemove, onNext }) {
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dragOver, setDragOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((f)=>{
        if (!ACCEPTED.includes(f.type)) {
            setError("Unsupported file. Please upload a PDF, PNG, or JPG.");
            return;
        }
        setError(null);
        const reader = new FileReader();
        reader.onload = (e)=>{
            onFile(f, new Uint8Array(e.target.result));
        };
        reader.readAsArrayBuffer(f);
    }, [
        onFile
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-[var(--article-border)]",
        style: {
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-neumorphic)",
            backdropFilter: "blur(12px)"
        },
        children: [
            !file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-5xl mb-4",
                        children: "📄"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 52,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold mb-2 text-[var(--foreground)]",
                        children: "Drop your document here"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 53,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[var(--muted-foreground)] text-sm mb-4",
                        children: "PDF, PNG, JPG — processed entirely in your browser."
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 54,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-[var(--muted-foreground)]/80 text-left max-w-sm mx-auto bg-[var(--background)] p-4 border border-[var(--article-border)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-theme-cyan block mb-1 font-mono uppercase tracking-wider",
                                children: "Zero-Trust Architecture"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                                lineNumber: 58,
                                columnNumber: 25
                            }, this),
                            "100% browser-based execution. No servers, no telemetry, no persistent storage, but if you'd rather do it from your dev server, clone the project from Github ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://github.com/anipublik/watermark",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "text-theme-cyan hover:underline",
                                children: "https://github.com/anipublik/watermark"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                                lineNumber: 59,
                                columnNumber: 182
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 57,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                lineNumber: 36,
                columnNumber: 17
            }, this),
            file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-6 mt-6 flex items-center gap-3 p-4 border",
                style: {
                    backgroundColor: "var(--article-surface)",
                    borderColor: "var(--article-border)",
                    boxShadow: "var(--shadow-inset)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-9 h-9 bg-theme-cyan flex items-center justify-center text-black font-black text-xs font-mono flex-shrink-0",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: file.name.split(".").pop()?.toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 66,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold flex-1 truncate text-[var(--foreground)]",
                        children: file.name
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] hidden sm:block",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatFileSize"])(file.size)
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 70,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRemove,
                        className: "w-6 h-6 border border-[var(--article-border)] text-[var(--muted-foreground)] hover:border-theme-red hover:text-theme-red flex items-center justify-center text-xs transition-colors",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 71,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                lineNumber: 65,
                columnNumber: 17
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mx-6 mt-3 text-theme-red text-xs font-mono border border-red-800 bg-red-900/20 px-3 py-2",
                children: [
                    "⚠ ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                lineNumber: 79,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-6 py-5 border-t border-[var(--article-border)] mt-6 bg-[var(--article-surface)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] hidden sm:block",
                        children: "// client-side only — zero telemetry"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNext,
                        disabled: !file,
                        className: "ml-auto px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors",
                        style: !file ? {} : {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "Continue →"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                        lineNumber: 84,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/steps/StepUpload.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, this);
}
}),
"[project]/anicode/flagvault/components/ui/Toggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toggle",
    ()=>Toggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Toggle({ enabled, onToggle, color = "cyan" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: (e)=>{
            e.stopPropagation();
            onToggle();
        },
        role: "switch",
        "aria-checked": enabled,
        className: `relative w-9 h-5 rounded-full flex-shrink-0 transition-colors duration-200 ${enabled ? color === "cyan" ? "bg-theme-cyan" : "bg-theme-red" : "bg-zinc-700"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
}),
"[project]/anicode/flagvault/components/steps/StepWatermark.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepWatermark",
    ()=>StepWatermark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/ui/Toggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/hooks/useAppState.ts [app-ssr] (ecmascript)");
"use client";
;
;
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
function buildPreviewText(w) {
    if (w.customText.trim()) return w.customText.trim();
    const parts = [];
    if (w.purpose) parts.push(w.purpose.toUpperCase());
    if (w.recipient) parts.push(`FOR: ${w.recipient.toUpperCase()}`);
    if (w.expiry) parts.push(`UNTIL: ${w.expiry}`);
    return parts.length ? parts.join(" | ") : "CONFIDENTIAL";
}
function StepWatermark({ watermark, stegOptions, forensicId, forensicTs, onWatermark, onStyleChange, onStegToggle, onRegenId, onNext, onBack }) {
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppState"])();
    const previewText = buildPreviewText(watermark);
    // Live preview canvas state
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [previewLoading, setPreviewLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copiedId, setCopiedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Multi-select logic
    const toggleStyle = (style)=>{
        const set = new Set(watermark.styles);
        if (set.has(style)) {
            set.delete(style);
            // Don't allow 0 styles, fallback to diagonal
            if (set.size === 0) set.add("diagonal");
        } else {
            if (set.size >= 2) return; // max 2
            set.add(style);
        }
        onStyleChange(Array.from(set));
    };
    const copyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        navigator.clipboard.writeText(forensicId);
        setCopiedId(true);
        setTimeout(()=>setCopiedId(false), 2000);
    }, [
        forensicId
    ]);
    // Render live document preview
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!state.fileBytes || !canvasRef.current) return;
        let isStale = false;
        const renderPreview = async ()=>{
            setPreviewLoading(true);
            try {
                const { getDocument, GlobalWorkerOptions } = await __turbopack_context__.A("[project]/anicode/flagvault/node_modules/pdfjs-dist/build/pdf.mjs [app-ssr] (ecmascript, async loader)");
                GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
                const task = getDocument({
                    data: state.fileBytes.slice()
                });
                const pdf = await task.promise;
                const page = await pdf.getPage(1);
                if (isStale) return;
                const viewport = page.getViewport({
                    scale: 1.0
                }); // render at 1x
                const canvas = canvasRef.current;
                if (!canvas) return;
                // We want to fit within the 128px high container while maintaining aspect ratio
                const scale = 120 / viewport.height;
                const scaledViewport = page.getViewport({
                    scale
                });
                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    await page.render({
                        canvasContext: ctx,
                        viewport: scaledViewport
                    }).promise;
                }
            } catch (e) {
                console.error("Preview render failed:", e);
            } finally{
                if (!isStale) setPreviewLoading(false);
            }
        };
        renderPreview();
        return ()=>{
            isStale = true;
        };
    }, [
        state.fileBytes
    ]); // Only re-render underlying PDF when file changes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-[var(--article-border)]",
        style: {
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-neumorphic)",
            backdropFilter: "blur(12px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 sm:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-theme-cyan",
                                style: {
                                    boxShadow: "0 0 10px rgba(var(--theme-cyan), 0.5)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 131,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-bold text-base text-[var(--foreground)]",
                                children: "Watermark + forensic configuration"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 132,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 130,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            ].map(({ id, label, placeholder, type })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                            lineNumber: 142,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: type,
                                            value: watermark[id],
                                            onChange: (e)=>onWatermark({
                                                    [id]: e.target.value
                                                }),
                                            placeholder: placeholder,
                                            className: "bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-cyan transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                            lineNumber: 143,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, id, true, {
                                    fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                    lineNumber: 141,
                                    columnNumber: 25
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                        children: "Purpose"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 154,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: watermark.purpose,
                                        onChange: (e)=>onWatermark({
                                                purpose: e.target.value
                                            }),
                                        className: "bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-cyan transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select purpose..."
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 160,
                                                columnNumber: 29
                                            }, this),
                                            PURPOSES.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: p,
                                                    children: p
                                                }, p, false, {
                                                    fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 50
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 155,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 153,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sm:col-span-2 flex flex-col gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                        children: "Custom text (optional override)"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 166,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 167,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 165,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 135,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                children: "Watermark style"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 179,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono font-bold text-theme-cyan bg-theme-cyan/10 px-1.5 py-0.5 rounded",
                                children: "SELECT UP TO 2"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 180,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 178,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap mb-6",
                        children: STYLES.map((s)=>{
                            const isSelected = watermark.styles.includes(s.value);
                            const isDisabled = !isSelected && watermark.styles.length >= 2;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggleStyle(s.value),
                                disabled: isDisabled,
                                className: `flex-[1_1_0%] min-w-[30%] sm:min-w-[70px] p-3 border text-center transition-all relative ${isSelected ? "border-theme-cyan bg-theme-cyan/5 shadow-[0_0_15px_rgba(var(--theme-cyan),_0.1)] text-[var(--foreground)]" : isDisabled ? "border-[var(--article-border)] bg-[var(--article-surface)] text-[var(--muted-foreground)] opacity-40 cursor-not-allowed" : s.isNew ? "border-dashed border-[var(--article-border)] hover:border-theme-cyan/50 text-[var(--muted-foreground)]" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-cyan/50 text-[var(--muted-foreground)]"}`,
                                style: !isSelected && !isDisabled && !s.isNew ? {
                                    boxShadow: "var(--shadow-neumorphic)"
                                } : {},
                                children: [
                                    s.isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-1 right-1 bg-theme-cyan text-black text-[8px] font-mono font-bold px-1",
                                        children: "NEW"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 203,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl mb-1",
                                        children: s.icon
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 205,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-semibold",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 206,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, s.value, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 188,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 183,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-3",
                        children: "Live preview"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 212,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative border border-[var(--article-border)] h-32 flex items-center justify-center mb-6 overflow-hidden bg-[var(--article-surface)]",
                        style: {
                            boxShadow: "var(--shadow-inset)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center pointer-events-none opacity-80",
                                style: {
                                    filter: "grayscale(100%) brightness(0.9)"
                                },
                                children: [
                                    previewLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-mono text-[var(--muted-foreground)] animate-pulse",
                                        children: "Rendering page 1..."
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 217,
                                        columnNumber: 44
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                        ref: canvasRef,
                                        className: "shadow-lg border border-black/10",
                                        style: {
                                            display: previewLoading ? "none" : "block"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 218,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 216,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                                children: [
                                    watermark.styles.map((style)=>{
                                        if (style === "banner") {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-0 left-0 right-0 bg-theme-cyan/20 px-2 py-1 font-mono text-[10px] font-bold text-theme-cyan uppercase tracking-widest text-center truncate backdrop-blur-sm border-b border-theme-cyan/40",
                                                children: previewText
                                            }, style, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 226,
                                                columnNumber: 37
                                            }, this);
                                        }
                                        if (style === "corner") {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-[2px] right-[2px] font-mono text-[8px] font-bold text-theme-cyan uppercase drop-shadow",
                                                children: previewText.slice(0, 20)
                                            }, style, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 233,
                                                columnNumber: 37
                                            }, this);
                                        }
                                        if (style === "grid") {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 grid grid-cols-2 grid-rows-2 items-center justify-items-center opacity-40",
                                                children: [
                                                    1,
                                                    2,
                                                    3,
                                                    4
                                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono font-bold text-theme-cyan uppercase tracking-widest text-[8px] whitespace-nowrap",
                                                        style: {
                                                            transform: "rotate(-30deg)"
                                                        },
                                                        children: previewText.slice(0, 15)
                                                    }, i, false, {
                                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 45
                                                    }, this))
                                            }, style, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 240,
                                                columnNumber: 37
                                            }, this);
                                        }
                                        if (style === "diagonal" || style === "qr+diagonal") {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono font-bold text-theme-cyan uppercase tracking-widest text-sm whitespace-nowrap drop-shadow-[0_0_2px_#000]",
                                                style: {
                                                    transform: "rotate(-30deg)",
                                                    opacity: 0.9
                                                },
                                                children: previewText
                                            }, style, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 249,
                                                columnNumber: 37
                                            }, this);
                                        }
                                        return null;
                                    }),
                                    watermark.styles.some((s)=>s.includes("qr")) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-1 right-1 w-8 h-8 bg-white border border-theme-cyan flex items-center justify-center p-0.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full bg-black/80 flex items-center justify-center text-[8px] text-white",
                                            children: "QR"
                                        }, void 0, false, {
                                            fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                            lineNumber: 259,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 258,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 222,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 213,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                        className: "border-[var(--article-border)] my-6"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 265,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                children: "Forensic tracking ID"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 268,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-theme-cyan text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded",
                                children: "NEW"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 269,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 267,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[var(--article-surface)] border border-[var(--article-border)] border-l-2 border-l-theme-cyan pl-5 pr-4 py-4 mb-3 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-sm font-bold text-theme-cyan tracking-wider break-all drop-shadow-[0_0_8px_rgba(var(--theme-cyan),_0.4)]",
                                        children: forensicId
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 274,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: copyId,
                                        className: `p-1.5 rounded transition-all flex items-center gap-1 ${copiedId ? "bg-emerald-500/20 text-emerald-500 border-none" : "border border-[var(--article-border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-theme-cyan hover:text-theme-cyan"}`,
                                        children: copiedId ? "✓ Copied" : "📋 Copy"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 275,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 273,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-4 font-mono text-xs text-[var(--muted-foreground)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "⏱ ",
                                            new Date(forensicTs).toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 284,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "🔑 128-bit entropy"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 285,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 283,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onRegenId,
                                className: "absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] hover:text-theme-cyan transition-colors",
                                children: "↻ Regenerate"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 288,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 272,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 bg-[var(--card-bg)] border border-[var(--article-border)] flex gap-3 text-xs mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: "💡"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 297,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[var(--muted-foreground)] leading-relaxed",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-[var(--foreground)]",
                                        children: "Save this tracking ID."
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 299,
                                        columnNumber: 25
                                    }, this),
                                    " It acts as the immutable cryptographic fingerprint for this specific download. If this document leaks publicly or appears somewhere it shouldn't, you can reverse-search this ID in your records to undeniably prove who it was issued to."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 298,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 296,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                        className: "border-[var(--article-border)] my-6"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 304,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                children: "Invisible steganographic layers"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 307,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-theme-cyan text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded",
                                children: "NEW"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 308,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 306,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2.5",
                        children: STEG_OPTIONS.map((opt)=>{
                            const enabled = stegOptions.has(opt.id);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>onStegToggle(opt.id),
                                className: `flex items-start justify-between gap-4 px-4 py-3 border cursor-pointer transition-all ${enabled ? "border-theme-cyan bg-theme-cyan/[0.04] shadow-[0_0_20px_rgba(var(--theme-cyan),_0.1)]" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-cyan/30"}`,
                                style: !enabled ? {
                                    boxShadow: "var(--shadow-neumorphic)"
                                } : {},
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--foreground)]",
                                                children: [
                                                    opt.name,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-[var(--article-surface-strong)] text-[var(--muted-foreground)] border border-[var(--article-border)] text-[9px] font-mono font-bold px-1 rounded",
                                                        children: opt.badge
                                                    }, void 0, false, {
                                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 323,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-[var(--muted-foreground)] leading-relaxed",
                                                children: opt.desc
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                                lineNumber: 327,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 322,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toggle"], {
                                        enabled: enabled,
                                        onToggle: ()=>onStegToggle(opt.id),
                                        color: "cyan"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                        lineNumber: 329,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                                lineNumber: 315,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 311,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                lineNumber: 128,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-6 sm:px-8 py-5 border-t border-[var(--article-border)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-[var(--article-border)] text-[var(--foreground)] bg-[var(--article-surface)] hover:border-theme-cyan/50 transition-all",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "← Back"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 337,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNext,
                        className: "px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] shadow-[0_0_20px_rgba(var(--theme-cyan),_0.2)] hover:shadow-[0_0_30px_rgba(var(--theme-cyan),_0.4)] transition-all",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "Continue →"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                        lineNumber: 338,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
                lineNumber: 336,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/steps/StepWatermark.tsx",
        lineNumber: 127,
        columnNumber: 9
    }, this);
}
}),
"[project]/anicode/flagvault/components/steps/StepRedact.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepRedact",
    ()=>StepRedact
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/ui/Toggle.tsx [app-ssr] (ecmascript)");
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
        desc: "IPv4 patterns"
    },
    {
        cat: "custom",
        name: "Custom terms",
        desc: "Your own keywords or phrases"
    }
];
function StepRedact({ categories, customTerms, flatten, onToggle, onCustomTerms, onFlatten, onNext, onBack }) {
    const hasRedaction = categories.size > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-[var(--article-border)]",
        style: {
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-neumorphic)",
            backdropFilter: "blur(12px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 sm:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-theme-cyan",
                                style: {
                                    boxShadow: "0 0 10px rgba(34,211,238,0.5)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 34,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-bold text-base text-[var(--foreground)]",
                                children: "Redaction & Flattening"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 35,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>onFlatten(!flatten),
                        className: `flex items-center justify-between gap-4 px-4 py-3 border cursor-pointer transition-all mb-6 ${flatten ? "border-theme-cyan bg-theme-cyan/5" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-cyan/30"}`,
                        style: !flatten ? {
                            boxShadow: "var(--shadow-neumorphic)"
                        } : {},
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold text-[var(--foreground)]",
                                        children: "Flatten PDF"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                        lineNumber: 45,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-[var(--muted-foreground)]",
                                        children: "Bake form fields & annotations into page — removes interactivity & editability"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                        lineNumber: 46,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 44,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toggle"], {
                                enabled: flatten,
                                onToggle: ()=>onFlatten(!flatten),
                                color: "cyan"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 48,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-theme-red"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 52,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-sm text-[var(--foreground)]",
                                children: "PII Redaction"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 53,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[var(--muted-foreground)] leading-relaxed mb-4",
                        children: [
                            "Select categories to permanently redact. The output PDF will be ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[var(--foreground)]",
                                children: "rasterized to pixels"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 56,
                                columnNumber: 85
                            }, this),
                            " — no text layer remains, making extraction impossible."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, this),
                    hasRedaction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 px-4 py-3 border border-theme-red/40 bg-theme-red/5 text-xs font-mono text-theme-red leading-relaxed",
                        children: "⚠ Redacted output is image-only. Text will not be selectable or searchable."
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 60,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2.5 mb-4",
                        children: OPTS.map((opt)=>{
                            const enabled = categories.has(opt.cat);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>onToggle(opt.cat),
                                className: `flex items-center justify-between gap-4 px-4 py-3 border cursor-pointer transition-all ${enabled ? "border-theme-red bg-theme-red/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-theme-red/30"}`,
                                style: !enabled ? {
                                    boxShadow: "var(--shadow-neumorphic)"
                                } : {},
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-semibold text-[var(--foreground)]",
                                                children: opt.name
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                                lineNumber: 76,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-[var(--muted-foreground)]",
                                                children: opt.desc
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                                lineNumber: 77,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                        lineNumber: 75,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toggle"], {
                                        enabled: enabled,
                                        onToggle: ()=>onToggle(opt.cat),
                                        color: "red"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                        lineNumber: 79,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, opt.cat, true, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 69,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, this),
                    categories.has("custom") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider",
                                children: "Terms to redact (comma-separated)"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 87,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: customTerms,
                                onChange: (e)=>onCustomTerms(e.target.value),
                                rows: 3,
                                placeholder: "e.g. Project Orion, Board meeting, CEO salary...",
                                className: "bg-[var(--article-surface-strong)] border border-[var(--article-border)] text-[var(--foreground)] px-3 py-2.5 text-sm outline-none focus:border-theme-red resize-y transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                                lineNumber: 88,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 86,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-6 sm:px-8 py-5 border-t border-[var(--article-border)] bg-[var(--article-surface)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-[var(--article-border)] text-[var(--foreground)] bg-[var(--article-surface)] hover:border-theme-red/50 transition-all",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "← Back"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNext,
                        className: "px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-theme-cyan text-black hover:bg-theme-cyan hover:scale-[1.02] transition-all",
                        style: {
                            boxShadow: "var(--shadow-neumorphic)"
                        },
                        children: "Process document →"
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                        lineNumber: 101,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
                lineNumber: 99,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/steps/StepRedact.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
}),
"[project]/anicode/flagvault/components/steps/StepOutput.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepOutput",
    ()=>StepOutput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider shadow-[var(--shadow-neumorphic)] ${c}`,
        children: text
    }, void 0, false, {
        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
        lineNumber: 22,
        columnNumber: 12
    }, this);
}
function StepOutput({ progress, progressLabel, done, error, auditRecord, outputBytes, onDownloadPdf, onDownloadAudit, onStartOver }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-[var(--article-border)]",
        style: {
            backgroundColor: "var(--card-bg)",
            boxShadow: "var(--shadow-neumorphic)",
            backdropFilter: "blur(12px)"
        },
        children: [
            !done && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-16 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-4",
                        children: progressLabel
                    }, void 0, false, {
                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                        lineNumber: 42,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-0.5 bg-[var(--article-surface-strong)] max-w-xs mx-auto overflow-hidden mb-2",
                        style: {
                            boxShadow: "var(--shadow-inset)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            done && auditRecord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-5xl mb-3 flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold mb-2 text-[var(--foreground)]",
                                children: "Document protected"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 60,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[var(--article-surface)] border border-[var(--article-border)] p-5 mb-5 shadow-[var(--shadow-inset)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-xs text-theme-cyan uppercase tracking-wider drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]",
                                        children: "Forensic audit record"
                                    }, void 0, false, {
                                        fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                        lineNumber: 74,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                children: REPORT_FIELDS.map(({ key, label, highlight })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider",
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                                lineNumber: 80,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5 justify-center mb-5",
                        children: [
                            auditRecord.purpose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: auditRecord.purpose,
                                v: "active"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 90,
                                columnNumber: 49
                            }, this),
                            auditRecord.recipient !== "N/A" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: `For: ${auditRecord.recipient}`,
                                v: "active"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 91,
                                columnNumber: 61
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: `${auditRecord.watermark_style} watermark`,
                                v: "active"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 92,
                                columnNumber: 25
                            }, this),
                            auditRecord.qr_embedded === "yes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: "QR embedded",
                                v: "forensic"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 93,
                                columnNumber: 63
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: "Forensic ID",
                                v: "forensic"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this),
                            auditRecord.steg_layers !== "none" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: `${auditRecord.steg_layers.split(",").length} steg layers`,
                                v: "forensic"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 95,
                                columnNumber: 64
                            }, this),
                            auditRecord.zerowidth_encoded.startsWith("yes") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                                text: "Zero-width encoded",
                                v: "forensic"
                            }, void 0, false, {
                                fileName: "[project]/anicode/flagvault/components/steps/StepOutput.tsx",
                                lineNumber: 96,
                                columnNumber: 77
                            }, this),
                            auditRecord.redactions !== "none" && auditRecord.redactions.split(", ").map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3 justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
}),
"[project]/anicode/flagvault/lib/flatten.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "flattenPdf",
    ()=>flattenPdf
]);
async function flattenPdf(pdfDoc) {
    try {
        const form = pdfDoc.getForm();
        form.flatten();
    } catch  {
    // Form may not exist — that's fine
    }
}
}),
"[project]/anicode/flagvault/lib/redact.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rasterizeAndRedact",
    ()=>rasterizeAndRedact
]);
"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Regex patterns per redaction category
// ─────────────────────────────────────────────────────────────────────────────
const PATTERNS = {
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    phone: /\b(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g,
    email: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
    dob: /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g,
    credit: /\b(?:\d[ \-]?){13,16}\b/g,
    ip: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g
};
function buildPatterns(config) {
    const patterns = [];
    for (const cat of config.categories){
        if (cat === "custom") continue;
        const p = PATTERNS[cat];
        if (p) patterns.push(new RegExp(p.source, "gi"));
    }
    if (config.categories.has("custom") && config.customTerms.trim()) {
        const terms = config.customTerms.split(",").map((t)=>t.trim()).filter(Boolean);
        for (const t of terms){
            patterns.push(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));
        }
    }
    return patterns;
}
async function rasterizeAndRedact(pdfBytes, config, onProgress) {
    // Dynamic import so Next.js doesn't try to SSR it
    const [{ getDocument, GlobalWorkerOptions }, { PDFDocument }] = await Promise.all([
        __turbopack_context__.A("[project]/anicode/flagvault/node_modules/pdfjs-dist/build/pdf.mjs [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/anicode/flagvault/node_modules/pdf-lib/es/index.js [app-ssr] (ecmascript, async loader)")
    ]);
    // Point the worker at the bundled file we'll set up in next.config
    GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    onProgress(5, "Loading document for redaction...");
    const loadingTask = getDocument({
        data: pdfBytes.slice()
    });
    const pdfJsDoc = await loadingTask.promise;
    const numPages = pdfJsDoc.numPages;
    const patterns = buildPatterns(config);
    const newPdf = await PDFDocument.create();
    for(let pageNum = 1; pageNum <= numPages; pageNum++){
        const pct = 10 + Math.round((pageNum - 1) / numPages * 80);
        onProgress(pct, `Redacting page ${pageNum} of ${numPages}...`);
        const pdfPage = await pdfJsDoc.getPage(pageNum);
        const viewport = pdfPage.getViewport({
            scale: 2.0
        }); // 2× for legible output
        // Render page to offscreen canvas
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        await pdfPage.render({
            canvasContext: ctx,
            viewport
        }).promise;
        // Extract text positions and burn black boxes over matches
        if (patterns.length > 0) {
            const textContent = await pdfPage.getTextContent();
            for (const item of textContent.items){
                if (!item.str.trim()) continue;
                const matchesAny = patterns.some((p)=>{
                    p.lastIndex = 0;
                    return p.test(item.str);
                });
                if (matchesAny) {
                    // item.transform is a 6-element matrix [a, b, c, d, e, f]
                    // e = x, f = y (in PDF coordinate space, origin is bottom-left)
                    const [, , , , x, y] = item.transform;
                    const scaledX = x * 2;
                    const scaledY = viewport.height - y * 2 - item.height * 2;
                    const scaledW = item.width * 2;
                    const scaledH = item.height * 2 * 1.3; // slight padding
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(scaledX, scaledY, scaledW, scaledH);
                }
            }
        }
        // Export canvas as PNG and embed into new pdf-lib document
        const pngDataUrl = canvas.toDataURL("image/png");
        const base64 = pngDataUrl.split(",")[1];
        const pngBytes = Uint8Array.from(atob(base64), (c)=>c.charCodeAt(0));
        const embeddedImg = await newPdf.embedPng(pngBytes);
        const addedPage = newPdf.addPage([
            viewport.width / 2,
            viewport.height / 2
        ]);
        addedPage.drawImage(embeddedImg, {
            x: 0,
            y: 0,
            width: viewport.width / 2,
            height: viewport.height / 2
        });
    }
    onProgress(95, "Saving redacted document...");
    return newPdf.save();
}
}),
"[project]/anicode/flagvault/lib/processor.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "processDocument",
    ()=>processDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/api/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/api/StandardFonts.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/api/colors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/pdf-lib/es/api/rotations.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$flatten$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/flatten.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$redact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/redact.ts [app-ssr] (ecmascript)");
;
;
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
        const QRCode = (await __turbopack_context__.A("[project]/anicode/flagvault/node_modules/qrcode/lib/index.js [app-ssr] (ecmascript, async loader)")).default;
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
    const { recipient, organization, purpose, expiry, styles } = watermark;
    const wmText = buildWatermarkText(watermark);
    const qrPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildQrPayload"])({
        fid: forensicId,
        recipient,
        org: organization,
        purpose,
        expiry,
        issuedAt: now,
        docName: fileName
    });
    onProgress(8, "Initializing...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sleep"])(120);
    onProgress(18, "Parsing document...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sleep"])(180);
    let pdfDoc;
    const isImage = fileType.startsWith("image/");
    if (isImage) {
        pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFDocument"].create();
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
        pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFDocument"].load(fileBytes, {
            ignoreEncryption: true
        });
    }
    const pages = pdfDoc.getPages();
    const fontBold = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFonts"].HelveticaBold);
    const fontReg = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFonts"].Helvetica);
    const needsQr = styles.some((s)=>s === "qr" || s === "qr+diagonal") || steg.options.has("stegMicroQr");
    let qrImg = null;
    if (needsQr) {
        onProgress(28, "Generating QR code...");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sleep"])(80);
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sleep"])(200);
    for (const page of pages){
        const { width, height } = page.getSize();
        for (const style of styles){
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
                            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgb"])(0.9, 1.0, 0.2),
                            opacity: isGrid ? 0.1 : 0.16,
                            rotate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["degrees"])(-30)
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
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgb"])(0.9, 1.0, 0.2),
                    opacity: 0.65
                });
            }
            if (style === "banner") {
                page.drawRectangle({
                    x: 0,
                    y: height - 24,
                    width,
                    height: 24,
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgb"])(0.04, 0.04, 0.07),
                    opacity: 0.65
                });
                page.drawText(wmText.slice(0, 80), {
                    x: 9,
                    y: height - 17,
                    font: fontBold,
                    size: 8.5,
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgb"])(0.9, 1.0, 0.2),
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
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgb"])(0.45, 0.55, 0.45),
                    opacity: 0.8
                });
            }
        } // end for style of styles
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
                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgb"])(1, 1, 1),
                opacity: 0.01
            });
        }
        const footer = `Watermark | ID:${forensicId} | To:${recipient || "N/A"} | ${now.split("T")[0]}`;
        page.drawText(footer, {
            x: 8,
            y: 6,
            font: fontReg,
            size: 5.5,
            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgb"])(0.4, 0.4, 0.5),
            opacity: 0.55
        });
    }
    onProgress(60, "Embedding steganographic metadata...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sleep"])(220);
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sleep"])(160);
    onProgress(88, "Finalizing...");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sleep"])(160);
    // ── Flatten (bake form fields into page content) ──────────────────────────
    if (redact.flatten) {
        onProgress(89, "Flattening PDF...");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$flatten$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flattenPdf"])(pdfDoc);
    }
    let pdfBytes = await pdfDoc.save();
    // ── True redaction via rasterization ─────────────────────────────────────
    // Only runs if redaction categories are actually selected.
    // Replaces the PDF with a pixel-only version — no text layer remains.
    const hasRedaction = redact.categories.size > 0;
    let redactedPages = "none";
    if (hasRedaction) {
        pdfBytes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$redact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rasterizeAndRedact"])(pdfBytes, redact, (pct, label)=>{
            onProgress(89 + Math.round(pct * 0.1), label);
        });
        redactedPages = "all";
    }
    onProgress(100, "Done.");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sleep"])(280);
    const zwEncoded = steg.options.has("stegZeroWidth") ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeZeroWidth"])(forensicId) : null;
    const auditRecord = {
        tracking_id: forensicId,
        issued: now,
        document: fileName,
        recipient: recipient || "N/A",
        organization: organization || "N/A",
        purpose: purpose || "N/A",
        expires: expiry || "N/A",
        watermark_style: styles.join(" + "),
        qr_embedded: needsQr && qrImg ? "yes" : "no",
        steg_layers: Array.from(steg.options).join(", ") || "none",
        zerowidth_encoded: zwEncoded ? `yes (${forensicId})` : "no",
        redactions: Array.from(redact.categories).join(", ") || "none",
        redacted_pages: redactedPages,
        generator: "Watermark"
    };
    return {
        pdfBytes,
        auditRecord
    };
}
}),
"[project]/anicode/flagvault/components/WatermarkApp.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WatermarkApp",
    ()=>WatermarkApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/hooks/useAppState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$StepTracker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/ui/StepTracker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/steps/StepUpload.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepWatermark$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/steps/StepWatermark.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepRedact$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/steps/StepRedact.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepOutput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/components/steps/StepOutput.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$processor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/anicode/flagvault/lib/processor.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function WatermarkApp() {
    const { state, setStep, setFile, setWatermark, setWatermarkStyles, toggleRedactCategory, setCustomTerms, setFlatten, toggleStegOption, regenForensicId, setProgress, setOutput, setError, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppState"])();
    const goTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((step)=>setStep(step), [
        setStep
    ]);
    const handleFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((file, bytes)=>setFile(file, bytes), [
        setFile
    ]);
    const handleProcess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!state.file || !state.fileBytes) return;
        goTo(4);
        try {
            const { pdfBytes, auditRecord } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$lib$2f$processor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["processDocument"])({
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
    }, [
        state,
        goTo,
        setProgress,
        setOutput,
        setError
    ]);
    const handleDownloadPdf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
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
    }, [
        state.outputBytes,
        state.file
    ]);
    const handleDownloadAudit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
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
    }, [
        state.auditRecord
    ]);
    const isDone = state.progress === 100 && !state.error;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto px-6 sm:px-10 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$ui$2f$StepTracker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StepTracker"], {
                current: state.step
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            state.step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StepUpload"], {
                file: state.file,
                onFile: handleFile,
                onRemove: ()=>setFile(null, null),
                onNext: ()=>goTo(2)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 69,
                columnNumber: 17
            }, this),
            state.step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepWatermark$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StepWatermark"], {
                watermark: state.watermark,
                stegOptions: state.steg.options,
                forensicId: state.forensicId,
                forensicTs: state.forensicTs,
                onWatermark: setWatermark,
                onStyleChange: setWatermarkStyles,
                onStegToggle: toggleStegOption,
                onRegenId: regenForensicId,
                onNext: ()=>goTo(3),
                onBack: ()=>goTo(1)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 73,
                columnNumber: 17
            }, this),
            state.step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepRedact$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StepRedact"], {
                categories: state.redact.categories,
                customTerms: state.redact.customTerms,
                flatten: state.redact.flatten,
                onToggle: toggleRedactCategory,
                onCustomTerms: setCustomTerms,
                onFlatten: setFlatten,
                onNext: handleProcess,
                onBack: ()=>goTo(2)
            }, void 0, false, {
                fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
                lineNumber: 88,
                columnNumber: 17
            }, this),
            state.step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$anicode$2f$flagvault$2f$components$2f$steps$2f$StepOutput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StepOutput"], {
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
                lineNumber: 101,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/anicode/flagvault/components/WatermarkApp.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=anicode_flagvault_0e3c43b1._.js.map