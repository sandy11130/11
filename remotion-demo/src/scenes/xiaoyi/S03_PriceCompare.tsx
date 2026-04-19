import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { Flash, useShake } from "../../components/XiaoYiOverlay";

const BigIcon: React.FC<{ icon: string; label: string; sub: string; color: string; delay: number; from: "left" | "right" }> = ({
  icon, label, sub, color, delay, from,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const x = interpolate(t, [0, 22], [from === "left" ? -400 : 400, 0], {
    extrapolateRight: "clamp", easing: (v) => 1 - Math.pow(1 - v, 3),
  });
  const op = interpolate(t, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const rot = spring({ frame: t, fps, from: from === "left" ? -12 : 12, to: 0, durationInFrames: 24, config: { damping: 14 } });

  return (
    <div style={{ opacity: op, transform: `translateX(${x}px) rotate(${rot}deg)`, flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 120, lineHeight: 1, filter: `drop-shadow(0 0 30px ${color})` }}>{icon}</div>
      <div style={{ ...xt.h1, color, fontSize: 72, marginTop: 8, textShadow: `0 0 30px ${color}` }}>{label}</div>
      <div style={{ ...xt.body, color: xy.whiteMid, marginTop: 6, fontSize: 32 }}>{sub}</div>
    </div>
  );
};

export const S03_PriceCompare: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = useShake(8, 12, 20);
  const vsScale = spring({ frame: Math.max(0, frame - 30), fps: 30, from: 0, to: 1, durationInFrames: 16, config: { damping: 8, stiffness: 400 } });
  const vsOp = interpolate(frame, [30, 40], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      background: xy.bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transform: `translate(${shake.x}px,${shake.y}px)`,
    }}>
      <Flash triggerFrame={6} color={xy.red} />

      <div style={{ ...xt.h2, color: xy.white, marginBottom: 50, fontSize: 54 }}>安装方式对比</div>

      <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "0 40px" }}>
        <BigIcon icon="❌" label="¥500" sub="找人上门" color={xy.red} delay={8} from="left" />
        <div style={{ opacity: vsOp, transform: `scale(${vsScale})`, textAlign: "center", padding: "0 20px" }}>
          <div style={{ ...xt.h1, color: xy.white, fontSize: 60 }}>VS</div>
        </div>
        <BigIcon icon="✅" label="¥0" sub="跟着教程装" color={xy.green} delay={20} from="right" />
      </div>

      <div style={{ marginTop: 50 }}>
        {interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp" }) > 0 && (
          <div style={{
            opacity: interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${spring({ frame: Math.max(0, frame - 55), fps: 30, from: 0.5, to: 1, durationInFrames: 18, config: { damping: 10 } })})`,
            background: xy.green, borderRadius: 100,
            padding: "16px 48px",
            boxShadow: `0 0 40px ${xy.green}88`,
          }}>
            <span style={{ ...xt.h3, color: xy.bg, fontSize: 40 }}>省下几百块 💪</span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
