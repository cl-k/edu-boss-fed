<template>
  <div class="layout">
    <h2>header</h2>
    <h2>sider</h2>
    <!-- 子路由出口 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutIndex'
})
</script>

<style lang="scss" scoped>
</style>
