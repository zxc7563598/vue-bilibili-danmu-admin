import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/others/gift-info/get-data', params), // 获取列表数据
  getStatisticData: (uid, uname, create_date) => request.post('/others/gift-info/get-statistic-data', { uid, uname, create_date }), // 获取列表数据
}
