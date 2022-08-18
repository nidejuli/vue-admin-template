<template>
  <div class="app-container">
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="id"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="intro"
        label="介绍"
      />
      <el-table-column
        prop="career"
        label="资历"
      />

      <el-table-column
        prop="level"
        label="头衔"
      >
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column
        label="头像"
      >
        <template slot-scope="scope">
          <img src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="添加时间"
      />
    </el-table>
  </div>
</template>
<script>
import teacher from '@/api/teacher/teacher.js'

export default {
  data() {
    return {
      list: null,
      page: 1,
      pageSize: 10,
      total: 0,
      teacherQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      teacher.getTeacherListPage(this.page, this.pageSize, this.teacherQuery)
        .then(response => {
          // console.log(response);
          this.list = response.data.records
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
