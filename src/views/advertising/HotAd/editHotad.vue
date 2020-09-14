<template>
  <div class="app-container">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="排序" prop="rank">
        <el-input v-model="form.rank" value placeholder="直接填写数字，例子：1" />
      </el-form-item>
      <el-form-item label="点击数量" prop="clicknum">
        <el-input v-model="form.clicknum" value placeholder="点击数量" />
      </el-form-item>
      <el-form-item label="地址" prop="url">
        <el-input v-model="form.url" value />
      </el-form-item>
      <el-form-item label="上传图片" prop="img">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.img"
          :format="imgTxt"
          :value.sync="form.img"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { HotAddObj, HotUpdateObj, HotFindObj } from '@/api/advertising'
import ImgUpload from '@/components/upload'
export default {
  components: {
    'img-upload': ImgUpload
  },
  data() {
    return {
      form: {
        rank: '',
        url: '',
        img: '',
        status: 0,
        clicknum: ''
      },
      id: this.$route.query.id,
      ImgAmount: 'Single',
      imgTxt: '710*240',
      rules: {
        rank: [{ required: true, message: '请填写排序', trigger: 'blur' }],
        url: [{ required: true, message: '请填写跳转URL', trigger: 'blur' }],
        clicknum: [{ required: true, message: '请填写点击数量', trigger: 'blur' }],
        img: [{ required: true, message: '请上传图片', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 接受修改图片数据
    const vm = this
    if (this.$route.query.id !== undefined) {
      console.log(this.$route.query.id)
      HotFindObj({
        id: vm.$route.query.id
      }).then(res => {
        vm.form = res.data
      })
    }
  },
  methods: {
    // 确定按钮
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.uoload()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    uoload() {
      if (this.id != null) {
        HotUpdateObj(this.form).then(res => {
          this.showNavList = res
          this.$message('修改成功')
          this.$router.push({
            path: '/advertising/HotAd'
          })
        })
      } else {
        HotAddObj(this.form).then(res => {
          this.showNavList = res
          this.$message('添加成功')
          this.$router.push({
            path: '/advertising/HotAd'
          })
        })
      }
    },
    // 取消按钮
    onCancel() {
      this.$router.push({ path: '/advertising/HotAd' })
    }
  }
}
</script>

