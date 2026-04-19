import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { Flash } from "../../components/XiaoYiOverlay";

const KineticWord: React.FC<{ word: string; delay: number; color: string; size?: number }> = ({ word, delay, color, size = 96 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.2, to: 1, durationInFrames: 16, config: { damping: 7, stiffness: 420 } });
  const op = interpolate(t, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <span style={{
      display: "inline-block",
      opacity: op,
      transform: `scale(${s})`,
      color,
      fontSize: size,
      fontWeight: 900,
      textShadow: `0 0 40px ${color}`,
      letterSpacing: "-0.03em",
      lineHeight: 1.15,
    }}>{word}</span>
  );
};

export const S14_Value: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: xy.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Flash triggerFrame={0} color="#ffffff" />

      <div style={{ textAlign: "center", lineHeight: 1.2 }}>
        <div style={{ marginBottom: 12 }}>
          <KineticWord word="普通人" delay={6} color={xy.white} size={110} />
          <KineticWord word=" 也能" delay={18} color={xy.whiteMid} size={80} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <KineticWord word="用上" delay={30} color={xy.white} size={100} />
          <KineticWord word=" AI助手" delay={40} color={xy.red} size={110} />
        </div>
        <div>
          <KineticWord word="不花" delay={54} color={xy.whiteMid} size={72} />
          <KineticWord word=" 一分冤枉钱" delay={62} color={xy.yellow} size={72} />
        </div>
      </div>

      {/* Bottom checklist */}
      {[
        { text: "不需要懂技术", delay: 80 },
        { text: "不需要买 Mac", delay: 90 },
        { text: "跟着做就会", delay: 100 },
      ].map(({ text, delay }) => {
        const op = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateRight: "clamp" });
        const x = interpolate(frame, [delay, delay + 14], [-30, 0], { extrapolateRight: "clamp" });
        return (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 14, opacity: op, transform: `translateX(${x}px)`, marginTop: 14 }}>
            <span style={{ color: xy.green, fontSize: 36, filter: `drop-shadow(0 0 10px ${xy.green})` }}>✓</span>
            <span style={{ ...xt.h3, color: xy.white, fontSize: 40 }}>{text}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
