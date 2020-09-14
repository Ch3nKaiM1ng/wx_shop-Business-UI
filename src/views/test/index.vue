<template>
  <div>
    <h1>weiwei测试页</h1>
    <el-button @click="test">默认按钮</el-button>

    <div v-for="(t,index) in 10" :key="index" class="test_div">
      <h1>{{ t }}</h1>
      <div v-if="index === 3">
        <h1>男</h1>
      </div>
      <div v-else>
        <h1>女</h1>
      </div>
    </div>
  </div>
</template>
<style>
  .test_div{
    width: 200px;
    height: 100px;
    border: 1px solid springgreen;
    margin-bottom: 50px;
    margin-left: 50px;
  }
</style>
<script>
import { getUserSession } from '@/api/text'
export default {
  data() {
    return {

    }
  },
  methods: {
    test() {
      getUserSession().then(response => {
        console.log(response)
      })
    }
  }
}
</script>
