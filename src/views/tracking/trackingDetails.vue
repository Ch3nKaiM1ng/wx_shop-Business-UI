<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table v-loading="downloadLoading" :data="tableData" style="width: 100%">
          <el-table-column label="Id" width="50">
            <template slot-scope="scope">
              <span>{{ scope.$index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.ctime | TimeFormatter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="ip地址" min-width="100">
            <template slot-scope="scope">{{ scope.row.ipaddr }}</template>
          </el-table-column>
          <el-table-column label="访问型号" min-width="100">
            <template slot-scope="scope">{{ scope.row.mobile }}</template>
          </el-table-column>
          <el-table-column label="用户动作" min-width="250">
            <template slot-scope="scope">{{ scope.row.action }}</template>
          </el-table-column>
          <el-table-column label="注册手机号码" min-width="120">
            <template slot-scope="scope">{{ scope.row.phone | jumpPhone }}</template>
          </el-table-column>
          <el-table-column label="访问页面的系统" min-width="200">
            <template slot-scope="scope">{{ scope.row.system }}</template>
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
import { trackFindAll } from '@/api/tracking'
export default {
  filters: {
    TimeFormatter: function(money) {
      const d = new Date(money)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    },
    jumpPhone: function(phone) {
      let echo = phone
      if (phone === null) {
        echo = '暂无'
      }
      return echo
    }
  },
  data() {
    return {
      listQuery: {
        offset: 1,
        limit: 20,
        checkByIp: '',
        ipaddr: this.$route.query.ipaddr
      },
      isPage: true,
      downloadLoading: true,
      tableData: null,
      countData: null
    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      this.downloadLoading = true
      trackFindAll(this.listQuery).then(response => {
        console.log('获取到的数据')
        console.log(response)
        this.downloadLoading = false
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
      this.listQuery.offset = 1
      this.initial()
    },
    allFilter() {
      this.listQuery.linkClassId = null
      this.listQuery.offset = 1
      this.initial()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    handleSizeChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    handleChange(value) {
      this.listQuery.linkClassId = value[2]
    }
  }
}
</script>
<style>
.el-row,.jump-bottom {
  margin-bottom: 30px;
}
</style>

