/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:28:30
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { request } from '@/utils'

export default {
  login: data => request.post('/auth/login', data, { needToken: false }), // 登陆
  getUser: () => request.post('/users/detail'), // 获取用户详细信息
}
