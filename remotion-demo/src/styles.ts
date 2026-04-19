export const colors = {
  bg: "#05050f",
  surface: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  accent: "#7c3aed",
  accentGlow: "rgba(124,58,237,0.4)",
  accentBright: "#a855f7",
  cyan: "#06b6d4",
  cyanGlow: "rgba(6,182,212,0.35)",
  green: "#10b981",
  orange: "#f59e0b",
  textPrimary: "rgba(255,255,255,0.95)",
  textSecondary: "rgba(255,255,255,0.55)",
  textDim: "rgba(255,255,255,0.25)",
};

export const fonts = {
  sans: "'Inter', 'Helvetica Neue', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

export const type = {
  hero: {
    fontSize: 100,
    fontWeight: 800,
    letterSpacing: "-0.045em",
    lineHeight: 1.0,
    fontFamily: fonts.sans,
  },
  h1: {
    fontSize: 72,
    fontWeight: 700,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
    fontFamily: fonts.sans,
  },
  h2: {
    fontSize: 52,
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
    fontFamily: fonts.sans,
  },
  h3: {
    fontSize: 36,
    fontWeight: 600,
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
    fontFamily: fonts.sans,
  },
  body: {
    fontSize: 26,
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.55,
    fontFamily: fonts.sans,
  },
  stat: {
    fontSize: 90,
    fontWeight: 900,
    letterSpacing: "-0.05em",
    lineHeight: 1.0,
    fontFamily: fonts.sans,
  },
  label: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    fontFamily: fonts.sans,
  },
  mono: {
    fontSize: 22,
    fontWeight: 500,
    fontFamily: fonts.mono,
    letterSpacing: "0.02em",
  },
};
