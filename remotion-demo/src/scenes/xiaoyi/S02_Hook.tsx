import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, CountUp } from "../../components/XiaoYiOverlay";

export const S02_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 18, config: { damping: 16 } });
  const labelOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const strikeW = interpolate(frame, [55, 72], [0, 520], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: xy.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 180 }}>

      {/* Red glow pool at bottom */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 900, height: 300, background: `radial-gradient(ellipse, ${xy.red}33 0%, transparent 70%)` }} />

      <div style={{ textAlign: "center" }}>
        <div style={{ opacity: labelOp, transform: `translateY(${labelY}px)` }}>
          <span style={{ ...xt.h2, color: xy.whiteMid, fontSize: 46 }}>今天帮你省下</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, marginTop: 10 }}>
          <CountUp target={200} prefix="¥" delay={12} color={xy.red} fontSize={150} />
          <span style={{ ...xt.h1, color: xy.white, fontSize: 80, marginBottom: 20 }}>~</span>
          <CountUp target={500} suffix="元" delay={12} color={xy.red} fontSize={150} />
        </div>

        {/* Strikethrough */}
        <div style={{ position: "relative", display: "inline-block", marginTop: 16 }}>
          <FlyIn delay={38} from="bottom">
            <span style={{ ...xt.body, color: xy.whiteMid, fontSize: 38 }}>找人上门安装的价格</span>
          </FlyIn>
          <div style={{
            position: "absolute", top: "50%", left: 0,
            width: strikeW, height: 5,
            background: xy.red, borderRadius: 3,
            boxShadow: `0 0 12px ${xy.red}`,
            transform: "translateY(-50%)",
          }} />
        </div>

        <FlyIn delay={75} from="bottom">
          <div style={{ ...xt.h3, color: xy.yellow, marginTop: 20, fontSize: 38, textShadow: `0 0 20px ${xy.yellow}` }}>
            一定要点赞收藏！
          </div>
        </FlyIn>
      </div>
    </AbsoluteFill>
  );
};
