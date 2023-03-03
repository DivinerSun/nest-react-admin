import { FC } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Layout from "../layout";
import AuthRouter from "./AuthRouter";
import { lazyLoad } from "./LazyLoad";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/home"} />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: lazyLoad("home"),
      },
      {
        path: "/system/user",
        element: lazyLoad("system/user"),
      },
      {
        path: "/system/role",
        element: lazyLoad("system/role"),
      },
      {
        path: "*",
        element: lazyLoad("error"),
      },
    ],
  },
  {
    path: "/login",
    element: lazyLoad("login"),
  },
  {
    path: "*",
    element: lazyLoad("error"),
  },
];

const AppRouter: FC = () => {
  return <AuthRouter>{useRoutes(routes) as JSX.Element}</AuthRouter>;
};

export default AppRouter;
