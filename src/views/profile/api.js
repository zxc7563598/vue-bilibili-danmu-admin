import { request } from '@/utils'

export default {
  changePassword: data => request.post('/auth/update-password', data),
  updateProfile: data => request.post('/users/update-profile', data),
}
