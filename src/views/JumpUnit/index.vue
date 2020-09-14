<template>
  <div class="app-container">
    <div class="filter-container jump-bottom">
      <el-cascader
        :props="Allpropsr"
        :show-all-levels="false"
        style="width: 430px"
        @change="handleChange"
      />
      <el-button
        class="filter-item"
        type="primary"
        @click="allFilter"
      >全部</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >Search</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Id" width="50">
            <template slot-scope="scope">
              <span>{{ scope.$index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="添加时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.ctime | TimeFormatter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文章标题" min-width="150">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="所属分类id" width="120">
            <template slot-scope="scope">{{ scope.row.linkClassId }}</template>
          </el-table-column>
          <el-table-column label="跳转地址" width="200">
            <template slot-scope="scope">{{ scope.row.url }}</template>
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
        <el-button type="primary" @click="addAction">添加跳转单位</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { JumpFindAll, DeleteDelObj } from '@/api/allJump'
import { FindListSort } from '@/api/management'
const ObtainId = {
  parentId: 0,
  style: 3
}
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
        linkClassId: undefined
      },
      isPage: true,
      downloadLoading: false,
      Allpropsr: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node
          if (value !== undefined) {
            ObtainId.parentId = value
          }
          FindListSort(ObtainId).then(response => {
            const nodes = []
            for (const i in response.data) {
              const a = {
                value: response.data[i].id,
                label: response.data[i].chName,
                leaf: level >= 2
              }
              nodes.push(a)
            }
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          })
        }
      },
      tableData: null,
      countData: null
    }
  },
  created() {
    this.initial()
  },
  mounted() {
    ObtainId.parentId = 0
  },
  methods: {
    initial() {
      JumpFindAll(this.listQuery).then(response => {
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
    handleFilter() {
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
        path: '/JumpUnit/AddJumpUnit',
        query: { objId: b.objId }
      })
    },
    handleDelete(a, b) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.delete(b.objId)
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
    handleChange(value) {
      console.log(value)
      this.listQuery.linkClassId = value[2]
    },
    addAction() {
      this.$router.push({
        path: '/JumpUnit/AddJumpUnit'
      })
    },
    delete(id) {
      DeleteDelObj({
        objId: id
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

