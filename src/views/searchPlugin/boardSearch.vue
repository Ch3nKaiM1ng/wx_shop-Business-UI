<template>
  <div class="app-container">
    <div class="filter-container jump-bottom">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.chName"
          :value="item.id"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="主Id" min-width="80">
        <template slot-scope="scope">{{ scope.row.acId }}</template>
      </el-table-column>
      <el-table-column label="类别" min-width="80">
        <template slot-scope="scope"> <el-tag :type="scope.row | JudgmentCol">{{ scope.row | Judgment }}</el-tag></template>
      </el-table-column>
      <el-table-column label="标题" min-width="350">
        <template slot-scope="scope">{{ scope.row | TimeFormatter }}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="addAction">添加榜单</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { HomselectHot } from '@/api/advertising'
import { FindListSort } from '@/api/management'
export default {
  filters: {
    JudgmentCol: function(row) {
      let arr = ''
      if (row.ac_artId !== null) {
        arr = ' '
      } else if (row.ac_askId !== null) {
        arr = 'success'
      }
      return arr
    },
    Judgment(s) {
      let a = ''
      if (s.ac_artId !== null) {
        a = '文章'
      } else if (s.ac_askId !== null) {
        a = '问答'
      }
      return a
    },
    TimeFormatter(row) {
      let title = 'null'
      if (row.article !== null) {
        title = row.article.artTitle
      } else if (row.ask !== null) {
        title = row.ask.askTitle
      }
      return title
    }
  },
  data() {
    return {
      tableData: null,
      listLoading: true,
      doctorclassId: {
        classId: null
      },
      options: [],
      value: ''
    }
  },
  created() {
    this.ListSort()
  },
  methods: {
    /* 初始值 */
    Obtain() {
      const vm = this
      vm.listLoading = true
      HomselectHot({
        belong: this.value
      }).then(response => {
        vm.tableData = response.data
        vm.listLoading = false
      })
    },
    // 查询榜单列表
    ListSort() {
      FindListSort({
        parentId: 0,
        style: 2
      }).then(response => {
        this.options = response.data
        if (response.data.length !== 0) {
          this.value = response.data[0].id
          this.Obtain()
        } else {
          this.$message({
            type: 'info',
            message: '获取数据错误，请刷新页面'
          })
        }
      })
    },
    /* 编辑分类 */
    handleEdit(a, b) {
      this.$router.push({
        path: '/search/editBoard',
        query: { id: b.acId }
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
          this.$message({
            type: 'info',
            message: '后台规定不存在删除功能，只能修改'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    TimeFormatter(row, column, cellValue, index) {
      let title = 'null'
      if (row.article !== null) {
        title = row.article.artTitle
      } else if (row.ask !== null) {
        title = row.ask.askTitle
      }
      return title
    },
    /* 添加 */
    addAction() {
      this.$router.push({
        path: '/search/editBoard'
      })
    },
    // 搜索按钮
    handleFilter() {
      this.Obtain()
    }
  }
}
</script>
<style>
.el-row {
  margin-top: 20px;
}
</style>
