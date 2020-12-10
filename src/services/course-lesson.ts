/*
 * @Description: 课程课时相关请求模块
 * @Author: k
 */
import request from '@/utils/request'

export const saveOrUpdateLesson = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
