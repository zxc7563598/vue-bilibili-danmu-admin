import { request } from '@/utils'

export default {
  getData: () => request.post('/configuration/system-settings/get-data'), // 获取配置
  getDataQrcode: url => request.post('/configuration/system-settings/get-data-qrcode', { url }), // 获取二维码
  setData: (shop_name, shop_url, system_api_url, system_aes_key, system_aes_iv, system_key, host, listen, re_open_host, secure_api_key, redis_host, redis_port, redis_password, db_host, db_port, db_name, db_user, db_password) => request.post('/configuration/system-settings/set-data', { shop_name, shop_url, system_api_url, system_aes_key, system_aes_iv, system_key, host, listen, re_open_host, secure_api_key, redis_host, redis_port, redis_password, db_host, db_port, db_name, db_user, db_password }, { removeEmpty: false }), // 存储数据
}
