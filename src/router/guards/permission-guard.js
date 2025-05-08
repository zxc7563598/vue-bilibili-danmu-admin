/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:25:07
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import api from '@/api'
import { useAuthStore, usePermissionStore, useUserStore } from '@/store'
import { getPermissions, getUserInfo } from '@/store/helper'

const WHITE_LIST = ['/login', '/404']
export function createPermissionGuard(router) {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken

    /** 没有token */
    if (!token) {
      if (WHITE_LIST.includes(to.path))
        return true
      return { path: 'login', query: { ...to.query, redirect: to.path } }
    }

    // 有token的情况
    if (to.path === '/login')
      return { path: '/' }
    if (WHITE_LIST.includes(to.path))
      return true

    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    if (!userStore.userInfo) {
      const [user, permissions] = await Promise.all([getUserInfo(), getPermissions()])
      userStore.setUser(user)
      permissionStore.setPermissions(permissions)
      const routeComponents = import.meta.glob('@/views/**/*.vue')
      permissionStore.accessRoutes.forEach((route) => {
        route.component = routeComponents[route.component] || undefined
        !router.hasRoute(route.name) && router.addRoute(route)
      })
      return { ...to, replace: true }
    }

    const routes = router.getRoutes()
    if (routes.find(route => route.name === to.name))
      return true

    // 判断是无权限还是404
    const { data: hasMenu } = await api.validateMenuPath(to.path)
    return hasMenu.has
      ? { name: '403', query: { path: to.fullPath }, state: { from: 'permission-guard' } }
      : { name: '404', query: { path: to.fullPath } }
  })
}
