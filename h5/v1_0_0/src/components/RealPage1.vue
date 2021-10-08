<template>
  <div class="page">
    <div class="positioned">
      <img :src="img" />
    </div>
  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "RealPage1",
  props: ["show"],
  data: () => {
    return {
      img: require("../assets/images/img1.jpg"),
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
  width: 100vw;
  height: 100vh;
  position: relative;

  .positioned {
    position: absolute;
  }

  img {
    display: block;
    width: 100%;
  }
}
</style>


