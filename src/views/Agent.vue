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
          v-for="item in tabbarLists"
          :key="item.name"
          @click="changeTabbar(item)"
          class="tabbar-items"
          :class="activeType === item.type ? 'active' : ''"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="tool-search flex-center">
        <i class="icon-search"></i>
        <input v-model="keyword" @input="inputFind" type="text" />
      </div>
      <div class="tool-filter flex-center">
        <i
          v-for="item in typeList"
          :key="item.type"
          :class="[
            'icon-th-' + item.type,
            showType === item.type ? 'active' : '',
          ]"
          @click="changeType(item)"
        >
        </i>
      </div>
    </div>
    <lists
      :lists="resultsLists.length ? resultsLists : dataLists"
      :showType="showType"
    ></lists>
  </div>
</template>

<script>
import lodash from "lodash";
import lists from "@/components/lists";
import { getLists } from "@/apis/index";
export default {
  name: "Agent",
  components: {
    lists,
  },
  data() {
    return {
      activeType: "",
      keyword: "",
      showType: "list",
      projectLists: [],
      resultsLists: [],
      typeList: [
        {
          type: "card",
        },
        {
          type: "list",
        },
      ],
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
          type: "",
        },
        {
          name: "Physical",
          type: "physical",
        },
        {
          name: "Virtual",
          type: "virtual",
        },
      ],
    };
  },
  computed: {
    dataLists() {
      if (this.projectLists.length) {
        return this.projectLists.filter((ele) => {
          if (this.activeType) {
            return ele.type === this.activeType;
          } else {
            return ele;
          }
        });
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.getLists();
  },
  methods: {
    inputFind: lodash.debounce(function() {
      if (this.keyword) {
        let resultsLists = this.searchKeyValues(
          this.dataLists,
          "name",
          this.keyword
        );
        this.resultsLists = resultsLists;
      } else {
        this.resultsLists = [];
      }
    }, 500),
    /**
     * @param {Object} lists 所有数据
     * @param {string} key 需要查询的数据的键值
     * @param {string} value 需要查询的值
     */
    searchKeyValues(lists, key, value) {
      let arrs = JSON.parse(JSON.stringify(lists));
      let res = arrs.filter((item) => {
        return item[key].includes(value);
      });
      return res;
    },
    changeTabbar(item) {
      this.activeType = item.type;
    },
    changeType(item) {
      this.showType = item.type;
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
.tool-bar {
  height: 50px;
  background-color: #ffffff;

  .tool-tabbar {
    flex: 0 0 270px;

    .tabbar-items {
      flex: 0 0 90px;
      text-align: center;
      font-size: 16px;
      position: relative;
      height: 50px;
      line-height: 50px;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 1px;
        background-color: #e1e1e1;
      }

      &.active {
        color: #00b4cf;

        &::before {
          content: "";
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          height: 3px;
          width: 100%;
          background-color: #00b4cf;
        }
      }
    }
  }

  .tool-search {
    margin-left: 20px;
    margin-right: auto;
    position: relative;

    input {
      border: 1px solid #e1e1e1;
      outline: none;
      height: 26px;
      line-height: 26px;
      padding-left: 30px;
    }

    i {
      font-size: 20px;
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }

  .tool-filter {
    margin-right: 20px;

    i {
      cursor: pointer;
      font-size: 20px;

      & + i {
        margin-left: 15px;
      }

      &.active {
        color: #00b4cf;
      }
    }
  }
}

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
