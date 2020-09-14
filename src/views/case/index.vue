<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column label="Id" width="50">
            <template slot-scope="scope">
              <span>{{ scope.$index }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="案例标题" min-width="220">
            <template slot-scope="scope">{{ scope.row.caseTitle }}</template>
          </el-table-column>
          <el-table-column label="案例点赞量" width="200">
            <template slot-scope="scope">{{ scope.row.caseThumbnum }}</template>
          </el-table-column>
          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.ctime | TimeFormatter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预览地址" width="100px">
            <template slot-scope="scope">
              <el-button type="success" plain size="small" @click="Preview(scope.row.id)">复制</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="360" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="commentEdit(scope.$index, scope.row)">评论</el-button>
              <el-button size="mini" type="primary" @click="handleStaging(scope.$index, scope.row)">案例阶段</el-button>
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
        <el-button type="primary" @click="addAction">添加案例</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { CaseFindAll, deleteFindAll } from '@/api/case'
export default {
  filters: {
    TimeFormatter: function(money) {
      const d = new Date(money)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    }
  },
  data() {
    return {
      listQuery: {
        offset: 1,
        limit: 10,
        linkClassId: undefined
      },
      isPage: true,
      downloadLoading: false,
      tableData: null,
      countData: null

    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      CaseFindAll(this.listQuery).then(response => {
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
      console.log(this.listQuery)
      this.listQuery.offset = 1
      this.initial()
    },
    allFilter() {
      this.listQuery.linkClassId = null
      this.listQuery.offset = 1
      this.initial()
    },
    handleEdit(a, b) {
      this.$router.push({
        path: '/case/editCase',
        query: { id: b.id }
      })
    },
    handleStaging(a, b) {
      this.$router.push({
        path: '/case/caseItem',
        query: { id: b.id }
      })
    },
    commentEdit(a, b) {
      this.$router.push({
        path: '/case/LevelComment',
        query: { id: b.id }
      })
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
    addAction() {
      this.$router.push({
        path: '/case/editCase'
      })
    },
    delete(id) {
      deleteFindAll({
        id: id
      }).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.initial()
      })
    },
    // /*复制地址*/
    Preview(id) {
      console.log(id)
      const input = document.createElement('input')
      document.body.appendChild(input)

      input.setAttribute('value', 'http://new_test.szmlkq.com/#/details_case?id=' + id)
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
.el-row,.jump-bottom {
  margin-bottom: 30px;
}
</style>

