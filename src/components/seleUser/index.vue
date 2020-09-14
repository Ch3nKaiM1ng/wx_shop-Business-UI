/* eslint-disable vue/require-prop-types */
<template>
  <div class>
    <el-button type="primary" @click="centerDialogVisible = true">{{ tetx }}</el-button>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="80%" center>
      <el-table
        v-loading="UserLoading"
        highlight-current-row
        :data="gridData"
        style="width: 100%"
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="ctime" :formatter="TimeFormatter" label="创建日期" width="140" />
        <el-table-column prop="userChName" label="姓名" width="150" />
        <el-table-column prop="userMobile" label="电话" width="150" />
        <el-table-column prop="userSex" :formatter="SexFormatter" label="性别" width="100" />
        <el-table-column prop="userEmail" label="邮箱" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findOurList, findObjUser } from '@/api/user'
export default {
  props: ['dataId'],
  data() {
    return {
      centerDialogVisible: false,
      gridData: null,
      UserLoading: true,
      tetx: '选择创建用户'
    }
  },
  watch: {
    dataId: {
      handler(newValue, oldValue) {
        // 父组件param对象改变会触发此函数
        if (newValue) {
          this.Inquire(newValue)
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.dataId) {
      this.Inquire(this.dataId)
    }
  },
  created() {
    this.refreshData()
  },
  methods: {
    refreshData() {
      this.UserLoading = true
      findOurList().then(response => {
        this.gridData = response.data
        this.UserLoading = false
      })
    },
    TimeFormatter(row, column, cellValue, index) {
      const d = new Date(cellValue)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    },
    SexFormatter(row, column, cellValue, index) {
      let sex = null
      switch (cellValue) {
        case 0:
          sex = '女'
          break
        default:
          sex = '男'
          break
      }
      return sex
    },
    // 选中事件
    handleCurrentChange(val) {
      this.tetx = '选择了：' + val.userChName
      this.$emit('update:value', val.userId)
    },
    Inquire(aid) {
      findObjUser({
        userId: aid
      }).then(response => {
        this.tetx = response.data.userChName
      })
    }
  }
}
</script>
