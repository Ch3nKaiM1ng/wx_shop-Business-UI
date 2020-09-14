<template>
  <div class="components-container app-container">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="选择用户" prop="userId">
        <el-select v-model="form.userId" placeholder="请选择创建用户">
          <el-option v-for="(i,index) in UserId" :key="index" :label="i.userChName" :value="i.userId" />
        </el-select>
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
import { addComment, artCommentA, modifyComment } from '@/api/article'
import { findOurList } from '@/api/user'
export default {
  data() {
    return {
      imageUrl: '',
      form: {
        artId: this.$route.query.addCom,
        content: '',
        level: 1, // 回复评论传1
        parentId: this.$route.query.parentId,
        status: 0,
        thumbNum: '',
        userId: ''
      },
      ImgAmount: 'Single',
      UserId: '',
      bid: this.$route.query.bid,
      // 表单校验规则
      rules: {
        userId: [{ required: true, message: '请填选择创建用户', trigger: 'change' }],
        thumbNum: [{ required: true, message: '请填写点赞量', trigger: 'blur' }],
        content: [{ required: true, message: '请填写评论内容', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 判断是否有id传过来进行修改
    const vm = this
    if (this.$route.query.bid !== undefined) {
      artCommentA({
        id: vm.$route.query.bid
      }).then(res => {
        vm.form.artId = res.data.artId
        vm.form.content = res.data.content
        vm.form.level = res.data.level
        vm.form.parentId = res.data.parentId
        vm.form.thumbNum = res.data.thumbNum
        vm.form.userId = res.data.userId
        vm.form.status = 0
      })
    } else {
      findOurList().then(res => {
        this.UserId = res.data
      })
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
          if (this.bid != null) {
          // 修改数据
            modifyComment({
              artId: this.form.artId,
              content: this.form.content,
              level: this.form.level,
              parentId: this.form.parentId,
              status: 0,
              thumbNum: this.form.thumbNum,
              userId: this.form.userId,
              id: this.bid
            }).then(res => {
              this.showNavList = res
              this.$message('修改成功')
              setTimeout(function() {
                vm.$router.back(-1)
              }, 1000)
            })
          } else {
            //   添加接口
            addComment(self.__ob__.value)
              .then(res => {
                this.showNavList = res
                this.$message('添加成功')
                setTimeout(function() {
                  vm.$router.back(-1)
                }, 1000)
              })
          }
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
