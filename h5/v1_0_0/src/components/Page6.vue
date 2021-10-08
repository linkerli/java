<template>
  <div class="page">

    <img
      class="img"
      :src="img"
      :style="{height: height + 'px'}"
    />
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page6",
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
      img: require("../assets/images/img6.jpg"),
      height: getHeight()
    };
  },
  computed: {
    bottom() {
      let windowRealHeight = document.documentElement.clientHeight;
      let scaleHeight = getHeight();
      return windowRealHeight - scaleHeight + scaleHeight * 0.02;
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  .img {
    width: 100%;
  }
}
</style>


