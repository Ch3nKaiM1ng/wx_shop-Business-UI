<template>
  <div class="components-container app-container">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="选择用户" prop="userId">
        <sele-user :data-id="form.userId" :value.sync="form.userId" />
      </el-form-item>
      <el-form-item label="主题标题" prop="title">
        <el-input v-model="form.title" value="" />
      </el-form-item>
      <el-form-item label="回复内容" prop="content">
        <el-input v-model="form.content" type="textarea" value="" />
      </el-form-item>
      <el-form-item label="点赞数量" prop="thumbNum">
        <el-input v-model="form.thumbNum" value="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="onCancel('form')">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { addResponse, modifyResponse, findResponse } from '@/api/questions'
import seleUser from '@/components/seleUser'
export default {
  components: {
    'sele-user': seleUser
  },
  data() {
    return {
      imageUrl: '',
      form: {
        askId: this.$route.query.questionsID,
        content: '',
        status: 0,
        thumbNum: '',
        title: '',
        userId: '',
        id: this.$route.query.queID
      },
      bid: this.$route.query.queID,
      // 表单校验规则
      rules: {
        userId: [{ required: true, message: '请填选择创建用户', trigger: 'change' }],
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        content: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        thumbNum: [{ required: true, message: '请填写点赞量', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 判断是否有id传过来进行修改
    const vm = this
    if (this.$route.query.queID !== undefined) {
      console.log(this.$route.query.queID)
      findResponse({
        id: vm.$route.query.queID
      }).then(res => {
        console.log(res)
        vm.form = res.data
        // vm.form.askTitle = res.data.askTitle
        // vm.form.askContent = res.data.askContent
        // vm.form.askLabel = res.data.askLabel
        // vm.form.askImg = res.data.askImg
        // vm.form.askVedio = res.data.askVedio
        // vm.form.askCheckNum = res.data.askCheckNum
        // vm.form.thumbNum = res.data.thumbNum
        // vm.form.askUserId = res.data.askUserId
        // vm.form.status = 0
      })
    }
  },
  methods: {
    // 确定按钮
    onSubmit(articleF) {
      // this.$message('submit!')
      var self = this.form
      this.$refs[articleF].validate(valid => {
        if (valid) {
          //     console.log(this.id)
          if (this.bid != null) {
          // 修改数据
            modifyResponse(this.form).then(res => {
              this.showNavList = res
              this.$message('修改成功')
            })
          } else {
            console.log(self.__ob__.value)
            //   添加接口
            addResponse(self.__ob__.value)
              .then(res => {
                console.log(res)
                this.showNavList = res
                this.$message('添加成功')
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
    }
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
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
