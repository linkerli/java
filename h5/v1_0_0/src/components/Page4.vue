<template>
  <div class="page">
    <img
      class="bg-img"
      :src="img"
      :style="{height: height + 'px'}"
    />
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
  .bg-img {
    width: 100%;
  }
}
</style>


