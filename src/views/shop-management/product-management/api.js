import { request } from '@/utils'

export default {
  read: (params = {}) => request.post('/shop-management/product-management/get-data', params), // 获取商品列表
  details: goods_id => request.post('/shop-management/product-management/get-data-details', { goods_id }), // 获取商品信息
  uploadImages: formData => request.post('/shop-management/product-management/upload-images', formData, { file: true }), // 上传图片
  setDataDetails: (goods_id, name, amount_type, amount, tips, cover_image, carousel_images, details_images, service_description_images, status, type, sort, sale_num, sale_increase, subs, sub_num) => request.post('/shop-management/product-management/set-data-details', { goods_id, name, amount_type, amount, tips, cover_image, carousel_images, details_images, service_description_images, status, type, sort, sale_num, sale_increase, subs, sub_num }, { removeEmpty: false }), // 存储商品信息
}
