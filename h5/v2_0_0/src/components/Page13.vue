<template>
  <div class="page">
    <img
      :src="img"
      :style="{height: height + 'px'}"
    />
    <div class="tips">
      <img
        :class="{'translateX-right-wrapper translateX-right-transition': true, 'show': show}"
        :src="tips"
      />
    </div>
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page13",
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
      img: require("../assets/images/img13.jpg"),
      tips: require("../assets/images/tips6.png"),
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
    width: 100%;
    position: absolute;
    left: 0;
    top: 4%;

    // img {
    //   position: absolute;
    //   right: -10%;
    // }

    .translateX-right-wrapper {
      display: block;
      width: 35%;
      height: auto;

      &.translateX-right-transition {
        transform: translateX(-100%);
        transition: transform 1s linear;

        &.show {
          transform: translateX(2%);
        }
      }
    }
  }
}
</style>


