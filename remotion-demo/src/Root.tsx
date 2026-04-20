import { Composition, AbsoluteFill } from "remotion";
import { CoolDemo } from "./Demo";
import { XiaoYiVideo } from "./XiaoYiVideo";
import { MyelcVideo } from "./myelc/MyelcVideo";
import { YirenPreview, YIREN_TOTAL } from "./yiren/YirenPreview";
import { XiyouPreview, XIYOU_PREVIEW_TOTAL } from "./xiyou/XiyouPreview";

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
      <Composition
        id="MyelcStandalone"
        component={MyelcVideo}
        durationInFrames={670}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="XiyouPreview"
        component={XiyouPreview}
        durationInFrames={XIYOU_PREVIEW_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="YirenPreview"
        component={YirenPreview}
        durationInFrames={YIREN_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
