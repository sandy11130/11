import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, PopIn } from "../../components/XiaoYiOverlay";

const CTAButton: React.FC<{ emoji: string; text: string; delay: number; color: string }> = ({
  emoji, text, delay, color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const bounce = spring({ frame: t, fps, from: 0.5, to: 1, durationInFrames: 20, config: { damping: 8, stiffness: 350 } });
  const wobble = Math.sin(frame * 0.12 + delay) * 2;
  const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{
      opacity: op,
      transform: `scale(${bounce}) rotate(${wobble}deg)`,
      background: color, borderRadius: 24,
      padding: "22px 0", flex: 1, textAlign: "center",
      boxShadow: `0 8px 32px ${color}55`,
    }}>
      <div style={{ fontSize: 52 }}>{emoji}</div>
      <div style={{ ...xt.h3, color: xy.white, marginTop: 8, fontSize: 28 }}>{text}</div>
    </div>
  );
};

export const S15_CTA: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 48px", gap: 24,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ textAlign: "center" }}>
        <div style={{ ...xt.h2, color: xy.black }}>怕以后找不到教程？</div>
        <div style={{ ...xt.h1, color: xy.red, fontSize: 54 }}>马上做这两件事</div>
      </div>
    </FlyIn>

    <div style={{ display: "flex", gap: 20, width: "100%" }}>
      <CTAButton emoji="👍" text="点赞" delay={16} color={xy.red} />
      <CTAButton emoji="⭐" text="收藏" delay={28} color={xy.orange} />
    </div>

    <FlyIn delay={44} from="bottom">
      <div style={{
        background: xy.gray, borderRadius: 18, padding: "18px 32px",
        width: "100%", textAlign: "center",
      }}>
        <div style={{ ...xt.body, color: xy.darkGray }}>
          收藏了随时能回来复习 · 安装遇到问题评论区见
        </div>
      </div>
    </FlyIn>
  </div>
);
