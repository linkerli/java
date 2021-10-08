<template>
  <div class="page">

    <div class="img-wrapper">
      <img
        class="img"
        :src="img"
        :style="{height: height + 'px'}"
      />

      <div class="tips">
        <img
          :class="{'translateX-left-wrapper translateX-left-transition': true, 'show': show}"
          :src="tips"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page10",
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
      img: require("../assets/images/img10.jpg"),
      tips: require("../assets/images/tips5.png"),
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
  overflow: hidden;
  .img-wrapper {
    position: relative;
    .img {
      width: 100%;
    }
    .tips {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;

      .translateX-left-wrapper {
        display: block;
        width: 25%;
        height: auto;

        &.translateX-left-transition {
          transform: translateX(-500px);
          transition: transform 1s linear;

          &.show {
            transform: translateX(0);
          }
        }
      }
    }
  }
}
</style>


