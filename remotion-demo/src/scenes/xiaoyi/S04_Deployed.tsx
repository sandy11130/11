import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, CountUp } from "../../components/XiaoYiOverlay";

const CheckRow: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.5, to: 1, durationInFrames: 16, config: { damping: 12, stiffness: 300 } });
  const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: op, transform: `scale(${s})`, display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
      <span style={{ fontSize: 44, filter: `drop-shadow(0 0 12px ${xy.green})` }}>✅</span>
      <span style={{ ...xt.body, color: xy.white, fontSize: 36 }}>{label}</span>
    </div>
  );
};

export const S04_Deployed: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: xy.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-end", paddingBottom: 160,
    }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: `radial-gradient(ellipse, ${xy.green}22 0%, transparent 70%)` }} />

      <FlyIn delay={0} from="top">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ ...xt.h2, color: xy.whiteMid, fontSize: 46 }}>博主已亲测</span>
        </div>
      </FlyIn>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 12, marginBottom: 32 }}>
        <CountUp target={2} delay={10} color={xy.green} fontSize={180} />
        <span style={{ ...xt.h1, color: xy.white, fontSize: 72, marginBottom: 24 }}>台成功部署</span>
      </div>

      <div style={{ textAlign: "left", width: "100%", padding: "0 80px" }}>
        <CheckRow label="家用 Windows 台式机" delay={45} />
        <CheckRow label="公司 Windows 笔记本" delay={60} />
      </div>

      <FlyIn delay={78} from="bottom">
        <div style={{
          background: xy.redDim, border: `2px solid ${xy.red}`,
          borderRadius: 16, padding: "16px 40px", marginTop: 16,
          boxShadow: `0 0 24px ${xy.red}55`,
        }}>
          <span style={{ ...xt.body, color: xy.red, fontSize: 34 }}>不需要买 Mac · 不需要懂技术</span>
        </div>
      </FlyIn>
    </AbsoluteFill>
  );
};
