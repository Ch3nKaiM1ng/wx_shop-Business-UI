<template>
  <el-form ref="ruleForm" :model="form" :rules="rules">
    <el-form-item label="用户名" prop="realName">
      <el-input v-model.trim="form.realName" autocomplete="off" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="登录名" prop="user">
      <el-input v-model.trim="form.user" autocomplete="off" placeholder="请输入登录名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model.trim="form.password" type="password" show-password autocomplete="off" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit('ruleForm')">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { adminUpdateObj } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          user: '',
          name: '',
          avatar: '',
          id: ''
        }
      }
    }
  },
  data() {
    return {
      form: {
        user: '',
        realName: this.user.name,
        password: '',
        id: this.user.id
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit(formName) {
      console.log(this.user)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          adminUpdateObj(this.form).then(response => {
            this.UserData = response.data
            this.UserLoading = false
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 5 * 1000
            })
            this.logout()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

