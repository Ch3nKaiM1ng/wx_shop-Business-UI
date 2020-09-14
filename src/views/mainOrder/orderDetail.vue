/* eslint-disable vue/order-in-components */
<template>
  <div class="app-container">
    <el-form ref="dataform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="订单ID" prop="mainOrderId">
        <el-input v-model="form.mainOrderId" placeholder="请填写商品名称" :disabled="true" />
      </el-form-item>
      <el-form-item label="微信订单ID" prop="wxPayOrder">
        <el-input v-model="form.wxPayOrder" placeholder="请填写参考价" :disabled="true" />
      </el-form-item>
      <el-form-item label="物流状态" prop="status">
        <el-input v-model="statusName" placeholder="请填写实际价格" :disabled="true" />
      </el-form-item>
      <el-form-item label="支付状态" prop="payType">
        <el-input v-model="payTypeName" placeholder="请填写实际价格" :disabled="true" />
      </el-form-item>
      <el-form-item label="支付方式" prop="payWay">
        <el-input v-model="payWayName" placeholder="请填写实际价格" :disabled="true" />
      </el-form-item>
      <el-form-item label="订单总价" prop="payWay">
        <el-input v-model="form.totalPrice" placeholder="请填写订单总价" :disabled="true" />
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="form.mobile" type="number" :disabled="true" placeholder="销量" />
      </el-form-item>
      <el-form-item label="订单备注" prop="remarks">
        <el-input v-model="form.remarks" type="textarea" :disabled="true" :rows="2" placeholder="请输入订单备注" />
      </el-form-item>
      <el-table
        :data="form.subOrder"
        border
        show-summary
        sum-text="合计"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="子订单ID" min-width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.subOrderId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品ID" width="100px">
          <template slot-scope="scope">{{ scope.row.commodityId }}</template>
        </el-table-column>
        <el-table-column label="添加时间" min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.ctime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="100px">
          <template slot-scope="scope">{{ scope.row.commodityName }}</template>
        </el-table-column>
        <el-table-column label="商品单价" min-width="100px" prop="commodityPrice" sortable>
          <template slot-scope="scope">{{ scope.row.commodityPrice }}</template>
        </el-table-column>
        <el-table-column label="购买数量" min-width="100px" prop="buyNum" sortable>
          <template slot-scope="scope">{{ scope.row.buyNum }}</template>
        </el-table-column>
      </el-table>

      <el-form-item style="text-align: center;">
        <el-button @click="jumpui()">返回订单列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findmainOrder, modifycommodity } from '@/api/mainOrder'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      form: {
      },
      statusName: '',
      payTypeName: '',
      payWayName: '',
      doctorImgTxt: '318*396',
      doctorHeadImgTxt: '1:1',
      shopWxpayData: [{ id: 0, value: '不开通' }, { id: 1, value: '开通微信支付' }],
      classOptions: {
        value: '',
        typeName: ''
      }, // 医生分类
      ImgAmount: 'Single',
      isAdd: true, // 添加(true)或者修改
      rules: {
        commodityName: [
          { required: true, message: '请填写商品名称', trigger: 'blur' }
        ],
        commodityPrice: [
          { required: true, message: '请填写商品参考价格', trigger: 'blur' }
        ],
        commodityStock: [
          { required: true, message: '请输入库存', trigger: 'blur' }
        ],
        // shopSeniority: [
        //   { required: true, message: '请填写咨询数量', trigger: 'blur' }
        // ],
        commodityTruePrice: [
          { required: true, message: '请填写真实价格', trigger: 'blur' }
        ],
        commodityTypeId: [
          { required: true, message: '请填写项目擅长', trigger: 'blur' }
        ],
        commodityIntroduce: [
          { required: true, message: '请填写商品介绍', trigger: 'blur' }
        ],
        commodityImg: [{ required: true, message: '请上传商品图片', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$route.query.id !== undefined) {
      this.Obtain()
      this.isAdd = false
    }
  },
  mounted() {},
  methods: {
    Obtain() {
      findmainOrder({
        mainOrderId: this.$route.query.id
      }).then(response => {
        this.form = response.data
        console.log(this.form)
        this.Stateformat()
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
      if (this.isAdd) {
        this.form.shopId = this.shopId
      } else {
        modifycommodity(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.jumpui()
        })
      }
    },
    jumpui() {
      this.$router.push({
        path: '/mainOrder/mainOrder'
      })
    },
    Stateformat() {
      console.log(this.form)
      switch (this.form.status) {
        case '0':
          this.statusName = '商家准备'
          break
        case '1':
          this.statusName = '正在配送'
          break
        case '2':
          this.statusName = '已送达'
          break
        case '3':
          this.statusName = '确认收货'
          break
      }
      switch (this.form.payType) {
        case '0':
          this.payTypeName = '未支付'
          break
        case '1':
          this.payTypeName = '已支付'
          break
      }
      switch (this.form.payWay) {
        case '0':
          this.payWayName = '商家收款'
          break
        case '1':
          this.payWayName = '微信支付'
          break
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        console.log(index)
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })

      return sums
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

