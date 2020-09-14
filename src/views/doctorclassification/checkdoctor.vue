<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="中文名称">
        <el-input v-model="form.classChName" value="" />
      </el-form-item>
      <el-form-item label="英文名称">
        <el-input v-model="form.classEnName" value="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findDoc, modifyDoc, addDoc } from '@/api/navigation'
export default {
  data() {
    return {
      form: {
        classChName: '',
        classEnName: '',
        classId: '',
        status: 0
      },
      id: this.$route.query.id
    }
  },
  created() {
    // 修改医生名字
    if (this.$route.query.id !== undefined) {
      this.docData()
    }
  },
  methods: {
    docData() {
      const vm = this
      findDoc({
        classId: vm.$route.query.id
      }).then(res => {
        vm.form.classChName = res.data.classChName
        vm.form.classEnName = res.data.classEnName
      })
    },
    onSubmit() {
      var self = this.form
      if (self.__ob__.value.classChName === '' && self.__ob__.value.classEnName === '') {
        this.$message('请填写完整信息！')
      } else {
        if (this.id != null) {
          modifyDoc({
            classChName: this.form.classChName,
            classEnName: this.form.classEnName,
            classId: this.id,
            status: 0
          }).then(res => {
            this.showNavList = res
            this.$message('修改成功')
          })
        } else {
          addDoc(self.__ob__.value)
            .then(res => {
              this.showNavList = res
              this.$message('添加成功')
            })
        }
      }
    },
    onCancel() {
      this.$router.push({ path: '/doctors/doctorclassification' })
      window.close()
      this.docData()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

