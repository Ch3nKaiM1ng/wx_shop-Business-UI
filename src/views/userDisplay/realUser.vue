<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table v-loading="UserLoading" :data="tableData" style="width: 100%">
          <el-table-column prop="ctime" :formatter="TimeFormatter" label="创建日期" width="140" />
          <el-table-column prop="userChName" label="姓名" width="150" />
          <el-table-column prop="userMobile" label="电话" width="150" />
          <el-table-column prop="userSex" :formatter="SexFormatter" label="性别" width="100" />
          <el-table-column prop="userEmail" label="邮箱" />
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

  </div>
</template>

<script>
import { findAllUser } from '@/api/user'
export default {
  data() {
    return {
      listQuery: {
        offset: 1,
        limit: 10,
        auth: 0
      },
      isPage: true,
      downloadLoading: false,
      tableData: null,
      countData: null,
      UserLoading: true
    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      this.UserLoading = true
      findAllUser(this.listQuery).then(response => {
        this.UserLoading = false
        this.tableData = response.data.dataList
        const { countData, currpage, limit } = response.data
        this.listQuery.offset = currpage
        this.listQuery.limit = limit
        this.countData = countData
        if (countData <= limit) {
          this.isPage = true
        } else if (countData > limit) {
          this.isPage = false
        }
      })
    },
    // 时间判断
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(cellValue)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    },
    // 男女判断
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
        path: '/userDisplay/editUser',
        query: { id: b.userId, auth: 0 }
      })
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    handleSizeChange(val) {
      this.listQuery.offset = val
      this.initial()
    }
  }
}
</script>
<style>
.el-row,.jump-bottom {
  margin-bottom: 30px;
}
</style>

