import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { ProgressBar, LogoBadge, LowerThird } from "./components/XiaoYiOverlay";
import { S01_Title } from "./scenes/xiaoyi/S01_Title";
import { S02_Hook } from "./scenes/xiaoyi/S02_Hook";
import { S03_PriceCompare } from "./scenes/xiaoyi/S03_PriceCompare";
import { S04_Deployed } from "./scenes/xiaoyi/S04_Deployed";
import { S05_MacMyth } from "./scenes/xiaoyi/S05_MacMyth";
import { S06_TutorialMyth } from "./scenes/xiaoyi/S06_TutorialMyth";
import { S07_Authority } from "./scenes/xiaoyi/S07_Authority";
import { S08_Roadmap } from "./scenes/xiaoyi/S08_Roadmap";
import { S09_Step1 } from "./scenes/xiaoyi/S09_Step1";
import { S10_Step2 } from "./scenes/xiaoyi/S10_Step2";
import { S11_Step3 } from "./scenes/xiaoyi/S11_Step3";
import { S12_ChatDemo } from "./scenes/xiaoyi/S12_ChatDemo";
import { S13_NextEp } from "./scenes/xiaoyi/S13_NextEp";
import { S14_Value } from "./scenes/xiaoyi/S14_Value";
import { S15_CTA } from "./scenes/xiaoyi/S15_CTA";
import { S16_Outro } from "./scenes/xiaoyi/S16_Outro";

// 95s × 30fps = 2850 frames total
// Scene timing (frames)
const SCENES = [
  { from: 0,    dur: 150, comp: S01_Title,      chapter: "小白安装指南" },   // 0–5s
  { from: 150,  dur: 180, comp: S02_Hook,        chapter: "帮你省钱" },       // 5–11s
  { from: 330,  dur: 210, comp: S03_PriceCompare,chapter: "安装方式对比" },   // 11–18s
  { from: 540,  dur: 210, comp: S04_Deployed,    chapter: "博主亲测" },       // 18–25s
  { from: 750,  dur: 210, comp: S05_MacMyth,     chapter: "误区：需要Mac？" },// 25–32s
  { from: 960,  dur: 210, comp: S06_TutorialMyth,chapter: "误区：教程太难" }, // 32–39s
  { from: 1170, dur: 210, comp: S07_Authority,   chapter: "博主背书" },       // 39–46s
  { from: 1380, dur: 210, comp: S08_Roadmap,     chapter: "今天学什么" },     // 46–53s
  { from: 1590, dur: 180, comp: S09_Step1,       chapter: "步骤① 下载" },     // 53–59s
  { from: 1770, dur: 180, comp: S10_Step2,       chapter: "步骤② 配置" },     // 59–65s
  { from: 1950, dur: 180, comp: S11_Step3,       chapter: "步骤③ 启动" },     // 65–71s
  { from: 2130, dur: 210, comp: S12_ChatDemo,    chapter: "效果展示" },       // 71–78s
  { from: 2340, dur: 180, comp: S13_NextEp,      chapter: "下期预告" },       // 78–84s
  { from: 2520, dur: 150, comp: S14_Value,       chapter: "记住这句话" },     // 84–89s
  { from: 2670, dur: 120, comp: S15_CTA,         chapter: "点赞收藏" },       // 89–93s
  { from: 2790, dur: 150, comp: S16_Outro,       chapter: "小易玩AI" },       // 93–98s (slight extend)
] as const;

const TOTAL = 2940; // 98s for comfortable outro

export const XiaoYiVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL;

  // Find current chapter
  const currentScene = [...SCENES].reverse().find(s => frame >= s.from);
  const chapter = currentScene?.chapter ?? "";
  const chapterFrom = currentScene?.from ?? 0;

  return (
    <AbsoluteFill style={{ background: "transparent" }}>
      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Logo badge - always visible after frame 10 */}
      {frame >= 10 && <LogoBadge />}

      {/* Chapter lower-third - changes per scene */}
      {frame >= chapterFrom + 5 && frame < chapterFrom + 90 && (
        <LowerThird title={chapter} delay={chapterFrom + 5} />
      )}

      {/* Scenes */}
      {SCENES.map(({ from, dur, comp: Comp }) => (
        <Sequence key={from} from={from} durationInFrames={dur}>
          <AbsoluteFill>
            <Comp />
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
