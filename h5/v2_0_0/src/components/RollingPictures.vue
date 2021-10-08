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
  require("../assets/images/img2.jpg"),
  require("../assets/images/img3.jpg"),
  require("../assets/images/img4.jpg"),
  require("../assets/images/img6.jpg"),
  require("../assets/images/img7.jpg"),
  require("../assets/images/img8.jpg"),
  require("../assets/images/img10.jpg"),
  require("../assets/images/img11.jpg"),
  require("../assets/images/img12.jpg"),
  require("../assets/images/img13.jpg"),
  require("../assets/images/img14.jpg"),
  require("../assets/images/img15.jpg")
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
      lastImg: require("../assets/images/img15.jpg"),
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


