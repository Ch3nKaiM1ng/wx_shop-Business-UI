<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="addAction">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="UserLoading" :data="UserData" style="width: 100%">
      <el-table-column prop="ctime" :formatter="TimeFormatter" label="创建日期" min-width="140" />
      <el-table-column prop="userChName" label="姓名" min-width="150" />
      <el-table-column prop="userMobile" label="电话" min-width="150" />
      <el-table-column prop="userSex" :formatter="SexFormatter" label="性别" min-width="100" />
      <el-table-column prop="userEmail" label="邮箱" min-width="150" />
      <el-table-column label="操作" min-width="100" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { findOurList } from '@/api/user'

export default {
  data() {
    return {
      UserData: null,
      UserLoading: true
    }
  },
  created() {
    this.Obtain()
  },
  methods: {
    Obtain() {
      this.UserLoading = true
      findOurList().then(response => {
        this.UserData = response.data
        this.UserLoading = false
      })
    },
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(cellValue)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    },
    SexFormatter(row, column, cellValue, index) {
      let sex = null
      switch (cellValue) {
        case 0:
          sex = '女'
          break
        default:
          sex = '男'
          break
      }
      return sex
    },
    handleEdit(a, b) {
      this.$router.push({
        path: '/userDisplay/editUser',
        query: { id: b.userId, auth: 1 }
      })
    },
    handleDelete(a, b) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.$message({
            type: 'error',
            message: '无效操作，删除失败'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addAction() {
      this.$router.push({
        path: '/userDisplay/editUser',
        query: { auth: 1 }
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
