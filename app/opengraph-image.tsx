import { ImageResponse } from "next/og";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1D2A3A 0%, #283B4A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(165,196,209,0.09) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(118,161,184,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, #76A1B8 0%, rgba(118,161,184,0) 60%)",
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          flex: 1,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            maxWidth: 620,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#76A1B8",
                boxShadow: "0 0 8px #76A1B8",
              }}
            />
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                color: "#76A1B8",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              POOL DE TALENTS · MADAGASCAR
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 68,
                fontWeight: 800,
                color: "#E1E8F0",
                letterSpacing: -3,
                lineHeight: 1.0,
              }}
            >
              OpenDev
            </span>
          </div>

          <div
            style={{
              width: 56,
              height: 2.5,
              borderRadius: 2,
              background: "#76A1B8",
              marginBottom: 24,
              opacity: 0.8,
            }}
          />

          <span
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 20,
              color: "#A5C4D1",
              letterSpacing: 0.2,
              lineHeight: 1.6,
              opacity: 0.85,
              marginBottom: 40,
            }}
          >
            Des développeurs d'élite, quand vous en avez besoin.
          </span>

          <div
            style={{
              display: "flex",
              gap: 40,
              alignItems: "center",
            }}
          >
            <Stat value="200+" label="Développeurs" />
            <div style={{ width: 1, height: 36, background: "rgba(165,196,209,0.2)" }} />
            <Stat value="20+" label="Projets livrés" />
            <div style={{ width: 1, height: 36, background: "rgba(165,196,209,0.2)" }} />
            <Stat value="10+" label="Clients servis" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                border: "1px solid rgba(165,196,209,0.12)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 170,
                height: 170,
                borderRadius: "50%",
                border: "1px solid rgba(165,196,209,0.18)",
                background: "rgba(29,42,58,0.6)",
              }}
            />
            <LogoMark size={110} />
          </div>

          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11,
              color: "#76A1B8",
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            opendev.mg
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 12,
            color: "#76A1B8",
            letterSpacing: 1,
            opacity: 0.5,
          }}
        >
          © 2026 OpenDev Madagascar
        </span>
      </div>
    </div>
  );
}

function LogoMark({ size = 80 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "linear-gradient(135deg, #1D2A3A 0%, #283B4A 100%)",
        border: "1.5px solid rgba(165,196,209,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 40px rgba(118,161,184,0.15), inset 0 1px 0 rgba(225,232,240,0.08)",
      }}
    >
      <div
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: size * 0.38,
          fontWeight: 700,
          color: "#B6C5D4",
          letterSpacing: -1,
          lineHeight: 1,
        }}
      >
        {"</>"}
      </div>
    </div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 22,
          fontWeight: 700,
          color: "#A5C4D1",
          letterSpacing: -0.5,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: 11,
          color: "#76A1B8",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}
