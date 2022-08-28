import request from '@/utils/request'

// 讲师列表查询
// page当前页,pageSize每页多少条数据,teacherQuery条件对象
export default {
  getTeacherList(page, pageSize, teacherQuery) {
    return request({
      // 接口提交
      url: `/eduService/teacher/pageTeacherCondition/${page}/${pageSize}`,
      method: 'post',
      // data表示吧对象转换json传递到接口里面
      data: teacherQuery
    })
  },
  //   删除讲师
  removeTeacherById(id) {
    return request({
      // 接口提交
      url: `/eduService/teacher/removeTeacherById/${id}`,
      method: 'delete'
    })
  },
  //   添加讲师
  saveTeacher(teacher) {
    return request({
      // 接口提交
      url: `/eduService/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 根据id获取讲师数据
  getTeacherById(id) {
    return request({
      // 接口提交
      url: `/eduService/teacher/getTeacherById/${id}`,
      method: 'get'
    })
  },
  // 讲师修改功能
  updateTeacher(teacher) {
    return request({
      // 接口提交
      url: `/eduService/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}
