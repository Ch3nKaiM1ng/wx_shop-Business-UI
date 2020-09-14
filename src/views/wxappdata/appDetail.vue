/* eslint-disable vue/order-in-components */
<template>
  <div class="app-container">
    <el-form ref="dataform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="appid" prop="appid">
        <el-input v-model="form.appid" placeholder="小程序的appid" />
      </el-form-item>
      <el-form-item label="appsecret" prop="appsecret">
        <el-input v-model="form.appsecret" placeholder="小程序的appsecret" />
      </el-form-item>
      <el-form-item label="微信支付商家号" prop="appsecret">
        <el-input v-model="form.mchId" placeholder="微信支付商家号mchId" />
      </el-form-item>
      <el-form-item label="微信支付key" prop="appsecret">
        <el-input v-model="form.paykey" placeholder="微信支付key" />
      </el-form-item>
      <el-form-item label="ctime" prop="ctime">
        <el-input v-model="form.ctime" placeholder="创建时间" :disabled="true" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('dataform')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findObj, updateObj, addObj } from '@/api/wxappdata'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      form: {
        appid: '',
        appsecret: '',
        shopid: 0
      },
      isAdd: true, // 添加(true)或者修改
      rules: {
        appid: [
          { required: true, message: '请填写预约次数', trigger: 'blur' }
        ],
        appsecret: [
          { required: true, message: '请填写中文名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.shopId != null) {
      this.Obtain()
    }
  },
  mounted() {},
  methods: {
    Obtain() {
      findObj({
        shopId: this.shopId
      }).then(response => {
        console.log(response.data)
        if (response.data == null) {
          this.isAdd = true
        } else {
          this.form = response.data
          this.isAdd = false
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message('submit!')
          this.DataSubmit()
        } else {
          this.$message('你东西都没填完呢!')
          return false
        }
      })
    },
    DataSubmit() {
      if (this.isAdd) {
        this.form.shopId = this.shopId
        addObj(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jumpui()
        })
      } else {
        updateObj(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.jumpui()
        })
      }
    },
    jumpui() {
      // this.$router.push({
      //   path: '/doctors/doctorsList'
      // })
    },
    // 选择器改变
    doctorsBtn(value) {
      this.form.classList = value.join()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.doctorRate {
  margin-top: 10px;
}
</style>

