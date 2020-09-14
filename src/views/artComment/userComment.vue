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
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评论时间"
        width="150px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评论内容"
        min-width="150px"
      >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="评论数量" width="100px">
        <template slot-scope="scope">
          {{ scope.row.commentList }}
        </template>
      </el-table-column>
      <el-table-column label="点赞数量" width="100px">
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
          <el-button size="mini" type="info" @click="goComment(scope.row.id,scope.row.artId,scope.row.userId,scope.row.topId)">回复</el-button>
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
      <span class="demonstration" @click="goAddComment(parentId,listQuery.askId,listQuery.topID)">添加评论</span>
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
import { commentAll, delComment } from '@/api/article'
export default {
  data() {
    return {
      listQuery: {
        offset: 1,
        limit: 10,
        askId: this.$route.query.comArtId,
        topID: this.$route.query.comId,
        parentId: this.$route.query.comId,
        level: 1
      },
      tableData: [],
      countNum: null,
      isPage: true,
      userId: this.$route.query.userId
    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      commentAll(this.listQuery).then(res => {
        console.log(res)
        this.tableData = res.data.dataList

        // const result = this.tableData
        // if (!Array.isArray(res.data.dataList)) {
        //   console.log(result)
        //   return result
        // }
        // res.data.dataList.forEach(item => {
        //   delete item.children
        // })
        // const map = {}
        // res.data.dataList.forEach(item => {
        //   if (item.level === 0) {
        //     map[item.id] = item
        //   }
        // })
        // res.data.dataList.forEach(item => {
        //   const parent = map[item.topId]
        //   if (parent) {
        //     (parent.children || (parent.children = [])).push(item)
        //   } else {
        //     result.push(item)
        //   }
        // })
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
        // return result
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
    // handleChange(value) {
    //   this.listQuery.linkClassId = value[2]
    // },
    // 去回复这条评论
    goComment(commId, artId, userId, topID) {
      this.$router.push({ path: '/article/modifyComment', query: { addCom: commId, askId: artId, userId: userId, topID: topID }})
    },
    // 去评论添加
    goAddComment(addCom, askId, topID) {
      this.$router.push({ path: '/article/modifyComment', query: { addCom: addCom, askId: askId, topID: topID, userId: addCom }})
    },
    // 去编辑修改
    handleEdit(row) {
      console.log(row)
      this.$router.push({ path: '/article/modifyComment', query: { bid: row }})
    },
    handleDelete(del) {
      var vm = this
      this.id = del
      console.log(this.id)
      this.$confirm('此操作将永久该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(vm.id)
        delComment({ id: vm.id })
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
</style>
