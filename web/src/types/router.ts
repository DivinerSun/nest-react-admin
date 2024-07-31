import { ReactNode } from 'react'

export interface AppRouteItem {
  path: string
  element?: ReactNode
  children?: AppRouteItem[]
  title?: string
  icon?: ReactNode
  hidden?: boolean
}
