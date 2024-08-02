import { ReactNode } from 'react'
import type { MenuProps } from 'antd'

export type MenuItem = Required<MenuProps>['items'][number]

export type MenuClickEventHandler = Required<MenuProps>['onClick']

export type MenuOpenChangeEventHandler = Required<MenuProps>['onOpenChange']

export interface AppRouteItem {
  path: string
  element?: ReactNode
  children?: AppRouteItem[]
  title?: string
  icon?: ReactNode
  hidden?: boolean
}
