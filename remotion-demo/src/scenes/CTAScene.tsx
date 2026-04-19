import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, type } from "../styles";

const WaveRing: React.FC<{ delay: number; maxRadius: number; color: string }> = ({ delay, maxRadius, color }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const progress = interpolate(t, [0, 90], [0, 1], { extrapolateRight: "clamp" });
  const radius = progress * maxRadius;
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.6, 0]);

  return (
    <div
      style={{
        position: "absolute",
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgScale = spring({ frame, fps, from: 1.2, to: 1, durationInFrames: 50, config: { damping: 20 } });

  const titleScale = spring({ frame: Math.max(0, frame - 10), fps, from: 0.7, to: 1, durationInFrames: 40, config: { damping: 12 } });
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });

  const line1Y = spring({ frame: Math.max(0, frame - 25), fps, from: 50, to: 0, durationInFrames: 35, config: { damping: 18 } });
  const line1Opacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });

  const btnScale = spring({ frame: Math.max(0, frame - 55), fps, from: 0.8, to: 1, durationInFrames: 30, config: { damping: 15 } });
  const btnOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp" });

  const btnGlow = Math.sin(frame * 0.1) * 0.3 + 1;

  const waves = [0, 20, 40, 60];

  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Expanding wave rings */}
      {waves.map((delay, i) => (
        <WaveRing key={i} delay={delay} maxRadius={600} color={colors.accentBright} />
      ))}

      {/* Central glow orb */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, ${colors.cyanGlow} 40%, transparent 70%)`,
          transform: `scale(${bgScale})`,
          opacity: 0.5,
        }}
      />

      {/* Mesh gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 80%, ${colors.accent}22 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, ${colors.cyan}22 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        {/* Big icon */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 28,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.cyan})`,
              boxShadow: `0 0 60px ${colors.accentGlow}, 0 0 120px ${colors.cyanGlow}`,
              fontSize: 48,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div style={{ opacity: titleOpacity, transform: `scale(${titleScale})` }}>
          <div
            style={{
              ...type.h1,
              background: `linear-gradient(135deg, #fff 0%, ${colors.accentBright} 50%, ${colors.cyan} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 0,
              fontSize: 80,
            }}
          >
            Ship videos
          </div>
          <div
            style={{
              ...type.h1,
              background: `linear-gradient(135deg, ${colors.cyan} 0%, #fff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: 80,
            }}
          >
            like code
          </div>
        </div>

        {/* Tagline */}
        <div style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)`, marginTop: 24 }}>
          <p style={{ ...type.body, color: colors.textSecondary, maxWidth: 500, margin: "0 auto" }}>
            Describe it. Claude builds it. Remotion renders it.
          </p>
        </div>

        {/* CTA Button */}
        <div style={{ opacity: btnOpacity, transform: `scale(${btnScale})`, marginTop: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentBright})`,
              borderRadius: 100,
              padding: "18px 44px",
              boxShadow: `0 0 ${50 * btnGlow}px ${colors.accentGlow}, 0 0 ${100 * btnGlow}px ${colors.accentGlow}40`,
              cursor: "pointer",
            }}
          >
            <span style={{ ...type.h3, color: "#fff", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Start creating →
            </span>
          </div>

          {/* Sub-text under button */}
          <div style={{ marginTop: 20 }}>
            <span style={{ ...type.mono, color: colors.textDim, fontSize: 16 }}>
              npx create-video@latest
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
