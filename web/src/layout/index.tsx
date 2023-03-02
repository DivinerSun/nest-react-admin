import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";

const Layout: FC = () => {
  return (
    <div className="layout-page">
      <div className="page-header">
        <Header />
      </div>
      <div className="page-content">
        <div className="page-content-menu">
          <Menu />
        </div>
        <div className="page-content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
