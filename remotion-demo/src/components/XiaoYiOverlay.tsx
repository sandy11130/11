import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xf, xt } from "../xiaoyiStyles";

// ── Spring fly-in ──────────────────────────────────────────────────────────
export const FlyIn: React.FC<{
  delay?: number; from?: "left" | "right" | "bottom" | "top"; dist?: number;
  children: React.ReactNode; style?: React.CSSProperties;
}> = ({ delay = 0, from = "bottom", dist = 80, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0, to: 1, durationInFrames: 20, config: { damping: 16, stiffness: 200 } });
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const dx = from === "left" ? (1 - s) * -dist : from === "right" ? (1 - s) * dist : 0;
  const dy = from === "top" ? (1 - s) * -dist : from === "bottom" ? (1 - s) * dist : 0;
  return <div style={{ opacity: op, transform: `translate(${dx}px,${dy}px)`, ...style }}>{children}</div>;
};

// ── Pop + bounce ───────────────────────────────────────────────────────────
export const PopIn: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0, children, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.3, to: 1, durationInFrames: 18, config: { damping: 8, stiffness: 400 } });
  const op = interpolate(t, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return <div style={{ opacity: op, transform: `scale(${s})`, ...style }}>{children}</div>;
};

// ── Screen shake ───────────────────────────────────────────────────────────
export const useShake = (startFrame: number, duration = 12, intensity = 14) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;
  if (t < 0 || t > duration) return { x: 0, y: 0 };
  const decay = 1 - t / duration;
  return {
    x: Math.sin(t * 2.8) * intensity * decay,
    y: Math.cos(t * 3.1) * intensity * decay * 0.5,
  };
};

// ── Flash overlay ──────────────────────────────────────────────────────────
export const Flash: React.FC<{ triggerFrame: number; color?: string }> = ({ triggerFrame, color = "#ffffff" }) => {
  const frame = useCurrentFrame();
  const t = frame - triggerFrame;
  const op = interpolate(t, [0, 3, 14], [0.85, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (t < 0 || t > 14) return null;
  return <div style={{ position: "absolute", inset: 0, background: color, opacity: op, pointerEvents: "none" }} />;
};

// ── Count-up number ────────────────────────────────────────────────────────
export const CountUp: React.FC<{
  target: number; prefix?: string; suffix?: string; delay: number;
  color?: string; fontSize?: number;
}> = ({ target, prefix = "", suffix = "", delay, color = xy.white, fontSize = 160 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const val = Math.round(interpolate(t, [0, 50], [0, target], {
    extrapolateRight: "clamp",
    easing: (x) => 1 - Math.pow(1 - x, 4),
  }));
  const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <span style={{ ...xt.stat, color, opacity: op, fontSize }}>{prefix}{val.toLocaleString()}{suffix}</span>
  );
};

// ── Progress bar ───────────────────────────────────────────────────────────
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "rgba(255,255,255,0.1)", zIndex: 100 }}>
    <div style={{ height: "100%", width: `${progress * 100}%`, background: xy.red, borderRadius: "0 5px 5px 0" }} />
  </div>
);

// ── Logo badge ─────────────────────────────────────────────────────────────
export const LogoBadge: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const op = interpolate(t, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", top: 60, left: 40,
      display: "flex", alignItems: "center", gap: 12, opacity: op,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: xy.red,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, fontWeight: 900, color: xy.white, fontFamily: xf.sans,
        boxShadow: `0 0 20px ${xy.red}88`,
      }}>易</div>
      <span style={{ ...xt.sm, color: xy.white, fontSize: 26, fontWeight: 700, textShadow: `0 0 20px rgba(255,255,255,0.5)` }}>小易玩AI</span>
    </div>
  );
};

// ── Chapter lower-third ────────────────────────────────────────────────────
export const LowerThird: React.FC<{ title: string; chapterStart: number }> = ({ title, chapterStart }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - chapterStart);
  const x = interpolate(t, [0, 18], [-500, 0], { extrapolateRight: "clamp", easing: (v) => 1 - Math.pow(1 - v, 3) });
  const op = interpolate(t, [0, 10, 60, 80], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", bottom: 280, left: 0,
      opacity: op, transform: `translateX(${x}px)`,
      display: "flex", alignItems: "center",
    }}>
      <div style={{ width: 8, height: 56, background: xy.red, boxShadow: `0 0 16px ${xy.red}` }} />
      <div style={{
        background: xy.red, color: xy.white,
        padding: "12px 28px 12px 20px", borderRadius: "0 14px 14px 0",
        ...xt.h3, fontSize: 32,
        boxShadow: `0 0 30px ${xy.red}66`,
      }}>{title}</div>
    </div>
  );
};

// ── Bright card ────────────────────────────────────────────────────────────
export const BCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; glow?: string }> = ({
  children, style, glow = xy.red,
}) => (
  <div style={{
    background: "rgba(255,255,255,0.08)",
    border: `2px solid rgba(255,255,255,0.2)`,
    borderRadius: 24,
    padding: "24px 32px",
    boxShadow: `0 0 40px ${glow}44`,
    ...style,
  }}>{children}</div>
);
