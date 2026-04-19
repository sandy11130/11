import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, type } from "../styles";

const Particle: React.FC<{ angle: number; delay: number; speed: number; size: number; color: string }> = ({
  angle, delay, speed, size, color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const dist = t * speed * 0.8;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * dist;
  const y = Math.sin(rad) * dist;
  const opacity = interpolate(t, [0, 5, 60, 90], [0, 1, 0.6, 0], { extrapolateRight: "clamp" });
  const scale = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        opacity,
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
        left: "50%",
        top: "50%",
      }}
    />
  );
};

const OrbRing: React.FC<{ radius: number; delay: number; clockwise: boolean }> = ({ radius, delay, clockwise }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const rotation = clockwise ? t * 0.8 : -t * 0.6;
  const opacity = interpolate(t, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: `1px solid ${colors.accentBright}44`,
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: colors.accentBright,
          boxShadow: `0 0 12px ${colors.accentBright}`,
          top: "50%",
          left: 0,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0.6, to: 1, durationInFrames: 45, config: { damping: 12 } });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const subtitleY = spring({ frame: Math.max(0, frame - 25), fps, from: 40, to: 0, durationInFrames: 40, config: { damping: 18 } });
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });

  const badgeOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });
  const badgeScale = spring({ frame: Math.max(0, frame - 50), fps, from: 0.7, to: 1, durationInFrames: 30, config: { damping: 20 } });

  const orbPulse = Math.sin(frame * 0.08) * 0.08 + 1;
  const orbOpacity = interpolate(frame, [0, 30], [0, 0.6], { extrapolateRight: "clamp" });

  const particles = Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * 360,
    delay: 5 + Math.floor(i / 4) * 2,
    speed: 1.8 + (i % 5) * 0.4,
    size: 4 + (i % 3) * 3,
    color: i % 3 === 0 ? colors.accentBright : i % 3 === 1 ? colors.cyan : colors.orange,
  }));

  return (
    <AbsoluteFill style={{ background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
          opacity: orbOpacity * orbPulse,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Orbiting rings */}
      <OrbRing radius={200} delay={10} clockwise={true} />
      <OrbRing radius={280} delay={15} clockwise={false} />
      <OrbRing radius={350} delay={20} clockwise={true} />

      {/* Particles burst */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />

      {/* Main content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: `${colors.accent}22`,
            border: `1px solid ${colors.accent}66`,
            borderRadius: 100,
            padding: "8px 20px",
            marginBottom: 32,
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.accentBright, boxShadow: `0 0 8px ${colors.accentBright}` }} />
          <span style={{ ...type.label, color: colors.accentBright, fontSize: 14 }}>Claude Code × Remotion</span>
        </div>

        {/* Hero title */}
        <div style={{ opacity: titleOpacity, transform: `scale(${titleScale})` }}>
          <div
            style={{
              ...type.hero,
              color: colors.textPrimary,
              background: `linear-gradient(135deg, #fff 0%, ${colors.accentBright} 50%, ${colors.cyan} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 0,
            }}
          >
            Code
          </div>
          <div
            style={{
              ...type.hero,
              color: colors.textPrimary,
              background: `linear-gradient(135deg, ${colors.cyan} 0%, #fff 60%, ${colors.accentBright} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginTop: -10,
            }}
          >
            Meets Video
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 24,
          }}
        >
          <p style={{ ...type.body, color: colors.textSecondary, maxWidth: 600, margin: "0 auto" }}>
            Motion graphics at the speed of thought — powered by React & Remotion
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
