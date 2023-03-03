import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout";
import { lazyLoad } from "./LazyLoad";

const AppRouter: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={lazyLoad("home")} />
          <Route path="/system/user" element={lazyLoad("user")} />
          <Route path="/system/role" element={lazyLoad("role")} />
        </Route>
        <Route path="/login" element={lazyLoad("login")} />
        <Route path="*" element={lazyLoad("error")} />
      </Routes>
    </>
  );
};

export default AppRouter;
