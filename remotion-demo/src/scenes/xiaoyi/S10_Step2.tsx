import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { xy, xt, xf } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

const CodeRow: React.FC<{ code: string; highlight?: boolean; delay: number }> = ({ code, highlight, delay }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(t, [0, 12], [-24, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{
      opacity: op, transform: `translateX(${x}px)`,
      background: highlight ? `rgba(255,149,0,0.2)` : "transparent",
      borderLeft: highlight ? `4px solid ${xy.orange}` : "4px solid transparent",
      borderRadius: 8, padding: "8px 14px", marginBottom: 6,
      fontFamily: xf.sans, fontSize: 28,
      color: highlight ? xy.orange : "rgba(255,255,255,0.7)",
      fontWeight: highlight ? 700 : 500,
      boxShadow: highlight ? `0 0 16px ${xy.orange}44` : "none",
    }}>
      {highlight && <span style={{ marginRight: 10, color: xy.orange }}>▶</span>}
      {code}
    </div>
  );
};

export const S10_Step2: React.FC = () => (
  <AbsoluteFill style={{
    background: xy.bg, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "flex-end", paddingBottom: 100,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: xy.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: xy.bg, boxShadow: `0 0 24px ${xy.orange}` }}>2</div>
        <span style={{ ...xt.h1, color: xy.orange, fontSize: 62, textShadow: `0 0 24px ${xy.orange}` }}>配置环境</span>
      </div>
    </FlyIn>

    <FlyIn delay={12} from="bottom" style={{ width: "100%", padding: "0 48px" }}>
      <div style={{ background: "#0d0d0d", border: `2px solid rgba(255,255,255,0.12)`, borderRadius: 20, padding: "24px 28px", boxShadow: `0 0 40px ${xy.orange}33` }}>
        <div style={{ ...xt.sm, color: "rgba(255,255,255,0.4)", marginBottom: 16, fontSize: 24 }}>📋 复制这几行（不用理解）</div>
        <CodeRow code="cd Desktop" delay={20} />
        <CodeRow code='set API_KEY="你的key粘贴这里"' highlight delay={30} />
        <CodeRow code="openclaw start" delay={40} />
      </div>
    </FlyIn>

    <FlyIn delay={55} from="bottom">
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18,
        background: "rgba(255,149,0,0.15)", border: `2px solid ${xy.orange}`,
        borderRadius: 14, padding: "14px 30px", boxShadow: `0 0 20px ${xy.orange}44` }}>
        <span style={{ fontSize: 36 }}>💡</span>
        <span style={{ ...xt.sm, color: xy.orange, fontSize: 30 }}>API Key 在视频里教你申请</span>
      </div>
    </FlyIn>
  </AbsoluteFill>
);
