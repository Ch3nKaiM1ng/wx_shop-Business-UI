<template>
  <div class="app-container">
    <el-form ref="jumpform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="标题" />
      </el-form-item>
      <el-form-item label="跳转url" prop="url">
        <el-input v-model="form.url" placeholder="url" />
      </el-form-item>
      <el-form-item label="创建用户" prop="userId">
        <sele-user :data-id="form.userId" :value.sync="form.userId" />
      </el-form-item>
      <el-form-item label="选择所属分类">
        <div class="tag_div">
          <el-tag
            v-for="(tag,tagd) in tags"
            :key="tagd"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>

        <el-cascader
          ref="myCascader"
          clearable
          style="width: 430px"
          :options="options"
          :props="Configuration"
          :show-all-levels="false"
          collapse-tags
          @change="handleChange"
          @remove-tag="removeTag"
        />
      </el-form-item>
      <!-- <el-form-item v-else label="所属分类">
        <el-button v-for="i in form.classObjList" :key="i.index" disabled>{{ i.chName }}</el-button>
      </el-form-item>-->
      <el-form-item label="图片" prop="img">
        <img-upload
          ref="UploadImg"
          :img-types="ImgAmount"
          :exist="form.img"
          :format="Format"
          :value.sync="form.img"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('jumpform')">提交</el-button>
        <el-button @click="onCancel('jumpform')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/upload'
import seleUser from '@/components/seleUser'
import { findObjJump, updateObjJump, addObjJump } from '@/api/allJump'
import { FindListSort } from '@/api/management'
const ObtainId = {
  parentId: 0,
  style: 3
}
export default {
  components: {
    'img-upload': ImgUpload,
    'sele-user': seleUser
  },
  data() {
    return {
      form: {
        objId: this.$route.query.objId,
        img: '',
        status: 0,
        title: '',
        url: '',
        userId: '',
        classList: ''
      },
      ImgAmount: 'Single',
      isAdd: true, // 添加(true)或者修改
      rules: {
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        url: [{ required: true, message: '请填写跳转URL', trigger: 'blur' }],
        userId: [{ required: true, message: '请选择用户ID', trigger: 'blur' }],
        img: [{ required: true, message: '请上传头像', trigger: 'blur' }],
        classList: [{ required: true, message: '请选择分类', trigger: 'change' }]
      },
      Format: '1:1',
      options: [],
      optionsDate: [],
      Configuration: {
        label: 'chName',
        value: 'id',
        children: 'children',
        // multiple: true,
        emitPath: false
      },
      echo: [[2, 3], [2, 4]],
      tags: [],
      tagsData: []
    }
  },
  created() {
    if (this.$route.query.objId != null) {
      this.Obtain()
      this.isAdd = false
    }
  },
  mounted() {
    FindListSort(ObtainId).then(response => {
      const ar = []
      for (const i in response.data) {
        const res = {
          id: response.data[i].id,
          chName: response.data[i].chName
        }
        ar.push(res)
      }
      this.optionsDate = ar
      this.processArray(ar)
    })
  },
  methods: {
    Obtain() {
      const vm = this
      findObjJump({
        objId: parseInt(this.$route.query.objId)
      }).then(response => {
        this.form = response.data
        response.data.classObjList.forEach(function(item, index) {
          vm.tags.push(item.chName + ',' + item.classId)
          vm.tagsData.push(item.classId)
        })
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
    onCancel(formName) {
      this.$message({
        message: '清除了!',
        type: 'warning'
      })
      this.$refs[formName].resetFields()
    },
    DataSubmit() {
      this.form.classList = this.tagsData.join()
      if (this.isAdd) {
        addObjJump(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.$router.push({
            path: '/JumpUnit/AllJumpUnit'
          })
        })
      } else {
        updateObjJump(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.$router.push({
            path: '/JumpUnit/AllJumpUnit'
          })
        })
      }
    },
    handleChange(value) {
      const vm = this
      const a = this.$refs.myCascader.getCheckedNodes()[0].pathLabels
      const jum = vm.tags.indexOf((a[2] + ',' + value))
      console.log(jum)
      if (jum < 0) {
        this.tags.push((a[2] + ',' + value))
        this.tagsData.push(value)
      } else if (jum >= 0) {
        this.$message.error('错了哦，已经存在了喔')
      }
    },
    removeTag(value) {
      // this.form.classList = null
      // const srr = []
      // for (var i in value) {
      //   var s = value[i]
      //   srr.push(s[2])
      // }
      // this.form.classList = srr.join()
    },
    async processArray(array) {
      for (const item of array) {
        await this.delayedLog(item)
      }
      this.options = this.optionsDate
    },
    async delayedLog(item) {
      await this.dela(item)
    },
    dela(a) {
      return new Promise(resolve => {
        FindListSort({
          parentId: a.id,
          style: 3
        }).then(response => {
          const children = []
          for (const item of response.data) {
            const res = {
              id: item.id,
              chName: item.chName,
              children: item.sonList
            }
            children.push(res)
          }
          for (const i in this.optionsDate) {
            const as = this.optionsDate[i]
            if (as.id === a.id) {
              as['children'] = children
            }
          }
          resolve(response)
        })
      })
    },
    handleClose(tag) {
      const data = tag.split(',')
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.tagsData.splice(this.tagsData.indexOf(parseInt(data[1])), 1)
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
  .tag_div{
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }
</style>

