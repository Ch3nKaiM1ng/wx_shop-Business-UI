<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table v-loading="Loading" :data="tableData" style="width: 100%">
          <el-table-column label="Id" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.sId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="添加时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.sAddtime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="内容" min-width="150">
            <template slot-scope="scope">{{ scope.row.sContent }}</template>
          </el-table-column>
          <el-table-column label="关键词" width="120">
            <template slot-scope="scope">{{ scope.row.sKeyword }}</template>
          </el-table-column>
          <el-table-column label="链接" min-width="220">
            <template slot-scope="scope">{{ scope.row.sUrl }}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-button type="primary" @click="addAction">添加Data</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { searchPageAll, searchPageDelete } from '@/api/advertising'
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
        sBlong: 'top'
      },
      isPage: true,
      Loading: true,
      tableData: null,
      countData: null
    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      this.Loading = true
      searchPageAll(this.listQuery).then(response => {
        console.log(response)
        this.tableData = response.data.search
        const { countNum } = response.data
        this.countData = countNum
        this.Loading = false
        if (countNum <= this.listQuery.limit) {
          this.isPage = true
        } else if (countNum > this.listQuery.limit) {
          this.isPage = false
        }
      })
    },
    handleFilter() {
      this.listQuery.offset = 1
      this.initial()
    },
    handleEdit(a, b) {
      this.$router.push({
        path: '/searchPage/editData',
        query: { id: b.sId, type: 'top' }
      })
    },
    handleDelete(a, b) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.delete(b.sId)
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
        path: '/searchPage/editData',
        query: { type: 'top' }
      })
    },
    delete(id) {
      searchPageDelete({
        sId: id
      }).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.initial()
      })
    }
  }
}
</script>
<style>
.el-row,.jump-bottom {
  margin-bottom: 30px;
}
</style>

