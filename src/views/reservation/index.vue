<template>
  <div class="app-container">
    <div class="filter-container jump-bottom">
      <el-select v-model="listQuery.sState" style="width: 430px" placeholder="请选择">
        <el-option label="未处理" value="0" />
        <el-option label="已处理" value="1" />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        @click="TOPallFilter"
      >全部</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="TOPhandleFilter"
      >Search</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
          <el-table-column label="Id" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.sId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医生名字" min-width="180">
            <template slot-scope="scope">{{ scope.row.doctor.doctorChName }} {{ scope.row.doctor.doctorChPosition }}</template>
          </el-table-column>
          <el-table-column label="预约手机" min-width="150">
            <template slot-scope="scope">{{ scope.row.sPhone }}</template>
          </el-table-column>
          <el-table-column label="预约姓名" width="150">
            <template slot-scope="scope">{{ scope.row.sName }}</template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.sAddtime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.sDate }}:{{ scope.row.sTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="处理"
            width="100"
            :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.sState === 0 ? 'danger' : 'success'"
                disable-transitions
              >{{ scope.row.sState | handle }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.sState == 1" size="mini" disabled type="primary" @click="handleEdit(scope.$index, scope.row)">处理</el-button>
              <el-button v-else size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">处理</el-button>
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
import { SubscribeSelectAll } from '@/api/messy'
export default {
  filters: {
    handle: function(data) {
      if (data === 0) {
        return '未处理'
      } else if (data === 1) {
        return '已处理'
      }
    }
  },
  data() {
    return {
      listQuery: {
        offset: 1,
        limit: 10,
        sState: ''
      },
      isPage: true,
      downloadLoading: false,
      tableData: null,
      countData: null,
      listLoading: true

    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      this.listLoading = true
      SubscribeSelectAll(this.listQuery).then(response => {
        console.log('data')
        console.log(response)
        this.listLoading = false
        this.tableData = response.data.subscribe
        const { countNum } = response.data
        // this.listQuery.offset = currpage
        // this.listQuery.limit = limit
        this.countData = countNum
        if (countNum <= this.listQuery.limit) {
          this.isPage = true
        } else if (countNum > this.listQuery.limit) {
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
      this.$confirm('此操作将改变数据状态, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.$router.push({
            path: '/reservation/dealReser',
            query: { id: b.sId }
          })
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
    filterTag(value, row) {
      return row.sState === parseInt(value)
    },
    /* 全部 */
    TOPallFilter() {
      this.listQuery.sState = ''
      this.listQuery.offset = 1
      this.initial()
    },
    /** 搜索 */
    TOPhandleFilter() {
      this.listQuery.offset = 1
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

