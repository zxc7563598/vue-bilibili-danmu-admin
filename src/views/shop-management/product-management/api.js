/**********************************
 * @Author: 何俊杰
 * @LastEditor: 何俊杰
 * @LastEditTime: 2023/12/05 21:29:27
 * @Email: junjie.he.925@gmail.com
 * Copyright © 2025 星河避难所(何俊杰) | https://hejunjie.life
 **********************************/

import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/shop-management/get-data', params), // 获取商品列表
  details: goods_id => request.post('/shop-management/get-data-details', { goods_id }), // 获取商品信息
  uploadImages: formData => request.post('/shop-management/upload-images', formData, { file: true }), // 上传图片
  setDataDetails: (goods_id, name, amount, tips, cover_image, carousel_images, details_images, service_description_images, status, type, sort, sale_num, sale_increase, subs) => request.post('/shop-management/set-data-details', { goods_id, name, amount, tips, cover_image, carousel_images, details_images, service_description_images, status, type, sort, sale_num, sale_increase, subs }, { removeEmpty: false }), // 存储商品信息
}
