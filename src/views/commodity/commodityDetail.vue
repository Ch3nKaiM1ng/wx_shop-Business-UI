/* eslint-disable vue/order-in-components */
<template>
  <div class="app-container">
    <el-form ref="dataform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="商品所属分类" prop="commodityTypeId">
        <el-select v-model="form.commodityTypeId" placeholder="请选择是否必选">
          <el-option
            v-for="item in classOptions"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="commodityName">
        <el-input v-model="form.commodityName" placeholder="请填写商品名称" />
      </el-form-item>
      <el-form-item label="标签">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{ tag }}</el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 标签</el-button>
      </el-form-item>
      <el-form-item label="参考价" prop="commodityPrice">
        <el-input v-model="form.commodityPrice" type="number" placeholder="请填写参考价" />
      </el-form-item>
      <el-form-item label="实际价格" prop="commodityTruePrice">
        <el-input v-model="form.commodityTruePrice" type="number" placeholder="请填写实际价格" />
      </el-form-item>
      <el-form-item label="库存" prop="commodityStock">
        <el-input-number v-model="form.commodityStock" type="number" placeholder="请填写库存" />
      </el-form-item>
      <el-form-item label="销量" prop="commoditySales">
        <el-input v-model="form.commoditySales" type="number" :disabled="true" placeholder="销量" />
      </el-form-item>
      <el-form-item label="好评率" prop="commodityGood">
        <div class="doctorRate">
          <el-rate v-model="form.commodityGood" show-score allow-half :disabled="true" />
        </div>
      </el-form-item>
      <el-form-item label="商品图片" prop="commodityImg">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.commodityImg"
          :format="doctorImgTxt"
          :value.sync="form.commodityImg"
        />
      </el-form-item>
      <el-form-item label="商品介绍" prop="commodityIntroduce">
        <div class="artclecontent">
          <tinymce v-model="form.commodityIntroduce" :art-id="form.commodityId" :height="300" placeholder="请输入商品介绍" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('dataform')">提交</el-button>
        <el-button @click="onCancel('dataform')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import ImgUpload from '@/components/upload'
import { findcommodity, modifycommodity, addcommodity } from '@/api/commodity'
import { queryAllNotState } from '@/api/commodityType'
import { mapGetters } from 'vuex'
export default {
  name: 'TinymceDemo',
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  components: {
    Tinymce,
    'img-upload': ImgUpload
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      form: {
        commodityName: '',
        commodityIntroduce: '',
        commodityLabel: '',
        commodityImg: '',
        commodityPrice: '',
        commoditySales: '',
        commodityStock: '',
        commodityTruePrice: '',
        commodityTypeId: '',
        commodityGood: 0,
        commodityId: this.$route.query.id,
        shopId: ''
      },
      doctorImgTxt: '318*396',
      doctorHeadImgTxt: '1:1',
      shopWxpayData: [{ id: 0, value: '不开通' }, { id: 1, value: '开通微信支付' }],
      classOptions: {
        value: '',
        typeName: ''
      }, // 医生分类
      ImgAmount: 'Single',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      inputNum: 0,
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
    queryAllNotState({
      shopId: this.shopId
    }).then(response => {
      this.classOptions = response.data
    })
  },
  mounted() {},
  methods: {
    Obtain() {
      findcommodity({
        commodityId: this.$route.query.id
      }).then(response => {
        this.form = response.data
        console.log(response.data)
        if (response.data.commodityLabel != null) {
          var str = response.data.commodityLabel.split(',')
          str.forEach(item => {
            this.inputNum = this.inputNum + 1
            this.dynamicTags.push(item)
          })
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
    onCancel(formName) {
      this.$message({
        message: '清除了!',
        type: 'warning'
      })
      this.$refs[formName].resetFields()
    },
    DataSubmit() {
      this.form.commodityLabel = this.dynamicTags.join(',')
      if (this.isAdd) {
        this.form.shopId = this.shopId
        this.form.commoditySales = 0
        addcommodity(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jumpui()
        })
      } else {
        console.log(this.form)
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
        path: '/commodity/commodity'
      })
    },
    // 选择器改变
    doctorsBtn(value) {
      this.form.classList = value.join()
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.inputNum = this.inputNum - 1
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue.length > 3) {
        this.$message({
          type: 'error',
          message: '超过了3个字节，请重新输入'
        })
        return false
      }
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputNum = this.inputNum + 1
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      console.log(this.inputNum)
      if (this.inputNum >= 3) {
        this.$message({
          type: 'error',
          message: '已经有3个标签了，无法再添加'
        })
        return
      }
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    getLength(val) {
      var str = val + ''
      var bytesCount = 0
      for (var i = 0, n = str.length; i < n; i++) {
        var c = str.charCodeAt(i)
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          bytesCount += 1
        } else {
          bytesCount += 2
        }
      }
      return bytesCount
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.artclecontent{margin-top: 2rem;margin-bottom: 2rem;}
.doctorRate {
  margin-top: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

