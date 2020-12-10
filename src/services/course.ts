/*
 * @Description: 课程相关请求模块
 * @Author: k
 */
import request from '@/utils/request'

// 分页查询课程信息
export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 课程上下架
export const changeState = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

// 保存或更新课程信息
export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 上传图片
export const uploadCourseImage = (
  data: any,
  onUploadProgress?: (progressEvent: any) => void
) => {
  // 该接口要求的请求数据类型是：multipart/form-data
  // 所以需要提交 FormData 数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
    // HTML5 新增的上传响应事件：progress
    // onUploadProgress (e: any) { // axios 对 progress 的封装
    //   // console.log(e.loaded) // 已上传的数据大小
    //   // console.log(e.total) // 上传文件的总大小
    //   console.log(Math.floor(e.loaded / e.total * 100))
    // }
  })
}

// 通过课程 id 获取课程信息
export const getCourseById = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
