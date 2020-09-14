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
      <el-table-column label="商品分类名称">
        <template slot-scope="scope">
          {{ scope.row.typeName }}
        </template>
      </el-table-column>
      <!--<el-table-column prop="typeMust" :formatter="typeFormatter" label="是否必选" min-width="100" />
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.ctime | TimeFormatter }}</span>
        </template>
      </el-table-column>
      -->
      <el-table-column class-name="status-col" label="操作" min-width="210" align="center">
        <template slot-scope="scope">
          <el-tag class="docOperation" @click="goModifyCommodityType(scope.row.typeId)">修改</el-tag>
          <el-tag class="doctorOperationdel docOperation" @click="deleteCommodityType(scope.row.typeId)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="addCommodityType">添加商品分类</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { commodityTypeAll, modifycommodityType } from '@/api/commodityType'
import { mapGetters } from 'vuex'
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
      listLoading: true,
      dataQuery: {
        shopId: ''
      }
    }
  },
  computed: {
    ...mapGetters(['shopId'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.dataQuery.shopId = this.shopId
      commodityTypeAll(this.dataQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    typeFormatter(row, column, cellValue, index) {
      let typeMust = null
      switch (cellValue) {
        case '0':
          typeMust = '可选'
          break
        case '1':
          typeMust = '必选'
          break
      }
      return typeMust
    },
    addCommodityType() {
      this.$router.push({ path: '/commodity/commodityTypeDetail' })
    },
    // 去修改分类
    goModifyCommodityType(rowId) {
      this.$router.push({ path: '/commodity/commodityTypeDetail', query: { id: rowId }})
    },
    // 删除分类
    deleteCommodityType(row) {
      var vm = this
      this.id = row
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        modifycommodityType({
          typeId: vm.id,
          state: 0
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        setTimeout(function() {
          this.fetchData()
        }, 500)
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
