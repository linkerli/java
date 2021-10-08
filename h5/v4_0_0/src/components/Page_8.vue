<template>
  <div class="page">
    <img
            :src="img"
            :style="{height: height + 'px'}"
    />
    <div class="tips">
      <img
              :class="{'translateX-left-wrapper translateX-left-transition': true, 'show': show}"
              :src="tips"
      />
    </div>
  </div>
</template>

<script>
    import { getHeight } from "../utils/utils.js";

    export default {
        name: "Page_7",
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
            img: require("../assets/images/8_img.jpg"),
            tips: require("../assets/images/8_tips.png"),
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
    .tips {
      position: absolute;
      left: 1%;
      bottom: 0.6%;

      .translateX-left-wrapper {
        display: block;
        width: 40%;
        height: auto;

        &.translateX-left-transition {
          transform: translateX(-150px);
          transition: transform 1s linear;

          &.show {
            transform: translateX(0);
          }
        }
      }
    }
  }
</style>


