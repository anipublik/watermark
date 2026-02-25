export type WatermarkStyle =
    | "diagonal"
    | "corner"
    | "banner"
    | "grid"
    | "qr"
    | "qr+diagonal";

export type RedactCategory =
    | "ssn"
    | "phone"
    | "email"
    | "dob"
    | "credit"
    | "ip"
    | "custom";

export type StegOption =
    | "stegPdfMeta"
    | "stegZeroWidth"
    | "stegInvisText"
    | "stegMicroQr";

export interface WatermarkConfig {
    recipient: string;
    organization: string;
    purpose: string;
    expiry: string;
    customText: string;
    styles: WatermarkStyle[];
}

export interface RedactConfig {
    categories: Set<RedactCategory>;
    customTerms: string;
    flatten: boolean;
}

export interface StegConfig {
    options: Set<StegOption>;
}

export interface AuditRecord {
    tracking_id: string;
    issued: string;
    document: string;
    recipient: string;
    organization: string;
    purpose: string;
    expires: string;
    watermark_style: string;
    qr_embedded: "yes" | "no";
    steg_layers: string;
    zerowidth_encoded: string;
    redactions: string;
    redacted_pages: string;
    generator: string;
}

export type Step = 1 | 2 | 3 | 4;
