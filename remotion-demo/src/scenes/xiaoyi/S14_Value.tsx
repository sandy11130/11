import { useCurrentFrame, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

const HighlightWord: React.FC<{ text: string; delay: number; color?: string }> = ({
  text, delay, color = xy.red,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const w = interpolate(t, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <span style={{ position: "relative", display: "inline-block", opacity: op }}>
      <span style={{ position: "relative", zIndex: 1, color: xy.white, fontWeight: 900 }}>{text}</span>
      <span style={{
        position: "absolute", left: 0, bottom: 0, top: 0,
        width: `${w * 100}%`, background: color, borderRadius: 8, zIndex: 0,
        paddingLeft: 8, paddingRight: 8,
      }} />
    </span>
  );
};

export const S14_Value: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 60px", gap: 20,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ ...xt.label, color: xy.darkGray, textAlign: "center" }}>
        记住这句话
      </div>
    </FlyIn>

    <div style={{ textAlign: "center", lineHeight: 1.4 }}>
      <div style={{ ...xt.h1, color: xy.black, fontSize: 52 }}>
        <HighlightWord text="普通人" delay={10} color={xy.red} />
        {" "}也能
      </div>
      <div style={{ ...xt.h1, color: xy.black, fontSize: 52, marginTop: 6 }}>
        用上{" "}
        <HighlightWord text="AI 助手" delay={25} color={xy.orange} />
      </div>
    </div>

    <FlyIn delay={42} from="bottom">
      <div style={{
        background: xy.gray, borderRadius: 20,
        padding: "20px 36px", textAlign: "center",
        width: "100%",
      }}>
        {["不需要懂技术", "不需要买 Mac", "不需要很有钱"].map((txt, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            justifyContent: "center", marginBottom: i < 2 ? 10 : 0,
          }}>
            <span style={{ color: xy.green, fontSize: 24, fontWeight: 900 }}>✓</span>
            <span style={{ ...xt.body, color: xy.black }}>{txt}</span>
          </div>
        ))}
      </div>
    </FlyIn>
  </div>
);
