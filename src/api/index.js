import { request } from '@/utils'

export default {
  // 获取用户信息
  getUser: () => request.post('/users/detail'),
  // 登出
  logout: () => request.post('/auth/logout', {}, { needTip: false }),
  // 切换当前角色
  switchCurrentRole: role => request.post('/auth/switch-role', { code: role }),
  // 获取角色权限
  getRolePermissions: () => request.post('/roles/permissions'),
  // 验证菜单路径
  validateMenuPath: path => request.post('/permissions/menu/validate', { path }),
}
