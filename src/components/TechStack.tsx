import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { techStack } from "@/lib/content";

/**
 * Technology grid. The cipher note calls out the project's most unusual
 * engineering property: one Rust crate compiled twice, pinned byte-for-byte.
 */
export function TechStack() {
  return (
    <section id="stack" className="relative py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="Technical stack"
          title="A Rust core,"
          highlight="worn lightly."
          description="The desktop shell is Tauri 2; the server is axum on tokio, embedded in the binary. The cipher is a single Rust crate compiled twice — natively for the PC and to wasm32 for the phone — and pinned against itself byte-for-byte by a cross-check script."
        />

        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
          {techStack.map((t, i) => (
            <li key={t.name}>
              <Reveal animation="animotion-bounce-in" delay={i * 60}>
                <span
                  className="glass inline-flex items-baseline gap-2.5 rounded-xl px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_10px_30px_rgb(47_107_255/0.15)]"
                  title={t.role}
                >
                  <span className="text-[14px] font-semibold text-ink">{t.name}</span>
                  <span className="font-mono text-[10.5px] text-ink-3">{t.role}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal animation="animotion-fade-in-up" delay={200}>
          <div className="glass-deep mx-auto mt-12 max-w-3xl rounded-2xl p-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <code className="flex-1 font-mono text-[12px] leading-6 text-ink-2">
                <span className="text-ink-3">$ </span>
                cargo build -p aerlynk-crypto --target wasm32-unknown-unknown
                <br />
                <span className="text-ink-3">$ </span>
                node scripts/wasm-cross-check.mjs
                <br />
                <span className="text-mint">✓ native ≡ wasm · byte-for-byte agreement</span>
              </code>
              <p className="max-w-[240px] text-[12.5px] leading-relaxed text-ink-3">
                A phone can never disagree with the desktop about a single byte.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
