import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/shop-management/user-management/get-data', params), // 获取用户列表
  details: user_id => request.post('/shop-management/user-management/get-user-data', { user_id }), // 获取用户详细信息
  getUserInfo: uid => request.post('/shop-management/user-management/get-user-info', { uid }), // 根据UID查询用户数据
  setData: (user_id, uid, name, password, vip_type) => request.post('/shop-management/user-management/set-data', { user_id, uid, name, password, vip_type }, { removeEmpty: false }), // 存储用户信息
  resetPassword: () => request.post('/shop-management/user-management/reset-password'), // 清空所有用户密码
  getUserRecords: user_id => request.post('/shop-management/user-management/get-user-records', { user_id }), // 获取用户航海开通记录
  setUserPoint: (type, point, user_id) => request.post('/shop-management/user-management/set-user-point', { type, point, user_id }), // 变更用户积分
}
