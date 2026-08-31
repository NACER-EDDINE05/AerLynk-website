import { ImageResponse } from "next/og";

/* Static export: generate apple-icon.png once at build time. */
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4d7dff, #1fa7d9)",
          borderRadius: 40,
        }}
      >
        <svg width="110" height="110" viewBox="0 0 32 32">
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
    ),
    size,
  );
}
