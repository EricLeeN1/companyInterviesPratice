<template>
  <div class="container">
    <header class="nav-container">
      <div class="nav-wrap flex-center">
        <div class="logo ">
          <img :src="icon.logo" alt="" />
        </div>
        <div class="user-infos">
          <img :src="icon.avatar" alt="" />
        </div>
      </div>
    </header>
    <main class="main-container">
      <div class="main-wrap">
        <side-bar />
        <app-main></app-main>
      </div>
    </main>
  </div>
</template>

<script>
import AppMain from "./components/AppMain";
import SideBar from "./components/SideBar";
export default {
  name: "Layout",
  components: {
    AppMain,
    SideBar,
  },
  data() {
    return {
      icon: {
        logo: require("@/assets/logo/logo.svg"),
        avatar: require("@/assets/logo/avatar.jpg"),
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
}

.nav-container {
  position: relative;
  z-index: 2;
  height: 80px;
  background-color: #f3f3f3;
  box-shadow: 0 0 1px 3px #ccc;

  .nav-wrap {
    justify-content: center;
    margin: 0 auto;
    height: 100%;
    position: relative;

    @media (min-width: 1200px) {
      width: 1200px;
    }
  }

  img {
    cursor: pointer;
  }

  .logo {
    img {
      height: 40px;
    }
  }

  .user-infos {
    img {
      border-radius: 50%;
      height: 40px;
    }
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translate(0, -50%);
  }
}

.main-container{
  .main-wrap{
    position: relative;
    margin: 0 auto;

    @media (min-width: 1200px) {
      width: 1200px;
    }
  }
}
</style>
