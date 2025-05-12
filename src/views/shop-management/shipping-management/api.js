import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/shop-management/shipping-management/get-data', params), // 获取发货列表数据
  details: records_id => request.post('/shop-management/shipping-management/get-data-details', { records_id }), // 获取发货详情
  setData: (records_id, tracking_number, status) => request.post('/shop-management/shipping-management/set-data-details', { records_id, tracking_number, status }), // 变更发货信息
}
