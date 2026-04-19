import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "./styles";
import { IntroScene } from "./scenes/IntroScene";
import { CodeScene } from "./scenes/CodeScene";
import { StatsScene } from "./scenes/StatsScene";
import { CTAScene } from "./scenes/CTAScene";

// Scene timing (in frames at 30fps)
const INTRO_START = 0;
const INTRO_DURATION = 110;

const CODE_START = 90;   // overlaps with intro by 20 frames
const CODE_DURATION = 130;

const STATS_START = 200; // overlaps with code by 20 frames
const STATS_DURATION = 120;

const CTA_START = 300;   // overlaps with stats by 20 frames
const CTA_DURATION = 120;

const TOTAL = CTA_START + CTA_DURATION; // 420 frames = 14s

const SceneFade: React.FC<{
  from: number;
  duration: number;
  fadeDuration?: number;
  children: React.ReactNode;
}> = ({ from, duration, fadeDuration = 15, children }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - from;
  const opacity = interpolate(
    localFrame,
    [0, fadeDuration, duration - fadeDuration, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const hue1 = (frame * 0.2) % 360;
  const hue2 = (frame * 0.15 + 120) % 360;

  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        overflow: "hidden",
      }}
    >
      {/* Slow-drifting gradient blobs */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, hsla(${270},80%,30%,0.12) 0%, transparent 70%)`,
          left: `${30 + Math.sin(frame * 0.008) * 15}%`,
          top: `${20 + Math.cos(frame * 0.006) * 15}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, hsla(${190},80%,30%,0.10) 0%, transparent 70%)`,
          right: `${10 + Math.cos(frame * 0.007) * 12}%`,
          bottom: `${15 + Math.sin(frame * 0.009) * 12}%`,
          transform: "translate(50%, 50%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const CoolDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AnimatedBackground />

      <Sequence from={INTRO_START} durationInFrames={INTRO_DURATION + 15}>
        <SceneFade from={INTRO_START} duration={INTRO_DURATION + 15}>
          <IntroScene />
        </SceneFade>
      </Sequence>

      <Sequence from={CODE_START} durationInFrames={CODE_DURATION + 15}>
        <SceneFade from={CODE_START} duration={CODE_DURATION + 15}>
          <CodeScene />
        </SceneFade>
      </Sequence>

      <Sequence from={STATS_START} durationInFrames={STATS_DURATION + 15}>
        <SceneFade from={STATS_START} duration={STATS_DURATION + 15}>
          <StatsScene />
        </SceneFade>
      </Sequence>

      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <SceneFade from={CTA_START} duration={CTA_DURATION} fadeDuration={12}>
          <CTAScene />
        </SceneFade>
      </Sequence>
    </AbsoluteFill>
  );
};
