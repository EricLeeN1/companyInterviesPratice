<template>
  <aside class="sidebar">
    <ul class="sidebar-lists">
      <li
        v-for="item in sidebarLists"
        :key="item.path"
        class="sidebar-items"
        :class="activePath === item.path ? 'active' : ''"
      >
        <router-link class="sidebar-link flex-center" :to="item.path">
          <i :class="'icon-' + item.icon" class="sub-icon"></i>
          <span>{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      sidebarLists: [
        {
          icon: "dashboard",
          title: "DASHBOARD",
          path: "/dashboard",
        },
        {
          icon: "sitemap",
          title: "AGENT",
          path: "/agent",
        },
        {
          icon: "boat",
          title: "MY CRUISE",
          path: "/my-cruise",
        },
        {
          icon: "life-bouy",
          title: "HELP",
          path: "/help",
        },
      ],
    };
  },
  computed: {
    activePath() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
}

.sidebar {
  position: relative;
  width: 200px;
  height: calc(100vh - 80px);
  background-color: #2d4054;

  .sidebar-lists {
    list-style: none;
    margin: 0;
    padding: 0;

    .sidebar-items {
      height: 45px;
      line-height: 45px;

      &.active {
        background-color: #f3f3f3;

        .sidebar-link {
          color: #00b4cf;
        }
      }
    }

    .sidebar-link {
      color: #ffffff;
      text-decoration: none;
      width: 100%;
      height: 100%;

      i {
        margin-left: 30px;
        margin-right: 15px;
        font-size: 20px;
        flex: 0 0 20px;
      }

      span {
        text-align: left;
        flex: 0 0 80px;
        padding-top: 5px;
      }
    }
  }
}
</style>
