/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:29:51
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/users/list', params), //
  create: data => request.post('/users/create-or-update', data), //
  update: data => request.post('/users/create-or-update', data), //
  delete: id => request.post('/users/delete', id),
  resetPwd: data => request.post('/users/update-password', data),

  getAllRoles: () => request.post('/roles/all'), //
}
