<template>
  <div>

    <div
      v-if="showLoadingGif"
      class="loading-cover"
    >
      <img :src="loadingGif" />
    </div>

    <swiper
      ref="mySwiper"
      :options="swiperOptions"
      :style="{height: height}"
      @slideChangeTransitionEnd="slideChangeTransitionEnd"
    >

      <!-- <swiper-slide>
        <test
          :show="currentIndex == 0"
          @nextSwiperSlide="nextSwiperSlide"
          @videoReadyHandle="videoReadyHandle"
        ></test>
      </swiper-slide> -->

      <swiper-slide>
        <VideoPage1
          :show="currentIndex == 0"
          @nextSwiperSlide="nextSwiperSlide"
          @videoReadyHandle="videoReadyHandle"
        ></VideoPage1>
      </swiper-slide>

      <swiper-slide>
        <Page1
          :show="currentIndex == 1"
          :index="1"
          :currentIndex="currentIndex"
        ></Page1>
      </swiper-slide>

      <swiper-slide>
        <ActionTipsPage
          :show="currentIndex == 2"
          :index="1"
          :currentIndex="currentIndex"
        >
        </ActionTipsPage>
      </swiper-slide>

      <!-- <swiper-slide>
        <RealPage1 :show="currentIndex == 2"></RealPage1>
      </swiper-slide> -->
      <!-- <swiper-slide>
        <Page2 :show="currentIndex == 4">
        </Page2>
      </swiper-slide> -->
      <swiper-slide>
        <Page3
          v-if="(currentIndex >= 1)"
          :show="currentIndex == 3"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page3>
      </swiper-slide>
      <swiper-slide>
        <Page4
          v-if="(currentIndex >= 2)"
          :show="currentIndex == 4"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page4>
      </swiper-slide>
      <swiper-slide>
        <Page5
          v-if="(currentIndex >= 3)"
          :show="currentIndex == 5"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page5>
      </swiper-slide>
      <swiper-slide>
        <Page6
          v-if="(currentIndex >= 4)"
          :show="currentIndex == 6"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page6>
      </swiper-slide>
      <swiper-slide>
        <Page7
          v-if="(currentIndex >= 5)"
          :show="currentIndex == 7"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page7>
      </swiper-slide>

      <swiper-slide>
        <Page8
          v-if="(currentIndex >= 6)"
          :show="currentIndex == 8"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page8>
      </swiper-slide>
      <swiper-slide>
        <Page9
          v-if="(currentIndex >= 7)"
          :show="currentIndex == 9"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page9>
      </swiper-slide>
      <swiper-slide>
        <Page10
          v-if="(currentIndex >= 8)"
          :show="currentIndex == 10"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page10>
      </swiper-slide>
      <swiper-slide>
        <Page11
          v-if="(currentIndex >= 9)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 11"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page11>
      </swiper-slide>
      <swiper-slide>
        <Page11After
          v-if="(currentIndex >= 10)"
          :show="currentIndex == 12"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page11After>
      </swiper-slide>
      <swiper-slide>
        <Page12
          v-if="(currentIndex >= 11)"
          :show="currentIndex == 13"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page12>
      </swiper-slide>
      <swiper-slide>
        <Page13
          v-if="(currentIndex >= 12)"
          :show="currentIndex == 14"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page13>
      </swiper-slide>
      <swiper-slide>
        <Page14
          v-if="(currentIndex >= 13)"
          :show="currentIndex == 15"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page14>
      </swiper-slide>

      <swiper-slide>
        <RollingPictures
          v-if="(currentIndex >= 14)"
          :show="currentIndex == 16"
          :index="1"
          :currentIndexOut="currentIndex"
        >
        </RollingPictures>
      </swiper-slide>

      <!-- <swiper-slide>
        <Page15 :show="currentIndex == 15">
        </Page15>
      </swiper-slide> -->

      <!-- :src="audioFile" -->
      <audio ref="audioFileRef"></audio>

    </swiper>

    <div
      v-on:click="hideDownloadModal"
      :class='["download-image-modal", downloadImageFlag == true? "show":"hide"]'
    >
      <img :src="downloadImageUrl" />
    </div>

    <div :class='["preview-list", showPreview == true && currentIndex > 0?"show":""]'>
      <div class="preview-scroll-wrapper">
        <div
          v-for="(value, index) in prevImages"
          :key="index"
          @click="swiperToSpecSlide($event, index)"
        >
          <img :src="value" />
        </div>
      </div>
    </div>
    <div
      :class='["preview-btn", currentIndex > 0?"show":"" ]'
      @click="triggerPreview"
    >
      <img :src="prevBtnImg" />
    </div>

    <!-- <div
      v-if="showAudioPlayIcon"
      :class="{'audio': true, 'audio-playing': audioPlaying}"
      v-on:click="triggerAudio"
    >
      <img :src="audioIcon" />
    </div> -->

  </div>
</template>

<script>
import ActionTipsPage from "./ActionTipsPage.vue";
import VideoPage1 from "./VideoPage1.vue";
// import RealPage1 from "./RealPage1.vue";
import Page1 from "./Page1.vue";
// import Page2 from "./Page2.vue";
import Page3 from "./Page3.vue";
import Page4 from "./Page4.vue";
import Page5 from "./Page5.vue";
import Page6 from "./Page6.vue";
import Page7 from "./Page7.vue";
import Page8 from "./Page8.vue";
import Page9 from "./Page9.vue";
import Page10 from "./Page10.vue";
import Page11 from "./Page11.vue";
import Page11After from "./Page11-1.vue";
import Page12 from "./Page12.vue";
import Page13 from "./Page13.vue";
import Page14 from "./Page14.vue";
// import Page15 from "./Page15.vue";
import RollingPictures from "./RollingPictures.vue";
// import test from "./test.vue";

import { getHeight } from "../utils/utils.js";

import {
  isWeiXin,
  // isWeiXinReady,
  isAndroidDevice,
  wxConfig
} from "../utils/utils";

const wx = require("weixin-js-sdk");

import LongPress from "vue-directive-long-press";

export default {
  name: "SwiperEntry",
  components: {
    VideoPage1,
    ActionTipsPage,
    // RealPage1,
    Page1,
    // Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    Page8,
    Page9,
    Page10,
    Page11,
    Page11After,
    Page12,
    Page13,
    Page14,
    // Page15,
    RollingPictures
    // test
  },
  directives: {
    "long-press": LongPress
  },
  data() {
    return {
      height: getHeight(),
      // 是否显示previewmodal
      showPreview: false,
      showLoadingGif: true,
      loadingGif: require("../assets/images/logo-gif.gif"),
      page8BgUrl: require("../assets/images/img8.jpg"),
      page12BgUrl: require("../assets/images/img12.jpg"),
      prevImages: [
        require("../assets/images/yulan_1.jpg"),
        require("../assets/images/yulan_2.jpg"),
        require("../assets/images/yulan_3.jpg"),
        require("../assets/images/yulan_4.jpg"),
        require("../assets/images/yulan_5.jpg"),
        require("../assets/images/yulan_6.jpg"),
        require("../assets/images/yulan_7.jpg"),
        require("../assets/images/yulan_8.jpg"),
        require("../assets/images/yulan_9.jpg"),
        require("../assets/images/yulan_10.jpg"),
        require("../assets/images/yulan_11.jpg"),
        require("../assets/images/yulan_12.jpg"),
        require("../assets/images/yulan_13.jpg"),
        require("../assets/images/yulan_14.jpg"),
        require("../assets/images/yulan_16.jpg")
      ],
      prevBtnImg: require("../assets/images/yulan_icon.png"),
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      currentIndex: 0,
      downloadImageFlag: false,
      downloadImageUrl: null,
      showAudioPlayIcon: false,
      audioIcon: require("../assets/images/audio-icon.png"),
      audioFile: require("../assets/images/audio.mp3"),
      audioPlaying: false
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    triggerPreview() {
      this.showPreview = !this.showPreview;
    },
    onLongPressStart() {
      console.log(">>>>>>>>>>>>>>>>>onLongPressStart>>>>>>>>>>>");
    },
    slideChangeTransitionEnd() {
      window.scrollTo(0, 0);
    },
    showDownloadModal() {},
    hideDownloadModal() {
      this.$data.downloadImageFlag = false;
      this.$data.downloadImageUrl = null;
    },
    _playAudio() {
      this.$data.wxReady = true;
      const audio = this.audio;
      if (isWeiXin() && !isAndroidDevice()) {
        wx.ready(() => {
          this.$data.wxReady = true;
          const wxSuccessHandle = function() {
            const audioPlay = audio.play();
            audioPlay !== undefined;
          };
          wx.getNetworkType({
            success: wxSuccessHandle,
            fail: wxSuccessHandle
          });
        });
      } else {
        const audioPlay = audio.play();
        audioPlay !== undefined;
      }
      this.$data.audioPlaying = true;
      this.audio.play();
    },
    _pauseAudio() {
      this.$data.audioPlaying = false;
      this.audio.pause();
    },
    triggerAudio() {
      if (this.$data.audioPlaying) {
        this._pauseAudio();
      } else {
        this._playAudio();
      }
    },
    getAudio: function() {
      return this.$el.querySelectorAll("audio")[0];
    },
    init: function() {
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
    },
    _handleLoaded: function() {
      if (this.audio.readyState >= 2) {
        if (this.autoPlay) this.play();

        this.loaded = true;
        this.totalDuration = parseInt(this.audio.duration);
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handlePlayPause: function(e) {
      if (
        e.type === "pause" &&
        this.paused === false &&
        this.playing === false
      ) {
        this.progressStyle = `width:0%;`;
        this.currentTime = "00:00";
        this.paused = true;
      }
    },
    _swiperChangeHandle() {
      this.$data.currentIndex = this.swiper.realIndex;
      if (this.swiper.realIndex >= 2) {
        this.$data.showAudioPlayIcon = true;
        if (!this.$data.audioPlaying) {
          this._playAudio();
        }
      } else {
        this.$data.audioPlaying = false;
        this.$data.showAudioPlayIcon = false;
        this.audio.pause();
      }
    },
    nextSwiperSlide() {
      this.swiper.slideTo(this.$data.currentIndex + 1, 1000, false);
    },
    swiperToSpecSlide(ele, index) {
      if (index >= 10) {
        this.swiper.slideTo(index + 2, 0, false);
        this.$data.currentIndex = index + 2;
      } else {
        this.swiper.slideTo(index + 1, 0, false);
        this.$data.currentIndex = index + 1;
      }
    },
    videoReadyHandle() {
      this.$data.showLoadingGif = false;
    }
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(0, 1000, false);
    this.swiper.on("transitionEnd", this._swiperChangeHandle);
    this.audio = this.getAudio();
    this.innerLoop = this.loop;
    this.init();
    wxConfig();
  },
  beforeDestroy: function() {
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.swiper.removeEventListener("on");
  }
};
</script> 

<style scoped lang="scss">
.loading-cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: white;

  img {
    position: absolute;
    width: 40%;
    height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.download-image-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  opacity: 0;
  transition: opacity 1s linear;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
    pointer-events: none;
  }

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
  }
}

.audio {
  position: fixed;
  z-index: 998;
  top: 10px;
  right: 10px;
  width: 30px;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

.audio.audio-playing {
  animation: 4s linear rotating infinite;
}

@keyframes rotating {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}

.preview-btn {
  width: 5%;
  position: fixed;
  left: -10%;
  bottom: 4%;
  z-index: 999;
  transition: left 0.3s linear;
  &.show {
    left: 5%;
  }
  img {
    display: block;
    width: 100%;
  }
}

.preview-list {
  position: fixed;
  z-index: 99;
  top: -150px;
  left: 0;
  right: 0;
  width: 100%;
  background-image: url(../assets/images/yulan_bg.png);
  padding: 40px 0 10px;
  overflow-x: scroll;
  transition: top 0.3s ease-in;
  -webkit-overflow-scrolling: touch;
  &.show {
    top: 0;
  }
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }

  .preview-scroll-wrapper {
    overflow: hidden;
    width: 910px;
    div {
      float: left;
      width: 50px;
      margin: 0 5px;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
