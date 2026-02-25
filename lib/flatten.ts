import type { PDFDocument } from "pdf-lib";

/**
 * Flatten all interactive form fields and widget annotations into the page
 * content so the PDF is no longer editable.
 */
export async function flattenPdf(pdfDoc: PDFDocument): Promise<void> {
    try {
        const form = pdfDoc.getForm();
        form.flatten();
    } catch {
        // Form may not exist — that's fine
    }
}
