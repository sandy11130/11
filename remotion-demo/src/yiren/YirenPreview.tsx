import {
  AbsoluteFill, Audio, interpolate, Sequence,
  spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#040810",
  cyan: "#00E5FF",
  gold: "#FFD60A",
  red: "#FF3B30",
  white: "#FFFFFF",
  gridLine: "rgba(0,229,255,0.05)",
};
const FONT = "'PingFang SC','Noto Sans SC','Microsoft YaHei',sans-serif";

// ─── Matrix rain background ───────────────────────────────────────────────────
const CHARS = "0123456789站群AI网络自动被动收益系统ABCDEF";
const MatrixRain: React.FC<{ opacity?: number }> = ({ opacity = 0.1 }) => {
  const frame = useCurrentFrame();
  const drops = Array.from({ length: 28 }, (_, i) => {
    const x = (i / 28) * 1040 + 20;
    const speed = 10 + (i % 6) * 4;
    const y = ((frame * speed + i * 173) % 2100) - 80;
    const char = CHARS[Math.floor((frame * 0.4 + i * 11) % CHARS.length)];
    return { x, y, char };
  });
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
         viewBox="0 0 1080 1920">
      {drops.map((d, i) => (
        <text key={i} x={d.x} y={d.y} fontSize={22} fill={C.cyan}
              opacity={0.4 + (i % 3) * 0.15} textAnchor="middle" fontFamily="monospace">
          {d.char}
        </text>
      ))}
    </svg>
  );
};

// ─── Floating particles ───────────────────────────────────────────────────────
const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const pts = Array.from({ length: 45 }, (_, i) => ({
    x: ((i * 137.5 + frame * (0.07 + (i % 5) * 0.04)) % 100),
    y: ((i * 97.3 + frame * (0.05 + (i % 4) * 0.03)) % 100),
    r: 0.25 + (i % 4) * 0.12,
    op: 0.12 + (i % 3) * 0.1,
  }));
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
         viewBox="0 0 100 100" preserveAspectRatio="none">
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={C.cyan} opacity={p.op} />
      ))}
    </svg>
  );
};

// ─── Radial speed lines ───────────────────────────────────────────────────────
const SpeedLines: React.FC<{ cx?: number; cy?: number; delay?: number; color?: string }> = ({
  cx = 540, cy = 960, delay = 0, color = C.cyan,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const prog = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const lines = Array.from({ length: 110 }, (_, i) => {
    const angle = (i / 110) * Math.PI * 2 + Math.sin(i * 1.618) * 0.1;
    const len = 900 * (0.45 + (i * 37 % 55) / 100);
    const w = 0.3 + (i * 13 % 12) / 10 * 2;
    const ir = 25 + (i * 7 % 30);
    const col = i % 4 === 0 ? "#FFFFFF" : color;
    const x1 = cx + Math.cos(angle) * ir;
    const y1 = cy + Math.sin(angle) * ir;
    const x2 = cx + Math.cos(angle) * (ir + (len - ir) * prog);
    const y2 = cy + Math.sin(angle) * (ir + (len - ir) * prog);
    return { x1, y1, x2, y2, w, col, op: 0.3 + (i % 5) * 0.1 };
  });
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
         viewBox="0 0 1080 1920" preserveAspectRatio="none">
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={l.col} strokeWidth={l.w} opacity={l.op} />
      ))}
    </svg>
  );
};

// ─── White flash ──────────────────────────────────────────────────────────────
const Flash: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const op = interpolate(t, [0, 1, 6], [0, 1, 0], { extrapolateRight: "clamp" });
  if (op <= 0) return null;
  return <div style={{ position: "absolute", inset: 0, background: "white", opacity: op, zIndex: 200 }} />;
};

// ─── Animated number counter ──────────────────────────────────────────────────
const Counter: React.FC<{ to: number; delay?: number; dur?: number }> = ({ to, delay = 0, dur = 55 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const val = Math.round(interpolate(t, [0, dur], [0, to], { extrapolateRight: "clamp" }));
  return <>{val.toLocaleString()}</>;
};

// ─── Scene 1 · 我是一个一人公司 (0–100f) ─────────────────────────────────────
const S1_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bigScale = spring({ frame, fps, from: 4.5, to: 1, durationInFrames: 22, config: { damping: 13, stiffness: 190 } });
  const bigOp = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const sub1Op = interpolate(frame, [28, 40], [0, 1], { extrapolateRight: "clamp" });
  const sub1Y = interpolate(frame, [28, 44], [28, 0], { extrapolateRight: "clamp" });
  const badgeOp = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });
  const badgeS = spring({ frame: Math.max(0, frame - 50), fps, from: 0.5, to: 1, durationInFrames: 16, config: { damping: 10 } });
  const glow = 1 + Math.sin(frame * 0.14) * 0.18;

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Audio src={staticFile("audio/impact.wav")} startFrom={0} volume={0.9} />
      <Flash delay={0} />
      <SpeedLines cx={540} cy={920} delay={2} color={C.cyan} />

      {/* Hero text */}
      <div style={{ opacity: bigOp, transform: `scale(${bigScale})`, textAlign: "center", zIndex: 10 }}>
        <div style={{ fontSize: 76, fontWeight: 900, color: "rgba(255,255,255,0.75)", fontFamily: FONT, lineHeight: 1.15 }}>
          我是一个
        </div>
        <div style={{
          fontSize: 128, fontWeight: 900, fontFamily: FONT, lineHeight: 1,
          color: C.cyan,
          textShadow: `0 0 ${40 * glow}px ${C.cyan}, 0 0 ${90 * glow}px ${C.cyan}55`,
        }}>
          一人公司
        </div>
      </div>

      {/* Sub line */}
      <div style={{ opacity: sub1Op, transform: `translateY(${sub1Y}px)`, textAlign: "center", marginTop: 28, zIndex: 10 }}>
        <div style={{ fontSize: 34, color: "rgba(255,255,255,0.55)", fontFamily: FONT, letterSpacing: "0.1em" }}>
          自动化运营 · 被动收益 · 无需打卡
        </div>
      </div>

      {/* Badge */}
      <div style={{ opacity: badgeOp, transform: `scale(${badgeS})`, marginTop: 36, zIndex: 10 }}>
        <div style={{
          border: `2px solid ${C.cyan}`,
          borderRadius: 100, padding: "10px 36px",
          background: "rgba(0,229,255,0.1)",
          boxShadow: `0 0 20px rgba(0,229,255,0.25)`,
        }}>
          <span style={{ fontSize: 30, color: C.cyan, fontFamily: FONT }}>一人公司实验室</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2 · 2000个站群网站 (100–235f) ─────────────────────────────────────
const S2_Number: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numScale = spring({ frame, fps, from: 0.2, to: 1, durationInFrames: 20, config: { damping: 9, stiffness: 360 } });
  const numOp = interpolate(frame, [0, 7], [0, 1], { extrapolateRight: "clamp" });
  const glow = 1 + Math.sin(frame * 0.1) * 0.22;

  const facts = [
    { text: "全部 AI 自动化运营", color: C.cyan },
    { text: "被动收益，无需值守", color: C.gold },
    { text: "偶尔只需管理外链", color: "rgba(255,255,255,0.7)" },
  ];

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Audio src={staticFile("audio/whoosh.wav")} startFrom={0} volume={0.6} />
      <Flash delay={0} />
      <SpeedLines cx={540} cy={820} delay={2} color={C.gold} />

      {/* Big counter */}
      <div style={{ opacity: numOp, transform: `scale(${numScale})`, textAlign: "center", zIndex: 10 }}>
        <div style={{
          fontSize: 220, fontWeight: 900, fontFamily: FONT,
          color: C.gold,
          textShadow: `0 0 ${55 * glow}px ${C.gold}, 0 0 ${120 * glow}px ${C.gold}44`,
          lineHeight: 0.9,
        }}>
          <Counter to={2000} delay={0} dur={55} />
        </div>
        <div style={{ fontSize: 58, fontWeight: 800, color: C.white, fontFamily: FONT, marginTop: 6 }}>
          个站群网站
        </div>
      </div>

      {/* Fact list */}
      <div style={{ marginTop: 52, zIndex: 10, width: "82%", display: "flex", flexDirection: "column", gap: 14 }}>
        {facts.map(({ text, color }, i) => {
          const d = 24 + i * 18;
          const t = Math.max(0, frame - d);
          const op = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
          const tx = interpolate(t, [0, 14], [-60, 0], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: op, transform: `translateX(${tx}px)` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 10px ${color}` }} />
              <div style={{ fontSize: 38, fontWeight: 700, color, fontFamily: FONT }}>{text}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3 · 没有团队/办公室/打卡/汇报 (235–390f) ──────────────────────────
const S3_NoTeam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 16], [-20, 0], { extrapolateRight: "clamp" });

  const items = [
    { label: "没有团队", delay: 18 },
    { label: "没有办公室", delay: 36 },
    { label: "没有打卡", delay: 54 },
    { label: "没有汇报", delay: 72 },
  ];

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 60px" }}>
      <Audio src={staticFile("audio/scan.wav")} startFrom={6} volume={0.45} />

      <div style={{
        opacity: titleOp, transform: `translateY(${titleY}px)`,
        fontSize: 40, fontWeight: 700, color: "rgba(255,255,255,0.45)", fontFamily: FONT,
        marginBottom: 44, textAlign: "center", letterSpacing: "0.1em",
      }}>
        这套系统跑通之后——
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>
        {items.map(({ label, delay }, i) => {
          const t = Math.max(0, frame - delay);
          const op = interpolate(t, [0, 9], [0, 1], { extrapolateRight: "clamp" });
          const sc = spring({ frame: t, fps, from: 0.65, to: 1, durationInFrames: 14, config: { damping: 10, stiffness: 360 } });
          const strikeT = Math.max(0, frame - (delay + 14));
          const strikeW = interpolate(strikeT, [0, 12], [0, 100], { extrapolateRight: "clamp" });
          const strikeOp = interpolate(strikeT, [0, 4], [0, 1], { extrapolateRight: "clamp" });

          return (
            <div key={i} style={{ position: "relative", opacity: op, transform: `scale(${sc})` }}>
              <div style={{ fontSize: 78, fontWeight: 900, color: C.white, fontFamily: FONT, textAlign: "center" }}>
                {label}
              </div>
              {/* Strikethrough */}
              <div style={{
                position: "absolute", top: "52%", left: "50%",
                transform: `translateX(-50%) translateY(-50%)`,
                width: `${strikeW}%`, height: 7,
                background: `linear-gradient(90deg, ${C.red}, #FF6B60)`,
                boxShadow: `0 0 14px ${C.red}`,
                opacity: strikeOp,
                borderRadius: 4,
              }} />
            </div>
          );
        })}
      </div>

      {/* Bottom tag */}
      <div style={{
        marginTop: 40, opacity: interpolate(frame, [85, 100], [0, 1], { extrapolateRight: "clamp" }),
        fontSize: 34, color: C.cyan, fontFamily: FONT, letterSpacing: "0.12em",
        textShadow: `0 0 16px ${C.cyan}`,
      }}>
        只需要研究更多可以自动化的东西
      </div>
    </AbsoluteFill>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────
const SCENES = [
  { from: 0,   dur: 105, comp: S1_Opening },
  { from: 98,  dur: 142, comp: S2_Number  },
  { from: 233, dur: 162, comp: S3_NoTeam  },
];

export const YIREN_TOTAL = 395;

export const YirenPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const gridOff = (frame * 0.28) % 60;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${C.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        backgroundPosition: `0 ${gridOff}px`,
      }} />

      <MatrixRain opacity={0.09} />
      <Particles />

      {/* Progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(0,229,255,0.1)", zIndex: 100 }}>
        <div style={{ height: "100%", width: `${(frame / YIREN_TOTAL) * 100}%`, background: C.cyan, boxShadow: `0 0 8px ${C.cyan}` }} />
      </div>

      {SCENES.map(({ from, dur, comp: Comp }) => {
        const lf = frame - from;
        const fi = interpolate(lf, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const fo = interpolate(lf, [dur - 10, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        if (frame < from || frame >= from + dur) return null;
        return (
          <Sequence key={from} from={from} durationInFrames={dur}>
            <AbsoluteFill style={{ opacity: Math.min(fi, fo) }}>
              <Comp />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
