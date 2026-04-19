import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, CrossCard, CheckCard, Card } from "../../components/XiaoYiOverlay";

export const S03_PriceCompare: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 50px", gap: 28,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ ...xt.h2, color: xy.black, textAlign: "center" }}>安装方式对比</div>
    </FlyIn>

    <FlyIn delay={10} from="left">
      <CrossCard delay={10}>
        <Card style={{ width: 380, minHeight: 140 }} accent={xy.red}>
          <div style={{ ...xt.label, color: xy.darkGray, marginBottom: 8 }}>❌ 找人上门安装</div>
          <div style={{ ...xt.stat, color: xy.red, fontSize: 80 }}>¥500</div>
          <div style={{ ...xt.sm, color: xy.darkGray }}>还不一定靠谱</div>
        </Card>
      </CrossCard>
    </FlyIn>

    <FlyIn delay={28} from="right">
      <CheckCard delay={28}>
        <Card style={{ width: 380, minHeight: 140 }} accent={xy.green}>
          <div style={{ ...xt.label, color: xy.darkGray, marginBottom: 8 }}>✅ 跟着本教程自己装</div>
          <div style={{ ...xt.stat, color: xy.green, fontSize: 80 }}>¥0</div>
          <div style={{ ...xt.sm, color: xy.darkGray }}>看完就会，亲测有效</div>
        </Card>
      </CheckCard>
    </FlyIn>
  </div>
);
