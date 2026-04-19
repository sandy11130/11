import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { Flash, useShake } from "../../components/XiaoYiOverlay";

export const S05_MacMyth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shake = useShake(20, 14, 22);

  // Mac icon shatters (scale up then shrink with shake)
  const macScale = spring({ frame, fps, from: 0.5, to: 1.2, durationInFrames: 18, config: { damping: 10 } });
  const macScale2 = spring({ frame: Math.max(0, frame - 18), fps, from: 1.2, to: 0, durationInFrames: 10, config: { damping: 8, stiffness: 500 } });
  const macOp = interpolate(frame, [0, 8, 26, 30], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Windows pops in
  const winS = spring({ frame: Math.max(0, frame - 35), fps, from: 0, to: 1, durationInFrames: 20, config: { damping: 8, stiffness: 350 } });
  const winOp = interpolate(frame, [35, 46], [0, 1], { extrapolateRight: "clamp" });

  const textOp = interpolate(frame, [55, 68], [0, 1], { extrapolateRight: "clamp" });
  const textY = spring({ frame: Math.max(0, frame - 55), fps, from: 40, to: 0, durationInFrames: 20, config: { damping: 16 } });

  return (
    <AbsoluteFill style={{
      background: xy.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transform: `translate(${shake.x}px,${shake.y}px)`,
    }}>
      <Flash triggerFrame={20} color={xy.red} />

      <div style={{ ...xt.h2, color: xy.red, fontSize: 52, marginBottom: 30, textShadow: `0 0 20px ${xy.red}` }}>
        ❌ 误区①
      </div>

      {/* Mac getting destroyed */}
      <div style={{ position: "relative", height: 220, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ opacity: macOp, transform: `scale(${frame < 18 ? macScale : macScale2})`, position: "absolute" }}>
          <div style={{ fontSize: 160, filter: "grayscale(0.5) brightness(0.6)" }}>🍎</div>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 130, filter: `drop-shadow(0 0 20px ${xy.red})` }}>❌</div>
        </div>

        {/* Windows hero */}
        <div style={{ opacity: winOp, transform: `scale(${winS})`, position: "absolute", textAlign: "center" }}>
          <div style={{ fontSize: 150, filter: `drop-shadow(0 0 40px ${xy.green})` }}>🪟</div>
          <div style={{ ...xt.h1, color: xy.green, fontSize: 64, textShadow: `0 0 30px ${xy.green}` }}>Windows ✓</div>
        </div>
      </div>

      <div style={{ opacity: textOp, transform: `translateY(${textY}px)`, textAlign: "center", marginTop: 20 }}>
        <div style={{ ...xt.h2, color: xy.white, fontSize: 52 }}>
          不需要花 <span style={{ color: xy.red, textShadow: `0 0 20px ${xy.red}` }}>¥3000</span> 买 Mac
        </div>
        <div style={{ ...xt.body, color: xy.green, marginTop: 12, fontSize: 38, textShadow: `0 0 16px ${xy.green}` }}>
          你的 Windows 电脑就够了！
        </div>
      </div>
    </AbsoluteFill>
  );
};
