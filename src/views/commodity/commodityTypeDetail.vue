<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品分类名称">
        <el-input v-model="form.typeName" value="" />
      </el-form-item>
      <!--
      <el-form-item label="是否必选" prop="typeMust">
        <el-select v-model="form.typeMust" placeholder="请选择是否必选">
          <el-option v-for="(item, items) in typeMustData" :key="items" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findcommodityType, modifycommodityType, addcommodityType } from '@/api/commodityType'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopId'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      form: {
        typeName: '',
        typeMust: '',
        shopId: ''
      },
      typeMustData: [
        { id: '0', value: '可选' },
        { id: '1', value: '必选' }
      ],
      typeId: this.$route.query.id
    }
  },
  created() {
    // 修改医生名字
    if (this.$route.query.id !== undefined) {
      this.docData()
    }
  },
  methods: {
    docData() {
      const vm = this
      findcommodityType({
        typeId: vm.$route.query.id
      }).then(res => {
        vm.form.typeName = res.data.typeName
        vm.form.typeMust = res.data.typeMust
      })
    },
    onSubmit() {
      var self = this.form
      if (self.__ob__.value.classChName === '' && self.__ob__.value.classEnName === '') {
        this.$message('请填写完整信息！')
      } else {
        if (this.typeId != null) {
          modifycommodityType({
            typeName: this.form.typeName,
            typeMust: this.form.typeMust,
            typeId: this.typeId,
            shopId: this.shopId
          }).then(res => {
            this.showNavList = res
            this.$message('修改成功')
            this.$router.push({ path: '/commodity/commodityType' })
          })
        } else {
          addcommodityType({
            typeName: this.form.typeName,
            typeMust: this.form.typeMust,
            typeId: this.typeId,
            shopId: this.shopId
          })
            .then(res => {
              this.showNavList = res
              this.$message('添加成功')
              this.$router.push({ path: '/commodity/commodityType' })
            })
        }
      }
    },
    onCancel() {
      this.$router.push({ path: '/commodity/commodityType' })
      window.close()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

