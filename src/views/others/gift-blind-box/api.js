import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/others/gift-blind-box/get-data', params), // 获取列表数据
  getStatisticData: (uid, uname, create_date) => request.post('/others/gift-blind-box/get-statistic-data', { uid, uname, create_date }), // 获取列表数据
}
