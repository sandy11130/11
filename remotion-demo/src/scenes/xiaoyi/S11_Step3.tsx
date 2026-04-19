import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { xy, xt } from "../../xiaoyiStyles";
import { Flash, useShake } from "../../components/XiaoYiOverlay";

const Particle: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - 18);
  const colors = [xy.red, xy.orange, xy.yellow, xy.green, "#4F8EF7", "#BF5AF2"];
  const angle = (i / 22) * Math.PI * 2;
  const speed = 4 + (i % 4) * 1.5;
  const dist = t * speed;
  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist;
  const op = interpolate(t, [0, 5, 50, 80], [0, 1, 0.8, 0], { extrapolateRight: "clamp" });
  const size = 8 + (i % 4) * 6;
  return (
    <div style={{
      position: "absolute", width: size, height: size,
      borderRadius: i % 2 === 0 ? "50%" : 3,
      background: colors[i % 6],
      boxShadow: `0 0 ${size * 2}px ${colors[i % 6]}`,
      left: "50%", top: "42%",
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      opacity: op,
    }} />
  );
};

export const S11_Step3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shake = useShake(16, 16, 26);

  const checkScale = spring({ frame: Math.max(0, frame - 14), fps, from: 0, to: 1, durationInFrames: 22, config: { damping: 7, stiffness: 380 } });
  const checkOp = interpolate(frame, [14, 24], [0, 1], { extrapolateRight: "clamp" });

  const textOp = interpolate(frame, [36, 50], [0, 1], { extrapolateRight: "clamp" });
  const textS = spring({ frame: Math.max(0, frame - 36), fps, from: 0.5, to: 1, durationInFrames: 20, config: { damping: 12 } });

  const glowPulse = Math.sin(frame * 0.15) * 0.3 + 1;

  return (
    <AbsoluteFill style={{
      background: xy.bg, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transform: `translate(${shake.x}px,${shake.y}px)`,
    }}>
      <Flash triggerFrame={14} color={xy.green} />
      {Array.from({ length: 22 }).map((_, i) => <Particle key={i} i={i} />)}

      {/* Giant check */}
      <div style={{ opacity: checkOp, transform: `scale(${checkScale})`, textAlign: "center" }}>
        <div style={{
          fontSize: 200,
          filter: `drop-shadow(0 0 ${40 * glowPulse}px ${xy.green})`,
          lineHeight: 1,
        }}>✅</div>
      </div>

      <div style={{ opacity: textOp, transform: `scale(${textS})`, textAlign: "center", marginTop: 20 }}>
        <div style={{ ...xt.hero, color: xy.green, fontSize: 96, textShadow: `0 0 50px ${xy.green}` }}>
          安装成功！
        </div>
        <div style={{ ...xt.h2, color: xy.white, marginTop: 16, fontSize: 50 }}>
          🎉 你的 AI 助手已就绪
        </div>
      </div>
    </AbsoluteFill>
  );
};
