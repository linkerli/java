<template>
  <div class="page">
    <img
            class="bg-img"
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
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page_6",
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
      img: require("../assets/images/6_img.jpg"),

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
    img {
      width: 100%;
    }
    .tips {
      position: absolute;
      left: 1%;
      bottom: 1%;

      .translateX-left-wrapper {
        display: block;
        width: 35%;
        height: auto;

        &.translateX-left-transition {
          transform: translateX(-150px);
          transition: transform 1s linear;

          &.show {
            transform: translateX(0);
          }
        }
      }
    }
  }
</style>


