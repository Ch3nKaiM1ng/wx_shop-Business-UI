<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2019/8/13',
          title: 'second edition',
          content: 'zww zhr 2019/8/13 15:58'
        },
        {
          timestamp: '2019/7/30',
          title: 'First edition',
          content: 'zww zhr 2019/7/30 10:46'
        },
        {
          timestamp: '2019/7/10',
          title: 'Start design',
          content: 'zww zhr 2019/7/10 20:46'
        }
      ]
    }
  }
}
</script>
