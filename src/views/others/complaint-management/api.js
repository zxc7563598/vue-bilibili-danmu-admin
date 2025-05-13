import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/others/complaint-management/get-data', params), // 获取投诉数据列表
  details: complaint_id => request.post('/others/complaint-management/get-data-details', { complaint_id }), // 获取投诉详情
}
