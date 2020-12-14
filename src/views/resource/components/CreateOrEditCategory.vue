<template>
  <div>
    <el-form label-position="right" label-width="60px">
      <el-form-item label="名称">
        <el-input v-model="category.name"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number
          v-model="category.sort"
          label="请输入排序"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  saveOrUpdateCategory
} from '@/services/resource-category'

export default Vue.extend({
  name: 'CrateOrEditCategory',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object
    }
  },
  methods: {
    async onSubmit() {
      const { data } = await saveOrUpdateCategory(this.category)
      console.log(data)
      this.$message.success('操作成功')
      this.$emit('success')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
