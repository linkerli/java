<template>
  <div class="page">

    <img
      class="bg-img"
      :src="bgImg"
      :style="{height: height + 'px'}"
    />

    <div class="bg">
      <div
        class="img-wrapper"
        :style="{height: height + 'px'}"
      >
        <img
          :class="{'animate__animated animate__zoomIn show': show}"
          :src="img"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "ActionTipsPage",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    return {
      img: require("../assets/images/action-tips.png"),
      bgImg: require("../assets/images/3_action_tip.jpg"),
      height: getHeight()
    };
  },
  methods: {
    changeTitleHandle(title) {
      this.$data.title = title;
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  .bg-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
  }

  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;

    .img-wrapper {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      height: 100%;

      img {
        display: block;
        width: auto;
        height: 100%;
        background-size: contain;
        opacity: 0;
      }
      img.show {
        opacity: 1;
      }
    }
  }
}
</style>


