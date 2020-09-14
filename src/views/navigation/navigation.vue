<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="dashboard-text">导航</div>
    <div class="dashboard-content">
      <div v-for="(i,index) in listData" :key="index" class="dashboard-content-plate">
        <input type="text" :value="i.priority" placeholder="导航排序" readonly>
        <input type="text" :value="i.chName" placeholder="导航中文名字" readonly>
        <input type="text" :value="i.enName" placeholder="导航英文名字" readonly>
        <input type="text" :value="i.url" placeholder="导航链接" readonly>
        <!--修改删除按钮-->
        <div class="dashboard-content-buttom">
          <span @click="motifyNav(i.id)">修改</span>
          <span @click="deleteNav(i.id)">删除</span>
        </div>
      </div>
      <!-- 添加导航按钮 -->
      <div class="dashboard-content-addPlate" @click="addNavigation">+</div>
    </div></div></template>

<script>
import { mapGetters } from 'vuex'
import { navFindAll, delObj } from '@/api/navigation'

export default {
  data() {
    return {
      list: {
        chName: '',
        enName: '',
        url: '',
        id: '',
        priority: ''

      },
      listData: null
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.allNav()
  },
  methods: {
    // 查询所有导航
    allNav() {
      var vm = this
      navFindAll().then(res => {
        console.log(res)
        vm.listData = res.data
      })
    },
    // 去编辑导航
    motifyNav(row) {
      this.$router.push({ path: '/navigation/addnavigation', query: { id: row }})
    },
    addNavigation() {
      this.$router.push({ path: '/navigation/addnavigation' })
    },
    // 删除导航
    deleteNav(row) {
      var vm = this
      this.id = row
      console.log(this.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(vm.id)
        delObj({ id: vm.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.allNav()
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

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-content{display: inline-block;}
.dashboard-content>div{
  float: left;
  margin-left: 1rem
}
.dashboard-content-plate,.dashboard-content-addPlate{
  width: 15rem;
  height: 16rem;
  border-radius:1rem;
  box-shadow: 0 0 10px rgb(165, 164, 164);
  display: inline-block;
  margin-top:1rem;
}
.dashboard-content-addPlate{
  cursor:pointer;
  font-size:7rem;
  text-align: center;
  line-height: 16rem;
  color:#a4a4a4;
  // background: url("http://data.szmlkq.com/navigation.png")
  }
.dashboard-content input{
  width: 90%;
  height: 2rem;
  border: 0px;
  border-bottom:1px solid rgb(165, 164, 164);
  display: block;
  margin: auto;
  margin-top:1rem;
  outline:none;
}
.dashboard-content input::-webkit-input-placeholder{
  color:#c9c8c8;
}
.dashboard-content-buttom{margin-top:1rem }
.dashboard-content-buttom>span{
  width: 6rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  color:#ffffff;
  display: inline-block;
  border-radius: 8px;
  margin-left: 1rem;
  cursor:pointer;
}
.dashboard-content-buttom>span:nth-of-type(1){background-color:#45a0fc;}
.dashboard-content-buttom>span:nth-of-type(2){background-color:#ff0000;}
</style>
