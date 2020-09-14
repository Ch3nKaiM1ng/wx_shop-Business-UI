<template>
  <div class="app-container">
    <!-- 订单列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户ID" min-width="50px">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="100px">
        <template slot-scope="scope">
          <img
            fit="cover"
            style="width: 50px; height: 50px"
            :src="scope.row.avatarUrl"
            :lazy="true"
          >
        </template>
      </el-table-column>
      <el-table-column label="名称" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" min-width="100px">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column prop="gender" :formatter="genderFormatter" label="性别" min-width="100" />
      <el-table-column label="openId" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.openid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px" prop="ctime" :formatter="TimeFormatter" />
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleEdit(scope.row.userId)">查看推荐人数</el-button>
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
import { findAllByLimit, modifymainOrder } from '@/api/wxUser'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      offset: 1, // 定义几页的数据
      limit: 10, // 一页几条数据
      tableData: [],
      parentId: 0,
      listQuery: {
        offset: 1,
        limit: 10,
        shopId: '',
        showNew: 1
      },
      countNum: null,
      isPage: true
    }
  },
  created() {
    this.initial()
    // articleAll({
    //   offset: 1,
    //   limit: 10
    // }).then(res => {
    //   console.log(res)
    //   this.tableData = res.data.dataList
    // })
  },
  methods: {
    initial() {
      this.listQuery.shopId = this.shopId
      findAllByLimit(this.listQuery).then(res => {
        this.tableData = res.data.dataList
        console.log(this.tableData)
        const { countNum, currpage, limit } = res.data
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
      this.initial()
    },
    // 分页
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    // 去文章添加
    goAddCommodity() {
      this.$router.push({ path: '/mainOrder/orderDetail' })
    },
    // 去编辑修改
    handleEdit(row) {
      this.$router.push({ path: '/wxuser/userIntroducer', query: { id: row }})
    },
    handleEvault(row) {
      this.$router.push({ path: '/evaluate/evaluate', query: { id: row }})
    },
    handleDelete(del) {
      var vm = this
      this.id = del
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          modifymainOrder({ commodityId: vm.id, state: 0 })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          vm.initial()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    genderFormatter(row, column, cellValue, index) {
      let gender = null
      switch (cellValue) {
        case '0':
          gender = '未知'
          break
        case '1':
          gender = '男'
          break
        case '2':
          gender = '女'
          break
      }
      return gender
    },
    TimeFormatter(row, column, cellValue, index) {
      const date = new Date(cellValue.time)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
    // /*复制地址*/
    // Preview(id) {
    //   console.log(id)
    //   const input = document.createElement('input')
    //   document.body.appendChild(input)

    //   input.setAttribute('value', 'http://new_test.szmlkq.com/#/detailsART?id=' + id)
    //   input.select()
    //   if (document.execCommand('copy')) {
    //     document.execCommand('copy')
    //     this.$message({
    //       message: '复制成功',
    //       type: 'success'
    //     })
    //   }
    //   document.body.removeChild(input)
    // }
  }
}
</script>
<style>
.block {
  width: 50%;
  float: right;
  margin-top: 1rem;
}
/* 内容超出显示。。。 */
.cell {
  text-overflow: ellipsis !important;
}
/* 文章添加按钮 */
.demonstration {
  width: 6rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 8px;
  display: block;
  background-color: rgba(19, 206, 102, 0.1);
  border: 1px solid rgba(19, 206, 102, 0.2);
  color: #13ce66;
  cursor: pointer;
}
</style>

