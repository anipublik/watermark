"use client";

import { useCallback } from "react";
import { useAppState } from "@/hooks/useAppState";
import { StepTracker } from "@/components/ui/StepTracker";
import { StepUpload } from "@/components/steps/StepUpload";
import { StepWatermark } from "@/components/steps/StepWatermark";
import { StepRedact } from "@/components/steps/StepRedact";
import { StepOutput } from "@/components/steps/StepOutput";
import { processDocument } from "@/lib/processor";
import type { Step } from "@/types";

export function WatermarkApp() {
    const { state, setStep, setFile, setWatermark, setWatermarkStyles, toggleRedactCategory, setCustomTerms, setFlatten, toggleStegOption, regenForensicId, setProgress, setOutput, setError, reset } = useAppState();

    const goTo = useCallback((step: Step) => setStep(step), [setStep]);

    const handleFile = useCallback((file: File, bytes: Uint8Array) => setFile(file, bytes), [setFile]);

    const handleProcess = useCallback(async () => {
        if (!state.file || !state.fileBytes) return;
        goTo(4);
        try {
            const { pdfBytes, auditRecord } = await processDocument({
                fileBytes: state.fileBytes,
                fileName: state.file.name,
                fileType: state.file.type,
                watermark: state.watermark,
                redact: state.redact,
                steg: state.steg,
                forensicId: state.forensicId,
                onProgress: setProgress,
            });
            setOutput(pdfBytes, auditRecord);
        } catch (err) {
            setError(`Processing failed: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
    }, [state, goTo, setProgress, setOutput, setError]);

    const handleDownloadPdf = useCallback(() => {
        if (!state.outputBytes || !state.file) return;
        const blob = new Blob([state.outputBytes.buffer as ArrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = state.file.name.replace(/\.[^.]+$/, "") + "_protected.pdf";
        a.click();
        URL.revokeObjectURL(url);
    }, [state.outputBytes, state.file]);

    const handleDownloadAudit = useCallback(() => {
        if (!state.auditRecord) return;
        const blob = new Blob([JSON.stringify(state.auditRecord, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `watermark_audit_${state.auditRecord.tracking_id}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [state.auditRecord]);

    const isDone = state.progress === 100 && !state.error;

    return (
        <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-20">
            <StepTracker current={state.step} />

            {state.step === 1 && (
                <StepUpload file={state.file} onFile={handleFile} onRemove={() => setFile(null, null)} onNext={() => goTo(2)} />
            )}

            {state.step === 2 && (
                <StepWatermark
                    watermark={state.watermark}
                    stegOptions={state.steg.options}
                    forensicId={state.forensicId}
                    forensicTs={state.forensicTs}
                    onWatermark={setWatermark}
                    onStyleChange={setWatermarkStyles}
                    onStegToggle={toggleStegOption}
                    onRegenId={regenForensicId}
                    onNext={() => goTo(3)}
                    onBack={() => goTo(1)}
                />
            )}

            {state.step === 3 && (
                <StepRedact
                    categories={state.redact.categories}
                    customTerms={state.redact.customTerms}
                    flatten={state.redact.flatten}
                    onToggle={toggleRedactCategory}
                    onCustomTerms={setCustomTerms}
                    onFlatten={setFlatten}
                    onNext={handleProcess}
                    onBack={() => goTo(2)}
                />
            )}

            {state.step === 4 && (
                <StepOutput
                    progress={state.progress}
                    progressLabel={state.progressLabel}
                    done={isDone}
                    error={state.error}
                    auditRecord={state.auditRecord}
                    outputBytes={state.outputBytes}
                    onDownloadPdf={handleDownloadPdf}
                    onDownloadAudit={handleDownloadAudit}
                    onStartOver={reset}
                />
            )}
        </div>
    );
}
