<template>
  <div class="resource-catagory">
    <el-card>
      <div slot="header">
        <el-row style="margin-bottom: 20px">资源分类</el-row>
        <el-row>
          <el-button size="small" @click="dialogVisible = true">添加</el-button>
        </el-row>
      </div>
      <el-table :data="categories" style="width: 100%">
        <el-table-column type="index" label="编号"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
        <el-table-column prop="sort" label="排序"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="!isEdit ? '添加分类' : '编辑分类'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <create-or-edit-category
        v-if="dialogVisible"
        :category="currenCategory"
        :is-edit="isEdit"
        @success="onSuccess"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getResourceCategories,
  deleteCategory
} from '@/services/resource-category'
import moment from 'moment'
import CreateOrEditCategory from './components/CreateOrEditCategory.vue'

export default Vue.extend({
  name: 'ResourceCategory',
  components: {
    CreateOrEditCategory
  },
  data() {
    return {
      categories: [] as any,
      isEdit: false,
      dialogVisible: false,
      currenCategory: {
        name: '',
        sort: 0
      }
    }
  },
  created() {
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories() {
      const { data } = await getResourceCategories()
      this.categories = data.data
      this.categories.forEach((category: any) => {
        category.createdTime = moment(category.createdTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      })
    },

    handleEdit(category: any) {
      this.dialogVisible = true
      this.currenCategory = Object.assign({}, category)
      this.isEdit = true
    },

    handleDelete(item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteCategory(item.id)
          // if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadResourceCategories() // 更新数据列表
          // }
        })
        .catch(err => {
          console.log(err)
          // 取消执行这里
          this.$message.info('已取消删除')
        })
    },

    onSuccess() {
      this.dialogVisible = false
      this.isEdit = false
      this.currenCategory = {
        name: '',
        sort: 0
      }
      this.loadResourceCategories()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
