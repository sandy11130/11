import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn } from "../../components/XiaoYiOverlay";

const RollNum: React.FC<{ target: number; suffix?: string; label: string; delay: number; color?: string }> = ({
  target, suffix = "", label, delay, color = xy.red,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const val = Math.round(interpolate(t, [0, 45], [0, target], {
    extrapolateRight: "clamp", easing: (x) => 1 - Math.pow(1 - x, 3),
  }));
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: op, textAlign: "center", flex: 1 }}>
      <div style={{ ...xt.stat, color, fontSize: 90 }}>{val}{suffix}</div>
      <div style={{ ...xt.sm, color: xy.darkGray, marginTop: 4 }}>{label}</div>
    </div>
  );
};

export const S07_Authority: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 60px", gap: 28,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ ...xt.h2, color: xy.black, textAlign: "center" }}>
        博主帮你踩完了坑
      </div>
    </FlyIn>

    <div style={{ display: "flex", width: "100%", gap: 0 }}>
      <RollNum target={108} suffix="小时" label="整理耗时" delay={12} color={xy.red} />
      <div style={{ width: 2, background: xy.gray, margin: "20px 0" }} />
      <RollNum target={30} suffix="+" label="参考教程" delay={20} color={xy.orange} />
    </div>

    <FlyIn delay={55} from="bottom">
      <div style={{
        background: xy.redLight, borderRadius: 20,
        padding: "20px 36px", width: "100%", textAlign: "center",
        borderLeft: `6px solid ${xy.red}`,
      }}>
        <div style={{ ...xt.body, color: xy.red, fontWeight: 700 }}>
          真正小白友好的版本
        </div>
        <div style={{ ...xt.sm, color: xy.darkGray, marginTop: 6 }}>
          踩完坑才敢发出来
        </div>
      </div>
    </FlyIn>
  </div>
);
