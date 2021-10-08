<template>
  <div class="page">
    <div class="img-wrapper">
      <img
        class="bg-img"
        :src="img"
        :style="{height: height + 'px'}"
      />
      <div class="moving"></div>
    </div>

  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page4",
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
      img: require("../assets/images/img4.jpg"),
      movingImg: require("../assets/images/moving-piece.png"),
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

  .img-wrapper {
    position: relative;
    overflow: hidden;
    .bg-img {
      width: 100%;
    }
    .moving {
      pointer-events: none;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40%;
      height: 4000px;
      animation: moving 20s infinite linear;
      background: url(../assets/images/moving-piece.png) repeat-y;
      background-size: contain;
    }
  }
}

@keyframes moving {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, 2000px);
  }
}
</style>


