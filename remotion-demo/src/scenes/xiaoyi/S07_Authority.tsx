import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { CountUp, FlyIn } from "../../components/XiaoYiOverlay";

export const S07_Authority: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -40, to: 0, durationInFrames: 18, config: { damping: 16 } });

  return (
    <AbsoluteFill style={{
      background: xy.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-end", paddingBottom: 140,
    }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 1000, height: 500, background: `radial-gradient(ellipse, ${xy.orange}22 0%, transparent 65%)` }} />

      <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 30, textAlign: "center" }}>
        <span style={{ ...xt.h2, color: xy.whiteMid, fontSize: 46 }}>博主帮你踩完了坑</span>
      </div>

      <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", gap: 60 }}>
        <div style={{ textAlign: "center" }}>
          <CountUp target={108} delay={14} color={xy.orange} fontSize={170} />
          <div style={{ ...xt.h3, color: xy.white, fontSize: 42, marginTop: 4 }}>小时整理</div>
        </div>
        <div style={{ width: 3, height: 200, background: "rgba(255,255,255,0.15)" }} />
        <div style={{ textAlign: "center" }}>
          <CountUp target={30} suffix="+" delay={22} color={xy.yellow} fontSize={170} />
          <div style={{ ...xt.h3, color: xy.white, fontSize: 42, marginTop: 4 }}>篇教程参考</div>
        </div>
      </div>

      <FlyIn delay={68} from="bottom">
        <div style={{
          background: xy.redDim, border: `2px solid ${xy.red}`,
          borderRadius: 16, padding: "16px 44px", marginTop: 28,
          boxShadow: `0 0 24px ${xy.red}55`,
        }}>
          <span style={{ ...xt.body, color: xy.red, fontSize: 36 }}>踩完坑才敢发出来 🔥</span>
        </div>
      </FlyIn>
    </AbsoluteFill>
  );
};
