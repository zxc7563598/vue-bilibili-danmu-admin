/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2024/04/01 15:52:04
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { request } from '@/utils'

export default {
  getData: () => request.post('/mall-configuration/get-data'), // 获取商城配置信息
  setData: (login_background_image, personal_background_image, theme_color, live_streaming_link, user_login_password, protocols_surname, protocols_uid, protocols_name, protocols_signature, protocols_content, gift_records, listening_open_vip, vip_lv1_bonus_points, vip_lv2_bonus_points, vip_lv3_bonus_points, virtual_gift_order_successful_icon, virtual_gift_order_successful_title, virtual_gift_order_successful_content, virtual_gift_order_successful_button, realism_gift_order_successful_icon, realism_gift_order_successful_title, realism_gift_order_successful_content, realism_gift_order_successful_button, tribute_gift_order_successful_icon, tribute_gift_order_successful_title, tribute_gift_order_successful_content, tribute_gift_order_successful_button, tribute_gift_order_successful_rankings, tribute_gift_order_successful_rankingslist, enable_aggregate_mail, enable_shop_mail, email_address, address_as) => request.post('/mall-configuration/set-data', { login_background_image, personal_background_image, theme_color, live_streaming_link, user_login_password, protocols_surname, protocols_uid, protocols_name, protocols_signature, protocols_content, gift_records, listening_open_vip, vip_lv1_bonus_points, vip_lv2_bonus_points, vip_lv3_bonus_points, virtual_gift_order_successful_icon, virtual_gift_order_successful_title, virtual_gift_order_successful_content, virtual_gift_order_successful_button, realism_gift_order_successful_icon, realism_gift_order_successful_title, realism_gift_order_successful_content, realism_gift_order_successful_button, tribute_gift_order_successful_icon, tribute_gift_order_successful_title, tribute_gift_order_successful_content, tribute_gift_order_successful_button, tribute_gift_order_successful_rankings, tribute_gift_order_successful_rankingslist, enable_aggregate_mail, enable_shop_mail, email_address, address_as }), // 存储商城配置信息
  uploadImages: formData => request.post('/mall-configuration/upload-images', formData, { file: true }), // 上传图片
}
