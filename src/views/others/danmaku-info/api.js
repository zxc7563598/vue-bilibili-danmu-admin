import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/others/danmaku-info/get-data', params), // 获取列表数据
}
