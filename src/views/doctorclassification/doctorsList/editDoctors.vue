<template>
  <div class="app-container">
    <el-form ref="userform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="医生所属分类" prop="classList">
        <el-select
          v-model="doctorclassList"
          style="width: 430px"
          multiple
          placeholder="请选择"
          @change="doctorsBtn"
        >
          <el-option
            v-for="item in classOptions"
            :key="item.classId"
            :label="item.classChName"
            :value="item.classId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="中文名" prop="doctorChName">
        <el-input v-model="form.doctorChName" placeholder="中文名" />
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="form.doctorEnName" placeholder="英文名" />
      </el-form-item>
      <el-form-item label="中文职位" prop="doctorChPosition">
        <el-input v-model="form.doctorChPosition" placeholder="中文职位" />
      </el-form-item>
      <el-form-item label="英文职位">
        <el-input v-model="form.doctorEnPosition" placeholder="英文职位" />
      </el-form-item>
      <el-form-item label="预约数量" prop="doctorBooknum">
        <el-input v-model="form.doctorBooknum" placeholder="预约数量" />
      </el-form-item>
      <el-form-item label="好评数量" prop="doctorGoodReception">
        <el-input v-model="form.doctorGoodReception" placeholder="好评数量" />
      </el-form-item>
      <el-form-item label="咨询数量" prop="doctorConsult">
        <el-input v-model="form.doctorConsult" placeholder="咨询数量" />
      </el-form-item>
      <el-form-item label="评分" prop="doctorGrade">
        <div class="doctorRate">
          <el-rate v-model="form.doctorGrade" show-score allow-half />
        </div>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.doctorEmail" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="职业证书编号" prop="doctorCode">
        <el-input v-model="form.doctorCode" placeholder="职业证书编号" />
      </el-form-item>
      <el-form-item label="医生手机号码" prop="doctorMobile">
        <el-input v-model="form.doctorMobile" placeholder="手机号码" />
      </el-form-item>
      <el-form-item label="工作年份" prop="doctorWorkyear">
        <el-input v-model="form.doctorWorkyear" placeholder="工作年份" />
      </el-form-item>
      <el-form-item label="性别" prop="doctorSex">
        <el-select v-model="form.doctorSex" placeholder="请选择性别">
          <el-option
            v-for="(item, items) in SexData"
            :key="items"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="医生主图(首页)" prop="doctorImg">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.doctorImg"
          :format="doctorImgTxt"
          :value.sync="form.doctorImg"
        />
      </el-form-item>
      <el-form-item label="医生头像(列表)" prop="doctorHeadImg">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.doctorHeadImg"
          :format="doctorHeadImgTxt"
          :value.sync="form.doctorHeadImg"
        />
      </el-form-item>
      <el-form-item label="擅长项目" prop="doctorGoodat">
        <el-input v-model="form.doctorGoodat" type="textarea" :rows="2" placeholder="请输入医生擅长项目" />
      </el-form-item>
      <el-form-item label="简介" prop="doctorIntroduction">
        <el-input
          v-model="form.doctorIntroduction"
          type="textarea"
          :rows="2"
          placeholder="请输入医生简介"
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
import { findObjdoctor, addObjdoctor, updateObjdoctor } from '@/api/doctors'
import { findList } from '@/api/navigation'
export default {
  components: {
    'img-upload': ImgUpload
  },
  data() {
    return {
      form: {
        classList: null,
        doctorBooknum: '',
        doctorChName: '',
        doctorChPosition: '',
        doctorCode: '',
        doctorConsult: '',
        doctorEmail: '',
        doctorEnName: '',
        doctorEnPosition: '',
        doctorGoodReception: '',
        doctorGoodat: '',
        doctorGrade: 0,
        doctorImg: '',
        doctorIntroduction: '',
        doctorMobile: '',
        doctorSex: '',
        doctorWorkyear: '',
        status: 0,
        doctorId: this.$route.query.id
      },
      doctorImgTxt: '318*396',
      doctorHeadImgTxt: '1:1',
      SexData: [{ id: 0, value: '女' }, { id: 1, value: '男' }],
      doctorclassList: null,
      classOptions: null, // 医生分类
      ImgAmount: 'Single',
      isAdd: true, // 添加(true)或者修改
      rules: {
        doctorBooknum: [
          { required: true, message: '请填写预约次数', trigger: 'blur' }
        ],
        doctorChName: [
          { required: true, message: '请填写中文名', trigger: 'blur' }
        ],
        doctorChPosition: [
          { required: true, message: '请填写中文职位', trigger: 'blur' }
        ],
        doctorCode: [
          { required: true, message: '请填写职业资格证书号', trigger: 'blur' }
        ],
        // doctorEmail: [
        //   { required: true, message: "请填写邮箱", trigger: "blur" },
        //   {
        //     type: "email",
        //     message: "请输入正确的邮箱地址",
        //     trigger: ["blur", "change"]
        //   }
        // ],
        doctorConsult: [
          { required: true, message: '请填写咨询数量', trigger: 'blur' }
        ],
        // doctorEnName: [
        //   { required: true, message: '请填写英文名字', trigger: 'blur' }
        // ],
        // doctorEnPosition: [{ required: true, message: '请填写英文职位', trigger: 'blur' }],
        doctorGoodReception: [
          { required: true, message: '请填写好评数量', trigger: 'blur' }
        ],
        doctorGoodat: [
          { required: true, message: '请填写项目擅长', trigger: 'blur' }
        ],
        doctorGrade: [
          { required: true, message: '请填写评分等级', trigger: 'blur' }
        ],
        doctorIntroduction: [
          { required: true, message: '请填写医生简介', trigger: 'blur' }
        ],
        doctorMobile: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ],
        doctorWorkyear: [
          { required: true, message: '请填写医生工作年份', trigger: 'blur' }
        ],
        doctorImg: [
          { required: true, message: '请上传医生的主图', trigger: 'blur' }
        ],
        doctorHeadImg: [{ required: true, message: '请上传医生头像', trigger: 'blur' }],
        userMobile: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ],
        doctorSex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.id != null) {
      this.Obtain()
      this.isAdd = false
    }
    findList().then(response => {
      this.classOptions = response.data
    })
  },
  mounted() {},
  methods: {
    Obtain() {
      findObjdoctor({
        doctorId: parseInt(this.$route.query.id)
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
        addObjdoctor(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jumpui()
        })
      } else {
        updateObjdoctor(this.form).then(response => {
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
        path: '/doctors/doctorsList'
      })
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

