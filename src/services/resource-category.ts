/*
 * @Description: 资源分类相关请求模块
 * @Author: k
 */
import request from '@/utils/request'

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
