"use client";

import { useState, useCallback } from "react";
import type {
    Step, WatermarkConfig, RedactConfig, StegConfig,
    AuditRecord, WatermarkStyle, RedactCategory, StegOption,
} from "@/types";
import { generateForensicId } from "@/lib/utils";

interface AppState {
    step: Step;
    file: File | null;
    fileBytes: Uint8Array | null;
    watermark: WatermarkConfig;
    redact: RedactConfig;
    steg: StegConfig;
    forensicId: string;
    forensicTs: string;
    outputBytes: Uint8Array | null;
    auditRecord: AuditRecord | null;
    progress: number;
    progressLabel: string;
    error: string | null;
}

function defaultState(): AppState {
    return {
        step: 1,
        file: null,
        fileBytes: null,
        watermark: { recipient: "", organization: "", purpose: "", expiry: "", customText: "", styles: ["diagonal"] as import("@/types").WatermarkStyle[] },
        redact: { categories: new Set<RedactCategory>(), customTerms: "", flatten: false },
        steg: { options: new Set<StegOption>(["stegPdfMeta", "stegZeroWidth"]) },
        forensicId: generateForensicId(),
        forensicTs: new Date().toISOString(),
        outputBytes: null,
        auditRecord: null,
        progress: 0,
        progressLabel: "Initializing...",
        error: null,
    };
}

export function useAppState() {
    const [state, setState] = useState<AppState>(defaultState);

    const setStep = useCallback((step: Step) => setState((s) => ({ ...s, step })), []);

    const setFile = useCallback((file: File | null, bytes: Uint8Array | null) =>
        setState((s) => ({ ...s, file, fileBytes: bytes })), []);

    const setWatermark = useCallback((patch: Partial<WatermarkConfig>) =>
        setState((s) => ({ ...s, watermark: { ...s.watermark, ...patch } })), []);

    const setWatermarkStyles = useCallback((styles: import("@/types").WatermarkStyle[]) =>
        setState((s) => ({ ...s, watermark: { ...s.watermark, styles } })), []);

    const toggleRedactCategory = useCallback((cat: RedactCategory) =>
        setState((s) => {
            const next = new Set(s.redact.categories);
            next.has(cat) ? next.delete(cat) : next.add(cat);
            return { ...s, redact: { ...s.redact, categories: next } };
        }), []);

    const setCustomTerms = useCallback((customTerms: string) =>
        setState((s) => ({ ...s, redact: { ...s.redact, customTerms } })), []);

    const setFlatten = useCallback((flatten: boolean) =>
        setState((s) => ({ ...s, redact: { ...s.redact, flatten } })), []);

    const toggleStegOption = useCallback((opt: StegOption) =>
        setState((s) => {
            const next = new Set(s.steg.options);
            next.has(opt) ? next.delete(opt) : next.add(opt);
            return { ...s, steg: { ...s.steg, options: next } };
        }), []);

    const regenForensicId = useCallback(() =>
        setState((s) => ({ ...s, forensicId: generateForensicId(), forensicTs: new Date().toISOString() })), []);

    const setProgress = useCallback((progress: number, progressLabel: string) =>
        setState((s) => ({ ...s, progress, progressLabel })), []);

    const setOutput = useCallback((outputBytes: Uint8Array, auditRecord: AuditRecord) =>
        setState((s) => ({ ...s, outputBytes, auditRecord })), []);

    const setError = useCallback((error: string | null) =>
        setState((s) => ({ ...s, error })), []);

    const reset = useCallback(() => setState(defaultState()), []);

    return {
        state, setStep, setFile, setWatermark, setWatermarkStyles,
        toggleRedactCategory, setCustomTerms, setFlatten, toggleStegOption,
        regenForensicId, setProgress, setOutput, setError, reset,
    };
}
