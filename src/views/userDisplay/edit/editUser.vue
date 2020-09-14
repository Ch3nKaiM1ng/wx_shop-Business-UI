<template>
  <div class="app-container">
    <el-form ref="userform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="中文名" prop="userChName">
        <el-input v-model="form.userChName" placeholder="中文名" />
      </el-form-item>
      <el-form-item label="英文名" prop="userEnName">
        <el-input v-model="form.userEnName" placeholder="英文名" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password placeholder="为用户创建密码" />
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="form.userEmail" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="手机号码" prop="userMobile">
        <el-input v-model="form.userMobile" placeholder="手机号码" />
      </el-form-item>
      <el-form-item label="昵称" prop="userNickname">
        <el-input v-model="form.userNickname" placeholder="昵称" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="昵称" />
      </el-form-item>
      <el-form-item label="用户签名">
        <el-input v-model="form.userSign" placeholder="说点什么吧" />
      </el-form-item>
      <el-form-item label="性别" prop="userSex">
        <el-select v-model="form.userSex" placeholder="请选择性别">
          <el-option v-for="(item, items) in SexData" :key="items" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择出生日期" prop="birthday">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="头像" prop="userImg">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :format="userImgTxt"
          :exist="form.userImg"
          :value.sync="form.userImg"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('userform')">提交</el-button>
        <el-button @click="onCancel('userform')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/upload'
import { findObjUser, AddObj, updateObjUser } from '@/api/user'
export default {
  components: {
    'img-upload': ImgUpload
  },
  data() {
    return {
      form: {
        auth: this.$route.query.auth,
        password: '',
        status: 0,
        userChName: '',
        userEmail: '',
        userEnName: '',
        userImg: '',
        userMobile: '',
        userNickname: '',
        userSex: '',
        userId: '',
        address: ''
      },
      userImgTxt: '1:1',
      SexData: [
        { id: 0, value: '女' },
        { id: 1, value: '男' }
      ],
      ImgAmount: 'Single',
      isAdd: true, // 添加(true)或者修改
      rules: {
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
        userChName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        userEnName: [
          { required: true, message: '请填写英文名', trigger: 'blur' }
        ],
        userNickname: [
          { required: true, message: '请填写昵称', trigger: 'blur' }
        ],
        userImg: [{ required: true, message: '请上传头像', trigger: 'blur' }],
        address: [{ required: true, message: '请填写地址', trigger: 'blur' }],
        userMobile: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ],
        userSex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择日期', trigger: 'change' }]
      }
    }
  },
  created() {
    if (this.$route.query.id != null) {
      this.Obtain()
      this.isAdd = false
    }
  },
  methods: {
    Obtain() {
      findObjUser({
        userId: parseInt(this.$route.query.id)
      }).then(response => {
        this.form = response.data
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.DataSubmit()
        } else {
          this.$message('你东西都没填完呢!')
          return false
        }
      })
    },
    onCancel(formName) {
      this.$message({
        message: '清除了!',
        type: 'warning'
      })
      this.$refs[formName].resetFields()
    },
    DataSubmit() {
      if (this.isAdd) {
        AddObj(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jumpui()
        })
      } else {
        updateObjUser(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.jumpui()
        })
      }
    },
    jumpui() {
      console.log(1)
      if (parseInt(this.$route.query.auth) === 0) {
        this.$router.push({
          path: '/userDisplay/realUser'
        })
      } else if (parseInt(this.$route.query.auth) === 1) {
        this.$router.push({
          path: '/userDisplay/internalUser'
        })
      }
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

