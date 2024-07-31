import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <div>
      <h1>公共组件</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
