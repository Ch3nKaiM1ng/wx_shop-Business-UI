<template>
  <div class="components-container app-container">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="选择用户" prop="userId">
        <sele-user :data-id="form.userId" :value.sync="form.userId" />
      </el-form-item>
      <el-form-item label="点赞数量" prop="thumbNum">
        <el-input v-model="form.thumbNum" value="" />
      </el-form-item>
      <el-form-item label="评论内容" prop="content">
        <el-input v-model="form.content" value="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="onCancel('form')">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { addComment } from '@/api/article'
import seleUser from '@/components/seleUser'
import { setTimeout } from 'timers'
export default {
  components: { 'sele-user': seleUser },
  data() {
    return {
      imageUrl: '',
      form: {
        artId: this.$route.query.aid,
        content: '',
        level: 0, // 回复文章传0
        parentId: 0,
        receiveUserId: 0,
        status: 0,
        thumbNum: '',
        topId: 0,
        userId: ''
      },
      ImgAmount: 'Single',
      // 表单校验规则
      rules: {
        userId: [{ required: true, message: '请填选择创建用户', trigger: 'change' }],
        thumbNum: [{ required: true, message: '请填写点赞量', trigger: 'blur' }],
        content: [{ required: true, message: '请填写评论内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 确定按钮
    onSubmit(articleF) {
      // this.$message('submit!')
      var self = this.form
      var vm = this
      this.$refs[articleF].validate(valid => {
        if (valid) {
          console.log(self.__ob__.value)
          //   添加接口
          addComment(self.__ob__.value)
            .then(res => {
              console.log(res)
              this.showNavList = res
              this.$message('添加成功')
              setTimeout(function() {
                vm.$router.back(-1)
              }, 1000)
            })
        } else {
          this.$message('你东西都没填完呢!')
          return false
        }
      })
    },
    // 取消按钮
    onCancel(form) {
      this.$message({
        message: '清除了!',
        type: 'warning'
      })
      this.$refs[form].resetFields()
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess() {}
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
.artclecontent{margin-top: 2rem;margin-bottom: 2rem;}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
