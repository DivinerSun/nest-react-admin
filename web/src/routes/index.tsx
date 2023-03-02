import { FC, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazyLoad } from "./LazyLoad";

const AppRouter: FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />}>
          <Route path="/home" element={lazyLoad("home")} />
          <Route path="/system/user" element={lazyLoad("user")} />
          <Route path="/system/role" element={lazyLoad("role")} />
        </Route>
        <Route path="/login" element={lazyLoad("login")} />
        <Route path="*" element={lazyLoad("error")} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
