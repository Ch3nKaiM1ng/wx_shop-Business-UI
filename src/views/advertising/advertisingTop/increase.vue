<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="上传图片">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.bgImg"
          :format="Format"
          :value.sync="form.bgImg"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  AdvertisingAddObj,
  AdvertisingUpdateObj,
  AdvertisingFindObj
} from '@/api/advertising'
import ImgUpload from '@/components/upload'
export default {
  name: 'Increase',
  components: {
    'img-upload': ImgUpload
  },
  data() {
    return {
      form: {
        id: null,
        bgImg: null
      },
      ImgAmount: 'Single',
      isAdd: true, // 添加(true)或者修改
      Format: '750*562'
    }
  },
  created() {
    if (this.$route.query.id != null) {
      this.Obtain()
      this.isAdd = false
    }
  },
  methods: {
    onSubmit() {
      if (this.form.bgImg !== null) {
        if (this.isAdd) {
          this.add()
        } else {
          this.alter()
        }
      } else {
        this.$message.error('请上传图片')
        return false
      }
    },
    onCancel() {
      this.$router.push({
        path: '/advertising/AdvertisingTop'
      })
    },
    Obtain() {
      AdvertisingFindObj({
        id: parseInt(this.$route.query.id)
      }).then(response => {
        const { id, bgImg } = response.data
        this.form.id = id
        this.form.bgImg = bgImg
      })
    },
    /* 添加 */
    add() {
      AdvertisingAddObj(this.form).then(response => {
        this.$router.push({
          path: '/advertising/AdvertisingTop'
        })
      })
    },
    /* 修改 */
    alter() {
      AdvertisingUpdateObj(this.form).then(response => {
        this.$router.push({
          path: '/advertising/AdvertisingTop'
        })
      })
    }
  }
}
</script>

