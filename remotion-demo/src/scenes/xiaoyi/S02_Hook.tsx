import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, PopIn } from "../../components/XiaoYiOverlay";

const CountUp: React.FC<{ target: number; prefix?: string; suffix?: string; delay: number; color?: string }> = ({
  target, prefix = "", suffix = "", delay, color = xy.red,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const val = Math.round(interpolate(t, [0, 35], [0, target], {
    extrapolateRight: "clamp",
    easing: (x) => 1 - Math.pow(1 - x, 4),
  }));
  const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <span style={{ ...xt.stat, color, opacity: op, fontSize: 110 }}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
};

export const S02_Hook: React.FC = () => {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 60px", gap: 20,
    }}>
      <FlyIn delay={0} from="top">
        <div style={{ ...xt.h2, color: xy.darkGray, textAlign: "center" }}>
          今天帮你省下
        </div>
      </FlyIn>

      <div style={{ textAlign: "center" }}>
        <CountUp target={200} prefix="¥" delay={10} />
        <span style={{ ...xt.h1, color: xy.darkGray }}>–</span>
        <CountUp target={500} suffix="元" delay={10} />
      </div>

      <FlyIn delay={45} from="bottom">
        <div style={{
          background: xy.redLight, borderRadius: 20,
          padding: "20px 40px", marginTop: 10,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <span style={{ fontSize: 36 }}>💡</span>
          <span style={{ ...xt.body, color: xy.red, fontWeight: 700 }}>
            找人上门安装的价格
          </span>
        </div>
      </FlyIn>

      <FlyIn delay={55} from="bottom">
        <div style={{ ...xt.sm, color: xy.darkGray, textAlign: "center", marginTop: 8 }}>
          一定要点赞收藏，避免找不到教程！
        </div>
      </FlyIn>
    </div>
  );
};
