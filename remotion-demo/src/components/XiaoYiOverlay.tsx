import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { xy, xf, xt } from "../xiaoyiStyles";

// ─── Reusable primitives ────────────────────────────────────────────────────

export const FlyIn: React.FC<{
  delay?: number; from?: "left" | "right" | "bottom" | "top"; dist?: number;
  children: React.ReactNode; style?: React.CSSProperties;
}> = ({ delay = 0, from = "bottom", dist = 60, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0, to: 1, durationInFrames: 22, config: { damping: 18 } });
  const op = interpolate(t, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const dx = from === "left" ? (1 - s) * -dist : from === "right" ? (1 - s) * dist : 0;
  const dy = from === "top" ? (1 - s) * -dist : from === "bottom" ? (1 - s) * dist : 0;
  return (
    <div style={{ opacity: op, transform: `translate(${dx}px,${dy}px)`, ...style }}>
      {children}
    </div>
  );
};

export const PopIn: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0, children, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.5, to: 1, durationInFrames: 20, config: { damping: 12, stiffness: 300 } });
  const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return <div style={{ opacity: op, transform: `scale(${s})`, ...style }}>{children}</div>;
};

export const DrawLine: React.FC<{ delay?: number; color?: string; width?: number }> = ({
  delay = 0, color = xy.red, width = 400,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const w = interpolate(t, [0, 20], [0, width], { extrapolateRight: "clamp" });
  return <div style={{ height: 5, width: w, background: color, borderRadius: 3 }} />;
};

// Red highlight chip
export const Chip: React.FC<{ children: React.ReactNode; color?: string; textColor?: string }> = ({
  children, color = xy.red, textColor = xy.white,
}) => (
  <span style={{
    display: "inline-block", background: color, color: textColor,
    borderRadius: 10, padding: "4px 18px",
    ...xt.h2, fontSize: 44, fontWeight: 900,
  }}>
    {children}
  </span>
);

// Card with white background
export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; accent?: string }> = ({
  children, style, accent = xy.red,
}) => (
  <div style={{
    background: xy.cardBg,
    borderRadius: 24,
    padding: "28px 36px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
    borderLeft: `8px solid ${accent}`,
    ...style,
  }}>
    {children}
  </div>
);

// Lower third chapter title bar
export const LowerThird: React.FC<{ title: string; delay?: number }> = ({ title, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const x = interpolate(t, [0, 18], [-600, 0], { extrapolateRight: "clamp", easing: (v) => 1 - Math.pow(1 - v, 3) });
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", bottom: 260, left: 0,
      opacity: op, transform: `translateX(${x}px)`,
      display: "flex", alignItems: "center",
    }}>
      <div style={{ width: 8, height: 52, background: xy.red, borderRadius: "0 4px 4px 0", marginRight: 0 }} />
      <div style={{
        background: xy.red, color: xy.white,
        padding: "10px 28px 10px 20px",
        borderRadius: "0 12px 12px 0",
        ...xt.h3, fontSize: 30,
      }}>
        {title}
      </div>
    </div>
  );
};

// Top progress bar
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "rgba(0,0,0,0.12)", zIndex: 100 }}>
    <div style={{ height: "100%", width: `${progress * 100}%`, background: xy.red, borderRadius: "0 4px 4px 0",
      transition: "width 0.1s" }} />
  </div>
);

// Channel logo badge (top-left)
export const LogoBadge: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const op = interpolate(t, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", top: 60, left: 40,
      display: "flex", alignItems: "center", gap: 10,
      opacity: op,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: xy.red, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: xy.white, fontSize: 22, fontWeight: 900, fontFamily: xf.black }}>易</span>
      </div>
      <span style={{ ...xt.label, color: xy.black, fontSize: 20 }}>小易玩AI</span>
    </div>
  );
};

// Strikethrough red X card
export const CrossCard: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative", opacity: op }}>
      {children}
      <div style={{
        position: "absolute", top: "50%", left: -10, right: -10, height: 6,
        background: xy.red, borderRadius: 3,
        transform: "translateY(-50%) rotate(-8deg)",
      }} />
      <div style={{
        position: "absolute", top: 8, right: 8,
        width: 36, height: 36, borderRadius: "50%",
        background: xy.red, color: xy.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, fontWeight: 900,
      }}>✕</div>
    </div>
  );
};

// Check card
export const CheckCard: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.7, to: 1, durationInFrames: 18, config: { damping: 14 } });
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: op, transform: `scale(${s})`, position: "relative" }}>
      {children}
      <div style={{
        position: "absolute", top: 8, right: 8,
        width: 36, height: 36, borderRadius: "50%",
        background: xy.green, color: xy.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, fontWeight: 900,
      }}>✓</div>
    </div>
  );
};
