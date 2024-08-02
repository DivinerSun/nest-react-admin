import { AppRouteItem, MenuItem } from '@/types/router'

export const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem =>
  ({
    key,
    icon,
    children,
    label,
    type,
  }) as MenuItem

type MyFunction = (routes: AppRouteItem[]) => MenuItem[]
// 递归路由生成菜单栏
export const deepLoadRoutes: MyFunction = (routes: AppRouteItem[]) => {
  return routes
    .map((route) => {
      if (route.hidden) {
        return null
      }
      if (route.children && route.children.length > 0) {
        return getItem(
          route.title,
          route.path,
          route.icon,
          deepLoadRoutes(route.children),
        )
      }

      return getItem(route.title, route.path, route.icon)
    })
    .filter((item) => !!item)
}

// 通过pathname获取当前菜单的openKeys
export const getOpenKeysByPathname = (path: string) => {
  let newStr: string = ''
  const newArr: any[] = []
  const arr = path.split('/').map((i) => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}

// 通过pathname递归当前路由的所有关联的路由，生成面包屑导航栏
export const getBreadcrumbList = (path: string, menuList: AppRouteItem[]) => {
  const tempPath: AppRouteItem[] = []
  try {
    const getNodePath = (node: AppRouteItem) => {
      tempPath.push(node)
      // 找到符合条件的节点，通过throw终止掉递归
      if (node.path === path) {
        throw new Error()
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i])
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        tempPath.pop()
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        tempPath.pop()
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i])
    }
  } catch (e) {
    return tempPath.map((item) => ({ ...item }))
  }
}
