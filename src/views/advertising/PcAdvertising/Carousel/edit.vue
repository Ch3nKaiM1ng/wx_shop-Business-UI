<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="排序">
        <el-input v-model="form.auth" value placeholder="直接填写数字，例子：1" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.bannerUrl" value />
      </el-form-item>
      <el-form-item label="上传图片">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.bannerImg"
          :format="bannerImgTxt"
          :value.sync="form.bannerImg"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pcAddObj, pcUpdateObj, pcfindObj } from '@/api/navigation'
import ImgUpload from '@/components/upload'
export default {
  components: {
    'img-upload': ImgUpload
  },
  data() {
    return {
      form: {
        auth: '',
        bannerUrl: '',
        bannerImg: '',
        style: 1
      },
      id: this.$route.query.id,
      ImgAmount: 'Single',
      bannerImgTxt: '468*346'
    }
  },
  created() {
    // 接受修改图片数据
    const vm = this
    if (this.$route.query.id !== undefined) {
      console.log(this.$route.query.id)
      pcfindObj({
        id: vm.$route.query.id
      }).then(res => {
        vm.form.auth = res.data.auth
        vm.form.bannerUrl = res.data.bannerUrl
        vm.form.bannerImg = res.data.bannerImg
      })
    }
  },
  methods: {
    // 确定按钮
    onSubmit() {
      // this.$message('submit!')
      var self = this.form
      console.log(self.__ob__)
      if (
        self.__ob__.value.auth === '' &&
        self.__ob__.value.bannerUrl === '' &&
        self.__ob__.value.bannerImg === ''
      ) {
        this.$message('请填写完整信息！')
      } else {
        if (this.id != null) {
          pcUpdateObj({
            auth: this.form.auth,
            bannerUrl: this.form.bannerUrl,
            bannerImg: this.form.bannerImg,
            id: this.id,
            style: 1
          }).then(res => {
            this.showNavList = res
            this.$message('修改成功')
            this.$router.push({
              path: '/advertising/Carousel'
            })
          })
        } else {
          console.log(self.__ob__.value)
          pcAddObj(self.__ob__.value).then(res => {
            this.showNavList = res
            this.$message('添加成功')
            this.$router.push({
              path: '/advertising/Carousel'
            })
          })
        }
      }
    },
    // 取消按钮
    onCancel() {
      this.$router.push({ path: '/advertising/Carousel' })
    }
  }
}
</script>

