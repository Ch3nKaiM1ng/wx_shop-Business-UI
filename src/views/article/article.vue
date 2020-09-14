<template>
  <div class="app-container">
    <!-- 评论列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Id" width="50px">
        <template slot-scope="scope">
          <span>{{ scope.row.artId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" min-width="150px" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.artTitle }}</template>
      </el-table-column>
      <el-table-column label="预览地址" width="100px">
        <template slot-scope="scope">
          <el-button type="success" plain size="small" @click="Preview(scope.row.artId)">复制</el-button>
        </template>
      </el-table-column>
      <el-table-column label="浏览量" width="100px">
        <template slot-scope="scope">{{ scope.row.checkNum }}</template>
      </el-table-column>
      <el-table-column label="点赞量" width="100px">
        <template slot-scope="scope">{{ scope.row.thumbNum }}</template>
      </el-table-column>
      <el-table-column label="发表者" width="100px">
        <template slot-scope="scope">{{ scope.row.user.userChName }}</template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="goArtComment(scope.row.artId)">评论</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.artId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.artId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <span class="demonstration" @click="goAddArticle">文章添加</span>
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
import { articleAll, delArticle } from '@/api/article'
export default {
  data() {
    return {
      offset: 1, // 定义几页的数据
      limit: 10, // 一页几条数据
      tableData: [],
      parentId: 0,
      artId: '',
      listQuery: {
        offset: 1,
        limit: 10,
        askId: this.$route.query.com,
        linkClassId: undefined,
        showNew: 1
      },
      countNum: null,
      isPage: true
    }
  },
  created() {
    this.initial()
    // articleAll({
    //   offset: 1,
    //   limit: 10
    // }).then(res => {
    //   console.log(res)
    //   this.tableData = res.data.dataList
    // })
  },
  methods: {
    initial() {
      console.log(this.listQuery)
      articleAll(this.listQuery).then(res => {
        this.tableData = res.data.dataList
        const { countNum, currpage, limit } = res.data
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
    },
    // 分页
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    // 去文章添加
    goAddArticle() {
      this.$router.push({ path: '/article/addarticle' })
    },
    // 去看文章列表
    goArtComment(com) {
      this.$router.push({ path: '/article/artComment', query: { id: com }})
    },
    // 去编辑修改
    handleEdit(row) {
      this.$router.push({ path: '/article/addarticle', query: { id: row }})
    },
    handleDelete(del) {
      var vm = this
      this.id = del
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(vm.id)
          delArticle({ artId: vm.id })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          vm.initial()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // /*复制地址*/
    Preview(id) {
      console.log(id)
      const input = document.createElement('input')
      document.body.appendChild(input)

      input.setAttribute('value', 'http://new_test.szmlkq.com/#/detailsART?id=' + id)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        this.$message({
          message: '复制成功',
          type: 'success'
        })
      }
      document.body.removeChild(input)
    }
  }
}
</script>
<style>
.block {
  width: 50%;
  float: right;
  margin-top: 1rem;
}
/* 内容超出显示。。。 */
.cell {
  text-overflow: ellipsis !important;
}
/* 文章添加按钮 */
.demonstration {
  width: 6rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 8px;
  display: block;
  background-color: rgba(19, 206, 102, 0.1);
  border: 1px solid rgba(19, 206, 102, 0.2);
  color: #13ce66;
  cursor: pointer;
}
</style>

