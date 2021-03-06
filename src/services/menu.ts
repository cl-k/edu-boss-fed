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

export const getEditMenuInfo = (id: string | number = -1) => {
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

// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

// 给角色分配菜单
export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

// 获取角色拥有的菜单列表
export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: 'GET',
    // url: `/boss/menu/getRoleMenus?roleId=${roleId}`
    url: '/boss/menu/getRoleMenus',
    params: { // axios 会把 params 转换为 key=value&key=value 的数据格式放到 url 后面（以?分割）
      roleId
    }
  })
}
