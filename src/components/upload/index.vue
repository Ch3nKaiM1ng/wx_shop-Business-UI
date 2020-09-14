<template>
  <!--
    img-types : More(多张)  Single(单张)
  -->
  <div class="upload">
    <div v-if="Types === 'More'">
      <el-upload
        action="auto"
        :http-request="uploadSectionFile"
        list-type="picture-card"
        :on-remove="handleRemove"
        :file-list="imgData"
        class="contentImgStyle"
        accept=".jpg, .jpeg, .png"
        :before-upload="beforeAvatarUpload"
        :limit="limi"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img height="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>
    <div v-else-if="Types === 'Single'">
      <el-upload
        action="auto"
        class="avatar-uploader"
        :show-file-list="false"
        :http-request="uploadSectionFile"
        accept=".jpg, .jpeg, .png"
        :on-change="change"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </div>
    <!-- 样式 -->
    <div class="upload-format">
      温馨提示：图片宽高为：{{ Format }}，图片大小最好低于1MB
    </div>
  </div>
</template>

<script>
import { UploadImg } from '@/api/upload'
import { Loading } from 'element-ui'
let loadingInstance = null
export default {
  props: {
    imgTypes: {
      type: String,
      default: ''
    },
    exist: {
      type: String,
      default: ''
    },
    limitData: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: '暂未设置比例喔，请联系程序员'
    }
  },
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      uploadFile: [],
      thisTitle: '',
      imgData: [],
      imgDatas: [],
      limi: 9
    }
  },
  computed: {
    Types() {
      return this.imgTypes
    },
    Format() {
      return this.format
    }
  },
  watch: {
    exist: {
      handler(newValue, oldValue) {
        // 父组件param对象改变会触发此函数
        if (this.Types === 'Single') {
          console.log(1)
          this.imageUrl = newValue
        } else if (this.Types === 'More' && newValue !== null && newValue !== '') {
          console.log(2)
          const images = newValue.split(',')
          const arr = []
          for (const i in images) {
            var a = {
              url: images[i]
            }
            arr.push(a)
          }
          this.imgData = Object.assign([], arr)
          this.imgDatas = Object.assign([], arr)
        } else {
          console.log(3)
          this.imgData = Object.assign([], [])
          this.imgDatas = Object.assign([], [])
        }
      },
      immediate: true, // 关键
      deep: true
    }
  },
  mounted() {
    if (this.limitData !== ' ') {
      this.limi = parseInt(this.limitData)
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.8
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 0.8MB!')
      }
      return isLt2M
    },
    handleRemove(file, fileList) {
      this.imgDatas = fileList

      this.ImgSplit(fileList)
    },
    uploadSectionFile(param, e) {
      loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$message.warning('图片上传中，请等候图片上传完成再进行下一步操作!')
      let file = null
      const fileObj = param.file
      if (fileObj.type === 'image/jpeg') {
        file = new File([fileObj], new Date().getTime() + '.jpg', {
          type: 'image/jpeg'
        })
      } else if (fileObj.type === 'image/png') {
        file = new File([fileObj], new Date().getTime() + '.png', {
          type: 'image/png'
        })
      } else {
        this.$message.error('只能上传jpg/png文件')
        return
      }
      this.upload(file)
    },
    change(file, fileList) {
      var _this = this
      var event = event || window.event
      var files = event.target.files[0]
      const reader = new FileReader()
      // 转base64
      reader.onload = function(e) {
        _this.imageUrl = e.target.result // 将图片路径赋值给src
      }
      reader.readAsDataURL(files)
    },
    upload(data) {
      const paramData = new FormData() // FormData 对象
      paramData.append('file', data) // 文件对象
      UploadImg(paramData).then(response => {
        loadingInstance.close()
        loadingInstance = null
        this.$message.success('图片上传成功!')
        if (this.Types === 'More') {
          var a = {
            url: response.data
          }
          this.imgDatas.push(a)
          this.ImgSplit(this.imgDatas)
        } else if (this.Types === 'Single') {
          this.$emit('update:value', response.data)
        }
      })
    },
    // 拆分数组外传
    ImgSplit(data) {
      const aar = []
      const aData = JSON.parse(JSON.stringify(data))

      if (aData.length > 0) {
        for (var i in aData) {
          aar.push(aData[i].url)
        }
        // console.log(aar.join())
        this.$emit('update:value', aar.join())
      } else {
        this.$emit('update:value', null)
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
img {
  width: 100%;
}
.upload-format{
  width: 100%;
  height: auto;
  color: red;
  line-height: 25px;
  font-size: 14px;
}
</style>

