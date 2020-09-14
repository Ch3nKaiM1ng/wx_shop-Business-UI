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
import { addComment, artCommentA, modifyComment } from '@/api/article'
import seleUser from '@/components/seleUser'
import { setTimeout } from 'timers'
export default {
  components: { 'sele-user': seleUser },
  data() {
    return {
      imageUrl: '',
      form: {
        artId: this.$route.query.askId,
        content: '',
        level: 1, // 回复文章传0
        parentId: this.$route.query.addCom,
        receiveUserId: this.$route.query.userId,
        status: 0,
        thumbNum: '',
        topId: this.$route.query.topID,
        userId: ''
      },
      ImgAmount: 'Single',
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
    console.log(this.$route.query.bid)
    const vm = this
    if (this.$route.query.bid !== undefined) {
      console.log(this.$route.query.bid)
      artCommentA({
        id: vm.$route.query.bid
      }).then(res => {
        console.log(res)
        vm.form = res.data
      })
    }
  },
  methods: {
    // 确定按钮
    onSubmit(articleF) {
      // this.$message('submit!')
      var vm = this
      var self = this.form
      this.$refs[articleF].validate(valid => {
        if (valid) {
          //     console.log(this.id)
          if (this.bid != null) {
          // 修改数据
            modifyComment(this.form).then(res => {
              this.showNavList = res
              this.$message('修改成功')
              setTimeout(function() {
                vm.$router.back(-1)
              }, 1000)
            })
          } else {
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
