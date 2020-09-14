<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="导航中文名字">
        <el-input v-model="list.chName" />
      </el-form-item>
      <el-form-item label="导航英文名字">
        <el-input v-model="list.chName" />
      </el-form-item>
      <el-form-item label="导航链接">
        <el-input v-model="list.url" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {

      list: {
        chName: '',
        enName: '',
        url: '',
        id: ''
      }

    }
  },
  created() {
    this.modifyNavId()
  },
  methods: {
    modifyNavId() {
      console.log(this.$route.query.id)
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
    //   this.$message({
    //     message: 'cancel!',
    //     type: 'warning'
    //   })
      this.$router.push({ path: '/navigation/navigation' })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

