import { router } from '@/router'

const permission = {
  mounted(el, binding) {
    if (!hasPermission(binding.value)) {
      el.remove()
    }
  },
}

export function setupDirectives(app) {
  app.directive('permission', permission)
}

export function hasPermission(code) {
  const currentRoute = unref(router.currentRoute)
  const btns = currentRoute.meta?.btns?.map(item => item.code) || []
  return btns.includes(code)
}
