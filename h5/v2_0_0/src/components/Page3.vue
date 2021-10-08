<template>
  <div class="page">

    <div class="img-wrapper">
      <img
        class="img"
        :src="img"
      />

      <div class="tips">
        <img
          :class="{'opacity-wrapper opacity-transition': true, 'show': show}"
          :src="tips"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page3",
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
      img: require("../assets/images/img3.jpg"),
      tips: require("../assets/images/tips3.png"),
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
    // position: relative;
    .img {
      width: 100%;
    }

    .tips {
      position: absolute;
      left: 4.5%;
      bottom: 9%;

      .opacity-wrapper {
        display: block;
        width: 35%;
        height: auto;

        &.opacity-transition {
          opacity: 0;
          transition: opacity 2s linear;

          &.show {
            opacity: 1;
          }
        }
      }

      .scale-wrapper {
        display: block;
        width: 30%;
        height: auto;

        &.scale-transition {
          transform: scale(0);
          transition: transform 1.5s cubic-bezier(0.7, 0.44, 0.37, 0.52);

          &.show {
            transform: scale(1);
          }
        }
      }

      .translateX-left-wrapper {
        display: block;
        width: 30%;
        height: auto;

        &.translateX-left-transition {
          transform: translateX(-500px);
          transition: transform 1.5s linear;

          &.show {
            transform: translateX(0);
          }
        }
      }

      .translateX-right-wrapper {
        display: block;
        width: 30%;
        height: auto;

        &.translateX-right-transition {
          transform: translateX(300px);
          transition: transform 2s linear;

          &.show {
            transform: translateX(0);
          }
        }
      }
    }
  }
}
</style>




