import { request } from '@/utils'

export default {
  getUpdateLogs: () => request.post('/home/get-update-logs'), // 获取更新日志
  readUpdateLogs: id => request.post('/home/read-update-logs', { id }), // 更新日志标记已读
  downloadSourceCode: version => request.post('/home/download-source-code', { version }), // 由服务器下载后台源码
  createExportTask: () => request.post('/home/create-export-task'), // 创建数据导出任务（进行中的任务会被复用，返回 reused 标识）
  getExportProgress: task_id => request.post('/home/get-export-progress', { task_id }), // 获取数据导出进度
  probeExportProgress: task_id => request.post('/home/get-export-progress', { task_id }, { needTip: false }), // 静默探测导出进度（页面恢复时用，任务已失效也不弹提示）
}
