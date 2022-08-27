<template>
  <div class="app-container">
    <!--多条件查询表单-->
    <el-form :inline="true" class="demo-form-inline" style="margin-left: 20px; margin-top: 12px;">
      <el-form-item label="姓名">
        <el-input v-model="teacherQuery.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="级别">
        <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
          <el-option label="高级讲师" :value="1" />
          <el-option label="特级讲师" :value="2" />
        </el-select>
      </el-form-item>
      <!-- 时间格式替换一下 从element_ui中挑选 -->
      <el-form-item label="添加时间">
        <el-col :span="11">
          <el-date-picker
            v-model="teacherQuery.begin"
            type="date"
            placeholder="选择开始时间"
            style="width: 100%;"
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="teacherQuery.end" type="date" placeholder="选择截止时间" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="intro" label="介绍" />
      <el-table-column prop="career" label="资历" />
      <el-table-column prop="level" label="头衔">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="头像">
        <template slot-scope="scope">
          <img src="scope.row.avatar">
        </template>
      </el-table-column> -->
      <el-table-column prop="gmtCreate" label="添加时间" />
      <!-- 删除 -->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removeDateById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      background
      layout="prev, pager, next,total,jumper"
      :total="total"
      :page-size="pageSize"
      style="padding: 30px 0; text-align: center"
      :current-page="page"
      @current-change="getList()"
    />

  </div>
</template>

<script>
// 引入调用teacher.js文件
import teacher from '@/api/teacher/teacher'

export default {
  // 写核心代码
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      total: 0, // 总记录数
      page: 1, // 当前页
      pageSize: 10, // 每页记录数
      teacherQuery: {}// 条件封装对象
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      teacher.getTeacherList(this.page, this.pageSize, this.teacherQuery)
        .then(
          response => { // 接口返回的数据
            // console.log(response)
            this.list = response.data.items
            this.total = response.data.total
          }
        )// 请求成功
        .catch(
          error => {
            console.log(error)
          }
        )// 请求失败
    },
    resetData() {
      // 清空表单
      this.teacherQuery = {}
      // 查询讲师数据
      this.getList()
    },
    // 删除讲师的方法
    removeDateById(id) {
      this.$confirm('此操作将永久删除讲师记录，是否继续', '提示', {
        confirmButtonText: '确定',
        concelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        teacher.removeTeacherById(id)
          .then(
            response => { // 删除成功
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              // 返回页面
              this.getList()
            })
          .catch(
            error => {
              console.log(error)
            }
          )
      })
    }
  }
}
</script>

