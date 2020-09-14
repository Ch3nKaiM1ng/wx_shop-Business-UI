<template>
  <div class="app-container">
    <!-- 评论列表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        label="Id"
        width="100px"
        prop="id"
      />
      <el-table-column
        label="回复时间"
        width="150px"
        :formatter="TimeFormatter"
      />
      <el-table-column
        label="回复内容"
        min-width="150px"
        prop="content"
      />
      <el-table-column label="点赞数量" width="100px" prop="thumbNum">
        <template slot-scope="scope">
          {{ scope.row.thumbNum }}
        </template>
      </el-table-column>
      <el-table-column label="发表者" width="100px" prop="user.userChName" />
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="Reply(scope.row.id,listQuery.askAnswerId,scope.row.topId)">回复</el-button>
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
      <span class="demonstration" @click="goAddResponse(listQuery.askAnswerId,parentId,receiveUserId,listQuery.topId)">回复添加</span>
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
import { ResponseComAll, DelResponseCom } from '@/api/questions'
export default {
  data() {
    return {
      tableData: [],
      artId: '',
      parentId: this.$route.query.com,
      receiveUserId: this.$route.query.userId,
      listQuery: {
        offset: 1,
        limit: 10,
        askAnswerId: this.$route.query.askAnswerId,
        topId: this.$route.query.topId
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
      ResponseComAll(this.listQuery).then(res => {
        this.tableData = res.data.dataList
        // const result = this.tableData
        // if (!Array.isArray(res.data.dataList)) {
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
        //   const parent = map[item.parentId]
        //   if (parent) {
        //     console.log(parent);
        //     (parent.children || (parent.children = [])).push(item)
        //   } else {
        //     result.push(item)
        //   }
        // })

        const { countNum, currpage, limit } = res.data
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
      // 每调用一次initial清空一次tableData
      this.tableData = []
      this.initial()
    },
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(row.ctime)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    },
    // 分页
    handleCurrentChange(val) {
      this.listQuery.offset = val
      // 每调用一次initial清空一次tableData
      this.tableData = []
      this.initial()
    },
    // 去回复添加
    goAddResponse(askAnswerId, parentId, receiveUserId, topId) {
      this.$router.push({ path: '/questions/replyRes', query: { askAnswerId: askAnswerId, parentId: parentId, receiveUserId: receiveUserId, topId: topId }})
    },
    // 去回复这条评论
    Reply(parId, askAnswerId, topId) {
      this.$router.push({ path: '/questions/replyRes', query: { parentId: parId, askAnswerId: askAnswerId, topId: topId, receiveUserId: parId }})
    },
    // 去编辑修改
    handleEdit(queID) {
      this.$router.push({ path: '/questions/replyRes', query: { queID: queID }})
    },
    handleDelete(del) {
      var vm = this
      this.id = del
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DelResponseCom({ id: vm.id })
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

