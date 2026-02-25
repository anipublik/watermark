import { WatermarkApp } from "@/components/WatermarkApp";

const FEATURES = [
    { title: "Visible Watermarks", desc: "Deter leaks with explicit diagonal, banner, corner, or grid text overlays.", isNew: false },
    { title: "QR Code Watermark", desc: "Embed scannable QR codes linking back to verification or policy endpoints.", isNew: true },
    { title: "Steganographic Metadata", desc: "Inject invisible tracking data into the PDF structure itself, surviving simple visual redactions.", isNew: true },
    { title: "Forensic Tracking ID", desc: "Generate unique cryptographic hashes per recipient for undeniable leak attribution.", isNew: true },
    { title: "PII Redaction", desc: "Automatically scrub sensitive phrases and metadata layers before the document leaves your machine.", isNew: false },
    { title: "Zero-Trust Architecture", desc: "100% browser-based execution. No servers, no telemetry, no persistent storage.", isNew: false },
];

export default function Home() {
    return (
        <>
            <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-16 pb-12">
                <p className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-widest mb-4">
          // document protection, zero friction
                </p>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-[var(--foreground)]">
                    Watermark.{" "}
                    <span className="text-theme-cyan">Redact.</span>{" "}
                    <span className="text-theme-red">Track.</span>{" "}
                    <span className="text-theme-cyan">Prove.</span>
                </h1>
                <p className="text-[var(--muted-foreground)] text-base sm:text-lg leading-relaxed max-w-2xl mb-12">
                    Upload a PDF. Stamp it with purpose and recipient. Embed a scannable QR, a forensic
                    tracking ID, and invisible steganographic layers. Redact PII. Download in seconds.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className={`p-5 border transition-all duration-300 ${f.isNew ? "border-theme-cyan/30 bg-theme-cyan/5 hover:border-theme-cyan" : "border-[var(--article-border)] bg-[var(--article-surface)] hover:border-[var(--muted-foreground)]"}`}
                            style={!f.isNew ? { boxShadow: "var(--shadow-neumorphic)" } : { boxShadow: "0 0 15px rgba(34,211,238,0.05)" }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${f.isNew ? "bg-theme-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "bg-[var(--muted-foreground)]"}`} />
                                <h3 className={`font-mono text-xs font-bold uppercase tracking-wider ${f.isNew ? "text-theme-cyan" : "text-[var(--foreground)]"}`}>{f.title}</h3>
                            </div>
                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <WatermarkApp />
        </>
    );
}
