import { useCurrentFrame, interpolate } from "remotion";
import { xy, xt, xf } from "../../xiaoyiStyles";
import { FlyIn, Card } from "../../components/XiaoYiOverlay";

const CodeLine: React.FC<{ code: string; highlight?: boolean; delay: number }> = ({ code, highlight, delay }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const op = interpolate(t, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(t, [0, 14], [-20, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{
      opacity: op, transform: `translateX(${x}px)`,
      background: highlight ? `${xy.yellow}55` : "transparent",
      borderRadius: 8, padding: "6px 12px",
      borderLeft: highlight ? `4px solid ${xy.orange}` : "4px solid transparent",
      fontFamily: xf.black, fontSize: 20, color: highlight ? xy.black : xy.darkGray,
      fontWeight: highlight ? 700 : 500,
      marginBottom: 4,
    }}>
      {highlight && <span style={{ color: xy.orange, marginRight: 8 }}>▶</span>}
      {code}
    </div>
  );
};

export const S10_Step2: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 56px", gap: 22,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: xy.orange, color: xy.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          ...xt.h2, fontSize: 28,
        }}>2</div>
        <div style={{ ...xt.h1, color: xy.orange, fontSize: 52 }}>配置环境</div>
      </div>
    </FlyIn>

    <FlyIn delay={12} from="left" style={{ width: "100%" }}>
      <div style={{
        background: "#1E1E2E", borderRadius: 20,
        padding: "20px 24px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}>
        <div style={{ ...xt.label, color: "#888", marginBottom: 12, fontSize: 16 }}>
          📋 复制粘贴这几行（不用理解）
        </div>
        <CodeLine code="cd Desktop" delay={20} />
        <CodeLine code='set API_KEY="你的key粘贴这里"' highlight delay={28} />
        <CodeLine code="openclaw start" delay={36} />
      </div>
    </FlyIn>

    <FlyIn delay={50} from="bottom">
      <div style={{
        background: xy.orangeLight, borderRadius: 14, padding: "14px 28px",
        display: "flex", alignItems: "center", gap: 12, width: "100%",
      }}>
        <span style={{ fontSize: 28 }}>💡</span>
        <span style={{ ...xt.sm, color: xy.orange, fontWeight: 700 }}>
          API Key 在视频中教你怎么申请
        </span>
      </div>
    </FlyIn>
  </div>
);
