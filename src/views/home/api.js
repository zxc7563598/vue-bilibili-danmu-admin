import { request } from '@/utils'

export default {
  getUpdateLogs: () => request.post('/home/get-update-logs'), // 获取更新日志
  readUpdateLogs: id => request.post('/home/read-update-logs', { id }), // 更新日志标记已读
  downloadSourceCode: version => request.post('/home/download-source-code', { version }), // 由服务器下载后台源码
}
