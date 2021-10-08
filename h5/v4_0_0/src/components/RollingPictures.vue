<template>
  <div class="page">
    <img
      class="bg"
      :src="img"
    />
    <img
      v-if="clickRollPage"
      class="bg"
      :src="lastImg"
      :style="{height: height + 'px', position: 'absolute', left: 0, top: 0, 'z-index': 9}"
    />
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

const imgList = [
  // require("../assets/images/img1.jpg"),
  require("../assets/images/2_img.jpg"),
  require("../assets/images/3_action_tip.jpg"),
  require("../assets/images/4_img.jpg"),
  require("../assets/images/5_img.jpg"),
  require("../assets/images/6_img.jpg"),
  require("../assets/images/7_img.jpg"),
  require("../assets/images/8_img.jpg"),
  require("../assets/images/9_img.jpg"),
  require("../assets/images/10_img.jpg"),
  require("../assets/images/11_img.jpg"),
  require("../assets/images/12_img.jpg"),
  require("../assets/images/13_img.jpg"),
  require("../assets/images/14_img.jpg"),
  require("../assets/images/15_img.jpg"),
  require("../assets/images/16_img.jpg"),
  require("../assets/images/17_img.jpg"),
];

export default {
  name: "RollingPictures",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    currentIndexOut: {
      type: Number,
      default: 0
    },
    clickRollPage: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      currentIndex: 0,
      lastImg: require("../assets/images/17_img.jpg"),
      height: getHeight()
    };
  },
  watch: {
    show: {
      handler(newValue, oldValue) {
        if (
          newValue != oldValue &&
          newValue === true &&
          this.clickRollPage != true
        ) {
          this.changeImgHandle();
        }
      }
    }
  },
  computed: {
    img: function() {
      return imgList[this.currentIndex];
    }
  },
  methods: {
    changeImgHandle() {
      if (this.currentIndex < imgList.length - 2) {
        setTimeout(() => {
          this.changeImgHandle();
          this.currentIndex = this.currentIndex + 1;
          console.log(this.currentIndex);
        }, 100);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  .bg {
    width: 100%;
  }

  .names-wrapper {
    width: 80%;
    height: 60%;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);

    .names {
      display: block;
      width: 100%;
      height: auto;
      transform: translateY(0);
    }

    .names.moving {
      transition: transform 10s linear;
      transform: translateY(-500px);
      // animation: 10s linear transform-scroll 1;
    }
  }
}

@keyframes transform-scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-600px);
  }
}
</style>


