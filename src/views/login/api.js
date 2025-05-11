import { request } from '@/utils'

export default {
  login: data => request.post('/auth/login', data, { needToken: false }), // 登陆
  getUser: () => request.post('/users/detail'), // 获取用户详细信息
}
