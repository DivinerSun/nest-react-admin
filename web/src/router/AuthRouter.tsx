import { message } from "antd";
import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../utils/storage";

// 已经登录
const Authed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);
  return <></>;
};

// 需要登录
const NeedAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
    message.warning("登录信息已过期，请重新登录！", 2);
  }, []);
  return <></>;
};

const AuthRouter: FC<{ children: JSX.Element }> = ({ children }) => {
  const token = getToken();
  const { pathname } = useLocation();

  // 没有token，并且不是登录路由，则跳转到登录页面
  if (!token && pathname !== "/login") {
    return <NeedAuth />;
  }

  // 有token，是登录路由，则跳转到主页
  if (token && pathname === "/login") {
    return <Authed />;
  }
  return <>{children}</>;
};

export default AuthRouter;
