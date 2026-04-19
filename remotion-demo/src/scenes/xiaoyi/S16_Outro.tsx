import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

export const S16_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, from: 0.4, to: 1, durationInFrames: 24, config: { damping: 12 } });
  const logoOp = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const glowPulse = Math.sin(frame * 0.1) * 0.2 + 1;

  return (
    <AbsoluteFill style={{ background: xy.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 120 }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: `radial-gradient(ellipse, ${xy.red}22 0%, transparent 65%)` }} />

      <div style={{ opacity: logoOp, transform: `scale(${logoS})`, textAlign: "center", marginBottom: 30 }}>
        <div style={{
          width: 110, height: 110, borderRadius: 28, background: xy.red, margin: "0 auto 16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 60,
          boxShadow: `0 0 ${50 * glowPulse}px ${xy.red}, 0 0 ${100 * glowPulse}px ${xy.red}44`,
        }}>🤖</div>
        <div style={{ ...xt.h1, color: xy.white, fontSize: 68, textShadow: `0 0 30px rgba(255,255,255,0.4)` }}>小易玩AI</div>
        <div style={{ ...xt.body, color: xy.whiteMid, marginTop: 10, fontSize: 32 }}>让普通人也能玩转 AI 工具</div>
      </div>

      <FlyIn delay={36} from="bottom">
        <div style={{
          background: xy.red, borderRadius: 20, padding: "20px 50px",
          textAlign: "center", width: "100%",
          boxShadow: `0 0 40px ${xy.red}88`,
        }}>
          <div style={{ ...xt.sm, color: "rgba(255,255,255,0.7)", marginBottom: 6, fontSize: 26 }}>下期预告</div>
          <div style={{ ...xt.h3, color: xy.white, fontSize: 38 }}>OpenClaw 接入飞书 + 微信</div>
        </div>
      </FlyIn>

      <FlyIn delay={52} from="bottom">
        <div style={{ ...xt.sm, color: xy.whiteMid, textAlign: "center", marginTop: 18, fontSize: 28 }}>
          关注账号 · 不错过每期教程 🔔
        </div>
      </FlyIn>
    </AbsoluteFill>
  );
};
