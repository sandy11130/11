import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { mc, mt, mf } from "./styles";
import { Background, ScanLine, HudCorners } from "./Background";

// ── Shared animation helpers ──────────────────────────────────────────────

const useFlyIn = (delay: number, from: "bottom" | "top" | "left" | "right" = "bottom", dist = 70) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0, to: 1, durationInFrames: 20, config: { damping: 16, stiffness: 200 } });
  const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const dx = from === "left" ? (1 - s) * -dist : from === "right" ? (1 - s) * dist : 0;
  const dy = from === "top" ? (1 - s) * -dist : from === "bottom" ? (1 - s) * dist : 0;
  return { style: { opacity: op, transform: `translate(${dx}px, ${dy}px)` } };
};

const usePopIn = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0.2, to: 1, durationInFrames: 18, config: { damping: 7, stiffness: 420 } });
  const op = interpolate(t, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return { style: { opacity: op, transform: `scale(${s})` } };
};

// Cyan glow text
const GlowText: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span style={{ color: mc.cyan, textShadow: `0 0 30px ${mc.cyan}, 0 0 60px ${mc.cyan}44`, ...style }}>{children}</span>
);

// ── Scene 1: 3年 number impact (0–90f) ────────────────────────────────────
const S1_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numScale = spring({ frame, fps, from: 5, to: 1, durationInFrames: 25, config: { damping: 14, stiffness: 160 } });
  const numOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const subOp = interpolate(frame, [28, 42], [0, 1], { extrapolateRight: "clamp" });
  const subY = spring({ frame: Math.max(0, frame - 28), fps, from: 50, to: 0, durationInFrames: 22, config: { damping: 16 } });

  const badgeOp = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });
  const badgeS = spring({ frame: Math.max(0, frame - 50), fps, from: 0.5, to: 1, durationInFrames: 18, config: { damping: 10 } });

  const glowPulse = 1 + Math.sin(frame * 0.12) * 0.15;

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Audio src={staticFile("audio/power.wav")} startFrom={0} />

      {/* Big 3 */}
      <div style={{ opacity: numOp, transform: `scale(${numScale})`, textAlign: "center" }}>
        <div style={{
          ...mt.mega,
          fontSize: 260,
          color: mc.cyan,
          textShadow: `0 0 ${60 * glowPulse}px ${mc.cyan}, 0 0 ${120 * glowPulse}px ${mc.cyan}44`,
          lineHeight: 1,
        }}>3</div>
        <div style={{ ...mt.h1, color: mc.white, marginTop: -20, fontSize: 68 }}>年</div>
      </div>

      {/* Subtitle */}
      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center", marginTop: 20 }}>
        <div style={{ ...mt.h2, color: mc.whiteDim, fontSize: 44 }}>使用 Claude 的</div>
      </div>

      {/* Badge */}
      <div style={{ opacity: badgeOp, transform: `scale(${badgeS})`, marginTop: 32 }}>
        <div style={{
          border: `2px solid ${mc.cyan}`,
          borderRadius: 100, padding: "12px 40px",
          boxShadow: `0 0 24px ${mc.cyanDim}`,
          background: mc.cyanGlow,
        }}>
          <span style={{ ...mt.body, color: mc.cyan, fontSize: 32 }}>@ 小易玩AI</span>
        </div>
      </div>

      <ScanLine triggerFrame={15} />
    </AbsoluteFill>
  );
};

// ── Scene 2: "改变了我人生的技术" (90–240f) ───────────────────────────────
const S2_Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["改变了", "我人生的", "技术"];
  const delays = [5, 22, 42];

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 60px" }}>
      <Audio src={staticFile("audio/whoosh.wav")} startFrom={0} volume={0.6} />

      <div style={{ textAlign: "center" }}>
        <div style={{ ...mt.sm, color: mc.cyanDim, marginBottom: 20, letterSpacing: "0.15em", fontSize: 24 }}>
          经过 3 年使用，我可以说
        </div>
        {words.map((w, i) => {
          const t = Math.max(0, frame - delays[i]);
          const s = spring({ frame: t, fps, from: 0.3, to: 1, durationInFrames: 20, config: { damping: 9, stiffness: 350 } });
          const op = interpolate(t, [0, 8], [0, 1], { extrapolateRight: "clamp" });
          const isLast = i === 2;
          return (
            <div key={w} style={{ opacity: op, transform: `scale(${s})`, display: "block" }}>
              {isLast
                ? <GlowText style={{ ...mt.hero, fontSize: 100 }}>{w}</GlowText>
                : <span style={{ ...mt.hero, color: mc.white, fontSize: 86 }}>{w}</span>
              }
            </div>
          );
        })}
      </div>

      {/* Horizontal line */}
      <div style={{
        width: interpolate(frame, [60, 85], [0, 500], { extrapolateRight: "clamp" }),
        height: 2,
        background: `linear-gradient(90deg, transparent, ${mc.cyan}, transparent)`,
        marginTop: 28,
        boxShadow: `0 0 12px ${mc.cyan}`,
      }} />

      <ScanLine triggerFrame={55} />
    </AbsoluteFill>
  );
};

// ── Scene 3: 18个提示词 explosion (240–420f) ──────────────────────────────
const S3_Number18: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numS = spring({ frame, fps, from: 4, to: 1, durationInFrames: 22, config: { damping: 12, stiffness: 200 } });
  const numOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const sub1 = useFlyIn(28);
  const sub2 = useFlyIn(48);

  const glowPulse = 1 + Math.sin(frame * 0.1) * 0.2;

  // Ring expansion
  const ringS = spring({ frame: Math.max(0, frame - 5), fps, from: 0.2, to: 2.5, durationInFrames: 40, config: { damping: 20 } });
  const ringOp = interpolate(frame, [5, 10, 40, 55], [0, 0.5, 0.3, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Audio src={staticFile("audio/impact.wav")} startFrom={0} volume={0.8} />
      <Audio src={staticFile("audio/ding.wav")} startFrom={18} volume={0.5} />

      {/* Expanding ring */}
      <div style={{
        position: "absolute",
        width: 300, height: 300, borderRadius: "50%",
        border: `3px solid ${mc.cyan}`,
        transform: `scale(${ringS})`,
        opacity: ringOp,
        boxShadow: `0 0 30px ${mc.cyan}`,
        left: "50%", top: "42%",
        marginLeft: -150, marginTop: -150,
      }} />

      {/* Big 18 */}
      <div style={{ opacity: numOp, transform: `scale(${numS})`, textAlign: "center" }}>
        <div style={{
          ...mt.mega,
          fontSize: 280,
          color: mc.cyan,
          textShadow: `0 0 ${80 * glowPulse}px ${mc.cyan}, 0 0 ${150 * glowPulse}px ${mc.cyan}55`,
          lineHeight: 0.9,
        }}>18</div>
      </div>

      {/* Labels */}
      <div {...sub1} style={{ ...sub1.style, textAlign: "center", marginTop: 8 }}>
        <span style={{ ...mt.h1, color: mc.white, fontSize: 64 }}>个提示词</span>
      </div>
      <div {...sub2} style={{ ...sub2.style, textAlign: "center", marginTop: 14 }}>
        <span style={{ ...mt.h2, color: mc.whiteDim, fontSize: 40 }}>彻底改变了我的日常</span>
      </div>

      <ScanLine triggerFrame={70} />
    </AbsoluteFill>
  );
};

// ── Scene 4: "也许对你也有帮助" (420–540f) ───────────────────────────────
const S4_Relatable: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = useFlyIn(5);
  const line2 = useFlyIn(25);
  const line3 = useFlyIn(48);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 70px" }}>
      <Audio src={staticFile("audio/scan.wav")} startFrom={5} volume={0.4} />

      <div style={{ textAlign: "center" }}>
        <div {...line1} style={{ ...line1.style, marginBottom: 16 }}>
          <span style={{ ...mt.h2, color: mc.whiteDim, fontSize: 38 }}>这是我每天使用的</span>
        </div>
        <div {...line2} style={{ ...line2.style, marginBottom: 16 }}>
          <GlowText style={{ ...mt.h1, fontSize: 72 }}>18 个提示词</GlowText>
        </div>
        <div {...line3} style={{ ...line3.style }}>
          <span style={{ ...mt.h2, color: mc.white, fontSize: 44 }}>也许对你也有帮助 ↓</span>
        </div>
      </div>

      {/* Decorative line */}
      <div style={{
        width: interpolate(frame, [65, 90], [0, 600], { extrapolateRight: "clamp" }),
        height: 1, background: `linear-gradient(90deg, transparent, ${mc.cyan}88, transparent)`,
        marginTop: 36,
      }} />
    </AbsoluteFill>
  );
};

// ── Scene 5: CTA — 收藏这个 (540–660f) ──────────────────────────────────
const S5_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainPop = usePopIn(8);
  const subFly = useFlyIn(35);

  const pulse = 1 + Math.sin(frame * 0.15) * 0.05;
  const glowPulse = 1 + Math.sin(frame * 0.12) * 0.3;

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Audio src={staticFile("audio/ding.wav")} startFrom={6} volume={0.7} />
      <Audio src={staticFile("audio/impact.wav")} startFrom={8} volume={0.4} />

      {/* Big bookmark icon */}
      <div {...mainPop} style={{ ...mainPop.style, textAlign: "center", transform: `${mainPop.style.transform} scale(${pulse})` }}>
        <div style={{ fontSize: 140, filter: `drop-shadow(0 0 ${30 * glowPulse}px ${mc.cyan})`, lineHeight: 1 }}>🔖</div>
      </div>

      {/* Main text */}
      <div {...mainPop} style={{ ...mainPop.style, textAlign: "center", marginTop: 16 }}>
        <div style={{ ...mt.hero, color: mc.white, fontSize: 90 }}>
          收藏这个
        </div>
        <GlowText style={{ ...mt.hero, fontSize: 90 }}>！</GlowText>
      </div>

      {/* Sub text */}
      <div {...subFly} style={{ ...subFly.style, textAlign: "center", marginTop: 20 }}>
        <div style={{ ...mt.body, color: mc.whiteDim, fontSize: 30 }}>
          之后我会逐一分享这 18 个提示词
        </div>
      </div>

      {/* Pulsing border button */}
      <div style={{
        marginTop: 40,
        opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" }),
        transform: `scale(${spring({ frame: Math.max(0, frame - 50), fps, from: 0.7, to: 1, durationInFrames: 18, config: { damping: 10 } })})`,
      }}>
        <div style={{
          border: `2px solid ${mc.cyan}`,
          borderRadius: 100, padding: "16px 60px",
          background: mc.cyanGlow,
          boxShadow: `0 0 ${30 * glowPulse}px ${mc.cyanDim}`,
        }}>
          <span style={{ ...mt.h2, color: mc.cyan, fontSize: 40, textShadow: `0 0 16px ${mc.cyan}` }}>
            关注 · 小易玩AI
          </span>
        </div>
      </div>

      <ScanLine triggerFrame={20} />
    </AbsoluteFill>
  );
};

// ── Main composition ──────────────────────────────────────────────────────

// Total: 660 frames = 22s @ 30fps
const SCENES = [
  { from: 0,   dur: 100, comp: S1_Opening },
  { from: 90,  dur: 160, comp: S2_Impact  },   // 10f overlap
  { from: 240, dur: 195, comp: S3_Number18 },
  { from: 420, dur: 140, comp: S4_Relatable },  // 15f overlap
  { from: 540, dur: 130, comp: S5_CTA },        // 10f overlap
];

const TOTAL = 670;

export const MyelcVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background />
      <HudCorners opacity={interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" })} />

      {/* Progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(0,212,255,0.15)", zIndex: 100 }}>
        <div style={{ height: "100%", width: `${(frame / TOTAL) * 100}%`, background: mc.cyan, boxShadow: `0 0 8px ${mc.cyan}` }} />
      </div>

      {SCENES.map(({ from, dur, comp: Comp }) => {
        const localFrame = frame - from;
        const fadeIn = interpolate(localFrame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const fadeOut = interpolate(localFrame, [dur - 12, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        if (frame < from || frame >= from + dur) return null;
        return (
          <Sequence key={from} from={from} durationInFrames={dur}>
            <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
              <Comp />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
