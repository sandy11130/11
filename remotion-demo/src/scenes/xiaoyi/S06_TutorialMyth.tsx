import { useCurrentFrame, interpolate } from "remotion";
import { xy, xt, xf } from "../../xiaoyiStyles";
import { FlyIn, PopIn } from "../../components/XiaoYiOverlay";

const jargon = ["终端", "环境变量", "pip install", "sudo", "配置文件", "PATH", "虚拟环境", "npm", "node版本", "依赖冲突"];

export const S06_TutorialMyth: React.FC = () => {
  const frame = useCurrentFrame();
  const chaos = interpolate(frame, [0, 20], [1, 1], { extrapolateRight: "clamp" });
  const clear = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 60px",
    }}>
      <FlyIn delay={0} from="top">
        <div style={{ ...xt.h2, color: xy.black, textAlign: "center", marginBottom: 20 }}>
          误区②<br />
          <span style={{ color: xy.red }}>教程写得像"神仙视角"</span>
        </div>
      </FlyIn>

      {/* Chaos jargon cloud */}
      <div style={{
        position: "relative", width: 380, height: 240,
        opacity: interpolate(frame, [0, 12, 30, 42], [0, 1, 1, 0], { extrapolateRight: "clamp" }),
      }}>
        {jargon.map((word, i) => (
          <div key={word} style={{
            position: "absolute",
            left: `${(i * 137 + 20) % 65}%`,
            top: `${(i * 97 + 10) % 75}%`,
            ...xt.sm, color: i % 3 === 0 ? xy.red : xy.darkGray,
            fontSize: 18 + (i % 3) * 4,
            fontWeight: i % 2 === 0 ? 700 : 500,
            opacity: 0.7 + (i % 3) * 0.1,
          }}>{word}</div>
        ))}
        {/* Red X overlay */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            fontSize: 100, color: xy.red, fontWeight: 900, opacity: 0.25,
          }}>✕</div>
        </div>
      </div>

      {/* Solution card */}
      <div style={{ opacity: clear, transform: `translateY(${(1 - clear) * 30}px)`, width: "100%" }}>
        <div style={{
          background: xy.green, borderRadius: 24,
          padding: "28px 36px", textAlign: "center",
          boxShadow: "0 8px 32px rgba(29,185,84,0.25)",
        }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>✅</div>
          <div style={{ ...xt.h3, color: xy.white }}>本教程默认你什么都不懂</div>
          <div style={{ ...xt.body, color: "rgba(255,255,255,0.85)", marginTop: 8 }}>
            不用懂配置 · 不用懂技术 · 跟着做就行
          </div>
        </div>
      </div>
    </div>
  );
};
