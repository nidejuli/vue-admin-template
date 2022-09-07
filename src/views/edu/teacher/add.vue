<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="选择讲师头衔">
          <!--
                        数据类型一定要和取出的json中的一致，否则没法回填
                        因此，这里value使用动态绑定的值，保证其数据类型是number
                    -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="String(teacher.avatar)" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow = true">更换头像
        </el-button>
        <!--
                            v-show：是否显示上传组件
                            :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                            :url：后台上传的url地址
                            @close：关闭上传组件
                            @crop-upload-success：上传成功后的回调
                            <input type="file" name="file"/>
                        -->
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="/*BASE_API + */'http://localhost:8002/eduOss/uploadFile'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入对应的新增api方法
import teacher from '@/api/teacher/teacher.js'
// 引入上传图片的组件
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  // 做一个声明，才可以使用上传图片的组件
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: '',
        sort: 1,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      // 上传弹框是否显示
      imagecropperShow: false,
      imagecropperKey: 0, // 上传组件key值
      BASE_API: process.env.VUE_APP_BASE_API, // 获取dev.env.js的值
      // 防止重复提交
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() { // 页面渲染之前执行
    // 判断路径是否有id值
    if (this.$route.params && this.$route.params.id) {
      // 从路径获取id值
      const id = this.$route.params.id
      // 调用根据id查询的方法
      this.getTeacherById(id)
    } else {
      this.teacher = {}
    }
  },
  methods: {
    // 根据讲师id查询方法
    getTeacherById(id) {
      teacher.getTeacherById(id)
        .then(response => {
          // console.log(response);
          this.teacher = response.data.teacher
        })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id查询的方法
        this.getTeacherById(id)
      } else {
        this.teacher = {}
      }
    },
    close() { // 关闭上传弹框的方法
      this.imagecropperShow = false
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) { // 上传成功方法
      this.imagecropperShow = false
      // 上传接口图片返回地址
      this.teacher.avatar = data.url
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1
    },
    saveOrUpdate() {
      if (!this.teacher.id) {
        this.saveData()
      } else {
        this.updateTeacher()
      }
      this.saveBtnDisabled = true
    }, // 修改讲师数据
    updateTeacher() {
      teacher.updateTeacher(this.teacher)
        .then(response => {
          this.$message({
            message: '修改讲师记录成功',
            type: 'success'
          })
          // 回到讲师列表 路由跳转
          this.$router.replace({ path: '/teacher/list' })
        })
    },
    // 保存
    saveData() {
      teacher.saveTeacher(this.teacher)
        .then(
          (response) => { // 添加成功
            // 提示信息
            this.$message({
              message: '添加讲师记录成功',
              type: 'success'
            })
            // 回到讲师列表 路由跳转
            this.$router.replace({ path: '/teacher/list' })
          })
    }
  }
}
</script>
