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
        label="时间"
        min-width="170px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.addtime | TimeFormatter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        min-width="150px"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="手机号码" min-width="150px">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="预约时间" min-width="150px">
        <template slot-scope="scope">
          {{ scope.row.appointment }}
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="100px">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
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
      <el-pagination
        :hide-on-single-page="isPage"
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
import { selectAll, surveyMediaDelObj } from '@/api/complaint'
export default {
  filters: {
    TimeFormatter: function(money) {
      const d = new Date(money)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    }
  },
  data() {
    return {
      offset: 1, // 定义几页的数据
      limit: 10, // 一页几条数据
      tableData: [],
      parentId: 0,
      artId: '',
      listQuery: {
        offset: 1,
        limit: 10
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
      selectAll(this.listQuery).then(res => {
        this.tableData = res.data.dataList
        const { countNum, limit, currpage } = res.data
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
      console.log(this.listQuery)
      this.initial()
    },
    filterTag(value, row) {
      return row.treatmentstatus === parseInt(value)
    },
    helpsTag(value, row) {
      return row.helpstatuts === parseInt(value)
    },
    handleDelete(del) {
      var vm = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        surveyMediaDelObj({
          id: del
        }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.initial()
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

