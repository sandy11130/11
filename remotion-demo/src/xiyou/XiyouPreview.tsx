import {
  AbsoluteFill, Audio, interpolate, Sequence,
  spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";

// ─── Palette ──────────────────────────────────────────────────────────────────
const P = {
  paper: "#F0E8D0",
  ink: "#0D0804",
  red: "#CC1100",
  redBright: "#FF2200",
  gold: "#D4900A",
  goldLight: "#FFB800",
  white: "#FFFFFF",
  skin: "#F0C890",
  orange: "#E07010",
};
const FONT = "'PingFang SC','Noto Sans SC','Noto Serif SC','Microsoft YaHei',serif";

// ─── Radial speed lines (ink style) ──────────────────────────────────────────
const InkLines: React.FC<{ cx?: number; cy?: number; delay?: number; color?: string; count?: number }> = ({
  cx = 540, cy = 800, delay = 0, color = P.red, count = 120,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const prog = interpolate(t, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const lines = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.sin(i * 1.618) * 0.1;
    const len = 950 * (0.4 + (i * 41 % 60) / 100);
    const w = 0.4 + (i * 11 % 14) / 10 * 2.2;
    const ir = 20 + (i * 7 % 35);
    const col = i % 3 === 0 ? P.ink : color;
    const x1 = cx + Math.cos(angle) * ir;
    const y1 = cy + Math.sin(angle) * ir;
    const x2 = cx + Math.cos(angle) * (ir + (len - ir) * prog);
    const y2 = cy + Math.sin(angle) * (ir + (len - ir) * prog);
    return { x1, y1, x2, y2, w, col, op: 0.25 + (i % 5) * 0.1 };
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
  const op = interpolate(t, [0, 1, 7], [0, 1, 0], { extrapolateRight: "clamp" });
  if (op <= 0) return null;
  return <div style={{ position: "absolute", inset: 0, background: P.white, opacity: op, zIndex: 200 }} />;
};

// ─── Screen shake ─────────────────────────────────────────────────────────────
const Shake: React.FC<{ delay?: number; intensity?: number; children: React.ReactNode }> = ({
  delay = 0, intensity = 12, children,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const amp = interpolate(t, [0, 14], [1, 0], { extrapolateRight: "clamp" }) * intensity;
  const dx = Math.sin(t * 13.7) * amp;
  const dy = Math.cos(t * 11.3) * amp;
  return (
    <div style={{ transform: `translate(${dx}px,${dy}px)`, position: "absolute", inset: 0 }}>
      {children}
    </div>
  );
};

// ─── Character name banner ────────────────────────────────────────────────────
const NameBanner: React.FC<{ name: string; title: string; delay?: number; color?: string }> = ({
  name, title, delay = 0, color = P.red,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - delay);
  const s = spring({ frame: t, fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 10, stiffness: 320 } });
  const op = interpolate(t, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, textAlign: "center", opacity: op, transform: `scale(${s})`, zIndex: 50 }}>
      <div style={{
        display: "inline-block", background: color,
        padding: "14px 56px 10px",
        clipPath: "polygon(10px 0%,calc(100% - 10px) 0%,100% 50%,calc(100% - 10px) 100%,10px 100%,0% 50%)",
        marginBottom: 12,
      }}>
        <span style={{ fontSize: 88, fontWeight: 900, color: P.white, fontFamily: FONT, letterSpacing: "0.12em" }}>
          {name}
        </span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: P.ink, fontFamily: FONT, letterSpacing: "0.2em", opacity: 0.7 }}>
        {title}
      </div>
    </div>
  );
};

// ─── Sun Wukong SVG ───────────────────────────────────────────────────────────
const Wukong: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <svg viewBox="-300 -500 600 850" width={560} height={850}
       style={{ position: "absolute", left: "50%", top: 60, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "center top" }}>
    {/* Glow halo */}
    <ellipse cx={0} cy={-80} rx={260} ry={300} fill={P.gold} opacity={0.12} />

    {/* Staff — behind body, diagonal */}
    <g transform="rotate(-18,0,0)">
      <rect x={-10} y={-490} width={22} height={820} rx={11} fill={P.gold} stroke={P.ink} strokeWidth={5} />
      <rect x={-26} y={-502} width={54} height={36} rx={10} fill={P.goldLight} stroke={P.ink} strokeWidth={3} />
      <rect x={-26} y={302} width={54} height={36} rx={10} fill={P.goldLight} stroke={P.ink} strokeWidth={3} />
    </g>

    {/* Body */}
    <path d="M-130,20 Q-140,130 -105,290 Q-55,360 0,370 Q55,360 105,290 Q140,130 130,20 Z"
          fill={P.orange} stroke={P.ink} strokeWidth={6} />
    {/* Tiger-skin belt */}
    <path d="M-130,100 Q0,128 130,100 L125,180 Q0,200 -125,180 Z"
          fill="#F0C040" stroke={P.ink} strokeWidth={4} />
    <path d="M-110,108 L-90,176 M-60,104 L-50,174 M0,102 L0,174 M60,104 L50,174 M100,108 L82,176"
          stroke="#AA7010" strokeWidth={5} strokeLinecap="round" />

    {/* Arms */}
    <path d="M-130,30 Q-220,100 -225,200" stroke={P.orange} strokeWidth={38} fill="none" strokeLinecap="round" />
    <path d="M130,30 Q220,100 225,200" stroke={P.orange} strokeWidth={38} fill="none" strokeLinecap="round" />
    {/* Fists */}
    <ellipse cx={-222} cy={210} rx={26} ry={22} fill={P.skin} stroke={P.ink} strokeWidth={4} />
    <ellipse cx={222} cy={210} rx={26} ry={22} fill={P.skin} stroke={P.ink} strokeWidth={4} />

    {/* Ears */}
    <ellipse cx={-118} cy={-238} rx={20} ry={25} fill={P.skin} stroke={P.ink} strokeWidth={5} />
    <ellipse cx={118} cy={-238} rx={20} ry={25} fill={P.skin} stroke={P.ink} strokeWidth={5} />

    {/* Head */}
    <path d="M-125,-300 Q-138,-210 -125,-130 Q-110,-50 0,-32 Q110,-50 125,-130 Q138,-210 125,-300 Q90,-368 0,-378 Q-90,-368 -125,-300Z"
          fill={P.skin} stroke={P.ink} strokeWidth={6} />
    {/* Monkey cheek pouches */}
    <ellipse cx={-104} cy={-215} rx={30} ry={24} fill={P.skin} stroke={P.ink} strokeWidth={4} />
    <ellipse cx={104} cy={-215} rx={30} ry={24} fill={P.skin} stroke={P.ink} strokeWidth={4} />

    {/* Gold headband 金箍 */}
    <rect x={-132} y={-330} width={264} height={36} rx={18} fill={P.goldLight} stroke={P.gold} strokeWidth={4} />
    <circle cx={0} cy={-312} r={10} fill={P.gold} />
    <circle cx={-60} cy={-312} r={6} fill={P.gold} opacity={0.6} />
    <circle cx={60} cy={-312} r={6} fill={P.gold} opacity={0.6} />

    {/* Spiky hair */}
    <path d="M-90,-365 L-72,-305 M-55,-382 L-42,-308 M-18,-390 L-10,-310 M18,-390 L10,-310 M55,-382 L42,-308 M90,-365 L72,-305"
          stroke={P.ink} strokeWidth={9} strokeLinecap="round" />

    {/* Fierce brows */}
    <path d="M-100,-278 L-35,-258" stroke={P.ink} strokeWidth={12} strokeLinecap="round" />
    <path d="M100,-278 L35,-258" stroke={P.ink} strokeWidth={12} strokeLinecap="round" />

    {/* Eyes */}
    <ellipse cx={-62} cy={-248} rx={30} ry={26} fill={P.white} stroke={P.ink} strokeWidth={5} />
    <ellipse cx={62} cy={-248} rx={30} ry={26} fill={P.white} stroke={P.ink} strokeWidth={5} />
    <circle cx={-54} cy={-244} r={16} fill={P.ink} />
    <circle cx={70} cy={-244} r={16} fill={P.ink} />
    <circle cx={-48} cy={-250} r={5} fill={P.white} />
    <circle cx={76} cy={-250} r={5} fill={P.white} />

    {/* Monkey nose */}
    <ellipse cx={0} cy={-205} rx={24} ry={16} fill="#D4A0A0" stroke={P.ink} strokeWidth={4} />
    <circle cx={-9} cy={-205} r={8} fill="#880000" opacity={0.4} />
    <circle cx={9} cy={-205} r={8} fill="#880000" opacity={0.4} />

    {/* Grin */}
    <path d="M-42,-175 Q0,-150 42,-175" stroke={P.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M-18,-172 L-10,-145 M18,-172 L10,-145" stroke={P.ink} strokeWidth={4} strokeLinecap="round" />

    {/* Tail */}
    <path d="M100,350 Q190,420 165,510 Q140,570 90,540" stroke="#C08040" strokeWidth={16} fill="none" strokeLinecap="round" />
  </svg>
);

// ─── Zhu Bajie SVG ────────────────────────────────────────────────────────────
const Bajie: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <svg viewBox="-320 -450 640 820" width={580} height={820}
       style={{ position: "absolute", left: "50%", top: 80, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "center top" }}>
    {/* Glow */}
    <ellipse cx={0} cy={0} rx={280} ry={320} fill={P.red} opacity={0.08} />

    {/* Nine-tooth rake */}
    <g transform="rotate(20,0,0)">
      <rect x={-8} y={-440} width={18} height={760} rx={9} fill="#8B6040" stroke={P.ink} strokeWidth={4} />
      {[-80,-50,-20,10,40,70,100,130,160].map((x,i)=>(
        <rect key={i} x={x-240} y={-450} width={14} height={55} rx={4} fill="#707070" stroke={P.ink} strokeWidth={3} />
      ))}
      <rect x={-250} y={-450} width={230} height={22} rx={4} fill="#606060" stroke={P.ink} strokeWidth={3} />
    </g>

    {/* Fat body */}
    <path d="M-170,0 Q-185,120 -150,290 Q-80,380 0,390 Q80,380 150,290 Q185,120 170,0 Z"
          fill="#C08060" stroke={P.ink} strokeWidth={6} />

    {/* Belly */}
    <ellipse cx={0} cy={160} rx={120} ry={110} fill="#D4A080" stroke={P.ink} strokeWidth={4} />

    {/* Arms */}
    <path d="M-170,20 Q-260,80 -270,170" stroke="#C08060" strokeWidth={45} fill="none" strokeLinecap="round" />
    <path d="M170,20 Q260,80 270,170" stroke="#C08060" strokeWidth={45} fill="none" strokeLinecap="round" />

    {/* Big round head */}
    <ellipse cx={0} cy={-220} rx={175} ry={180} fill="#D4A080" stroke={P.ink} strokeWidth={6} />

    {/* Big floppy ears */}
    <ellipse cx={-155} cy={-210} rx={50} ry={80} fill="#C09070" stroke={P.ink} strokeWidth={5} />
    <ellipse cx={155} cy={-210} rx={50} ry={80} fill="#C09070" stroke={P.ink} strokeWidth={5} />

    {/* Pig snout */}
    <ellipse cx={0} cy={-150} rx={70} ry={52} fill="#D4A0A0" stroke={P.ink} strokeWidth={5} />
    <circle cx={-22} cy={-150} r={20} fill="#AA7070" opacity={0.6} />
    <circle cx={22} cy={-150} r={20} fill="#AA7070" opacity={0.6} />

    {/* Eyes */}
    <ellipse cx={-65} cy={-265} rx={35} ry={30} fill={P.white} stroke={P.ink} strokeWidth={5} />
    <ellipse cx={65} cy={-265} rx={35} ry={30} fill={P.white} stroke={P.ink} strokeWidth={5} />
    <circle cx={-58} cy={-262} r={18} fill={P.ink} />
    <circle cx={72} cy={-262} r={18} fill={P.ink} />
    <circle cx={-52} cy={-268} r={6} fill={P.white} />
    <circle cx={78} cy={-268} r={6} fill={P.white} />

    {/* Brows — comic angry */}
    <path d="M-105,-302 L-38,-285" stroke={P.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M105,-302 L38,-285" stroke={P.ink} strokeWidth={10} strokeLinecap="round" />

    {/* Mouth — big grin */}
    <path d="M-60,-100 Q0,-68 60,-100" stroke={P.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M-30,-95 L-22,-68 M30,-95 L22,-68" stroke={P.ink} strokeWidth={5} strokeLinecap="round" />

    {/* Monk hat on head */}
    <ellipse cx={0} cy={-388} rx={130} ry={20} fill="#606060" stroke={P.ink} strokeWidth={4} />
    <path d="M-130,-388 Q-100,-450 0,-470 Q100,-450 130,-388 Z" fill="#707070" stroke={P.ink} strokeWidth={4} />
  </svg>
);

// ─── Scene 0 · Title 西游记 (0–90f) ──────────────────────────────────────────
const S0_Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, from: 6, to: 1, durationInFrames: 24, config: { damping: 13, stiffness: 180 } });
  const op = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const subOp = interpolate(frame, [28, 44], [0, 1], { extrapolateRight: "clamp" });
  const subY = interpolate(frame, [28, 46], [30, 0], { extrapolateRight: "clamp" });
  const glow = 1 + Math.sin(frame * 0.14) * 0.2;

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Audio src={staticFile("audio/impact.wav")} startFrom={0} volume={0.9} />
      <Flash />
      <InkLines cx={540} cy={900} delay={2} color={P.red} count={100} />

      <div style={{ opacity: op, transform: `scale(${s})`, textAlign: "center", zIndex: 10 }}>
        <div style={{
          fontSize: 220, fontWeight: 900, fontFamily: FONT,
          color: P.ink,
          textShadow: `4px 4px 0 ${P.red}, 8px 8px 0 ${P.red}55`,
          lineHeight: 1,
        }}>西游记</div>
      </div>

      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, textAlign: "center", marginTop: 24, zIndex: 10 }}>
        <div style={{
          fontSize: 46, fontWeight: 700, color: P.red, fontFamily: FONT,
          letterSpacing: "0.25em",
          textShadow: `0 0 ${20 * glow}px ${P.red}88`,
        }}>
          师徒五人 · 取经路
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 1 · 孙悟空 (90–240f) ──────────────────────────────────────────────
const S1_Wukong: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bodyS = spring({ frame, fps, from: 0.1, to: 1, durationInFrames: 22, config: { damping: 9, stiffness: 360 } });
  const pulse = 1 + Math.sin(frame * 0.12) * 0.025;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/whoosh.wav")} startFrom={0} volume={0.7} />
      <Flash />
      <Shake delay={0} intensity={14}>
        <InkLines cx={540} cy={780} delay={2} color={P.gold} count={110} />
        <Wukong scale={bodyS * pulse} />
      </Shake>
      <NameBanner name="孙悟空" title="齐天大圣" delay={40} color={P.gold} />
    </AbsoluteFill>
  );
};

// ─── Scene 2 · 猪八戒 (240–380f) ─────────────────────────────────────────────
const S2_Bajie: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bodyS = spring({ frame, fps, from: 0.1, to: 1, durationInFrames: 20, config: { damping: 9, stiffness: 380 } });
  const pulse = 1 + Math.sin(frame * 0.1) * 0.03;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/impact.wav")} startFrom={0} volume={0.75} />
      <Flash />
      <Shake delay={0} intensity={16}>
        <InkLines cx={540} cy={800} delay={2} color={P.red} count={115} />
        <Bajie scale={bodyS * pulse} />
      </Shake>
      <NameBanner name="猪八戒" title="天蓬元帅" delay={38} color={P.red} />
    </AbsoluteFill>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────
const SCENES = [
  { from: 0,   dur: 95,  comp: S0_Title  },
  { from: 88,  dur: 158, comp: S1_Wukong },
  { from: 238, dur: 148, comp: S2_Bajie  },
];

export const XIYOU_PREVIEW_TOTAL = 386;

export const XiyouPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const inkOff = (frame * 0.25) % 80;

  return (
    <AbsoluteFill style={{ background: P.paper }}>
      {/* Subtle ink grain texture via SVG noise lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(13,8,4,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(13,8,4,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        backgroundPosition: `0 ${inkOff}px`,
      }} />

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
