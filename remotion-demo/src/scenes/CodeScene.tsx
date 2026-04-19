import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts, type } from "../styles";

const CODE_LINES = [
  { tokens: [{ t: "const", c: "#569cd6" }, { t: " frame", c: "#9cdcfe" }, { t: " = ", c: "#d4d4d4" }, { t: "useCurrentFrame", c: "#dcdcaa" }, { t: "();", c: "#d4d4d4" }] },
  { tokens: [{ t: "const", c: "#569cd6" }, { t: " { fps }", c: "#9cdcfe" }, { t: " = ", c: "#d4d4d4" }, { t: "useVideoConfig", c: "#dcdcaa" }, { t: "();", c: "#d4d4d4" }] },
  { tokens: [] },
  { tokens: [{ t: "const", c: "#569cd6" }, { t: " scale", c: "#9cdcfe" }, { t: " = ", c: "#d4d4d4" }, { t: "spring", c: "#dcdcaa" }, { t: "({", c: "#d4d4d4" }] },
  { tokens: [{ t: "  frame", c: "#9cdcfe" }, { t: ", fps,", c: "#d4d4d4" }] },
  { tokens: [{ t: "  from", c: "#9cdcfe" }, { t: ": ", c: "#d4d4d4" }, { t: "0", c: "#b5cea8" }, { t: ", to", c: "#9cdcfe" }, { t: ": ", c: "#d4d4d4" }, { t: "1", c: "#b5cea8" }, { t: ",", c: "#d4d4d4" }] },
  { tokens: [{ t: "  config", c: "#9cdcfe" }, { t: ": { damping", c: "#9cdcfe" }, { t: ": ", c: "#d4d4d4" }, { t: "12", c: "#b5cea8" }, { t: " },", c: "#d4d4d4" }] },
  { tokens: [{ t: "});", c: "#d4d4d4" }] },
];

const CHARS_PER_FRAME = 2.2;

const CodeLine: React.FC<{ tokens: { t: string; c: string }[]; visibleChars: number; lineDelay: number }> = ({
  tokens, visibleChars, lineDelay,
}) => {
  const fullText = tokens.map((tok) => tok.t).join("");
  const charsToShow = Math.max(0, visibleChars - lineDelay);
  let charCount = 0;

  return (
    <div style={{ height: 34, display: "flex", alignItems: "center" }}>
      {tokens.map((tok, i) => {
        const start = charCount;
        charCount += tok.t.length;
        const visible = Math.max(0, Math.min(tok.t.length, charsToShow - start));
        return (
          <span key={i} style={{ color: tok.c, fontFamily: fonts.mono, fontSize: 22, whiteSpace: "pre" }}>
            {tok.t.slice(0, visible)}
          </span>
        );
      })}
      {charsToShow > 0 && charsToShow < fullText.length + lineDelay && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: 20,
            background: colors.accentBright,
            marginLeft: 2,
            animation: "blink 1s step-end infinite",
          }}
        />
      )}
    </div>
  );
};

export const CodeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelX = spring({ frame, fps, from: -80, to: 0, durationInFrames: 40, config: { damping: 18 } });
  const panelOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const titleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame: Math.max(0, frame - 20), fps, from: 30, to: 0, durationInFrames: 30, config: { damping: 20 } });

  const visibleChars = Math.max(0, (frame - 30) * CHARS_PER_FRAME);

  const glowPulse = Math.sin(frame * 0.07) * 0.15 + 1;

  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 80,
        padding: "0 80px",
      }}
    >
      {/* Left: title */}
      <div style={{ flex: 1, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div
          style={{
            ...type.label,
            color: colors.accentBright,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 28, height: 2, background: colors.accentBright }} />
          Frame-Driven
        </div>
        <div
          style={{
            ...type.h1,
            color: colors.textPrimary,
            marginBottom: 24,
          }}
        >
          Pure React,{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${colors.accentBright}, ${colors.cyan})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            frame-perfect
          </span>
        </div>
        <p style={{ ...type.body, color: colors.textSecondary, maxWidth: 400 }}>
          Every animation is a pure function of the current frame — deterministic, scrubable, reproducible.
        </p>

        {/* Feature pills */}
        {["useCurrentFrame()", "spring()", "interpolate()"].map((feat, i) => {
          const delay = 80 + i * 15;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
          const x = interpolate(frame, [delay, delay + 20], [-20, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={feat}
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: `${colors.surface}`,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                padding: "8px 16px",
                marginTop: 12,
                marginRight: 12,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              <span style={{ ...type.mono, color: colors.cyan, fontSize: 18 }}>{feat}</span>
            </div>
          );
        })}
      </div>

      {/* Right: code panel */}
      <div
        style={{
          flex: 1,
          opacity: panelOpacity,
          transform: `translateX(${panelX}px)`,
        }}
      >
        <div
          style={{
            background: "#0d0d1a",
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: `0 0 60px ${colors.accentGlow}, 0 0 120px ${colors.accentGlow}40`,
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              background: "#0a0a14",
              borderBottom: `1px solid ${colors.border}`,
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ ...type.mono, color: colors.textDim, fontSize: 14, marginLeft: 12 }}>
              animation.tsx
            </span>
          </div>

          {/* Code */}
          <div style={{ padding: "28px 32px" }}>
            {CODE_LINES.map((line, i) => {
              const lineDelay = i * 12;
              return (
                <CodeLine
                  key={i}
                  tokens={line.tokens}
                  visibleChars={visibleChars}
                  lineDelay={lineDelay}
                />
              );
            })}
          </div>
        </div>

        {/* Glow under panel */}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: 40,
            background: colors.accent,
            filter: "blur(40px)",
            opacity: 0.25 * glowPulse,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
