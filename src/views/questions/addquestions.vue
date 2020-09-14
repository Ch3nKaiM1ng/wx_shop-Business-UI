<template>
  <div class="components-container app-container">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="选择用户" prop="askUserId">
        <sele-user :data-id="form.askUserId" :value.sync="form.askUserId" />
      </el-form-item>
      <!-- <el-form-item label="创建标签" prop="label">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
      </el-form-item> -->
      <el-form-item label="选择标签">
        <el-select v-model="form.askLabel" placeholder="请选择标签">

          <el-option
            v-for="item in askLabelData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主题标题" prop="askTitle">
        <el-input v-model="form.askTitle" value="" />
      </el-form-item>
      <el-form-item label="主题简介" prop="askIntroduction" show-overflow-tooltip>
        <el-input v-model="form.askIntroduction" type="textarea" value="" />
      </el-form-item>
      <el-form-item label="主题内容" prop="askContent">
        <el-input v-model="form.askContent" type="textarea" value="" />
      </el-form-item>
      <el-form-item label="选择分类" prop="askClassId">
        <seleClass :value="form.askClassId" :data-id="form.askClassId" :classvalue.sync="form.askClassId" />
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
      <el-form-item label="视频链接" prop="askVedio">
        <el-input v-model="form.askVedio" value="" />
      </el-form-item>
      <el-form-item label="点赞数量" prop="thumbNum">
        <el-input v-model="form.thumbNum" value="" />
      </el-form-item>
      <el-form-item label="浏览数量" prop="askCheckNum">

        <el-input v-model="form.askCheckNum" value="" />
      </el-form-item>
      <el-form-item label="上传图片" prop="askImg">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.askImg"
          :format="askImgTxt"
          :value.sync="form.askImg"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="onCancel('form')">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { addask, modifyask, fineask } from '@/api/questions'

import ImgUpload from '@/components/upload'
import seleUser from '@/components/seleUser'
import classification from '@/components/artticleclassification'
export default {
  components: { 'img-upload': ImgUpload, 'sele-user': seleUser, 'seleClass': classification },
  data() {
    return {
      imageUrl: '',
      askImgTxt: '369*242',
      form: {
        askTitle: '',
        askContent: '',
        askIntroduction: '',
        askImg: '',
        askVedio: '',
        askCheckNum: '',
        status: 0,
        thumbNum: '',
        askUserId: '',
        askLabel: '',
        askClassId: '',
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
      ImgAmount: 'Single',
      UserId: '',
      bid: this.$route.query.modifyque,
      // 表单校验规则
      rules: {
        askUserId: [{ required: true, message: '请填选择创建用户', trigger: 'change' }],
        askTitle: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        askContent: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        askImg: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        thumbNum: [{ required: true, message: '请填写点赞量', trigger: 'blur' }],
        askCheckNum: [{ required: true, message: '请填写浏览量', trigger: 'blur' }],
        askIntroduction: [{ required: true, message: '请填写简介', trigger: 'blur' }],
        askClassId: [{ required: true, message: '请选择分类', trigger: 'blur' }]
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      askLabelData: [
        {
          value: '热',
          label: '热'
        },
        {
          value: '爆',
          label: '爆'
        },
        {
          value: '新',
          label: '新'
        }
      ]
    }
  },
  // watch: {
  //   // 监听标签并拆分重组传到askLabel里
  //   dynamicTags(val) {
  //     var str = ''
  //     val.forEach(item => {
  //       str += item + ','
  //       this.form.askLabel = str
  //     })
  //   }
  // },
  created() {
    // 判断是否有id传过来进行修改
    const vm = this
    if (this.$route.query.modifyque !== undefined) {
      fineask({
        askId: vm.$route.query.modifyque
      }).then(res => {
        vm.form = res.data
        // 判断askLabel是否为空，不为空就把字符串拆分为数组传入到dynamicTags里
        // if (res.data.askLabel != null) {
        //   var str = res.data.askLabel.split(',')
        //   str.forEach(item => {
        //     console.log(item)
        //     vm.dynamicTags.push(item)
        //   })
        // }
      })
    }
  },
  methods: {
    // 确定按钮
    onSubmit(articleF) {
      // this.$message('submit!')
      var self = this.form
      var vm = this
      this.$refs[articleF].validate(valid => {
        if (valid) {
          if (this.bid != null) {
          // 修改数据
            modifyask(
              this.form
            ).then(res => {
              this.showNavList = res
              this.$message('修改成功')
              setTimeout(function() {
                vm.$router.back(-1)
              }, 1000)
            })
          } else {
            //   添加接口
            addask(self.__ob__.value)
              .then(res => {
                this.showNavList = res
                this.$message('添加成功')
                setTimeout(function() {
                  vm.$router.back(-1)
                }, 1000)
              })
          }
        } else {
          this.$message('你东西都没填完呢!')
          return false
        }
      })
    },
    // 取消按钮
    onCancel(form) {
      this.$message({
        message: '清除了!',
        type: 'warning'
      })
      this.$refs[form].resetFields()
    }
    // 标签
    // handleClose(tag) {
    //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    // },
    // showInput() {
    //   this.inputVisible = true
    //   this.$nextTick(_ => {
    //     this.$refs.saveTagInput.$refs.input.focus()
    //   })
    // },
    // handleInputConfirm() {
    //   const inputValue = this.inputValue
    //   if (inputValue) {
    //     this.dynamicTags.push(inputValue)
    //   }
    //   this.inputVisible = false
    //   this.inputValue = ''
    // }
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
