// Dark theme overlay styles - black bg + bright colors for Screen blend mode in 剪映
export const xy = {
  red: "#FF3B30",
  orange: "#FF9500",
  yellow: "#FFD60A",
  green: "#30D158",
  white: "#FFFFFF",
  black: "#000000",        // transparent in Screen mode
  dimText: "rgba(255,255,255,0.65)",
  cardBg: "rgba(255,255,255,0.12)",
  cardBorder: "rgba(255,255,255,0.2)",
  redBg: "rgba(255,59,48,0.25)",
  greenBg: "rgba(48,209,88,0.2)",
};

export const xf = {
  black: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
};

export const xt = {
  hero: { fontSize: 88, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, fontFamily: xf.black },
  h1:   { fontSize: 64, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1,  fontFamily: xf.black },
  h2:   { fontSize: 48, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2,  fontFamily: xf.black },
  h3:   { fontSize: 36, fontWeight: 700, lineHeight: 1.3, fontFamily: xf.black },
  body: { fontSize: 28, fontWeight: 500, lineHeight: 1.5, fontFamily: xf.black },
  sm:   { fontSize: 22, fontWeight: 500, lineHeight: 1.4, fontFamily: xf.black },
  label:{ fontSize: 18, fontWeight: 700, letterSpacing: "0.06em", fontFamily: xf.black },
  stat: { fontSize: 100, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: xf.black },
};
