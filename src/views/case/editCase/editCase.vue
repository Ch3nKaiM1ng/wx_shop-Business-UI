<template>
  <div class="app-container">
    <el-form ref="userform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="绑定榜单" prop="classId">
        <el-select v-model="form.classId" placeholder="请选择榜单">
          <el-option v-for="(item, items) in listData" :key="items" :label="item.chName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="绑定案例分类" prop="caseClassId">
        <el-select v-model="form.caseClassId" placeholder="请选择案例分类">
          <el-option v-for="(item, items) in caseListData" :key="items" :label="item.chName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建用户" prop="userId">
        <sele-user :data-id="form.userId" :value.sync="form.userId" />
      </el-form-item>
      <!-- <el-form-item label="案例名称" prop="caseName">
        <el-input v-model="form.caseName" placeholder="请填写案例名称" />
      </el-form-item> -->
      <el-form-item label="案例标题" prop="caseTitle">
        <el-input v-model="form.caseTitle" placeholder="请填写案例标题" />
      </el-form-item>
      <el-form-item label="案例点赞量" prop="caseThumbnum">
        <el-input v-model="form.caseThumbnum" placeholder="请填写案例点赞量" />
      </el-form-item>
      <el-form-item label="案例阅读量" prop="caseChecknum">
        <el-input v-model="form.caseChecknum" placeholder="请填写案例阅读量" />
      </el-form-item>
      <el-form-item label="案例类型" prop="style">
        <el-select v-model="form.style" placeholder="请选择案例类型">
          <el-option v-for="(item, items) in styleData" :key="items" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="医生" prop="doctorId">
        <el-select v-if="DoctorsData != null" v-model="form.doctorId" placeholder="请选择医生">
          <el-option v-for="(item, items) in DoctorsData" :key="items" :label="item.doctorChName" :value="item.doctorId" />
        </el-select>
      </el-form-item>
      <el-form-item label="旧图片(3张)" prop="caseImg">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.caseOldImg"
          :format="FormatOne"
          :value.sync="form.caseOldImg"
          :limit-data="arr"
        />
      </el-form-item>
      <el-form-item label="案例主图(3张)" prop="caseImg">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.caseImg"
          :format="FormatTwo"
          :value.sync="form.caseImg"
          :limit-data="arr"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('userform')">提交</el-button>
        <el-button @click="onCancel('userform')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/upload'
import seleUser from '@/components/seleUser'
import { CaseAddObj, CaseFindObj, CaseUpdateObj } from '@/api/case'
import { DoctorSelect } from '@/api/doctors'
import { FindListSort } from '@/api/management'
export default {
  components: {
    'img-upload': ImgUpload,
    'sele-user': seleUser
  },
  data() {
    return {
      form: {
        id: this.$route.query.id,
        caseChecknum: '',
        caseImg: '',
        // caseName: '',
        caseThumbnum: '',
        caseTitle: '',
        doctorId: '',
        style: '',
        userId: '',
        classId: '',
        caseClassId: ''
      },
      FormatOne: '正方形1:1，最少1张最多3张图片',
      FormatTwo: '正方形1:1，最少3张最多9张图片',
      listData: null,
      caseListData: null,
      ImgAmount: 'More',
      isAdd: true, // 添加(true)或者修改
      DoctorsData: null,
      styleData: [
        { id: 0, value: '普通案例' },
        { id: 1, value: '黄金案例 ' },
        { id: 2, value: '钻石案例' }
      ],
      rules: {
        userId: [{ required: true, message: '请选择用户', trigger: 'change' }],
        caseChecknum: [{ required: true, message: '请填写阅读量', trigger: 'blur' }],
        // caseName: [{ required: true, message: '请填写案例名称', trigger: 'blur' }],
        caseThumbnum: [{ required: true, message: '请填写点赞量', trigger: 'blur' }],
        caseTitle: [{ required: true, message: '请填写案例标题', trigger: 'blur' }],
        doctorId: [{ required: true, message: '请选择医生', trigger: 'change' }],
        caseImg: [{ required: true, message: '请上传图片', trigger: 'change' }],
        style: [{ required: true, message: '请选择案例类型', trigger: 'blur' }]
      },
      arr: '3'
    }
  },
  created() {
    this.Doctors()
    this.list()
    if (this.$route.query.id != null) {
      this.Obtain()
      this.isAdd = false
    }
  },
  methods: {
    // 获取医生列表
    Doctors() {
      DoctorSelect({
        classId: ''
      }).then(response => {
        this.DoctorsData = response.data
      })
    },
    // 获取榜单
    list() {
      FindListSort({
        parentId: 0,
        style: 2
      }).then(response => {
        this.listData = response.data
      })
      FindListSort({
        parentId: 0,
        style: 1
      }).then(response => {
        this.caseListData = response.data
      })
    },
    Obtain() {
      CaseFindObj({
        id: parseInt(this.$route.query.id)
      }).then(response => {
        this.form = response.data
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
        CaseAddObj(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jumpui()
        })
      } else {
        console.log(this.form)
        delete this.form.caseDetailList
        delete this.form.doctorData
        delete this.form.userData
        CaseUpdateObj(this.form).then(response => {
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
        path: '/case/caseList'
      })
    },
    // 榜单分类选择
    handleChange(value) {
      this.form.classList = null
      const arr = []
      for (var i in value) {
        var s = value[i]
        arr.push(s[2])
      }
      this.form.classList = arr.join()
    },
    removeTag(value) {
      this.form.classList = null
      const srr = []
      for (var i in value) {
        var s = value[i]
        srr.push(s[2])
      }
      this.form.classList = srr.join()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

