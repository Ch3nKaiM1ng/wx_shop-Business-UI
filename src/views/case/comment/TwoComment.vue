<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Id" width="50">
            <template slot-scope="scope">
              <span>{{ scope.$index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="评论人" min-width="220">
            <template slot-scope="scope">{{ scope.row.user.userChName }}</template>
          </el-table-column>
          <el-table-column label="评论内容" min-width="220">
            <template slot-scope="scope">{{ scope.row.content }}</template>
          </el-table-column>
          <el-table-column label="回复谁？" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveUser | Reply }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.ctime | TimeFormatter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="360" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="commentEdit(scope.$index, scope.row)">回复</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="block">
          <el-pagination
            background
            :hide-on-single-page="isPage"
            :page-size="listQuery.limit"
            :total="countData"
            layout="total, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="addAction">添加评论</el-button>
      </el-col>
    </el-row>
    <el-dialog title="添加评论" :visible.sync="dialogFormVisible" :rules="commentRules">
      <el-form :model="form">
        <el-form-item label="评论内容" label-width="90px" prop="content">
          <el-input v-model="form.content" autocomplete="off" />
        </el-form-item>
        <el-form-item label="点赞数" label-width="90px" prop="thumbNum">
          <el-input v-model="form.thumbNum" autocomplete="off" />
        </el-form-item>
        <el-form-item label="评论用户" label-width="90px" prop="userId">
          <sele-user :data-id="form.userId" :value.sync="form.userId" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commentMaskBt">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { caseCommentFindAll, caseCommentFindObj, caseCommentDelObj, caseCommentUpdateObj, caseCommentAddObj } from '@/api/case'
import seleUser from '@/components/seleUser'
export default {
  components: {
    'sele-user': seleUser
  },
  filters: {
    TimeFormatter: function(money) {
      const d = new Date(money)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    },
    Reply: function(value) {
      let a = ''
      if (value !== null) {
        a = value.userChName
      }
      return a
    }
  },
  data() {
    return {
      listQuery: {
        offset: 1,
        limit: 10,
        caseId: this.$route.query.caseId,
        level: 1,
        topId: this.$route.query.id
      },
      isPage: true,
      downloadLoading: false,
      tableData: null,
      countData: null,
      dialogFormVisible: false,
      form: {
        caseId: this.$route.query.caseId,
        content: '',
        level: 1,
        parentId: this.$route.query.id,
        receiveUserId: this.$route.query.receiveUserId,
        status: 0,
        thumbNum: '',
        topId: this.$route.query.id,
        userId: ''
      },
      commentRules: {
        userId: [{ required: true, message: '请选择用户', trigger: 'change' }],
        content: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        thumbNum: [{ required: true, message: '请填写点赞数', trigger: 'blur' }]
      },
      isAdd: true
    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      caseCommentFindAll(this.listQuery).then(response => {
        this.tableData = response.data.dataList
        const { countNum, currpage, limit } = response.data
        this.listQuery.offset = currpage
        this.listQuery.limit = limit
        this.countData = countNum
        if (countNum <= limit) {
          this.isPage = true
        } else if (countNum > limit) {
          this.isPage = false
        }
      })
    },
    handleFilter() {
      this.listQuery.offset = 1
      this.initial()
    },
    allFilter() {
      this.listQuery.linkClassId = null
      this.listQuery.offset = 1
      this.initial()
    },
    // 点击了列表的编辑按钮
    handleEdit(a, b) {
      caseCommentFindObj({
        id: b.id
      }).then(response => {
        this.form = response.data
        delete this.form.user
        this.dialogFormVisible = true
      }).catch(response => {
        this.$message.error('打开错误请刷新页面')
      })
    },
    // 点击了回复的评论按钮
    commentEdit(a, b) {
      console.log(b)
      const data = {
        caseId: b.caseId,
        content: '',
        level: 1,
        parentId: b.id,
        receiveUserId: b.userId,
        status: 0,
        thumbNum: '',
        topId: this.$route.query.id,
        userId: null
      }
      this.form = data
      this.isAdd = false
      this.dialogFormVisible = true
    },
    handleDelete(a, b) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.delete(b.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    handleSizeChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    // 点了添加按钮
    addAction() {
      const data = {
        caseId: this.$route.query.caseId,
        content: '',
        level: 1,
        parentId: this.$route.query.id,
        receiveUserId: this.$route.query.receiveUserId,
        status: 0,
        thumbNum: '',
        topId: this.$route.query.id,
        userId: ''
      }
      this.form = data
      this.isAdd = false
      this.dialogFormVisible = true
    },
    delete(id) {
      caseCommentDelObj({
        id: id
      }).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.initial()
      })
    },
    // 编辑确定
    commentMaskBt() {
      this.dialogFormVisible = false
      if (this.isAdd === true) {
        caseCommentUpdateObj(this.form).then(response => {
          this.dialogFormVisible = false
          this.initial()
        })
      } else if (this.isAdd === false) {
        caseCommentAddObj(this.form).then(response => {
          this.dialogFormVisible = false
          this.initial()
        })
      }
    }
  }
}
</script>
<style>
.el-row,
.jump-bottom {
  margin-bottom: 30px;
}
</style>

