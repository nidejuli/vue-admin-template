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
  }
}
