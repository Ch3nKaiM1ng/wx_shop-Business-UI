<template>
  <div class="components-container app-container">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="文章标题" prop="artTitle">
        <el-input v-model="form.artTitle" value="" />
      </el-form-item>
      <el-form-item label="文章简介" prop="artIntroduction">
        <el-input v-model="form.artIntroduction" type="textarea" value="" />
      </el-form-item>
      <el-form-item label="浏览数量" prop="checkNum">
        <el-input v-model="form.checkNum" value="" />
      </el-form-item>
      <el-form-item label="点赞数量" prop="thumbNum">
        <el-input v-model="form.thumbNum" value="" />
      </el-form-item>
      <el-form-item label="视频链接">
        <el-input v-model="form.artVedio" value="" />
      </el-form-item>
      <el-form-item label="选择用户" prop="artUserId">
        <sele-user :data-id="form.artUserId" :value.sync="form.artUserId" />
      </el-form-item>
      <el-form-item label="选择分类" prop="classId">
        <seleClass :data-id="form.classId" :value="form.classId" :classvalue.sync="form.classId" />
      </el-form-item>
      <el-form-item label="头部关键字">
        <el-select v-model="form.artKeyword" placeholder="请选择关键字">
          <el-option-group
            v-for="group in options3"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.label" placeholder="请选择标签">
          <el-option label="热" value="热" />
          <el-option label="爆" value="爆" />
          <el-option label="新" value="新" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传图片">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.artImg"
          :format="Format"
          :value.sync="form.artImg"
        />
      </el-form-item>
      <el-form-item label="文章内容" prop="artContent">
        <div class="artclecontent">
          <tinymce v-model="form.artContent" :art-id="form.classId" :height="300" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { addArticle, modifyArticle, findArticle } from '@/api/navigation'
import seleUser from '@/components/seleUser'
import classification from '@/components/artticleclassification'
import ImgUpload from '@/components/upload'
export default {
  name: 'TinymceDemo',
  components: { Tinymce, 'img-upload': ImgUpload, 'sele-user': seleUser, 'seleClass': classification },
  data() {
    return {
      imageUrl: '',
      form: {
        artContent: '',
        artImg: '',
        artIntroduction: '',
        artTitle: '',
        artUserId: '',
        artVedio: '',
        checkNum: '',
        classId: '',
        label: '',
        status: 0,
        thumbNum: '',
        artKeyword: ''
      },
      options3: [{

      }, {
        label: '关键字',
        options: [{
          value: '隐形',
          label: '隐形'
        }, {
          value: '费用',
          label: '费用'
        }, {
          value: '价格',
          label: '价格'
        }, {
          value: '脸型',
          label: '脸型'
        }, {
          value: '年龄',
          label: '年龄'
        }, {
          value: '时长',
          label: '时长'
        }, {
          value: '效果',
          label: '效果'
        }, {
          value: '材质',
          label: '材质'
        }, {
          value: '传统',
          label: '传统'
        }]
      }],
      Format: '202*156',
      ImgAmount: 'Single',
      ObtainData: '',
      UserId: '',
      id: this.$route.query.id,
      // 表单校验规则
      rules: {
        artTitle: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        checkNum: [{ required: true, message: '请填写浏览数量', trigger: 'blur' }],
        thumbNum: [{ required: true, message: '请填写点赞数量', trigger: 'blur' }],
        artUserId: [{ required: true, message: '请填选择用户ID', trigger: 'change' }],
        artContent: [{ required: true, message: '请填填写文章内容', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        artIntroduction: [{ required: true, message: '请填写简介', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 判断是否有id传过来进行修改
    const vm = this
    if (this.$route.query.id !== undefined) {
      findArticle({
        artId: vm.$route.query.id
      }).then(res => {
        vm.form = res.data
        console.log(res.data.artContent)
      })
    }
  },
  methods: {
    // 确定按钮
    onSubmit(articleF) {
      var self = this.form
      // self.artContent = '<p>' + self.artContent.replace(/\n*$/g, '').replace(/\n/g, '</p> <p>') + '</p>'
      this.$refs[articleF].validate(valid => {
        if (valid) {
          if (this.id != null) {
          // 修改数据
            console.log(this.form)
            modifyArticle(this.form).then(res => {
              this.$message('修改成功')
              this.$router.push({ path: '/article/article' })
            })
          } else {
            // 添加接口
            addArticle(self.__ob__.value)
              .then(res => {
                this.$message('添加成功')
                this.$router.push({ path: '/article/article' })
              })
          }
        } else {
          this.$message('你东西都没填完呢!')
          return false
        }
      })
    },
    // 取消按钮
    onCancel() {}
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
.artclecontent{margin-top: 2rem;margin-bottom: 2rem;}
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
.upload{
  float: left;
}
.ObtainImg{
  width: auto;
  height: 100%;
  float: left;
  margin-left: 25px;
}
</style>
