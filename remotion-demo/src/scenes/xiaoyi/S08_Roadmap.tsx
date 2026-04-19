import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

const Step: React.FC<{ num: number; label: string; sub: string; delay: number; active?: boolean }> = ({
  num, label, sub, delay, active,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.7, to: 1, durationInFrames: 20, config: { damping: 14 } });
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ opacity: op, transform: `scale(${s})`, display: "flex", alignItems: "center", gap: 20, width: "100%" }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
        background: active ? xy.red : xy.gray,
        color: active ? xy.white : xy.darkGray,
        display: "flex", alignItems: "center", justifyContent: "center",
        ...xt.h2, fontSize: 26, fontWeight: 900,
        boxShadow: active ? `0 6px 24px rgba(232,34,10,0.35)` : "none",
      }}>{num}</div>
      <div style={{
        flex: 1, background: xy.white, borderRadius: 16,
        padding: "16px 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
        borderLeft: active ? `5px solid ${xy.red}` : `5px solid ${xy.gray}`,
      }}>
        <div style={{ ...xt.h3, color: active ? xy.red : xy.black, fontSize: 28 }}>{label}</div>
        <div style={{ ...xt.sm, color: xy.darkGray }}>{sub}</div>
      </div>
    </div>
  );
};

export const S08_Roadmap: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 60px", gap: 20,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ ...xt.h2, color: xy.black, textAlign: "center", marginBottom: 8 }}>
        今天学什么？
      </div>
    </FlyIn>

    <Step num={1} label="下载安装包" sub="官网直链，一键下载" delay={12} active />
    <Step num={2} label="配置环境" sub="复制粘贴就行，不用理解" delay={26} active />
    <Step num={3} label="启动 OpenClaw" sub="浏览器打开，开始用" delay={40} active />

    <FlyIn delay={58} from="bottom">
      <div style={{
        background: xy.red, borderRadius: 16, padding: "14px 32px",
        ...xt.body, color: xy.white, fontWeight: 700, textAlign: "center",
      }}>
        🎯 全程 15 分钟搞定
      </div>
    </FlyIn>
  </div>
);
