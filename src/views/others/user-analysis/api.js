import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/others/user-analysis/get-data', params), // 获取列表数据
  dailyActive: (uid, year, month) => request.post('/others/user-analysis/get-daily-active', { uid, year, month }),
  getWordCloudFromText: uid => request.post('/others/user-analysis/get-word-cloud-from-text', { uid }),
}
