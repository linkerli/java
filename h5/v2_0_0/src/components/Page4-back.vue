<template>
  <div class="page">
    <img
      class="bg-img"
      :src="img"
      :style="{height: height + 'px'}"
    />
    <div class="moving-wrapper">
      <img :src="movingPiece" />
      <img :src="movingPiece" />
      <img :src="movingPiece" />
      <img :src="movingPiece" />
      <img :src="movingPiece" />
      <img :src="movingPiece" />
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
      movingPiece: require("../assets/images/moving-piece.png"),
      height: getHeight()
    };
  }
};
</script>

<style scoped lang="scss">
.page {
  position: relative;
  .bg-img {
    width: 100%;
  }
  .moving-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 140px;
    height: 3000px;
    animation: moving 10s linear infinite;

    img {
      display: block;
      width: 100%;
    }
  }
}

@keyframes moving {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(0, 1000px);
  }
}
</style>


