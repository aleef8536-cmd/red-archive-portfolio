import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "THE RED ARCHIVE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "radial-gradient(circle at 75% 40%, #8e1824 0%, #26090e 35%, #09090b 75%)",
          color: "#e7e2dd",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, opacity: 0.7 }}>
          <span>FILE / RA-INDEX</span>
          <span>{site.owner.displayName}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>THE RED</span>
          <span style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, color: "#d72b3b" }}>ARCHIVE</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#c5a35b" }}>NOT HERE TO BE ORDINARY.</div>
      </div>
    ),
    size
  );
}
