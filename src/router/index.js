/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:25:23
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { basicRoutes } from './basic-routes'
import { setupRouterGuards } from './guards'

export const router = createRouter({
  history:
    import.meta.env.VITE_USE_HASH === 'true'
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH || '/')
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH || '/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app) {
  app.use(router)
  setupRouterGuards(router)
}
