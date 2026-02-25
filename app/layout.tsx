import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Watermark — Document Protection",
    description:
        "Protect your documents with watermarks, forensic tracking IDs, steganographic metadata, and PII redaction. 100% browser-based — no server, no storage, no tracking.",
    keywords: ["document watermark", "PDF redaction", "forensic tracking", "document protection"],
    openGraph: {
        title: "Watermark — Document Protection",
        description: "Watermark, redact, and forensically track PDF documents. One visit. Done.",
        url: "https://watermark.example.com",
        siteName: "Watermark",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: `(function(){try{var m=localStorage.getItem('theme-mode')||'system';var t=m==='system'?(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):m;document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
            </head>
            <body className="bg-background text-foreground antialiased min-h-screen flex flex-col font-sans transition-colors duration-300">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
