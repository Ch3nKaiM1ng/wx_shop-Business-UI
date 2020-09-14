<template>
  <div class="app-container">
    <el-form ref="userform" :model="form" status-icon label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.sName" placeholder="请填写姓名" :disabled="true" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.sPhone" placeholder="请填写手机号码" :disabled="true" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.sRemark" placeholder="请填写备注" />
      </el-form-item>
      <el-form-item label="预约医生">
        <el-input v-model="form.doctor.doctorChName" placeholder="请填写预约医生" :disabled="true" />
      </el-form-item>
      <el-form-item label="预约日期">
        <el-input v-model="form.sDate" placeholder="请填写预约日期" :disabled="true" />
      </el-form-item>
      <el-form-item label="预约时间段">
        <el-input v-model="form.sTime" placeholder="请填写预约时间段" :disabled="true" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SubscribeUpdateById, SubscribeSelectById } from '@/api/messy'
export default {
  data() {
    return {
      form: {
        dId: this.$route.query.id,
        sDate: '',
        doctor: {
          doctorChName: ''
        },
        sId: '',
        sName: '',
        sPhone: '',
        sRemark: '',
        sState: '',
        sTime: ''
      }
    }
  },
  created() {
    if (this.$route.query.id != null) {
      this.Obtain()
    }
  },
  methods: {
    // 获取数据
    Obtain() {
      SubscribeSelectById({
        sId: parseInt(this.$route.query.id)
      }).then(response => {
        this.form = response.data
      })
    },
    onSubmit(formName) {
      if (this.form.sState === 1) {
        this.$message({
          message: '警告哦，这是一条已处理的数据，不能改变为未处理',
          type: 'warning'
        })
      } else if (this.form.sState === 0) {
        this.form.sState = 1
        delete this.form.doctor
        this.DataSubmit()
      }
    },
    onCancel(formName) {
      this.$router.push({
        path: '/reservation/reservation'
      })
    },
    DataSubmit() {
      SubscribeUpdateById(this.form).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        setTimeout(function() {
          this.$router.push({
            path: '/reservation/reservation'
          })
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

