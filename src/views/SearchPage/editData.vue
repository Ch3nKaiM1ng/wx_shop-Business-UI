<template>
  <div class="app-container">
    <el-form ref="jumpform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item v-if="isAdd" label="选择所属位置" prop="sBlong">
        <el-select v-model="form.sBlong" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="sContent">
        <el-input v-model="form.sContent" placeholder="标题" />
      </el-form-item>
      <el-form-item label="关键词" prop="sKeyword">
        <el-input v-model="form.sKeyword" placeholder="标题" />
      </el-form-item>
      <el-form-item label="跳转url" prop="sUrl">
        <el-input v-model="form.sUrl" placeholder="url" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('jumpform')">提交</el-button>
        <el-button @click="onCancel('jumpform')">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { searchPageSelectOne, searchPageUpdate, searchPageInset } from '@/api/advertising'
export default {
  data() {
    return {
      form: {
        sId: this.$route.query.id,
        sBlong: this.$route.query.type,
        sContent: '',
        sKeyword: '',
        sUrl: ''
      },
      options: [{
        value: 'top',
        label: '顶部'
      }, {
        value: 'hot',
        label: '推荐'
      }, {
        value: 'history',
        label: '历史'
      }],
      isAdd: true, // 添加(true)或者修改
      rules: {
        sContent: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        sUrl: [{ required: true, message: '请填写跳转URL', trigger: 'blur' }],
        sKeyword: [{ required: true, message: '请填写关键词', trigger: 'blur' }],
        sBlong: [{ required: true, message: '请选择数据位置', trigger: 'change' }]
      }
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
      searchPageSelectOne({
        sId: parseInt(this.$route.query.id)
      }).then(response => {
        console.log(response)
        this.form = response.data
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.DataSubmit()
        } else {
          this.$message('你东西都没填完呢!')
          return false
        }
      })
    },
    selectUser() {
      console.log(122)
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
        searchPageInset(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jump()
        })
      } else {
        searchPageUpdate(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.jump()
        })
      }
    },
    jump() {
      switch (this.form.sBlong) {
        case 'top':
          this.$router.push({
            path: '/searchPage/TopData'
          })
          break
        case 'hot':
          this.$router.push({
            path: '/searchPage/HotData'
          })
          break
        case 'history':
          this.$router.push({
            path: '/searchPage/HistoryData'
          })
          break
        default:
          this.$message({
            message: '警告哦，识别不了type，请联系管理员',
            type: 'warning'
          })
      }
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

