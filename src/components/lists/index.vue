<template>
  <div
    :class="showType === 'card' ? 'project-card flex-center' : 'project-lists'"
  >
    <div class="project-items flex-center" v-for="item in lists" :key="item.id">
      <div class="project-os">
        <img :src="icon[item.os]" alt="" />
      </div>
      <div class="project-pane flex-center">
        <div class="project-infos flex-center">
          <i class="icon-desktop"></i>
          <span class="project-name">{{ item.name }}</span>
          <span
            class="project-statu"
            :style="{ 'background-color': filterColor(item.status) }"
            >{{ item.status }}</span
          >
          <i class="icon-info"></i>
          <span class="project-ip">{{ item.ip }}</span>
          <i class="icon-folder"></i>
          <span class="project-location">{{ item.location }}</span>
        </div>
        <div class="project-handler flex-center">
          <div class="project-add" @click="addResources(item)">
            <i class="icon-plus"></i>
          </div>
          <div class="project-sources flex-center" v-if="item.resources.length">
            <div
              class="sources-items flex-center"
              v-for="(items, index) in item.resources"
              :key="index"
            >
              <span>{{ items }}</span>
              <i class="icon-trash"></i>
            </div>
          </div>
          <div class="project-deny flex-center">
            <i class="icon-deny"></i>
            <span>Deny</span>
          </div>
        </div>
      </div>

      <div class="project-card-pane flex-center">
        <div class="project-infos flex-center">
          <div class="project-name">
            <i class="icon-desktop"></i>
            <span>{{ item.name }}</span>
          </div>
          <span
            class="project-statu"
            :style="{ 'background-color': filterColor(item.status) }"
            >{{ item.status }}</span
          >
          <div class="project-ip">
            <i class="icon-info"></i>
            <span>{{ item.ip }}</span>
          </div>
          <div class="project-location">
            <i class="icon-folder"></i>
            <span>{{ item.location }}</span>
          </div>
        </div>
        <div class="project-handler flex-center">
          <div class="project-add" @click="addResources(item)">
            <i class="icon-plus"></i>
          </div>
          <div class="project-sources flex-center">
            <div
              class="sources-items flex-center"
              v-for="(items, index) in item.resources"
              :key="index"
            >
              <span>{{ items }}</span>
              <i class="icon-trash"></i>
            </div>
          </div>
          <div class="project-deny flex-center">
            <i class="icon-deny"></i>
            <span>Deny</span>
          </div>
        </div>
      </div>
    </div>

    <tw-dialog
      class="dialog"
      :visible.sync="dialogVisible"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <p>Separate multiple resource name with commas</p>
        <input type="text" v-model="keyword" placeholder="Input Value" />
      </div>
      <div slot="footer" class="dialog-footer flex-center">
        <div class="footer-add">Add Resources</div>
        <div class="footer-cancel">Cancel</div>
      </div>
    </tw-dialog>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      default: () => {
        return [];
      },
    },
    showType: {
      type: String,
      default: () => {
        return "list";
      },
    },
  },
  data() {
    return {
      addResourcesDatas: "",
      keyword: "",
      dialogVisible: false,
      icon: {
        windows: require("@/assets/os icons/windows.png"),
        debian: require("@/assets/os icons/debin.png"),
        suse: require("@/assets/os icons/suse.png"),
        ubuntu: require("@/assets/os icons/ubuntu.png"),
        centos: require("@/assets/os icons/cent_os.png"),
      },
    };
  },
  methods: {
    filterColor(value) {
      const map = {
        building: "#ff9a2a",
        idle: "#7fbc39",
      };
      return map[value];
    },
    closeDialog() {
      this.addResourcesDatas = '';
      this.keyword = '';
    },
    addResources(item) {
      this.addResourcesDatas = item;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-body {
  margin-bottom: 10px;

  p {
    font-weight: bold;
  }

  input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    box-sizing: border-box;
    outline: none;
  }
}
.dialog-footer {
  div {
    color: #fff;
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: center;

    & + div {
      margin-left: 20px;
    }
  }

  .footer-add {
    background-color: #00b4cf;
  }
  .footer-cancel {
    background-color: #2d4054;
  }
}

.project-lists {
  .project-items {
    height: 120px;
    padding: 20px;
    background-color: #ffffff;
    margin-top: 20px;
    box-sizing: border-box;
  }

  .project-card-pane {
    display: none;
  }

  .project-os {
    margin-right: 50px;

    img {
      width: 80px;
      display: block;
      height: 80px;
    }
  }

  .project-pane {
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: flex-start;
    flex: 0 0 calc(100% - 170px);
  }

  .project-infos {
    width: 100%;
    font-size: 14px;
    height: 20px;
    line-height: 20px;

    .project-name {
      color: #00b4cf;
      font-weight: bold;
      margin-left: 15px;
      margin-right: 30px;
    }

    .project-statu {
      font-size: 14px;
      padding: 0 5px;
      margin-right: 40px;
      color: #fff;
    }

    .project-ip {
      margin-left: 10px;
      margin-right: 10px;
    }

    .project-location {
      margin-left: 10px;
    }

    i {
      font-size: 16px;
    }
  }

  .project-handler {
    width: 100%;

    .project-add,
    .project-deny {
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      background-color: #00b4cf;
      width: 40px;
      color: #ffffff;
      text-align: center;

      i {
        line-height: inherit;
      }
    }
    .project-deny {
      width: auto;
      padding: 0 10px;
      font-size: 14px;
      margin-left: auto;

      i {
        line-height: inherit;
        margin-right: 10px;
      }
    }
  }

  .project-sources {
    height: 30px;

    .sources-items {
      height: 100%;
      padding: 5px;
      box-sizing: border-box;
      background-color: #efefef;
      margin-left: 15px;
      line-height: 20px;
      font-size: 16px;

      i {
        margin-left: 5px;
      }
    }
  }
}

.project-card {
  flex-wrap: wrap;
  margin-left: -20px;

  .project-items {
    padding: 10px;
    margin-top: 20px;
    flex: 0 0 calc((100% - 80px) / 4);
    width: calc((100% - 80px) / 4);
    background-color: #fff;
    margin-left: 20px;
    box-sizing: border-box;
    flex-direction: column;
    align-self: flex-start;

    .project-os {
      margin-bottom: 10px;
    }

    .project-pane {
      display: none;
    }

    .project-card-pane {
      width: 100%;
      flex-direction: column;
    }
  }

  .project-infos {
    width: 100%;
    font-size: 14px;
    line-height: 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .project-handler {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .project-add,
  .project-deny {
    cursor: pointer;
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    background-color: #00b4cf;
    width: 40px;
    color: #ffffff;
    text-align: center;

    i {
      line-height: inherit;
    }
  }
  .project-deny {
    margin-bottom: 0;
    width: auto;
    padding: 0 10px;
    font-size: 14px;

    i {
      line-height: inherit;
      margin-right: 10px;
    }
  }

  .project-sources {
    min-height: 80px;
    flex-wrap: wrap;

    .sources-items {
      margin-bottom: 10px;
      height: 30px;
      padding: 5px;
      box-sizing: border-box;
      background-color: #efefef;
      margin-right: 15px;
      line-height: 20px;
      font-size: 16px;
      align-self: flex-start;

      i {
        margin-left: 5px;
      }
    }
  }

  .project-name {
    color: #00b4cf;
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    margin-bottom: 5px;

    i {
      margin-right: 5px;
    }
  }

  .project-statu {
    font-size: 14px;
    padding: 0 5px;
    margin-bottom: 5px;
    color: #fff;
  }

  .project-ip {
    margin-bottom: 5px;
    margin-right: 10px;

    i {
      margin-right: 5px;
    }
  }

  .project-location {
    margin-bottom: 5px;

    i {
      margin-right: 5px;
    }
  }
}
</style>
