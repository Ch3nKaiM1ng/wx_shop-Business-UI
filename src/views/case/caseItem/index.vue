<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column prop="ctime" :formatter="TimeFormatter" label="创建日期" width="180" />
      <el-table-column prop="title" label="标题" min-width="180" />
      <el-table-column prop="days" label="天数" width="120" />
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope" align="center">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="addAction">添加案例分期</el-button>
        <!-- <el-button type="primary" @click="back">查看当前归属案例主题</el-button> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Deldoctor } from '@/api/doctors'
import { caseDetailFindAll } from '@/api/case'
export default {
  data() {
    return {
      tableData: null,
      listLoading: true,
      doctorclassId: {
        classId: null
      },
      caseId: this.$route.query.id
    }
  },
  created() {
    this.initial()
  },
  methods: {
    /* 初始值 */
    initial() {
      const vm = this
      vm.listLoading = true
      caseDetailFindAll({
        caseId: this.$route.query.id
      }).then(response => {
        console.log(response)
        vm.tableData = response.data
        vm.listLoading = false
      })
    },
    /* 编辑分类 */
    handleEdit(a, b) {
      this.$router.push({
        path: '/case/editCaseItem',
        query: { id: b.id, caseId: this.caseId }
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
          this.delete(b.doctorId)
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
      Deldoctor({
        id: a
      }).then(response => {
        vm.$message({
          type: 'success',
          message: '删除成功!'
        })
        vm.initial()
      })
    },
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(cellValue)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    },
    /* 添加新分类 */
    addAction() {
      this.$router.push({
        path: '/case/editCaseItem',
        query: { caseId: this.caseId }
      })
    }
  }
}
</script>
<style>
.el-row {
  margin-top: 20px;
}
</style>

