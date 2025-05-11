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
