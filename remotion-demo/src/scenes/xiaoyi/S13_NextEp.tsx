import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

const AppIcon: React.FC<{ emoji: string; name: string; delay: number; color: string }> = ({ emoji, name, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.3, to: 1, durationInFrames: 20, config: { damping: 8, stiffness: 350 } });
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: op, transform: `scale(${s})`, textAlign: "center" }}>
      <div style={{ fontSize: 110, filter: `drop-shadow(0 0 30px ${color})`, lineHeight: 1 }}>{emoji}</div>
      <div style={{ ...xt.h3, color, fontSize: 38, marginTop: 10, textShadow: `0 0 16px ${color}` }}>{name}</div>
    </div>
  );
};

export const S13_NextEp: React.FC = () => (
  <AbsoluteFill style={{ background: xy.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 120 }}>
    <FlyIn delay={0} from="top">
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ background: xy.red, borderRadius: 100, padding: "10px 36px", display: "inline-block", marginBottom: 14, boxShadow: `0 0 24px ${xy.red}` }}>
          <span style={{ ...xt.sm, color: xy.white, fontSize: 28 }}>下期预告</span>
        </div>
        <div style={{ ...xt.h1, color: xy.white, fontSize: 64 }}>部署到手机上</div>
        <div style={{ ...xt.body, color: xy.whiteMid, marginTop: 10, fontSize: 34 }}>不用守着电脑，随时随地用 AI</div>
      </div>
    </FlyIn>
    <div style={{ display: "flex", gap: 80, justifyContent: "center" }}>
      <AppIcon emoji="💬" name="飞书" delay={22} color="#3370FF" />
      <AppIcon emoji="🟢" name="微信" delay={34} color={xy.green} />
    </div>
    <FlyIn delay={52} from="bottom">
      <div style={{ ...xt.h3, color: xy.red, marginTop: 28, fontSize: 38, textShadow: `0 0 20px ${xy.red}` }}>
        关注博主，下期继续教！🔔
      </div>
    </FlyIn>
  </AbsoluteFill>
);
