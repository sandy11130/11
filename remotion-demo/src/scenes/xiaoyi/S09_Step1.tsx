import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

export const S09_Step1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: xy.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-end", paddingBottom: 100,
    }}>
      <FlyIn delay={0} from="top">
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: xy.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: xy.white, boxShadow: `0 0 24px ${xy.red}` }}>1</div>
          <span style={{ ...xt.h1, color: xy.red, fontSize: 62, textShadow: `0 0 24px ${xy.red}` }}>下载安装包</span>
        </div>
      </FlyIn>

      <FlyIn delay={14} from="bottom" style={{ width: "100%", padding: "0 48px" }}>
        <div style={{
          background: "rgba(255,255,255,0.07)", border: `2px solid rgba(255,255,255,0.15)`,
          borderRadius: 24, padding: "28px 36px",
          boxShadow: `0 0 40px ${xy.red}33`,
        }}>
          {[
            { icon: "🌐", text: "打开官方网站（视频中有链接）" },
            { icon: "⬇️", text: "点击 Windows 版下载按钮" },
            { icon: "⏳", text: "等待下载完成（约 200MB）" },
          ].map(({ icon, text }, i) => {
            const t = Math.max(0, frame - (22 + i * 14));
            const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
            const x = interpolate(t, [0, 14], [-30, 0], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: i < 2 ? 20 : 0, opacity: op, transform: `translateX(${x}px)` }}>
                <span style={{ fontSize: 38 }}>{icon}</span>
                <span style={{ ...xt.body, color: xy.white, fontSize: 34 }}>{text}</span>
              </div>
            );
          })}
        </div>
      </FlyIn>

      <FlyIn delay={60} from="bottom">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20,
          background: "rgba(255,214,10,0.15)", border: `2px solid ${xy.yellow}`,
          borderRadius: 14, padding: "14px 30px",
          boxShadow: `0 0 20px ${xy.yellow}44` }}>
          <span style={{ fontSize: 36 }}>⚠️</span>
          <span style={{ ...xt.sm, color: xy.yellow, fontSize: 30 }}>只从官网下载，避免病毒！</span>
        </div>
      </FlyIn>
    </AbsoluteFill>
  );
};
