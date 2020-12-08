<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配权限</span>
      </div>
      <el-tree
        ref="menu-tree"
        :data="menus"
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div style="text-align: center">
        <el-button>清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus
} from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created() {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadRoleMenus() {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },

    getCheckedKeys(menus: any) {
      // 老版本的接口，父级在没有全选的情况下为 true
      // menus.forEach((menu: any) => {
      //   if (menu.selected) {
      //     // this.checkedKeys.push(menu.id as never) // 试图不更新
      //     this.checkedKeys = [...this.checkedKeys, menu.id] as any
      //   }

      //   if (menu.subMenuList) {
      //     this.getCheckedKeys(menu.subMenuList)
      //   }
      // })

      // 父级在子级存在且只要有一个 ture 的时候就为 true
      menus.forEach((menu: any) => {
        if (menu.selected) {
          if (menu.subMenuList) {
            this.getCheckedKeys(menu.subMenuList)
          } else {
            this.checkedKeys = [...this.checkedKeys, menu.id] as any
          }
        }
      })
    },

    async loadMenus() {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },

    async onSave() {
      // 拿到选中节点的数据 id 列表
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      // 请求提交保存
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('操作成功')
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
