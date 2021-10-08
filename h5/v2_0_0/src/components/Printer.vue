<template>
  <div class="page">
    <img
      class="bg-img"
      :src="img"
      :style="{height: height + 'px'}"
    />
    <div class="printer-cover">
      <div
        v-for="(item, index) in gifs"
        :key="item"
        :class='["printer-gif", printerClicked == true && currentGifIndex == index?"moving":"reset-moving"]'
      >
        <div class="gif-img-wrapper">
          <img
            class="gif-img-bg"
            :src="gifWrapperBg"
          />
          <img
            v-if="index == currentGifIndex"
            class="gif"
            :src="item"
          />
        </div>
      </div>
      <img
        class="printer-cover-img"
        :src="printerCover"
      />

      <div
        class="button"
        @click="changeGifIndex"
      ></div>
    </div>

  </div>
</template>

<script>
import { getHeight } from "../utils/utils.js";

export default {
  name: "Printer",
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
      img: require("../assets/images/printer-background.jpg"),
      gifWrapperBg: require("../assets/images/gif-wrapper-bg.png"),
      printerCover: require("../assets/images/printer-cover.gif"),
      gifs: [
        require("../assets/images/printer-img1.gif"),
        require("../assets/images/printer-img2.gif"),
        require("../assets/images/printer-img3.gif"),
        require("../assets/images/printer-img4.gif"),
        require("../assets/images/printer-img5.gif")
      ],
      currentGifIndex: 0,
      printerClicked: false,
      height: getHeight()
    };
  },
  methods: {
    /// 点击切换currentGifIndex
    changeGifIndex() {
      const maxLength = this.$data.gifs.length;

      let _currentGifIndex = this.$data.currentGifIndex + 1;
      if (_currentGifIndex > maxLength - 1) {
        _currentGifIndex = 0;
      }
      this.$data.printerClicked = false;
      setTimeout(() => {
        this.$data.printerClicked = true;
        this.$data.currentGifIndex = _currentGifIndex;
      }, 0);
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  position: relative;

  .bg-img {
    width: 100%;
  }

  .printer-cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    .printer-gif {
      width: 80%;
      position: absolute;
      left: 45%;
      bottom: 0;
      transform: translate(-50%, -100%);
      transition: transform 2s linear;

      &.moving {
        transform: translate(-50%, 87%);
      }

      &.reset-moving {
        transition: transform 0s linear;
        transform: translate(-50%, -100%);
      }

      .gif-img-wrapper {
        position: relative;
        .gif-img-bg {
          display: block;
          width: 100%;
        }
        .gif {
          position: absolute;
          top: 18%;
          left: 22%;
          display: block;
          width: 54%;
        }
      }
    }

    .button {
      position: absolute;
      right: 0;
      bottom: 0%;
      width: 14%;
      height: 40%;
      z-index: 9;
    }

    .printer-cover-img {
      position: relative;
      z-index: 9;
      display: block;
      width: 100%;
    }
  }
}
</style>


