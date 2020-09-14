/* eslint-disable vue/order-in-components */
<template>
  <div class="app-container">
    <el-form ref="dataform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="商家名称" prop="shopName">
        <el-input v-model="form.shopName" placeholder="商家名称" />
      </el-form-item>
      <el-form-item label="商家地址" prop="shopAddress">
        <el-input v-model="form.shopAddress" placeholder="商家地址" />
      </el-form-item>
      <el-form-item label="商家联系方式" prop="shopMobile">
        <el-input v-model="form.shopMobile" placeholder="商家联系方式" />
      </el-form-item>
      <el-form-item label="资格证" prop="shopSeniority">
        <el-input v-model="form.shopSeniority" placeholder="资格证" />
      </el-form-item>
      <el-form-item label="开始营业时间" prop="shopStime">
        <el-time-picker
          v-model="form.shopStime"
          class="date-box"
          format="HH:mm"
          value-format="HH:mm"
          :picker-options="{selectableRange:`00:00:00 -${form.shopEtime ? form.shopEtime+':00' : '23:59:00'}`}"
        />
      </el-form-item>
      <el-form-item label="结束营业时间" prop="shopEtime">
        <el-time-picker
          v-model="form.shopEtime"
          class="date-box"
          format="HH:mm"
          value-format="HH:mm"
          :picker-options="{selectableRange:`${form.shopStime ? form.shopStime+':00' : '00:00:00'}-23:59:00`}"
        />
      </el-form-item>
      <el-form-item label="起送价" prop="shopStartpay">
        <el-input v-model="form.shopStartpay" type="number" />
      </el-form-item>
      <el-form-item label="开通微信支付" prop="shopWxpay">
        <el-select v-model="form.shopWxpay" placeholder="是否开通微信支付">
          <el-option
            v-for="(item, items) in shopWxpayData"
            :key="items"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商家Logo" prop="shopImg">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.shopImg"
          :format="doctorImgTxt"
          :value.sync="form.shopImg"
        />
      </el-form-item>
      <el-form-item label="公告" prop="shopNotice">
        <el-input v-model="form.shopNotice" type="textarea" :rows="2" placeholder="请输入医生擅长项目" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('dataform')">提交</el-button>
        <el-button @click="onCancel('dataform')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/upload'
import { findObj, updateObj, addObj } from '@/api/shop'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  components: {
    'img-upload': ImgUpload
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      form: {
        shopName: '',
        shopImg: '',
        shopAddress: '',
        shopMobile: '',
        shopSeniority: '',
        shopTime: '',
        shopNotice: '',
        shopWxpay: 0,
        shopStartpay: 0,
        shopId: this.shopId
      },
      doctorImgTxt: '318*396',
      doctorHeadImgTxt: '1:1',
      shopWxpayData: [{ id: 0, value: '不开通' }, { id: 1, value: '开通微信支付' }],
      doctorclassList: null,
      classOptions: null, // 医生分类
      ImgAmount: 'Single',
      isAdd: true, // 添加(true)或者修改
      rules: {
        shopName: [
          { required: true, message: '请填写商家名称', trigger: 'blur' }
        ],
        shopImg: [
          { required: true, message: '请选择商家Logo', trigger: 'blur' }
        ],
        shopAddress: [
          { required: true, message: '请填写商家地址', trigger: 'blur' }
        ],
        shopMobile: [
          { required: true, message: '请填写商家联系方式', trigger: 'blur' }
        ],
        // shopSeniority: [
        //   { required: true, message: '请填写咨询数量', trigger: 'blur' }
        // ],
        shopTime: [
          { required: true, message: '请填写商家营业时间', trigger: 'blur' }
        ],
        shopNotice: [
          { required: true, message: '请填写公告', trigger: 'blur' }
        ],
        shopWxpay: [
          { required: true, message: '请选择是否开通微信支付', trigger: 'blur' }
        ],
        shopStartpay: [
          { required: true, message: '请填写起送价', trigger: 'blur' }
        ],
        shopId: [
          { required: true, message: '缺少商家iD', trigger: 'blur' }
        ],
        shopStime: [
          { required: true, message: '缺少开始运营时间', trigger: 'blur' }
        ],
        shopEtime: [
          { required: true, message: '缺少结束运营时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.shopId != null) {
      this.Obtain()
      this.isAdd = false
    }
  },
  mounted() {},
  methods: {
    Obtain() {
      findObj({
        shopId: this.shopId
      }).then(response => {
        this.form = response.data
        const arr = []
        for (var i in response.data.doctorClasses) {
          arr.push(response.data.doctorClasses[i].classId)
        }
        this.doctorclassList = arr
        this.form.classList = arr.join()
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

