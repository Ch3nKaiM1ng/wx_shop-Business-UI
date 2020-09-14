<template>
  <div class="app-container">
    <el-form ref="userform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请填写标题" />
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
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请填写关键字" />
      </el-form-item>
      <el-form-item label="地址+距离" prop="address">
        <el-input v-model="form.address" placeholder="请填写地址+距离" />
      </el-form-item>
      <el-form-item label="天数" prop="days">
        <el-input v-model="form.days" placeholder="请填写天数" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="内容" />
      </el-form-item>

      <el-form-item label="案例图片" prop="img">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.img"
          :format="Format"
          :value.sync="form.img"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('userform')">提交</el-button>
        <el-button v-if="isAdd" @click="onCancel('userform')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/upload'
import {
  caseDetailFindObj,
  caseDetailAddObj,
  caseDetailUpdateObj
} from '@/api/case'
export default {
  components: {
    'img-upload': ImgUpload
  },
  data() {
    return {
      form: {
        caseId: this.$route.query.caseId,
        address: '',
        content: '',
        days: '',
        img: '',
        keyword: '',
        label: '',
        title: ''
      },
      Format: '正方形1:1，最少1张最多9张图片',
      ImgAmount: 'More',
      isAdd: true, // 添加(true)或者修改
      DoctorsData: null,
      rules: {
        address: [
          { required: true, message: '请填写地址+距离', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ],
        days: [
          { required: true, message: '请填写天数', trigger: 'blur' }
        ],
        caseTitle: [
          { required: true, message: '请填写案例标题', trigger: 'blur' }
        ],
        img: [{ required: true, message: '请上传图片', trigger: 'change' }],
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }]
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  created() {
    if (this.$route.query.id != null) {
      this.Obtain()
      this.isAdd = false
    }
  },
  methods: {
    Obtain() {
      caseDetailFindObj({
        id: parseInt(this.$route.query.id)
      }).then(response => {
        this.form = response.data
        if (response.data.label != null) {
          var str = response.data.label.split(',')
          str.forEach(item => {
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
      this.form.label = this.dynamicTags.join(',')
      if (this.isAdd) {
        caseDetailAddObj(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jumpui()
        })
      } else {
        caseDetailUpdateObj(this.form).then(response => {
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
        path: '/case/caseItem',
        query: { id: this.$route.query.caseId }
      })
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
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

