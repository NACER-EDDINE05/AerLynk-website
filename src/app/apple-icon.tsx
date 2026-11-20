import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/* Static export: generate apple-icon.png once at build time. */
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const emblem = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/aerlynk-emblem.png"),
).toString("base64")}`;

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
          background: "#f3efe4",
        }}
      >
        <img width={158} height={158} src={emblem} alt="" />
      </div>
    ),
    size,
  );
}
