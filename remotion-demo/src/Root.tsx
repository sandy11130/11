import { Composition } from "remotion";
import { CoolDemo } from "./Demo";

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
    </>
  );
};
