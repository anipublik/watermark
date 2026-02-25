export function generateForensicId(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const ts = Date.now().toString(36).toUpperCase();
    const arr = new Uint8Array(12);
    crypto.getRandomValues(arr);
    let rand = "";
    for (let i = 0; i < 12; i++) rand += chars[arr[i] % chars.length];
    return `FV-${ts}-${rand.slice(0, 4)}-${rand.slice(4, 8)}-${rand.slice(8, 12)}`;
}

export function encodeZeroWidth(text: string): string {
    const binary = text
        .split("")
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("");
    const encoded = binary
        .split("")
        .map((b) => (b === "1" ? "\u200D" : "\u200C"))
        .join("");
    return `\u200B${encoded}\u200B`;
}

export function buildQrPayload(params: {
    fid: string;
    recipient: string;
    org: string;
    purpose: string;
    expiry: string;
    issuedAt: string;
    docName: string;
}): string {
    return JSON.stringify({
        id: params.fid,
        to: params.recipient || "N/A",
        org: params.org || "N/A",
        purpose: params.purpose || "Confidential",
        expires: params.expiry || "N/A",
        issued: params.issuedAt,
        doc: params.docName,
        format: "cryptographic",
    });
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

export function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}
