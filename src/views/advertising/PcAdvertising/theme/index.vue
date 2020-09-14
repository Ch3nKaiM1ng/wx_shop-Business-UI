<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column fixed prop="date" label="排序" width="90">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="图片" min-width="180">
        <template slot-scope="scope">
          <img :src="scope.row.bannerImg" class="contralImg">
        </template>
      </el-table-column>
      <el-table-column prop="province" label="链接" min-width="220">
        <template slot-scope="scope">
          {{ scope.row.bannerUrl }}
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
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="goAddImg">添加图片</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pcBanner, pcDelObj } from '@/api/navigation'
export default {
  data() {
    return {
      tableData: null,
      listLoading: true
    }
  },
  created() {
    this.imgDatalist()
  },
  methods: {
    // 查看所有图片
    imgDatalist() {
      this.listLoading = true
      pcBanner({ style: 2 }).then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    // 去添加图片
    goAddImg() {
      this.$router.push({ path: '/advertising/editTheme' })
    },
    // 去编辑图片
    motifyImg(row) {
      this.$router.push({ path: '/advertising/editTheme', query: { id: row }})
    },
    // 删除图片
    deleteImg(row) {
      var vm = this
      this.id = row
      console.log(this.id)
      this.$confirm('此操作将永久此项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(vm.id)
        pcDelObj({ id: vm.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.imgDatalist()
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

