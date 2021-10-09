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
  name: "Page_10",
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
      img: require("../assets/images/10_img.jpg"),
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
    img {
      width: 100%;
    }
  }
</style>


