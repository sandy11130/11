import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

const Step: React.FC<{ num: number; label: string; sub: string; delay: number }> = ({ num, label, sub, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.6, to: 1, durationInFrames: 18, config: { damping: 12, stiffness: 280 } });
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ opacity: op, transform: `scale(${s})`, display: "flex", alignItems: "center", gap: 20, marginBottom: 24, width: "100%" }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
        background: xy.red, color: xy.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 32, fontWeight: 900,
        boxShadow: `0 0 24px ${xy.red}`,
      }}>{num}</div>
      <div style={{
        flex: 1, background: "rgba(255,255,255,0.08)",
        border: `2px solid rgba(255,255,255,0.15)`,
        borderRadius: 16, padding: "16px 24px",
      }}>
        <div style={{ ...xt.h3, color: xy.white, fontSize: 38 }}>{label}</div>
        <div style={{ ...xt.sm, color: xy.whiteMid, fontSize: 26, marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
};

export const S08_Roadmap: React.FC = () => (
  <AbsoluteFill style={{
    background: xy.bg, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "flex-end", paddingBottom: 120,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ ...xt.h2, color: xy.white, fontSize: 54, textAlign: "center", marginBottom: 30 }}>
        🎯 今天学什么？
      </div>
    </FlyIn>
    <div style={{ width: "100%", padding: "0 60px" }}>
      <Step num={1} label="下载安装包" sub="官网直链，一键下载" delay={14} />
      <Step num={2} label="配置环境" sub="复制粘贴就行" delay={28} />
      <Step num={3} label="启动 OpenClaw" sub="浏览器打开，开始用" delay={42} />
    </div>
    <FlyIn delay={62} from="bottom">
      <div style={{
        background: xy.red, borderRadius: 100,
        padding: "16px 50px",
        boxShadow: `0 0 36px ${xy.red}`,
      }}>
        <span style={{ ...xt.h3, color: xy.white, fontSize: 38 }}>全程 15 分钟搞定 ⚡</span>
      </div>
    </FlyIn>
  </AbsoluteFill>
);
