<template>
  <section class="app-main">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view :key="key"></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 80= navbar  80  */
  min-height: calc(100vh - 80px);
  /* 200= sidebar  200  */
  width: calc(100% - 200px);
  padding: 20px 30px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  margin-left: 200px;
}
</style>
