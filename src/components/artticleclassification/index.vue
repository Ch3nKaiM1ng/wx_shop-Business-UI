<template>
  <div class>
    <!-- <el-cascader ref="classvalue" :props="artticle" :show-all-levels="false" @expand-change="classprops" /> -->
    <el-cascader
      ref="classvalue"
      v-model="datartValue"
      :options="options"
      :props="Configuration"
      :show-all-levels="false"
      @change="seleBtn"
    />
  </div>
</template>

<script>
import { FindListSort } from '@/api/management'
const FindList = {
  parentId: 0,
  style: 2
}
export default {
  props: ['value'],
  data() {
    return {
      artticle: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node
          const nodes = []
          // 重置parentId，不然返回到这个页面会获取不到数据
          FindList.parentId = 0
          if (value !== undefined) {
            FindList.parentId = value
          }
          FindListSort(FindList).then(response => {
            console.log(response)
            for (const i in response.data) {
              const res = {
                value: response.data[i].id,
                label: response.data[i].chName,
                leaf: level >= 2
              }
              nodes.push(res)
            }
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          })
        }
      },
      selectData: null,
      Configuration: {
        label: 'chName',
        value: 'id',
        children: 'children'
      },
      options: null,
      artValue: '',
      datartValue: ''
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        // 父组件param对象改变会触发此函数
        this.artValue = newValue
        // console.log(this.artValue)
      }
    },
    deep: true
  },
  mounted() {
    FindListSort(FindList).then(response => {
      const ar = []
      for (const i in response.data) {
        const res = {
          id: response.data[i].id,
          chName: response.data[i].chName
        }
        ar.push(res)
      }
      this.selectData = ar
      this.processArray(ar)
    })
  },
  methods: {
    seleBtn(item) {
      const vm = this
      item.forEach(val => {
        vm.$emit('update:classvalue', val)
      })
    },
    async processArray(array) {
      for (const item of array) {
        await this.delayedLog(item)
      }
      this.options = this.selectData
    },
    async delayedLog(item) {
      await this.dela(item)
      this.datartValue = this.artValue
    },
    dela(a) {
      return new Promise(resolve => {
        FindListSort({
          parentId: a.id,
          style: 2
        }).then(response => {
          const children = []
          for (const item of response.data) {
            if (item.chName === '问大家') {
              const res = {
                id: item.id,
                chName: item.chName,
                children: item.sonList
              }
              children.push(res)
            }
          }
          for (const i in this.selectData) {
            const as = this.selectData[i]
            if (as.id === a.id) {
              as['children'] = children
            }
          }
          resolve(response)
        })
      })
    }
  }
}
</script>
