import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { Flash } from "../../components/XiaoYiOverlay";

const PulseBtn: React.FC<{ emoji: string; label: string; color: string; delay: number }> = ({ emoji, label, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.3, to: 1, durationInFrames: 20, config: { damping: 6, stiffness: 400 } });
  const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const pulse = Math.sin((frame - delay) * 0.13) * 0.06 + 1;
  return (
    <div style={{
      opacity: op, transform: `scale(${s * pulse})`,
      flex: 1, textAlign: "center",
      background: `rgba(${color === xy.red ? "255,59,48" : "255,149,0"},0.2)`,
      border: `3px solid ${color}`,
      borderRadius: 28, padding: "28px 0",
      boxShadow: `0 0 ${50 * pulse}px ${color}88, inset 0 0 40px ${color}22`,
    }}>
      <div style={{ fontSize: 90, filter: `drop-shadow(0 0 20px ${color})`, lineHeight: 1 }}>{emoji}</div>
      <div style={{ ...xt.h2, color, fontSize: 52, marginTop: 10, textShadow: `0 0 20px ${color}` }}>{label}</div>
    </div>
  );
};

export const S15_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const textOp = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: xy.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 48px" }}>
      <Flash triggerFrame={0} color={xy.red} />

      <div style={{ opacity: textOp, textAlign: "center", marginBottom: 36 }}>
        <div style={{ ...xt.h2, color: xy.whiteMid, fontSize: 46 }}>怕以后找不到教程？</div>
        <div style={{ ...xt.h1, color: xy.white, fontSize: 68 }}>马上做这两件事</div>
      </div>

      <div style={{ display: "flex", gap: 24, width: "100%" }}>
        <PulseBtn emoji="👍" label="点赞" color={xy.red} delay={14} />
        <PulseBtn emoji="⭐" label="收藏" color={xy.orange} delay={26} />
      </div>

      {interpolate(frame, [48, 62], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
        <div style={{
          opacity: interpolate(frame, [48, 62], [0, 1], { extrapolateRight: "clamp" }),
          marginTop: 28, ...xt.body, color: xy.whiteMid, textAlign: "center", fontSize: 30,
        }}>
          收藏了随时能回来复习 👆
        </div>
      )}
    </AbsoluteFill>
  );
};
