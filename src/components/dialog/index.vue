<template>
  <transition @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      v-show="visible"
      class="tw-dialog-container"
      @click.self="handleWrapperClick"
    >
      <div
        class="tw-dialog-pane"
        ref="dialog"
        :style="style"
      >
        <div class="tw-dialog-header">
          <slot name="title">
            <span class="tw-dialog-title">{{ title }}</span>
          </slot>
          <button class="tw-header-btn" @click="handleClose">
            <i class="icon-close"></i>
          </button>
        </div>
        <div class="tw-dialog-body">
          <slot></slot>
        </div>
        <div class="tw-dialog-footer flex-center" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
        <div class="tw-dialog-arrow"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "570",
    },
    top: {
      type: String,
      default: "15vh",
    },
  },
  data() {
    return {
      closed: false,
      key: 0,
      style: "",
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit("open");
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
      } else {
        if (!this.closed) this.$emit("close");
        this.$nextTick(() => {
          this.key++;
        });
      }
    },
  },
  methods: {
    setStyle(e) {
      let rect  = '';
      if(e.target.className === 'project-add'){
        rect = e.target.getBoundingClientRect();
      }else{
        rect = e.target.parentNode.getBoundingClientRect();
        // console.log(e.target.parentNode.className === 'project-add');
      }
      console.log(rect.left - (rect.width) / 2)
      let location = {
        // 鼠标在可视区域位置
        left: rect.left - (rect.width) / 2 + "px" ,
        top: rect.top + rect.height + "px",
        width: this.width + "px",
      };
      this.style = location;
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      this.hide();
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("close");
        this.closed = true;
      }
    },
    afterEnter() {
      this.$emit("opened");
    },
    afterLeave() {
      this.$emit("closed");
    },
  },
  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
    }
  },
};
</script>

<style lang="scss" scoped>
.tw-dialog-container {
  z-index: 1000;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;

  .tw-dialog-pane {
    border: 1px solid #00b4cf;
    position: absolute;
    margin: 20px auto 50px;
    padding: 10px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 3px 53px rgba($color: #000000, $alpha: 0.3);
    box-sizing: border-box;
  }

  .tw-dialog-header {
    position: relative;
  }

  .tw-dialog-arrow {
    position: absolute;
    left: 30px;
    top: -16px;

    &::before {
      content: "";
      position: absolute;
      display: block;
      z-index: 3;
      width: 0;
      height: 0;
      left: 0;
      border-color: transparent;
      border-style: solid;
      top: 0;
      border-width: 16px 8px;
      margin-right: 3px;
      border-top-width: 0;
      border-bottom-color: #ffffff;
    }

    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      left: -1px;
      z-index: 2;
      border-color: transparent;
      border-style: solid;
      top: -2px;
      border-width: 18px 9px;
      margin-right: 3px;
      border-top-width: 0;
      border-bottom-color: #00b4cf;
    }
  }

  .tw-header-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: #00b4cf;
    font-size: 16px;
  }

  .tw-dialog-body {
    width: 100%;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

  .tw-dialog-footer {
    padding: 10px 0 5px;
    text-align: left;
    box-sizing: border-box;
  }
}
</style>
