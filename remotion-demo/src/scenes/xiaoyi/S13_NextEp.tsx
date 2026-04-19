import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, PopIn } from "../../components/XiaoYiOverlay";

const AppIcon: React.FC<{ emoji: string; name: string; delay: number }> = ({ emoji, name, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.5, to: 1, durationInFrames: 22, config: { damping: 12, stiffness: 280 } });
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: op, transform: `scale(${s})`, textAlign: "center" }}>
      <div style={{
        width: 90, height: 90, borderRadius: 24,
        background: xy.white, fontSize: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        margin: "0 auto 10px",
      }}>{emoji}</div>
      <div style={{ ...xt.sm, color: xy.black, fontWeight: 700 }}>{name}</div>
    </div>
  );
};

export const S13_NextEp: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 60px", gap: 28,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ textAlign: "center" }}>
        <div style={{
          background: xy.red, color: xy.white, borderRadius: 100,
          padding: "8px 28px", display: "inline-block",
          ...xt.label, fontSize: 20, marginBottom: 14,
        }}>下期预告</div>
        <div style={{ ...xt.h1, color: xy.black, fontSize: 54 }}>
          部署到手机上
        </div>
        <div style={{ ...xt.body, color: xy.darkGray, marginTop: 8 }}>
          不用守着电脑，随时随地用 AI
        </div>
      </div>
    </FlyIn>

    <div style={{ display: "flex", gap: 48, justifyContent: "center" }}>
      <AppIcon emoji="💬" name="飞书" delay={22} />
      <AppIcon emoji="🟢" name="微信" delay={34} />
    </div>

    <FlyIn delay={50} from="bottom">
      <div style={{
        background: xy.redLight, borderRadius: 18,
        padding: "18px 36px", textAlign: "center",
        borderLeft: `6px solid ${xy.red}`,
      }}>
        <div style={{ ...xt.body, color: xy.red, fontWeight: 700 }}>
          关注博主，下期继续教！
        </div>
      </div>
    </FlyIn>
  </div>
);
