import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import AppRouter from "./router";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#9E339F",
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  </BrowserRouter>
);
