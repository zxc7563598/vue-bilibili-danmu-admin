/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:30:03
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { request } from '@/utils'

export default {
  changePassword: data => request.post('/auth/update-password', data),
  updateProfile: data => request.post('/users/update-profile', data),
}
