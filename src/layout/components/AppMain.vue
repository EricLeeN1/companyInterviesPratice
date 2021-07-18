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

<style lang="scss" scoped></style>
