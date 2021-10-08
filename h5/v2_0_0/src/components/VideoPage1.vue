<template>
  <div class="page">
    <div class='positioned-bg'>
      <img
        class="img"
        :src="page1BgUrl"
        :style="{height: height + 'px'}"
      />
    </div>
    <div :class="{'positioned': true, 'hide': hideVideo}">
      <img
        :src="page1LogoUrl"
        style="position:absolute;top:2.55%;width:100%;left:0;z-index: 100;"
      />
      <video-player
        class="video-player-box"
        ref="videoPlayer1"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @statechanged="playerStateChanged($event)"
        @ready="playerReadied"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
import LongPress from "vue-directive-long-press";

import { isWeiXin, isAndroidDevice, getHeight } from "../utils/utils";

import { videoPlayer } from "vue-video-player";

const wx = require("weixin-js-sdk");

export default {
  name: "VideoPage1",
  components: {
    videoPlayer
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    nextSlider: {},
    bgUrl: {
      type: String,
      default: null
    },
    videoUrl: {
      type: String,
      default: null
    }
  },
  directives: {
    "long-press": LongPress
  },
  data() {
    return {
      height: getHeight(),
      hideVideo: false,
      page1LogoUrl: require("../assets/images/page1_logo.png"),
      page1BgUrl: require("../assets/images/img16.jpg"),
      playerOptions: {
        language: "en",
        autoplay: true,
        preload: "auto",
        aspectRatio: "9:16",
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: require("../assets/images/video.mp4")
          }
        ],
        controlBar: {
          playToggle: false,
          captionsButton: false,
          chaptersButton: false,
          subtitlesButton: false,
          remainingTimeDisplay: false,
          progressControl: {
            seekBar: false
          },
          fullscreenToggle: false,
          playbackRateMenuButton: false
        }
      }
    };
  },

  watch: {
    show: {
      handler(newValue, oldValue) {
        if (newValue != oldValue && newValue == true) {
          this.player.play();
        } else if (newValue != oldValue && newValue != true) {
          this.player.pause();
        }
      }
    }
  },

  mounted() {
    console.log("this is current player instance object", this.player);
    console.log("体验过程中遇到问题联系开发人员QQ：870252122");
  },
  computed: {
    player() {
      return this.$refs.videoPlayer1.player;
    }
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log("player play!", player);
      this.hideVideo = false;
      this.isPlaying = true;
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
      this.isPlaying = false;
    },
    playerStateChanged(playerCurrentState) {
      console.log("player current update; state", playerCurrentState);
    },
    playerReadied(player) {
      if (this.show != true || this.isPlaying == true) {
        return;
      }
      this.$data.wxReady = true;
      console.log("the player is readied", player);
      const video = this.player;
      this.isInitial = true;
      if (isWeiXin() && !isAndroidDevice()) {
        wx.ready(() => {
          this.$data.wxReady = false;
          const wxSuccessHandle = () => {
            const videoPlay = video.play();
            videoPlay !== undefined;
          };
          wx.getNetworkType({
            success: wxSuccessHandle,
            fail: wxSuccessHandle
          });
        });
      } else {
        const videoPlay = video.play();
        videoPlay !== undefined;
        // window.setTimeout(() => {
        //   this.isInitial = false;
        //   this.player.play();
        //   this.$emit("videoReadyHandle");
        // }, 1000);
      }
    },
    onPlayerEnded(player) {
      console.log("onPlayerEnded", player);
      this.$data.hideVideo = true;
    },
    onPlayerWaiting(player) {
      console.log("onPlayerWaiting", player);
    },
    onPlayerPlaying(player) {
      this.$data.hideVideo = false;
      console.log("onPlayerPlaying", player);
    },
    onPlayerLoadeddata(player) {
      console.log("onPlayerLoadeddata", player);
    },
    onPlayerTimeupdate(player) {
      console.log("onPlayerTimeupdate", player);
      if (this.isInitial == true) {
        console.log("onPlayerTimeupdateisInitial", player);
        this.player.pause();
        window.setTimeout(() => {
          this.isInitial = false;
          this.player.play();
          this.$emit("videoReadyHandle");
        }, 1000);
      }
    },
    onPlayerCanplay(player) {
      console.log("onPlayerCanplay", player);
      // this.player.play();
      // this.$emit("videoReadyHandle");
      // const video = this.player;
      // if (isWeiXin() && !isAndroidDevice()) {
      //   wx.ready(() => {
      //     const wxSuccessHandle = function() {
      //       const videoPlay = video.play();
      //       videoPlay !== undefined;
      //     };
      //     wx.getNetworkType({
      //       success: wxSuccessHandle,
      //       fail: wxSuccessHandle
      //     });
      //   });
      // } else {
      //   const videoPlay = video.play();
      //   videoPlay !== undefined;
      // }
    },
    onPlayerCanplaythrough(player) {
      console.log("onPlayerCanplaythrough", player);
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;

  .video-player-box {
    width: 100vw;
    object-fit: fill;
  }

  .positioned-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    transition: opacity 1s linear;
    img {
      display: block;
      width: 100%;
      height: auto;
    }

    &.hide {
      opacity: 0;
    }

    &.show {
      opacity: 1;
    }
  }

  .positioned {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    opacity: 1;
    transition: opacity 1s linear;
    pointer-events: none;
    &.hide {
      opacity: 0;
    }

    video {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .video-cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    background: #000;
    pointer-events: none;
    &.show-cover {
      opacity: 1;
    }
  }
}
</style>


