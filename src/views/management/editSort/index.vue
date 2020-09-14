<template>
  <div class="app-container">
    <el-form ref="form" status-icon :model="form" :rules="SortRules" label-width="120px">
      <el-input v-model="form.id" type="hidden" placeholder="请输入内容" />
      <el-form-item label="分类名称" prop="chName">
        <el-input v-model="form.chName" />
      </el-form-item>
      <el-form-item label="所属父级">
        <el-select v-model="form.parentId" placeholder="请选择排序">
          <el-option
            v-for="item in findParent"
            :key="item.value"
            :label="item.chName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序级别" prop="auth">
        <el-input v-model="form.auth" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
        <el-button @click="onCancel('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  FindObjSort,
  AddObjSort,
  UpdateObjSort,
  findParentListSort
} from '@/api/management'
export default {
  data() {
    return {
      form: {
        chName: '',
        auth: '',
        parentId: '',
        id: this.$route.query.id,
        level: this.$route.query.level,
        status: 0,
        style: this.$route.query.style
      },
      isAdd: true, // 添加或者修改
      findParent: null,
      SortRules: {
        chName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        auth: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$route.query.id != null) {
      this.Obtain()
      this.isAdd = false
    }
    if (this.$route.query.parentId) {
      this.ViewParent()
      this.form.parentId = parseInt(this.$route.query.parentId)
    } else {
      this.form.parentId = 0
    }
  },
  methods: {
    Obtain() {
      const vm = this
      vm.listLoading = true
      FindObjSort({
        id: parseInt(vm.$route.query.id)
      }).then(response => {
        const { chName, auth, parentId } = response.data
        vm.form.chName = chName
        vm.form.auth = auth
        vm.form.parentId = parentId
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this.add()
          } else {
            this.alter()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 查看父级*/
    ViewParent() {
      if (this.$route.query.parentId !== 0) {
        findParentListSort({
          parentId: parseInt(this.$route.query.parentId)
        }).then(response => {
          this.findParent = response.data
          this.form.level = parseInt(response.data[0].level) + 1
        })
      }
    },
    /* 添加 */
    add() {
      AddObjSort(this.form).then(response => {
        this.$router.go(-1)
      })
    },
    /* 修改 */
    alter() {
      UpdateObjSort(this.form).then(response => {
        this.$router.go(-1)
      })
    },
    onCancel(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

