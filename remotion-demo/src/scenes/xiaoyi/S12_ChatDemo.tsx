import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

const Bubble: React.FC<{ text: string; isUser: boolean; delay: number }> = ({ text, isUser, delay }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(t, [0, 14], [isUser ? 50 : -50, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", opacity: op, transform: `translateX(${x}px)`, width: "100%", marginBottom: 14 }}>
      {!isUser && (
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: xy.red, color: xy.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, marginRight: 12, flexShrink: 0, alignSelf: "flex-end", boxShadow: `0 0 16px ${xy.red}` }}>AI</div>
      )}
      <div style={{
        background: isUser ? xy.red : "rgba(255,255,255,0.12)",
        color: xy.white,
        borderRadius: isUser ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
        padding: "14px 22px", maxWidth: "78%",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.2)",
        boxShadow: isUser ? `0 0 20px ${xy.red}66` : "none",
        ...xt.sm, fontSize: 28,
      }}>{text}</div>
    </div>
  );
};

export const S12_ChatDemo: React.FC = () => (
  <AbsoluteFill style={{ background: xy.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 80 }}>
    <FlyIn delay={0} from="top">
      <div style={{ ...xt.h2, color: xy.white, textAlign: "center", marginBottom: 24, fontSize: 50 }}>🤖 效果展示</div>
    </FlyIn>
    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 24, width: "100%", padding: "24px 40px", border: "1px solid rgba(255,255,255,0.1)" }}>
      <Bubble text="帮我写一封请假邮件" isUser delay={10} />
      <Bubble text="好的！以下是请假邮件：尊敬的领导..." isUser={false} delay={26} />
      <Bubble text="帮我翻译成英文" isUser delay={52} />
      <Bubble text="Dear Manager, I would like to request..." isUser={false} delay={66} />
    </div>
    <FlyIn delay={80} from="bottom">
      <div style={{ ...xt.sm, color: xy.green, textAlign: "center", marginTop: 16, fontSize: 30, textShadow: `0 0 16px ${xy.green}` }}>
        ⚡ 秒回复 · 本地运行 · 数据不上传
      </div>
    </FlyIn>
  </AbsoluteFill>
);
