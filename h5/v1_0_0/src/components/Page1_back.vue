<template>
  <div class="page">
    <div class="positioned">
      <img
        v-long-press="300"
        @long-press-start="onLongPressStart"
        :src="img"
        :style="{height: height + 'px'}"
      />
    </div>
  </div>
</template>

<script>
const chalk = require("chalk");

import LongPress from "vue-directive-long-press";

import { getHeight } from "../utils/utils.js";

export default {
  name: "Page1",
  props: ["show"],
  directives: {
    "long-press": LongPress
  },
  data: () => {
    return {
      title: "tittle",
      img: require("../assets/images/img1.jpg"),
      height: getHeight()
    };
  },
  methods: {
    changeTitleHandle(title) {
      this.$data.title = title;
    },
    onLongPressStart() {
      console.log(">>>>>>>>>>>sdsdfsdfsdfsdfsdfs onLongPressStart");
    }
  },
  beforeCreate() {
    console.log(chalk.blue("chalk test>>>>>>>>>>>>>>>>>>>> beforeCreate"));
  },
  created() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> created"));
    this.changeTitleHandle("created");
  },
  beforeMount() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> beforeMount"));
    this.changeTitleHandle(this.$data.title + "beforeMount");
  },
  mounted() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> mounted"));
    this.changeTitleHandle(this.$data.title + "mounted");
    // this.changeTitleHandle("changed");
  },
  beforeUpdate() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> beforeupdate"));
    // this.changeTitleHandle(this.$data.title + "beforeUpdate");
  },
  updated() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> updated"));
    // this.changeTitleHandle(this.$data.title + "updated");
  },
  activated() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> activated"));
    this.changeTitleHandle(this.$data.title + "activated");
  },
  deactivated() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> deactivated"));
    this.changeTitleHandle(this.$data.title + "deactivated");
  },
  beforeDestroy() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> beforeDestroy"));
    this.changeTitleHandle(this.$data.title + "beforeDestroy");
  },
  destroyed() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> destroyed"));
    this.changeTitleHandle(this.$data.title + "destroyed");
  },
  errorCaptured() {
    console.log(chalk.green("chalk test>>>>>>>>>>>>>>>>>>>> errorCaptured"));
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


