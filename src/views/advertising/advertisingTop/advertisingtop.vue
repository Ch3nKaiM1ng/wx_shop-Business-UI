<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col v-for="item in list" :key="item.index" :span="6">
        <div class="grid-content bg-purple">
          <img :src="item.bgImg" alt>
          <template>
            <el-button size="small " @click="handleEdit(item.id)">编辑</el-button>
            <el-button size="small " type="danger" @click="handleDelete(item.id)">删除</el-button>
          </template>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="addAdvertising">添加图片</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { AdvertisingFindAll, AdvertisingDelObj } from '@/api/advertising'

export default {
  data() {
    return {
      list: null
    }
  },
  created() {
    this.Obtain()
  },
  methods: {
    /* 初始值 */
    Obtain() {
      const vm = this
      AdvertisingFindAll().then(response => {
        vm.list = response.data
      })
    },
    handleEdit(Did) {
      this.$router.push({
        path: '/advertising/increase',
        query: { id: Did }
      })
    },
    handleDelete(Did) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.Delete(Did)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addAdvertising() {
      this.$router.push({
        path: '/advertising/increase'
      })
    },
    Delete(Did) {
      AdvertisingDelObj({ id: Did }).then(response => {
        this.Obtain()
      })
    }
  }
}
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
img {
  width: 100%;
}
</style>
