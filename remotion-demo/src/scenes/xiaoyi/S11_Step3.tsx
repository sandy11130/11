import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, PopIn } from "../../components/XiaoYiOverlay";

const Confetti: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - 20);
  const colors = [xy.red, xy.orange, xy.yellow, xy.green, "#4F8EF7"];
  const x = ((i * 137) % 100) - 50;
  const y = -((t * (1.5 + (i % 3) * 0.5)) % 200);
  const rot = t * (i % 2 === 0 ? 3 : -4) + i * 30;
  const op = interpolate(t, [0, 5, 120, 150], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute",
      width: 10 + (i % 3) * 4, height: 10 + (i % 3) * 4,
      background: colors[i % 5],
      borderRadius: i % 2 === 0 ? "50%" : 2,
      left: `${40 + x * 0.3}%`,
      top: `40%`,
      transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
      opacity: op,
    }} />
  );
};

export const S11_Step3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const successScale = spring({ frame: Math.max(0, frame - 15), fps, from: 0.3, to: 1, durationInFrames: 28, config: { damping: 10, stiffness: 250 } });
  const successOp = interpolate(frame, [15, 28], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 56px", gap: 24, position: "relative",
    }}>
      {Array.from({ length: 18 }).map((_, i) => <Confetti key={i} i={i} />)}

      <FlyIn delay={0} from="top">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: xy.green, color: xy.white,
            display: "flex", alignItems: "center", justifyContent: "center",
            ...xt.h2, fontSize: 28,
          }}>3</div>
          <div style={{ ...xt.h1, color: xy.green, fontSize: 52 }}>启动成功！</div>
        </div>
      </FlyIn>

      <div style={{ opacity: successOp, transform: `scale(${successScale})`, textAlign: "center" }}>
        <div style={{
          fontSize: 100,
          filter: "drop-shadow(0 8px 24px rgba(29,185,84,0.4))",
        }}>✅</div>
        <div style={{ ...xt.h1, color: xy.green, marginTop: 8 }}>安装完成！</div>
      </div>

      <FlyIn delay={45} from="bottom">
        <div style={{
          background: xy.green, borderRadius: 20,
          padding: "20px 40px", textAlign: "center",
          boxShadow: "0 8px 32px rgba(29,185,84,0.3)",
        }}>
          <div style={{ ...xt.body, color: xy.white, fontWeight: 700 }}>
            🎉 恭喜！你的 AI 助手已就绪
          </div>
        </div>
      </FlyIn>
    </div>
  );
};
