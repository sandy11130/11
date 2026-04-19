import { Composition, AbsoluteFill } from "remotion";
import { CoolDemo } from "./Demo";
import { XiaoYiVideo } from "./XiaoYiVideo";

const XiaoYiWhiteBg: React.FC = () => (
  <AbsoluteFill style={{ background: "#ffffff" }}>
    <XiaoYiVideo />
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CoolDemo"
        component={CoolDemo}
        durationInFrames={420}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="XiaoYiOverlay"
        component={XiaoYiVideo}
        durationInFrames={2940}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="XiaoYiPreview"
        component={XiaoYiWhiteBg}
        durationInFrames={2940}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
