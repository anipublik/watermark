<div align="center">

<img src="./public/logo.svg" alt="Watermark Logo" width="80" height="80" />

# Watermark

**Client-Side PDF Steganography, Watermarking & True Redaction**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)

Watermark is a 100% browser-based forensic tool for securing PDF documents before unauthorized distribution. It burns undeniable cryptographic tracing evidence into documents through multiple visible, invisible, and structural layers. If you're a savvy tech person, feel free to run this locally or you can [Try it here ](https://docshop.anisri.dev) . Either way, your docs are in your browser and never leave your machine when your watermark/redact stuff.


</div>

---

## 🛡️ Why Watermark?

When you share sensitive documents (board decks, M&A financials, HR records), NDAs only work if you can prove *who* leaked them. Watermark solves this by generating a unique 128-bit cryptographic "Forensic ID" for every recipient and weaving it into the document so deeply it cannot be removed without destroying the file.

Because it runs entirely in the browser using `pdf-lib` and `pdfjs-dist`:
- **Zero-Trust Architecture:** 100% browser-based execution. No servers, no telemetry, no persistent storage, but if you'd rather do it from your dev server, clone the project from Github <a href="https://github.com/anipublik/watermark">https://github.com/anipublik/watermark</a>.
- **Immediate:** Everything happens locally in milliseconds.

## ✨ Features

- **Multi-Layer Steganography**
  - **Zero-Width Injection:** Tracks IDs invisibly through Unicode ZWJ/ZWNJ characters hidden in natural text. Survives copy-pasting.
  - **White-on-White Text:** Barely perceptible 1pt text layers readable by screen scrapers.
  - **Metadata Injection:** Burns payload into XMP streams and DocInfo dictionaries.
  - **Micro QR:** 2% opacity QR codes hidden in document margins.

- **Visible Deterrents**
  - **Diagonal / Tiled:** Classic translucent overlays.
  - **QR Stamps:** Scannable codes linking back to your verification endpoints.
  - **Multi-Select:** Combine up to two visual styles (e.g., Diagonal + QR).

- **True PII Redaction**
  - Most tools just draw a black box over text, leaving the raw text extractable. Watermark **rasterizes** the page to a pixel canvas, literally destroying the text layer so extraction is cryptographically impossible.

- **Flattening**
  - Bakes all interactive form fields and AcroForm widgets permanently into the page layer.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/anipublik/watermark.git
cd watermark
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Technical Architecture

Watermark is built with modern, edge-ready tech:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** Vanilla CSS + Tailwind CSS (Custom Neomorphic Theme)
- **PDF Manipulation:** [`pdf-lib`](https://pdf-lib.js.org/) (AST manipulation, writing)
- **PDF Rasterization:** [`pdfjs-dist`](https://mozilla.github.io/pdf.js/) (True redaction rendering canvas)

### Standard Workflow

1. **Upload:** File is read into a local `Uint8Array`.
2. **Configure:** User sets recipient, intent, and tracking layers.
3. **Watermark / Steg Layer:** `pdf-lib` mutates the PDF AST to insert text, fonts, and images.
4. **Flatten Layer:** Form widgets are painted to the page stream.
5. **Redaction Layer:** If enabled, `pdfjs-dist` worker takes over, rendering the page to a `<canvas>`, drawing black boxes over regex mathces (SSN, emails), and returning a pixel-only PNG which is embedded back into a fresh PDF.
6. **Download:** The Blob is triggered for download alongside an Audit JSON record.

---

<div align="center">
  Built with obsession by <a href="https://github.com/anipublik">@anipublik</a>. MIT Licensed.
</div>
