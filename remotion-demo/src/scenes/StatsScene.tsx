import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, type } from "../styles";

const AnimatedCounter: React.FC<{ target: number; suffix?: string; delay: number; label: string; color: string }> = ({
  target, suffix = "", delay, label, color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);

  const progress = interpolate(t, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
    easing: (x) => 1 - Math.pow(1 - x, 3),
  });

  const value = Math.round(progress * target);

  const scale = spring({ frame: t, fps, from: 0.5, to: 1, durationInFrames: 35, config: { damping: 14 } });
  const opacity = interpolate(t, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const glowIntensity = progress;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "40px 48px",
          background: `${colors.surface}`,
          border: `1px solid ${color}44`,
          borderRadius: 24,
          boxShadow: `0 0 ${40 * glowIntensity}px ${color}55, inset 0 0 60px ${color}08`,
          minWidth: 240,
          textAlign: "center",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: 2,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            opacity: glowIntensity,
          }}
        />

        <div
          style={{
            ...type.stat,
            color,
            textShadow: `0 0 40px ${color}`,
            fontSize: 78,
          }}
        >
          {value.toLocaleString()}
          {suffix}
        </div>
      </div>
      <div style={{ ...type.label, color: colors.textSecondary, marginTop: 16, fontSize: 14 }}>
        {label}
      </div>
    </div>
  );
};

const FloatingOrb: React.FC<{ x: number; y: number; size: number; color: string; speed: number; phase: number }> = ({
  x, y, size, color, speed, phase,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * speed + phase) * 20;

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}88, transparent 70%)`,
        left: x,
        top: y + drift,
        filter: "blur(20px)",
        opacity: 0.4,
      }}
    />
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -30, to: 0, durationInFrames: 35, config: { damping: 16 } });

  const stats = [
    { target: 60, suffix: "fps", delay: 20, label: "Silky smooth playback", color: colors.accentBright },
    { target: 4096, suffix: "p", delay: 40, label: "Max render resolution", color: colors.cyan },
    { target: 100, suffix: "%", delay: 60, label: "React components", color: colors.green },
  ];

  return (
    <AbsoluteFill style={{ background: colors.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Floating ambient orbs */}
      <FloatingOrb x={80} y={100} size={200} color={colors.accent} speed={0.03} phase={0} />
      <FloatingOrb x={900} y={400} size={150} color={colors.cyan} speed={0.04} phase={2} />
      <FloatingOrb x={400} y={500} size={120} color={colors.green} speed={0.025} phase={4} />

      {/* Title */}
      <div style={{ textAlign: "center", opacity: titleOpacity, transform: `translateY(${titleY}px)`, marginBottom: 60 }}>
        <div style={{ ...type.label, color: colors.accentBright, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 28, height: 2, background: colors.accentBright }} />
          By the numbers
          <div style={{ width: 28, height: 2, background: colors.accentBright }} />
        </div>
        <div
          style={{
            ...type.h1,
            background: `linear-gradient(135deg, ${colors.textPrimary} 30%, ${colors.accentBright})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Built for quality
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
        {stats.map((stat, i) => (
          <AnimatedCounter key={i} {...stat} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
