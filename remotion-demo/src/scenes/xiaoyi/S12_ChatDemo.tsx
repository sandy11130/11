import { useCurrentFrame, interpolate } from "remotion";
import { xy, xt, xf } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

const Bubble: React.FC<{ text: string; isUser: boolean; delay: number }> = ({ text, isUser, delay }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(t, [0, 16], [isUser ? 40 : -40, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      opacity: op, transform: `translateX(${x}px)`,
      width: "100%",
    }}>
      {!isUser && (
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: xy.red, color: xy.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 900, marginRight: 10, flexShrink: 0, alignSelf: "flex-end",
        }}>AI</div>
      )}
      <div style={{
        background: isUser ? xy.red : xy.white,
        color: isUser ? xy.white : xy.black,
        borderRadius: isUser ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
        padding: "14px 20px",
        maxWidth: "78%",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        ...xt.sm, fontSize: 22,
      }}>{text}</div>
    </div>
  );
};

export const S12_ChatDemo: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 48px", gap: 16,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ ...xt.h2, color: xy.black, textAlign: "center", marginBottom: 8 }}>
        🤖 效果展示
      </div>
    </FlyIn>

    <div style={{
      background: xy.gray, borderRadius: 24, padding: "24px 20px",
      width: "100%", display: "flex", flexDirection: "column", gap: 14,
    }}>
      <Bubble text="帮我写一封请假邮件" isUser delay={8} />
      <Bubble text="好的！以下是一封正式的请假邮件模板：尊敬的领导，您好！..." isUser={false} delay={22} />
      <Bubble text="太好了！帮我翻译成英文" isUser delay={48} />
      <Bubble text="Dear Manager, I would like to request a leave of absence..." isUser={false} delay={60} />
    </div>

    <FlyIn delay={72} from="bottom">
      <div style={{ ...xt.sm, color: xy.darkGray, textAlign: "center" }}>
        ⚡ 秒回复 · 本地运行 · 数据不上传
      </div>
    </FlyIn>
  </div>
);
