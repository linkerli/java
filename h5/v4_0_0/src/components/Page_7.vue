<template>
  <div class="page">
    <img
            class="bg-img"
            :src="img"
            :style="{height: height + 'px'}"
    />
    <LongPress
            @longPressCallback="longPressCallback"
            class="long-press-cover"
    >
      <div class="long-press-child"></div>
    </LongPress>
  </div>
</template>

<script>
    import { getHeight } from "../utils/utils.js";
    import LongPress from "../components/LongPress.vue";

    export default {
        name: "Page_2",
        components: {
            LongPress
        },
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
        methods: {
            longPressCallback() {
                this.$emit("showDownloadModal", this.$data.saveImg);
            }
        },
        data: () => {
        return {
            img: require("../assets/images/7_gif.gif"),
            saveImg: require("../assets/images/7_img.jpg"),
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

    .long-press-cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
</style>


