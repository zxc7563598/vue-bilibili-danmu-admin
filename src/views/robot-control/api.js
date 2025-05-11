import { request } from '@/utils'

export default {
  getUserInfo: () => request.post('/rebot/get-user-info'), // 获取用户信息
  getRealRoomInfo: (room_id = 0) => request.post('/rebot/get-real-room-info', { room_id }), // 获取直播间信息
  getConfig: () => request.post('/rebot/get-config'), // 获取配置信息
  setConfig: (timing, present, enter, pk, follow, share, autoresponders, check_in) => request.post('/rebot/set-config', { timing, present, enter, pk, follow, share, autoresponders, check_in }), // 存储配置信息
  getLoginQr: () => request.post('/rebot/get-login-qr'), // 获取登录二维码
  loginCheck: qrcode_key => request.post('/rebot/login-check', { qrcode_key }), // 验证登录信息
  loginOut: () => request.post('/rebot/login-out'), // 退出登录
  connectOut: () => request.post('/rebot/connect-out'), // 断开直播间链接
  exportConfig: () => request.post('/rebot/export-config'), // 导出配置文件
  importConfig: () => request.post('/rebot/import-config'), // 导入配置文件
}
