<template>
  <div class="app-container">
    <p class="cjildren_p">当前所属父级--{{ parentName }}</p>
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column prop="ctime" :formatter="TimeFormatter" label="创建日期" width="180" />
      <el-table-column prop="chName" label="分类名称" width="180" />
      <el-table-column prop="parentId" label="所属父级ID" width="180" />
      <el-table-column prop="auth" label="排序" width="180" />
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="addAction">添加分类</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pcClassFindAll, pcClassDelObj } from '@/api/management'
export default {
  data() {
    return {
      tableData: null,
      listLoading: true,
      parentName: this.$route.query.parentName
    }
  },
  watch: {
    $route(to, from) {
      // data数据操作
      this.Obtain()
      this.parentName = to.query.parentName
    }
  },
  created() {
    this.Obtain()
  },
  methods: {
    /* 初始值 */
    Obtain() {
      const vm = this
      vm.listLoading = true
      pcClassFindAll({
        parentId: this.$route.query.parentId,
        style: this.$route.query.style,
        level: 2
      }).then(response => {
        vm.tableData = response.data
        vm.listLoading = false
      })
    },
    /* 编辑分类 */
    handleEdit(a, b) {
      this.$router.push({
        path: '/management/editList',
        query: {
          id: b.id,
          style: b.style,
          level: 2,
          parentId: b.parentId
        }
      })
    },
    /* 删除前提醒 */
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
    /* 删除列表 */
    delete(a) {
      const vm = this
      pcClassDelObj({
        id: a
      }).then(response => {
        vm.$message({
          type: 'success',
          message: '删除成功!'
        })
        vm.Obtain()
      })
    },
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(cellValue)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    },
    /* 添加新分类 */
    addAction() {
      this.$router.push({
        path: '/management/editList',
        query: {
          style: this.$route.query.style,
          parentId: this.$route.query.parentId,
          level: 2
        }
      })
    }
  }
}
</script>
<style>
.el-row {
  margin-top: 20px;
}
.cjildren_p {
  font-size: 22px;
  color: #606266;
  line-height: 45px;
  margin: 10px 0;
}
</style>
