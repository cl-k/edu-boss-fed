/*
 * @Description: 菜单相关请求模块
 * @Author: k
 */
import request from '@/utils/request'

interface MenuForm {
  id?: number;
  parentId: number;
  name: string;
  href: string;
  icon?: string;
  orderNum?: number;
  description?: string;
  shown?: boolean;
}

export const createOrUpdateMenu = (data: MenuForm) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: { id }
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
