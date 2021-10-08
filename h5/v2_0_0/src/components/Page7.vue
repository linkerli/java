<template>
  <div class="page">
    <div class="img-wrapper">
      <img
        class="img"
        :src="img"
      />

      <div class="tips">
        <img
          :class="{'scale-wrapper scale-transition': true, 'show': show}"
          :src="tips"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page7",
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
      img: require("../assets/images/img7.jpg"),
      tips: require("../assets/images/tips4.png"),
      height: getHeight()
    };
  }
};
</script>

<style scoped lang="scss">
.page {
  .img-wrapper {
    position: relative;

    img {
      width: 100%;
    }

    .tips {
      position: absolute;
      left: 4.1%;
      top: 9%;

      .scale-wrapper {
        display: block;
        width: 35%;
        height: auto;

        &.scale-transition {
          transform: scale(0);
          transition: transform 1.5s cubic-bezier(0.7, 0.44, 0.37, 0.52);

          &.show {
            transform: scale(1);
          }
        }
      }
    }
  }
}
</style>


