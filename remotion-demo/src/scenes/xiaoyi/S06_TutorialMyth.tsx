import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt, xf } from "../../xiaoyiStyles";
import { Flash } from "../../components/XiaoYiOverlay";

const JARGON = ["终端", "环境变量", "pip install", "sudo rm -rf", "PATH", "node版本", "虚拟环境", "npm ci", "依赖冲突", "git clone", "chmod", "brew install"];

export const S06_TutorialMyth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chaosOp = interpolate(frame, [0, 10, 100, 120], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const clearOp = interpolate(frame, [120, 138], [0, 1], { extrapolateRight: "clamp" });
  const clearS = spring({ frame: Math.max(0, frame - 120), fps, from: 0.6, to: 1, durationInFrames: 22, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: xy.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Flash triggerFrame={118} color="#ffffff" />

      {/* Header */}
      <div style={{ ...xt.h2, color: xy.red, fontSize: 52, marginBottom: 30, textShadow: `0 0 20px ${xy.red}` }}>
        ❌ 误区② 教程像天书
      </div>

      {/* Chaos jargon cloud */}
      <div style={{ position: "relative", width: "100%", height: 500, opacity: chaosOp }}>
        {JARGON.map((word, i) => {
          const drift = Math.sin(frame * 0.05 + i) * 12;
          const drift2 = Math.cos(frame * 0.04 + i * 1.3) * 8;
          return (
            <div key={word} style={{
              position: "absolute",
              left: `${(i * 119 + 5) % 68}%`,
              top: `${(i * 83 + 8) % 80}%`,
              transform: `translate(${drift}px, ${drift2}px) rotate(${(i * 23) % 30 - 15}deg)`,
              ...xt.body,
              fontFamily: xf.sans,
              color: i % 3 === 0 ? xy.red : i % 3 === 1 ? xy.orange : xy.whiteMid,
              fontSize: 28 + (i % 3) * 8,
              fontWeight: 700,
              textShadow: i % 3 === 0 ? `0 0 10px ${xy.red}` : "none",
              opacity: 0.6 + (i % 3) * 0.15,
            }}>{word}</div>
          );
        })}
        {/* Big X */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ fontSize: 200, opacity: 0.15, color: xy.red, fontWeight: 900 }}>✕</div>
        </div>
      </div>

      {/* Clean solution */}
      <div style={{
        opacity: clearOp, transform: `scale(${clearS})`,
        position: "absolute", bottom: 140,
        background: xy.green, borderRadius: 24,
        padding: "28px 56px", textAlign: "center",
        boxShadow: `0 0 60px ${xy.green}88`,
        margin: "0 40px",
      }}>
        <div style={{ ...xt.h2, color: xy.bg, fontSize: 50 }}>✅ 跟着我做就行！</div>
        <div style={{ ...xt.body, color: "rgba(0,0,0,0.7)", marginTop: 8, fontSize: 30 }}>
          不用懂配置 · 不用懂技术
        </div>
      </div>
    </AbsoluteFill>
  );
};
