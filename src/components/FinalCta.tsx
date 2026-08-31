import { Github, Monitor, TerminalSquare } from "lucide-react";
import { DownloadButton } from "@/components/DownloadButton";
import { Reveal } from "@/components/Reveal";
import { latestTag } from "@/lib/downloads";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative py-32">
      <div className="wrap">
        <Reveal animation="animotion-blur-reveal">
          <div className="edge-lit relative mx-auto max-w-3xl overflow-hidden rounded-[28px] px-8 py-16 text-center sm:px-14">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(70% 90% at 50% 0%, rgb(47 107 255 / 0.18), transparent 70%), radial-gradient(50% 60% at 80% 100%, rgb(0 190 255 / 0.1), transparent 70%)",
              }}
              aria-hidden
            />
            <p className="eyebrow mb-5">
              Free · open source · {latestTag}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-[44px] sm:leading-[1.12]">
              Your network is all
              <span className="accent-gradient"> you need.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty text-[15.5px] leading-relaxed text-ink-2">
              Download it, run it, scan the code. If it doesn't feel like magic with a security
              audit attached, the uninstaller is one click away.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <DownloadButton className="h-12! px-7! text-[15px]" withSize />
              <a
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary h-12! px-6! text-[15px]"
              >
                <Github size={17} aria-hidden />
                Build from source
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11.5px] text-ink-3">
              <span className="inline-flex items-center gap-1.5">
                <Monitor size={13} aria-hidden /> Windows 10 / 11
              </span>
              <span className="inline-flex items-center gap-1.5">
                <TerminalSquare size={13} aria-hidden /> rpm · deb · AppImage
              </span>
              <span>WebView2 / WebKitGTK</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
