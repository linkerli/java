<template>
  <div class="page">
    <img
      :src="img"
      :style="{height: height + 'px'}"
    />
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Page5",
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
      img: require("../assets/images/img5.jpg"),
      height: getHeight()
    };
  }
};
</script>

<style scoped lang="scss">
.page {
  position: relative;
  img {
    width: 100%;
  }
}
</style>


