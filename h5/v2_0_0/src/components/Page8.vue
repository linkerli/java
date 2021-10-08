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
    <LongPress
      @longPressCallback="longPressCallback"
      class="long-press-cover"
    >
      <div class="long-press-child"></div>
    </LongPress>
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";
import LongPress from "../components/LongPress.vue";

export default {
  name: "Page8",
  components: {
    LongPress
  },
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
      img: require("../assets/images/img8.jpg"),
      saveImg: require("../assets/images/img8_save.jpg"),
      tips: require("../assets/images/tips5.png"),
      height: getHeight()
    };
  },
  methods: {
    longPressCallback() {
      this.$emit("showDownloadModal", this.$data.saveImg);
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  position: relative;
  img {
    width: 100%;
  }
  .long-press-cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .tips {
    position: absolute;
    left: 1.9%;
    bottom: 7%;

    .translateX-left-wrapper {
      display: block;
      width: 35%;
      height: auto;

      &.translateX-left-transition {
        transform: translateX(500px);
        transition: transform 1s linear;

        &.show {
          transform: translateX(0);
        }
      }
    }
  }
}
</style>





