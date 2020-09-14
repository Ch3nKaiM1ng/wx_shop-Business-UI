<template>
  <div class="app-container">
    <!-- 评论列表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="Id"
        width="50px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="150px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投诉内容"
        min-width="150px"
      >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="150px">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="是否有帮助"
        width="120"
        :filters="[{ text: '有帮助', value: '0' }, { text: '无帮助', value: '1' }]"
        :filter-method="helpsTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.helpstatuts === 0 ? 'success' : 'danger'"
            disable-transitions
          >{{ scope.row.helpstatuts | helpshandle }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="处理状态"
        width="100"
        :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.treatmentstatus === 0 ? 'danger' : 'success'"
            disable-transitions
          >{{ scope.row.treatmentstatus | handle }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="100px">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page.sync="listQuery.offset"
        :page-size="listQuery.limit"
        layout="prev, pager, next, jumper"
        :total="countNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { checkFindAll, deletecomplaint } from '@/api/complaint'
export default {
  filters: {
    handle: function(data) {
      if (data === 0) {
        return '未处理'
      } else if (data === 1) {
        return '已处理'
      }
    },
    helpshandle: function(data) {
      if (data === 0) {
        return '有帮助'
      } else if (data === 1) {
        return '无帮助'
      }
    }
  },
  data() {
    return {
      offset: 1, // 定义几页的数据
      limit: 10, // 一页几条数据
      tableData: [],
      parentId: 0,
      artId: '',
      listQuery: {
        offset: 1,
        limit: 10,
        treatmentstatus: ''
      },
      countNum: null,
      isPage: true

    }
  },
  created() {
    this.initial()
  },
  methods: {
    initial() {
      checkFindAll(this.listQuery).then(res => {
        console.log(res)
        this.tableData = res.data.subscribe
        const { countNum } = res.data
        const limit = res.data.subscribe[0].limit
        const currpage = res.data.subscribe[0].offset
        console.log(limit)
        this.listQuery.offset = currpage
        this.listQuery.limit = limit
        this.countNum = countNum
        if (countNum <= limit) {
          this.isPage = true
        } else if (countNum > limit) {
          this.isPage = false
        }
      })
    },
    // 设定每页的数据条数
    handleSizeChange(val) {
      this.listQuery.offset = val
      console.log(this.listQuery)
      this.initial()
    },
    // 分页
    handleCurrentChange(val) {
      this.listQuery.offset = val
      console.log(this.listQuery)
      this.initial()
    },
    // 去编辑修改
    handleEdit(row) {
      this.$router.push({ path: '/complaint/modifycomplaint', query: { id: row }})
    },
    filterTag(value, row) {
      console.log(1)
      return row.treatmentstatus === parseInt(value)
    },
    helpsTag(value, row) {
      return row.helpstatuts === parseInt(value)
    },
    handleDelete(del) {
      var vm = this
      this.id = del
      console.log(this.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(vm.id)
        deletecomplaint({ id: vm.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
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
.block{
    width: 50%;
    float: right;
    margin-top:1rem;
}
/* 内容超出显示。。。 */
.cell{
    text-overflow :ellipsis!important;
}
/* 文章添加按钮 */
.demonstration{
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
</style>

