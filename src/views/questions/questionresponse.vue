<template>
  <div class="app-container">
    <!-- 评论列表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="Id"
        width="50px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.askId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间"
        width="150px"
        :formatter="TimeFormatter"
      />
      <el-table-column
        label="主题标题"
        min-width="150px"
>
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="回复内容"
        min-width="150px"
      >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="点赞量" width="100px">
        <template slot-scope="scope">
          {{ scope.row.thumbNum }}
        </template>
      </el-table-column>
      <el-table-column label="发表者" width="100px">
        <template slot-scope="scope">
          {{ scope.row.user.userChName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="goResComment(scope.row.id,scope.row.userId)">评论</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <span class="demonstration" @click="goAddResponse(questionsID)">回复添加</span>
      <el-pagination
        :current-page.sync="listQuery.offset"
        :page-size="listQuery.limit"
        layout="prev, pager, next, jumper"
        :total="countNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { responseList, delResponse } from '@/api/questions'
export default {
  data() {
    return {
      tableData: [],
      parentId: 0,
      artId: '',
      questionsID: this.$route.query.id,
      listQuery: {
        offset: 1,
        limit: 10,
        askId: this.$route.query.com,
        linkClassId: undefined
      },
      countNum: null,
      isPage: true

    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      responseList(this.listQuery).then(res => {
        console.log(res)
        this.tableData = res.data.dataList
        const { countNum, currpage, limit } = res.data
        console.log(countNum)
        this.listQuery.offset = currpage
        this.listQuery.limit = limit
        this.countNum = countNum
        if (countNum <= limit) {
          this.isPage = true
        } else if (countNum > limit) {
          this.isPage = false
        }
      })
    },
    // 设定每页的数据条数
    handleSizeChange(val) {
      this.listQuery.offset = val
      this.initial()
      console.log(`每页 ${val} 条`)
    },
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(row.ctime)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    },
    // 分页
    handleCurrentChange(val) {
      this.listQuery.offset = val
      console.log(`每页 ${val} 条`)
      console.log(this.listQuery.limit)
      this.initial()
    },
    handleChange(value) {
      this.listQuery.linkClassId = value[2]
    },
    // 去问答主题添加
    goAddResponse(questionsID) {
      this.$router.push({ path: '/questions/addquestionresponse', query: { questionsID: questionsID }})
    },
    // 去看评论回复列表
    goResComment(com, userId) {
      console.log(com)
      this.$router.push({ path: '/questions/respondtocomments', query: { com: com, topId: com, askAnswerId: com, userId: userId }})
    },
    // 去编辑修改
    handleEdit(queID) {
      console.log(queID)
      this.$router.push({ path: '/questions/addquestionresponse', query: { queID: queID }})
    },
    handleDelete(del) {
      var vm = this
      this.id = del
      console.log(this.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(vm.id)
        delResponse({ id: vm.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        vm.initial()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style>
.block{
    width: 50%;
    float: right;
    margin-top:1rem;
}
/* 内容超出显示。。。 */
.cell{
    text-overflow :ellipsis!important;
}
/* 文章添加按钮 */
.demonstration{
    width: 6rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 8px;
    display: block;
    background-color: rgba(19, 206, 102, 0.1);
    border:1px solid rgba(19, 206, 102, 0.2);
    color: #13ce66;
    cursor:pointer

}
.askimg{
    width: 40%;
}
</style>

