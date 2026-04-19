import { xy, xt } from "../../xiaoyiStyles";
import { FlyIn, PopIn, Card } from "../../components/XiaoYiOverlay";

export const S09_Step1: React.FC = () => (
  <div style={{
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "0 56px", gap: 24,
  }}>
    <FlyIn delay={0} from="top">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: xy.red, color: xy.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          ...xt.h2, fontSize: 28,
        }}>1</div>
        <div style={{ ...xt.h1, color: xy.red, fontSize: 52 }}>下载安装包</div>
      </div>
    </FlyIn>

    <FlyIn delay={14} from="left">
      <Card style={{ width: "100%" }} accent={xy.red}>
        <div style={{ ...xt.label, color: xy.darkGray, marginBottom: 12 }}>📥 操作步骤</div>
        {["打开官方网站（视频中有链接）", "点击 Windows 版下载按钮", "等待下载完成（约 200MB）"].map((step, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12,
          }}>
            <span style={{
              background: xy.red, color: xy.white, borderRadius: "50%",
              width: 28, height: 28, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0, fontSize: 16, fontWeight: 700,
            }}>{i + 1}</span>
            <span style={{ ...xt.body, color: xy.black, fontSize: 24 }}>{step}</span>
          </div>
        ))}
      </Card>
    </FlyIn>

    <PopIn delay={42}>
      <div style={{
        background: xy.yellow, borderRadius: 14, padding: "12px 28px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 28 }}>⚠️</span>
        <span style={{ ...xt.sm, color: xy.black, fontWeight: 700 }}>
          注意：只从官网下载，避免病毒
        </span>
      </div>
    </PopIn>
  </div>
);
