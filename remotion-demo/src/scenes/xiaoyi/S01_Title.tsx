import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { xy, xt, xf } from "../../xiaoyiStyles";
import { FlyIn, PopIn, DrawLine } from "../../components/XiaoYiOverlay";

export const S01_Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgScale = spring({ frame, fps, from: 1.15, to: 1, durationInFrames: 35, config: { damping: 22 } });
  const bgOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 60px", transform: `scale(${bgScale})`, opacity: bgOp,
    }}>
      {/* Top label */}
      <FlyIn delay={5} from="top">
        <div style={{
          background: xy.red, color: xy.white, borderRadius: 100,
          padding: "10px 32px", marginBottom: 28,
          ...xt.label, fontSize: 22,
        }}>
          📱 小白也能学会
        </div>
      </FlyIn>

      {/* Main title */}
      <PopIn delay={12}>
        <div style={{ textAlign: "center" }}>
          <div style={{ ...xt.hero, color: xy.black, fontSize: 76 }}>OpenClaw</div>
          <div style={{ ...xt.hero, color: xy.red, fontSize: 76 }}>小白安装指南</div>
        </div>
      </PopIn>

      <FlyIn delay={28} from="bottom">
        <DrawLine delay={28} width={340} />
      </FlyIn>

      <FlyIn delay={35} from="bottom">
        <div style={{ ...xt.body, color: xy.darkGray, marginTop: 20, textAlign: "center" }}>
          Windows 也能跑 · 跟着做就会
        </div>
      </FlyIn>
    </div>
  );
};
