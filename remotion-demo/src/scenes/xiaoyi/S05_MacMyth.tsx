import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, CrossCard, CheckCard, Card, PopIn } from "../../components/XiaoYiOverlay";

export const S05_MacMyth: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 56px", gap: 24,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ ...xt.h2, color: xy.black, textAlign: "center" }}>
        误区①
      </div>
    </FlyIn>

    <FlyIn delay={8} from="left">
      <CrossCard delay={8}>
        <Card style={{ width: 380 }} accent={xy.red}>
          <div style={{ fontSize: 52, textAlign: "center", marginBottom: 8 }}>🍎</div>
          <div style={{ ...xt.h3, color: xy.black, textAlign: "center" }}>需要买 Mac Mini</div>
          <div style={{ ...xt.stat, color: xy.red, fontSize: 72, textAlign: "center" }}>¥3000</div>
          <div style={{ ...xt.sm, color: xy.darkGray, textAlign: "center" }}>❌ 完全是误区！</div>
        </Card>
      </CrossCard>
    </FlyIn>

    <PopIn delay={30}>
      <div style={{ ...xt.h2, color: xy.darkGray, textAlign: "center" }}>其实</div>
    </PopIn>

    <FlyIn delay={38} from="right">
      <CheckCard delay={38}>
        <Card style={{ width: 380 }} accent={xy.green}>
          <div style={{ fontSize: 52, textAlign: "center", marginBottom: 8 }}>🪟</div>
          <div style={{ ...xt.h3, color: xy.black, textAlign: "center" }}>Windows 一样能跑</div>
          <div style={{ ...xt.stat, color: xy.green, fontSize: 72, textAlign: "center" }}>¥0</div>
          <div style={{ ...xt.sm, color: xy.darkGray, textAlign: "center" }}>✅ 你的电脑就行！</div>
        </Card>
      </CheckCard>
    </FlyIn>
  </div>
);
