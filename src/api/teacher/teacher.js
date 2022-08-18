import request from '@/utils/request'

// 讲师列表查询
// page当前页,pageSize每页多少条数据,teacherQuery条件查询的对象
export default {
  getTeacherList(page, pageSize, teacherQuery) {
    return request({
      url: '/teacher/list',
      method: 'get',
      data
    })
  }
}
