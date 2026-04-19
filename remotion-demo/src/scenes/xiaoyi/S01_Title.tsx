import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { Flash, useShake } from "../../components/XiaoYiOverlay";

export const S01_Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shake = useShake(2, 10, 18);

  // Title slams in
  const titleScale = spring({ frame, fps, from: 3, to: 1, durationInFrames: 22, config: { damping: 14, stiffness: 180 } });
  const titleOp = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // Red line draws
  const lineW = interpolate(frame, [18, 36], [0, 700], { extrapolateRight: "clamp" });

  // Subtitle rises
  const subY = spring({ frame: Math.max(0, frame - 25), fps, from: 60, to: 0, durationInFrames: 22, config: { damping: 16 } });
  const subOp = interpolate(frame, [25, 38], [0, 1], { extrapolateRight: "clamp" });

  // Badge
  const badgeS = spring({ frame: Math.max(0, frame - 42), fps, from: 0, to: 1, durationInFrames: 18, config: { damping: 10, stiffness: 350 } });
  const badgeOp = interpolate(frame, [42, 52], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: xy.bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transform: `translate(${shake.x}px, ${shake.y}px)`,
    }}>
      <Flash triggerFrame={0} color={xy.red} />

      {/* Glow behind title */}
      <div style={{
        position: "absolute",
        width: 800, height: 400,
        background: `radial-gradient(ellipse, ${xy.red}44 0%, transparent 70%)`,
        top: "35%", left: "50%", transform: "translate(-50%,-50%)",
      }} />

      <div style={{ opacity: titleOp, transform: `scale(${titleScale})`, textAlign: "center" }}>
        <div style={{ ...xt.hero, color: xy.white, fontSize: 108, textShadow: `0 0 60px rgba(255,255,255,0.4)` }}>
          OpenClaw
        </div>
        <div style={{ ...xt.hero, color: xy.red, fontSize: 108, textShadow: `0 0 60px ${xy.red}` }}>
          小白安装指南
        </div>
      </div>

      {/* Red line */}
      <div style={{ width: lineW, height: 6, background: xy.red, borderRadius: 3, marginTop: 20, boxShadow: `0 0 20px ${xy.red}` }} />

      {/* Subtitle */}
      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, marginTop: 24, textAlign: "center" }}>
        <div style={{ ...xt.body, color: xy.whiteMid, fontSize: 34 }}>
          Windows 也能跑 · 跟着做就会
        </div>
      </div>

      {/* Badge */}
      <div style={{
        opacity: badgeOp, transform: `scale(${badgeS})`, marginTop: 32,
        background: xy.red, borderRadius: 100, padding: "12px 36px",
        boxShadow: `0 0 30px ${xy.red}`,
      }}>
        <span style={{ ...xt.sm, color: xy.white, fontSize: 28 }}>📱 小白也能学会</span>
      </div>
    </AbsoluteFill>
  );
};
