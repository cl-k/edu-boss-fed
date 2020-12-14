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

// 保存或更新资源分类
export const saveOrUpdateCategory = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

// 删除资源分类，如果资源分类下有资源，不允许删除
export const deleteCategory = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
