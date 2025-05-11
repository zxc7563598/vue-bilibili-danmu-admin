import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/users/list', params), //
  create: data => request.post('/users/create-or-update', data), //
  update: data => request.post('/users/create-or-update', data), //
  delete: id => request.post('/users/delete', id),
  resetPwd: data => request.post('/users/update-password', data),

  getAllRoles: () => request.post('/roles/all'), //
}
