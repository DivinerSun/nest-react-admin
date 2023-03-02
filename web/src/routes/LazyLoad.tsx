import React, { Suspense, lazy } from "react";
import { Spin } from "antd";

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const LazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        />
      }
    >
      <Comp />
    </Suspense>
  );
};

// 动态路由
export const lazyLoad = (moduleName: string) => {
  return LazyLoad(lazy(() => import(`@/pages/${moduleName}`)));
};

export default LazyLoad;
