import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { HomeFilled, SettingFilled } from '@ant-design/icons'
import Layout from '@/components/Layout'
import LazyLoading from '@/components/LazyLoading'
import { AppRouteItem } from '@/types/router'

export const lazyRoute = (path: string) => {
  const Comp = lazy(() => import(`../pages/${path}`))
  return (
    <Suspense fallback={<LazyLoading />}>
      <Comp />
    </Suspense>
  )
}

// 公共路由
export const commonRoutes: AppRouteItem[] = [
  {
    path: '/login',
    element: lazyRoute('login'),
  },
  {
    path: '*',
    element: lazyRoute('error'),
  },
]

// 认证路由
export const authRoutes: AppRouteItem[] = [
  {
    path: '/home',
    title: '首页',
    icon: <HomeFilled />,
    element: lazyRoute('home'),
  },
  {
    path: '/sys',
    title: '系统设置',
    icon: <SettingFilled />,
    children: [
      {
        path: '/sys/dict',
        title: '字典管理',
        element: lazyRoute('sys/dict'),
      },
      {
        path: '/sys/user',
        title: '用户管理',
        element: lazyRoute('sys/user'),
      },
      {
        path: '/sys/role',
        title: '角色管理',
        element: lazyRoute('sys/role'),
      },
      {
        path: '/sys/auth',
        title: '权限管理',
        element: lazyRoute('sys/auth'),
      },
    ],
  },
]

export const routes: AppRouteItem[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/home'} />,
      },
      ...authRoutes,
      {
        path: '*',
        element: lazyRoute('error'),
      },
    ],
  },
  ...commonRoutes,
]
