import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mc } from "./styles";

// Animated particle grid + glow
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Moving grid
  const gridOffset = (frame * 0.4) % 60;

  // Particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: ((i * 137.5 + frame * (0.1 + (i % 5) * 0.06)) % 100),
    y: ((i * 97.3 + frame * (0.08 + (i % 4) * 0.05)) % 100),
    size: 1.5 + (i % 4) * 1,
    opacity: 0.2 + (i % 3) * 0.15,
  }));

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${mc.bgGrad} 0%, ${mc.bg} 60%)` }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(${mc.gridLine} 1px, transparent 1px),
          linear-gradient(90deg, ${mc.gridLine} 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: `0 ${gridOffset}px`,
        opacity: 0.8,
      }} />

      {/* Particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: mc.cyan,
          boxShadow: `0 0 ${p.size * 3}px ${mc.cyan}`,
          opacity: p.opacity,
        }} />
      ))}

      {/* Corner glow top-left */}
      <div style={{
        position: "absolute", top: -100, left: -100,
        width: 500, height: 500,
        background: `radial-gradient(circle, ${mc.cyanGlow} 0%, transparent 65%)`,
      }} />

      {/* Center ambient glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900, height: 900,
        background: `radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 65%)`,
      }} />

      {/* Bottom glow */}
      <div style={{
        position: "absolute", bottom: -50, right: -50,
        width: 400, height: 400,
        background: `radial-gradient(circle, ${mc.cyanGlow} 0%, transparent 65%)`,
      }} />
    </AbsoluteFill>
  );
};

// Scanning line that sweeps periodically
export const ScanLine: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const frame = useCurrentFrame();
  const t = frame - triggerFrame;
  if (t < 0 || t > 40) return null;
  const y = (t / 40) * 100;
  const op = t < 5 ? t / 5 : t > 35 ? (40 - t) / 5 : 1;
  return (
    <div style={{
      position: "absolute", left: 0, right: 0,
      top: `${y}%`, height: 2,
      background: `linear-gradient(90deg, transparent, ${mc.cyan}, transparent)`,
      boxShadow: `0 0 20px ${mc.cyan}`,
      opacity: op * 0.7,
    }} />
  );
};

// HUD corner brackets
export const HudCorners: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const size = 40, thick = 3;
  const corner = (top: boolean, left: boolean) => ({
    position: "absolute" as const,
    width: size, height: size,
    top: top ? 50 : undefined, bottom: top ? undefined : 50,
    left: left ? 40 : undefined, right: left ? undefined : 40,
    borderTop: top ? `${thick}px solid ${mc.cyan}` : "none",
    borderBottom: top ? "none" : `${thick}px solid ${mc.cyan}`,
    borderLeft: left ? `${thick}px solid ${mc.cyan}` : "none",
    borderRight: left ? "none" : `${thick}px solid ${mc.cyan}`,
    boxShadow: `0 0 10px ${mc.cyan}55`,
  });
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <div style={corner(true, true)} />
      <div style={corner(true, false)} />
      <div style={corner(false, true)} />
      <div style={corner(false, false)} />
    </div>
  );
};
