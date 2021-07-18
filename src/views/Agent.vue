<template>
  <div class="container">
    <div class="card-lists flex-center">
      <div class="card-item card-modules flex-center">
        <p class="card-title">Building</p>
        <i class="icon-cog"></i>
        <span class="card-num">3</span>
      </div>
      <div class="card-item card-modules flex-center">
        <p class="card-title">IdIe</p>
        <i class="icon-coffee"></i>
        <span class="card-num">5</span>
      </div>
      <div class="card-item card-infos flex-center">
        <div
          class="card-infos-item flex-center"
          v-for="item in cardLists"
          :key="item.name"
        >
          <span>{{ item.name }}</span>
          <p>{{ item.num }}</p>
        </div>
      </div>
    </div>
    <div class="tool-bar flex-center">
      <div class="tool-tabbar flex-center">
        <div
          v-for="(item, index) in tabbarLists"
          :key="index"
          @click="changeTabbar(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="project-lists">
      <div v-for="item in projectLists" :key="item.id">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { getLists } from "@/apis/index";
export default {
  name: "Agent",
  data() {
    return {
      activeIndex: 0,
      projectLists: [],
      cardLists: [
        {
          name: "ALL",
          num: 3,
        },
        {
          name: "PHYSICAL",
          num: 3,
        },
        {
          name: "VIRTUAL",
          num: 3,
        },
      ],
      tabbarLists: [
        {
          name: "All",
        },
        {
          name: "Physical",
        },
        {
          name: "Virtual",
        },
      ],
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    changeTabbar(index) {
      this.activeIndex = index;
    },
    getLists() {
      getLists()
        .then((res) => {
          console.log(res);
          this.projectLists = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-lists {
  justify-content: space-between;
  margin-bottom: 20px;

  .card-item {
    background-color: #f3f3f3;
    flex: 0 0 calc((100% - 60px) / 3);
    width: calc((100% - 60px) / 3);
    height: 144px;
    box-sizing: border-box;
  }

  .card-infos {
    .card-infos-item {
      flex-direction: column;
      flex: 1;
      height: 100%;
      justify-content: space-around;

      p {
        font-size: 20px;
        margin-bottom: 0;
        margin-top: 0;
      }

      span {
        font-size: 12px;
      }
    }
  }

  .card-modules {
    padding: 20px 10px;
    justify-content: space-between;
    color: #ffffff;
    position: relative;

    [class^="icon-"] {
      font-size: 144px;
      opacity: 0.2;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -72px;
      margin-left: -72px;
    }

    .icon-cog {
      animation: myRotate 2s linear 0s infinite;
      transform-origin: 50% 50%;
    }

    &:first-child {
      background-color: #ff9a2a;
    }

    &:nth-child(2) {
      background-color: #7fbc39;
    }

    .card-title {
      align-self: flex-start;
      margin: 0;
      padding: 0;
      font-size: 18px;
      font-weight: bold;
    }

    .card-num {
      align-self: flex-end;
      font-size: 48px;
    }
  }
}

@keyframes myRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
