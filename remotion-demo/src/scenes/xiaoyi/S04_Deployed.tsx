import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, PopIn } from "../../components/XiaoYiOverlay";

const CheckItem: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.6, to: 1, durationInFrames: 16, config: { damping: 14 } });
  const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      opacity: op, transform: `scale(${s})`,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: xy.green, color: xy.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, fontWeight: 900, flexShrink: 0,
      }}>✓</div>
      <div style={{
        background: xy.white, borderRadius: 14,
        padding: "14px 24px", flex: 1,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        ...xt.body, color: xy.black,
      }}>{label}</div>
    </div>
  );
};

export const S04_Deployed: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 60px", gap: 24,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ textAlign: "center" }}>
        <div style={{ ...xt.h2, color: xy.darkGray }}>博主已亲测</div>
        <div style={{ ...xt.h1, color: xy.red }}>成功部署 2 个</div>
      </div>
    </FlyIn>

    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 18, marginTop: 12 }}>
      <CheckItem delay={18} label="第一台：家用 Windows 台式机 ✅" />
      <CheckItem delay={32} label="第二台：公司 Windows 笔记本 ✅" />
    </div>

    <FlyIn delay={50} from="bottom">
      <div style={{
        background: xy.redLight, borderRadius: 16, padding: "16px 32px", marginTop: 8,
        ...xt.sm, color: xy.red, fontWeight: 700, textAlign: "center",
      }}>
        不需要买 Mac，不需要懂技术 💪
      </div>
    </FlyIn>
  </div>
);
