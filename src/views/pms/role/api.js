/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:29:27
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/roles/list', params),
  create: data => request.post('/roles/create-or-update', data),
  update: data => request.post('/roles/create-or-update', data),
  delete: id => request.post('/roles/delete', id),
  getAllPermissionTree: () => request.post('/permissions/menu'),
  getAllUsers: (params = {}) => request.post('/users/list', params),
  changeRoleUsers: data => request.post('/permissions/role/users', data),
}
