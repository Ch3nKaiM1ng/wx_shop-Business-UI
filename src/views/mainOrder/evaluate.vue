/* eslint-disable vue/order-in-components */
<template>
  <div class="app-container">
    <el-form ref="dataform" :model="form" status-icon label-width="120px">
      <el-form-item label="订单ID" prop="mainOrderId">
        <el-input v-model="form.mainOrderId" placeholder="请填写商品名称" :disabled="true" />
      </el-form-item>
      <el-form-item label="总评分" prop="score">
        <div class="doctorRate">
          <el-rate v-model="form.score" show-score allow-half :disabled="true" />
        </div>
      </el-form-item>
      <el-form-item label="口味评分" prop="testScore">
        <div class="doctorRate">
          <el-rate v-model="form.testScore" show-score allow-half :disabled="true" />
        </div>
      </el-form-item>
      <el-form-item label="分量评分" prop="weightScore">
        <div class="doctorRate">
          <el-rate v-model="form.weightScore" show-score allow-half :disabled="true" />
        </div>
      </el-form-item>
      <el-form-item label="评论图片">
        <img
          v-for="(item, items) in form.imgArr"
          :key="items"
          fit="cover"
          style="width: 150px; height: 150px"
          :src="item"
          :lazy="true"
        >
      </el-form-item>
      <el-form-item label="评论时间" prop="payWay">
        <el-input v-model="form.ctime" placeholder="请填写订单总价" :disabled="true" />
      </el-form-item>
      <el-form-item label="评论内容" prop="content">
        <el-input v-model="form.content" type="textarea" :disabled="true" :rows="2" placeholder="请输入评论内容" />
      </el-form-item>
      <el-form-item label="回复用户评论" prop="shopReply">
        <el-input v-model="form.shopReply" type="textarea" :rows="3" placeholder="请输入回复内容" />
      </el-form-item>
      <el-table
        :data="form.userData"
        border
        sum-text="合计"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="用户ID" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="100px">
          <template slot-scope="scope">
            <img
              fit="cover"
              style="width: 50px; height: 50px"
              :src="scope.row.avatarUrl"
              :lazy="true"
            >
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" min-width="100px">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="性别" min-width="100px" prop="gender">
          <template slot-scope="scope">
            {{ scope.row.gender }}
          </template>
        </el-table-column>
      </el-table>

      <el-form-item style="text-align: center;">
        <el-button type="primary" @click="onSubmit('dataform')">提交</el-button>
        <el-button @click="jumpui()">返回订单列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findObj, modifyObj } from '@/api/evaluate'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      form: {
        testScore: 0,
        weightScore: 0,
        score: 0
      },
      statusName: '',
      payTypeName: '',
      payWayName: '',
      doctorImgTxt: '318*396',
      doctorHeadImgTxt: '1:1',
      shopWxpayData: [{ id: 0, value: '不开通' }, { id: 1, value: '开通微信支付' }],
      ImgAmount: 'Single',
      upData: {
        evaluateId: '',
        shopReply: ''
      }
    }
  },
  created() {
    if (this.$route.query.id !== undefined) {
      this.Obtain()
    }
  },
  mounted() {},
  methods: {
    Obtain() {
      findObj({
        mainOrderId: this.$route.query.id
      }).then(response => {
        this.form = response.data
        console.log(this.form)
        var imgArr = response.data.img.split(',')
        this.form.imgArr = imgArr
        console.log(this.form)
        this.form.userData.forEach(function(a) {
          if (a.gender === '1') {
            a.gender = '男'
          }
          if (a.gender === '2') {
            a.gender = '女'
          }
        })
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
    onCancel(formName) {
      this.$message({
        message: '清除了!',
        type: 'warning'
      })
      this.$refs[formName].resetFields()
    },
    DataSubmit() {
      this.upData.evaluateId = this.form.evaluateId
      this.upData.shopReply = this.form.shopReply
      modifyObj(this.upData).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.jumpui()
      })
    },
    jumpui() {
      this.$router.push({
        path: '/mainOrder/mainOrder'
      })
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
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

