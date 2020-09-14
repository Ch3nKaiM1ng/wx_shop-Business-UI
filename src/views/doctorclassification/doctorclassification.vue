<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="医生分类中文名称">
        <template slot-scope="scope">
          {{ scope.row.classChName }}
        </template>
      </el-table-column>
      <el-table-column label="医生分类英文名称" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.classEnName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.ctime | TimeFormatter }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" min-width="210" align="center">
        <template slot-scope="scope">
          <el-tag class="docOperation" @click="modifyDoctor(scope.row.classId)">修改</el-tag>
          <el-tag class="doctorOperationdel docOperation" @click="deleteDoctor(scope.row.classId)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="addDoctor">添加医生分类</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { findList, deleteDoc } from '@/api/navigation'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    TimeFormatter(cellValue) {
      const d = new Date(cellValue)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      findList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    addDoctor() {
      this.$router.push({ path: '/doctors/checkdoctor' })
    },
    // 去修改医生分类
    modifyDoctor(rowId) {
      this.$router.push({ path: '/doctors/checkdoctor', query: { id: rowId }})
    },
    // 删除医生分类
    deleteDoctor(row) {
      var vm = this
      this.id = row
      console.log(this.id)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(vm.id)
        deleteDoc({ classId: vm.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchData()
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
.docOperation,.addDoctor{cursor:pointer}
.doctorOperationdel{
    background-color: rgba(255, 73, 73, 0.1);
    border-color: rgba(255, 73, 73, 0.2);
    color: #ff4949;
}
.addDoctor{
    width: 6rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 8px;
    display: block;
    background-color: rgba(19, 206, 102, 0.1);
    border:1px solid rgba(19, 206, 102, 0.2);
    color: #13ce66;
}
.el-row {
  margin-top: 20px;
}
</style>
