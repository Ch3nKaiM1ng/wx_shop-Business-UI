<template>
  <div class="components-container app-container">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="form.mobile" value="" />
      </el-form-item>
      <el-form-item label="投诉内容" prop="content">
        <el-input v-model="form.content" type="textarea" value="" />
      </el-form-item>
      <el-form-item v-model="form.helpstatuts" label="是否有帮助" prop="helpstatuts">
        <el-radio-group v-model="form.helpstatuts">
          <el-radio label="0">有帮助</el-radio>
          <el-radio label="1">无帮助</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="处理状态" prop="treatmentstatus">
        <el-radio-group v-model="form.treatmentstatus">
          <el-radio label="0">未处理</el-radio>
          <el-radio label="1">已处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" value="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { modifycomplaint, findcomplaint } from '@/api/complaint'
export default {
  data() {
    return {

      imageUrl: '',
      form: {
        content: '',
        helpstatuts: '',
        id: this.$route.query.id,
        mobile: '',
        remark: '',
        treatmentstatus: ''
      },
      UserId: '',
      id: this.$route.query.id,
      // 表单校验规则
      rules: {
        content: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        helpstatuts: [{ required: true, message: '请选择有无帮助', trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写手机号码', trigger: 'blur' }],
        treatmentstatus: [{ required: true, message: '选择情况', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 判断是否有id传过来进行修改
    const vm = this
    if (this.$route.query.id !== undefined) {
      console.log(vm.$route.query.id)
      console.log(typeof (vm.$route.query.id))
      findcomplaint({
        id: vm.$route.query.id
      }).then(res => {
        console.log(res)
        vm.form = res.data
        vm.form.helpstatuts = res.data.helpstatuts.toString()
        vm.form.treatmentstatus = res.data.treatmentstatus.toString()
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
        console.log(valid)
        if (valid) {
          //     console.log(this.id)
          if (this.id != null) {
          // 修改数据
            console.log(this.form)
            const help = parseInt(self.helpstatuts)
            const treatments = parseInt(self.treatmentstatus)
            console.log(help, treatments)
            modifycomplaint({
              content: self.content,
              helpstatuts: help,
              id: vm.$route.query.id,
              mobile: self.mobile,
              remark: self.remark,
              treatmentstatus: treatments
            }).then(res => {
              this.showNavList = res
              this.$message('修改成功')
              setTimeout(function() {
                vm.$router.back(-1)
              }, 1000)
            })
          } else {
            console.log(self.__ob__.value)
            //   添加接口
            // addArticle(self.__ob__.value)
            //   .then(res => {
            //     console.log(res)
            //     this.showNavList = res
            //     this.$message('添加成功')
            //     setTimeout(function() {
            //       vm.$router.back(-1)
            //     }, 1000)
            //   })
          }
        } else {
          this.$message('你东西都没填完呢!')
          return false
        }
      })
    },
    // 取消按钮
    onCancel() {},
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
