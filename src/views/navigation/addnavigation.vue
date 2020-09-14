<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="导航排序">
        <el-input v-model="form.priority" value="" />
      </el-form-item>
      <el-form-item label="导航中文名字">
        <el-input v-model="form.chName" value="" />
      </el-form-item>
      <el-form-item label="导航英文名字">
        <el-input v-model="form.enName" value="" />
      </el-form-item>
      <el-form-item label="导航链接">
        <el-input v-model="form.url" value="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findObj, updateObj, addObj } from '@/api/navigation'
// import { setTimeout } from 'timers'
export default {
  data() {
    return {
      form: {
        priority: '',
        chName: '',
        enName: '',
        url: '',
        status: 0
      },
      id: this.$route.query.id
    }
  },
  created() {
    // 修改导航
    const vm = this
    if (this.$route.query.id !== undefined) {
      findObj({
        id: vm.$route.query.id
      }).then(res => {
        vm.form.priority = res.data.priority
        vm.form.chName = res.data.chName
        vm.form.enName = res.data.enName
        vm.form.url = res.data.url
      })
    }
  },
  methods: {
    // 确定添加导航
    onSubmit() {
      // this.$message('submit!')
      var self = this.form
      if (self.__ob__.value.priority === '' && self.__ob__.value.chName === '' && self.__ob__.value.enName === '' && self.__ob__.value.url === '') {
        this.$message('请填写完整信息！')
      } else {
        if (this.id != null) {
          updateObj({
            chName: this.form.chName,
            enName: this.form.enName,
            url: this.form.url,
            id: this.id,
            priority: this.form.priority,
            status: 0
          }).then(res => {
            this.showNavList = res
            this.$message('修改成功')
          })
        } else {
          addObj(self.__ob__.value)
            .then(res => {
              this.showNavList = res
              this.$message('添加成功')
            })
        }
      }
    },
    onCancel() {
      this.$router.push({ path: '/navigation/navigation' })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

