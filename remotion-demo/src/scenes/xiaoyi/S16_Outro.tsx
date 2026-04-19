import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, DrawLine } from "../../components/XiaoYiOverlay";

export const S16_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, from: 0.6, to: 1, durationInFrames: 28, config: { damping: 14 } });
  const logoOp = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 60px", gap: 24,
    }}>
      {/* Channel logo */}
      <div style={{ opacity: logoOp, transform: `scale(${logoScale})`, textAlign: "center" }}>
        <div style={{
          width: 100, height: 100, borderRadius: 28,
          background: xy.red, margin: "0 auto 16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 12px 40px rgba(232,34,10,0.35)",
          fontSize: 52,
        }}>🤖</div>
        <div style={{ ...xt.h1, color: xy.black, fontSize: 56 }}>小易玩AI</div>
        <FlyIn delay={20} from="bottom">
          <DrawLine delay={20} width={200} />
        </FlyIn>
        <FlyIn delay={28} from="bottom">
          <div style={{ ...xt.body, color: xy.darkGray, marginTop: 12 }}>
            让普通人也能玩转 AI 工具
          </div>
        </FlyIn>
      </div>

      <FlyIn delay={38} from="bottom">
        <div style={{
          background: xy.red, borderRadius: 20,
          padding: "18px 40px", textAlign: "center",
          boxShadow: "0 8px 32px rgba(232,34,10,0.3)",
          width: "100%",
        }}>
          <div style={{ ...xt.label, color: "rgba(255,255,255,0.75)", marginBottom: 6 }}>下期预告</div>
          <div style={{ ...xt.h3, color: xy.white }}>
            OpenClaw 接入飞书 + 微信 教程
          </div>
        </div>
      </FlyIn>

      <FlyIn delay={52} from="bottom">
        <div style={{ ...xt.sm, color: xy.darkGray, textAlign: "center" }}>
          关注账号 · 不错过每期教程
        </div>
      </FlyIn>
    </div>
  );
};
