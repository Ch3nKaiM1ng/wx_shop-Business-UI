<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="listLoading"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column fixed prop="date" label="id" width="90">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column fixed prop="date" label="排序字段" width="90">
            <template slot-scope="scope">
              {{ scope.row.rank }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="图片" min-width="180">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="contralImg">
            </template>
          </el-table-column>
          <el-table-column prop="province" label="链接" min-width="220">
            <template slot-scope="scope">
              {{ scope.row.url }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope" align="center">
              <el-button type="primary" size="mini" @click="motifyImg(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteImg(scope.row.id)">删除</el-button>
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
        <el-button type="primary" @click="goAddImg">添加广告</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { HotfindAll, HotDelObj } from '@/api/advertising'
export default {
  data() {
    return {
      listQuery: {
        offset: 1,
        limit: 10
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
      HotfindAll(this.listQuery).then(response => {
        this.listLoading = false
        this.tableData = response.data.dataList
        const { countNum, limit, currpage } = response.data
        this.listQuery.offset = currpage
        this.listQuery.limit = limit
        this.countData = countNum
        if (countNum <= this.listQuery.limit) {
          this.isPage = true
        } else if (countNum > this.listQuery.limit) {
          this.isPage = false
        }
      })
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
    // 去添加图片
    goAddImg() {
      this.$router.push({ path: '/advertising/editHotad' })
    },
    // 去编辑图片
    motifyImg(row) {
      this.$router.push({ path: '/advertising/editHotad', query: { id: row }})
    },
    // 删除图片
    deleteImg(row) {
      var vm = this
      this.id = row
      this.$confirm('此操作将永久此项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        HotDelObj({ id: vm.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.listQuery.offset = 1
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
.el-row,.jump-bottom {
  margin-bottom: 30px;
}
.contralImg{width: 140px;height: 140px;}
.addImg{
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
.el-row {
  margin-top: 20px;
}
</style>
