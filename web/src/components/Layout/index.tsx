import { FC, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Menu,
  Button,
  Layout,
  theme,
  Breadcrumb,
  Dropdown,
  MenuProps,
  Space,
} from 'antd'
import { authRoutes } from '@/router/routes'
import {
  deepLoadRoutes,
  getBreadcrumbList,
  getOpenKeysByPathname,
} from '@/utils/menu'
import {
  MenuClickEventHandler,
  MenuOpenChangeEventHandler,
} from '@/types/router'

import styles from './index.module.scss'
import sysImg from '@/assets/avatar.gif'

const { Header, Sider, Content, Footer } = Layout

interface LayoutProps {}

const AppLayout: FC<LayoutProps> = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState(getOpenKeysByPathname(pathname))
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()

  const breadcrumbList = getBreadcrumbList(pathname, authRoutes) || []
  const rootSubmenuKeys: string[] = []
  const onOpenChange: MenuOpenChangeEventHandler = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const handleMenuClick: MenuClickEventHandler = ({ key }) => {
    navigate(`${key}`)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    console.log('退出')
  }

  const items: MenuProps['items'] = [
    {
      key: 'user',
      label: <span onClick={handleLogout}>个人信息</span>,
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: <span onClick={handleLogout}>退出登录</span>,
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <Layout className={styles.layoutWrapper}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>
          {collapsed ? <Avatar size={30} src={sysImg} /> : 'Nest React Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={openKeys}
          defaultSelectedKeys={[pathname]}
          items={deepLoadRoutes(authRoutes)}
          onClick={handleMenuClick}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout>
        <Header
          className={styles.header}
          style={{
            background: colorBgContainer,
          }}
        >
          <div className={styles.headerLeft}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 32,
                height: 32,
              }}
            />
            <Breadcrumb
              items={breadcrumbList.map((item) => ({
                ...item,
                href: 'javascript:void(0)',
              }))}
            />
          </div>
          <Space className={styles.headerRight}>
            <Space>
              <SunOutlined />
              <MoonOutlined />
            </Space>
            <Dropdown menu={{ items }}>
              <Space>
                <Avatar size={32} src={sysImg} />
                <span>系统管理员</span>
                <DownOutlined />
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ padding: '10px 20px' }}>
          <Outlet />
        </Content>
        <Footer
          className={styles.footer}
          style={{
            background: colorBgContainer,
          }}
        >
          Nest React Admin ©{new Date().getFullYear()} Created by Diviner
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout
