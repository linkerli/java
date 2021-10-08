<template>
  <div class="page">

    <div class="img-wrapper">
      <img
        class="bg"
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
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page14",
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
      img: require("../assets/images/img14.jpg"),
      tips: require("../assets/images/tips6.png"),
      height: getHeight()
    };
  },
  computed: {
    bottom() {
      let windowRealHeight = document.documentElement.clientHeight;
      let scaleHeight = getHeight();
      return windowRealHeight - scaleHeight + scaleHeight * 0.02;
    }
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
    .bg {
      width: 100%;
    }

    .tips {
      position: absolute;
      right: 0;
      bottom: 1%;

      .translateX-right-wrapper {
        float: right;
        display: block;
        width: 35%;
        height: auto;

        &.translateX-right-transition {
          transform: translateX(300px);
          transition: transform 1.5s linear;

          &.show {
            transform: translateX(0);
          }
        }
      }
    }
  }
}
</style>


