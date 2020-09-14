<template>
  <div class="app-container">
    <el-form ref="jumpform" :model="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="选择类型">
        <el-select v-model="seleTypeste" placeholder="1为文章-2为问答" @change="searchTypes">
          <el-option
            v-for="item in seleTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="归属" prop="classList">
        <el-select v-model="form.belong" placeholder="1为热搜-2为底部">
          <el-option
            v-for="s in belongData"
            :key="s.value"
            :label="s.label"
            :value="s.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="rank">
        <el-input v-model="form.rank" placeholder="排序" />
      </el-form-item>
      <el-form-item label="选择内容" prop="classList">
        <el-button class="edit-left" type="primary" @click="centerDialogVisible = true">选择文章或者问答</el-button>
        <div class="edit-connection edit-left">
          <img src="http://dt.szmlkq.com/connection.png" alt="">
        </div>
        <span class="edit-left edit-span">{{ sesText }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('jumpform')">提交</el-button>
        <el-button @click="onCancel('jumpform')">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="80%" center>
      <div v-if="seleTypes == 1">
        <el-table
          v-loading="UserLoading"
          highlight-current-row
          :data="gridData"
          style="width: 100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="ctime" :formatter="TimeFormatter" label="创建日期" />
          <el-table-column prop="artTitle" label="标题" min-width="350" />
          <el-table-column prop="user" :formatter="filterUser" label="用户" />
        </el-table>
      </div>
      <div v-else-if="seleTypes == 2">
        <el-table
          v-loading="UserLoading"
          highlight-current-row
          :data="gridData"
          style="width: 100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="ctime" :formatter="TimeFormatter" label="创建日期" />
          <el-table-column prop="askTitle" label="标题" min-width="350" />
          <!-- <el-table-column prop="user" :formatter="filterUser" label="用户" /> -->
        </el-table>
      </div>

      <el-pagination
        background
        style="margin-top: 10px;"
        :page-size="ObtainId.limit"
        layout="prev, pager, next"
        :total="pagertotal"
        @current-change="PagerhandleCurrentChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { HomLnset, HomUpdate, HomSelectById } from '@/api/advertising'
import { articleAll } from '@/api/article'
import { askList } from '@/api/questions'
// import { FindListSort } from '@/api/management'
export default {
  data() {
    return {
      form: {
        acId: this.$route.query.id,
        belong: this.$route.query.belong,
        ac_askId: '',
        ac_artId: '',
        rank: ''
      },
      seleTypes: 1,
      seleTypeste: '',
      seleTypesId: '',
      isAdd: true, // 添加(true)或者修改
      rules: {
        belong: [{ required: true, message: '请选择归属', trigger: 'change' }],
        seleTypesId: [{ required: true, message: '请选择归属', trigger: 'change' }],
        rank: [{ required: true, message: '请选择排序', trigger: 'blur' }]
      },
      seleTypeData: [
        {
          value: 1,
          label: '文章'
        }, {
          value: 2,
          label: '问答'
        }
      ],
      belongData: [
        {
          value: '1',
          label: '热搜'
        }, {
          value: '2',
          label: '底部'
        }
      ],
      centerDialogVisible: false,
      gridData: null,
      UserLoading: true,
      sesText: '暂未选择',
      ObtainId: {
        limit: 10, // 显示数量v
        offset: 1// 当前页数
      },
      pagertotal: null
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
      // 查询详情接口
      HomSelectById({
        acId: parseInt(this.$route.query.id)
      }).then(response => {
        const { belong, ac_askId, ac_artId, rank } = response.data
        this.form.belong = belong
        this.form.ac_askId = ac_askId
        this.form.ac_artId = ac_artId
        this.form.rank = rank
        if (response.data.article !== null) {
          this.sesText = '文章：' + response.data.article.artTitle
          this.seleTypeste = '文章'
          this.seleTypes = 1
        } else if (response.data.ask !== null) {
          this.sesText = '问答：' + response.data.ask.askTitle
          this.seleTypeste = '问答'
          this.seleTypes = 2
        }
        this.must()
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
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(cellValue)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    },
    filterUser(row, column, cellValue, index) {
      return cellValue.userChName
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
        HomLnset(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 跳转判断
          this.jump()
        })
      } else {
        HomUpdate(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.jump()
        })
      }
    },
    // 选择表单事情
    handleCurrentChange(val) {
      if (parseInt(this.seleTypes) === 1) {
        this.sesText = '文章：' + val.artTitle
        this.form.ac_artId = val.artId
        this.form.ac_askId = null
      } else if (parseInt(this.seleTypes) === 2) {
        this.form.ac_artId = null
        this.sesText = '问答：' + val.askTitle
        this.form.ac_askId = val.askId
      }
    },
    searchTypes(value) {
      this.gridData = null
      this.UserLoading = true
      this.pagertotal = null
      this.seleTypes = value
      this.must()
    },
    // 获取选择数据
    must() {
      if (parseInt(this.seleTypes) === 1) {
        articleAll(this.ObtainId).then(response => {
          this.gridData = response.data.dataList
          this.UserLoading = false
          this.pagertotal = response.data.countNum
        })
      } else if (parseInt(this.seleTypes) === 2) {
        askList(this.ObtainId).then(response => {
          this.gridData = response.data.dataList
          this.UserLoading = false
          this.pagertotal = response.data.countNum
        })
      }
    },
    // 点击了分页器
    PagerhandleCurrentChange(val) {
      this.ObtainId.offset = val
      this.must()
    },
    // 跳转判断
    jump() {
      if (this.$route.query.belong === 1) {
        this.$router.push({
          path: '/search/searchList'
        })
      } else if (this.$route.query.belong === 2) {
        this.$router.push({
          path: '/search/LastSearch'
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
.edit-left{
  float: left;
}
.edit-connection{
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-left: 20px;
}
.edit-connection img{
  height: 100%;
  transform:rotate(45deg);
-ms-transform:rotate(45deg); 	/* IE 9 */
-moz-transform:rotate(45deg); 	/* Firefox */
-webkit-transform:rotate(45deg); /* Safari 和 Chrome */
-o-transform:rotate(45deg); 	/* Opera */
}
.edit-span{
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  margin-left: 20px;
  color: #333;
}
</style>

