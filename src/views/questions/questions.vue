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
          <span>{{ scope.row.askId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间"
        width="150px"
        :formatter="TimeFormatter"
      />
      <el-table-column
        label="图片"
        width="180"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>图片地址: {{ scope.row.askImg }}</p>
            <p>视频地址: {{ scope.row.askVedio }}</p>
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.askImg" class="askimg">
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="主题标题"
        min-width="150px"
      >
        <template slot-scope="scope">
          {{ scope.row.askTitle }}
        </template>
      </el-table-column>
      <el-table-column
        label="主题内容"
        min-width="150px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.askContent }}
        </template>
      </el-table-column>
      <el-table-column label="预览地址" width="100px">
        <template slot-scope="scope">
          <el-button type="success" plain size="small" @click="Preview(scope.row.askId)">复制</el-button>
        </template>
      </el-table-column>
      <el-table-column label="浏览量" width="100px">
        <template slot-scope="scope">
          {{ scope.row.askCheckNum }}
        </template>
      </el-table-column>
      <el-table-column label="点赞量" width="100px">
        <template slot-scope="scope">
          {{ scope.row.thumbNum }}
        </template>
      </el-table-column>
      <el-table-column label="发表者" width="100px">
        <template slot-scope="scope">
          {{ scope.row.user.userChName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="goQuesResponse(scope.row.askId)">回答</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row.askId)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.askId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="block">
      <span class="demonstration" @click="goAddquestions">问答添加</span>
      <el-pagination
        :current-page.sync="offset"
        :page-size="listQuery.limit"
        layout="prev, pager, next, jumper"
        :total="countData"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
    <el-row>
      <el-col :span="24">
        <div class="block">
          <el-pagination
            background
            :hide-on-single-page="isPage"
            :page-size="listQuery.limit"
            :total="countNum"
            layout="total, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="goAddquestions">问答添加</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { askList, delask } from '@/api/questions'
export default {
  data() {
    return {
      tableData: [],
      parentId: 0,
      artId: '',
      listQuery: {
        offset: 1,
        limit: 10,
        linkClassId: undefined,
        showNew: 1
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
      askList(this.listQuery).then(res => {
        console.log(res)
        this.tableData = res.data.dataList
        const { countNum, currpage, limit } = res.data
        console.log(countNum)
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
      console.log(`每页 ${val} 条`)
      this.initial()
    },
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(row.ctime)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    },
    // 分页
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.initial()
    },
    // 去问答主题添加
    goAddquestions() {
      this.$router.push({ path: '/questions/addquestions' })
    },
    // 去看问题回复列表
    goQuesResponse(com) {
      this.$router.push({ path: '/questions/questionresponse', query: { id: com }})
    },
    // 去编辑修改
    handleEdit(row) {
      this.$router.push({ path: '/questions/addquestions', query: { modifyque: row }})
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
        delask({ askId: vm.id })
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
    },
    // /*复制地址*/
    Preview(id) {
      console.log(id)
      const input = document.createElement('input')
      document.body.appendChild(input)

      input.setAttribute('value', 'http://new_test.szmlkq.com/#/detailsASK?id=' + id)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        this.$message({
          message: '复制成功',
          type: 'success'
        })
      }
      document.body.removeChild(input)
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
.askimg{
    width: 40%;
}
</style>

