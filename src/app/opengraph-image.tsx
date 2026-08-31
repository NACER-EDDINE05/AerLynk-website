import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/* Static export: generate opengraph-image.png once at build time. */
export const dynamic = "force-static";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#06080d",
          backgroundImage:
            "radial-gradient(60% 80% at 30% 10%, rgba(47,107,255,0.25), transparent 70%), radial-gradient(50% 60% at 80% 90%, rgba(0,190,255,0.15), transparent 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background: "linear-gradient(135deg, #4d7dff, #1fa7d9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 32 32">
              <path
                d="M9 21.5 16 9l7 12.5M11.6 17h8.8"
                stroke="#fff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: "#eef2fa" }}>{site.name}</div>
        </div>
        <div style={{ fontSize: 62, fontWeight: 700, color: "#eef2fa", letterSpacing: -2 }}>
          Your files never
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: -2,
            backgroundImage: "linear-gradient(100deg, #9db9ff, #2fd0ff)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          leave your network.
        </div>
        <div style={{ fontSize: 26, color: "#a3aec2", marginTop: 32 }}>
          No accounts · No cloud · AES-256-GCM · Open source
        </div>
      </div>
    ),
    size,
  );
}
