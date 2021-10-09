<template>
  <div :style="{height: downloadImageFlag == true? clientHeight : height + 'px', overflow: 'hidden'}">

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
          @videoReadyHandle="videoReadyHandle"img
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
        <Page_2
          :show="currentIndex == 1"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        ></Page_2>
      </swiper-slide>

      <swiper-slide>
        <ActionTipsPage
          :show="currentIndex == 2"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
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
        <Page_4
          v-if="(currentIndex >= 1)"
          :show="currentIndex == 3"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_4>
      </swiper-slide>
      <swiper-slide>
        <Page_5
          v-if="(currentIndex >= 2)"
          :show="currentIndex == 4"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_5>
      </swiper-slide>
      <!-- <swiper-slide>
        <Page5
          v-if="(currentIndex >= 3)"
          :show="currentIndex == 5"
          :index="1"
          :currentIndex="currentIndex"
        >
        </Page5>
      </swiper-slide> -->
      <swiper-slide>
        <Page_6
          v-if="(currentIndex >= 3)"
          :show="currentIndex == 5"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_6>
      </swiper-slide>
      <swiper-slide>
        <Page_7
          v-if="(currentIndex >= 4)"
          :show="currentIndex == 6"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_7>
      </swiper-slide>

      <swiper-slide>
        <Page_8
          v-if="(currentIndex >= 5)"
          :show="currentIndex == 7"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_8>
      </swiper-slide>

      <swiper-slide>
        <Page_9
          v-if="(currentIndex >= 6)"
          :show="currentIndex == 8"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_9>
      </swiper-slide>
      <swiper-slide>
        <Page_10
          v-if="(currentIndex >= 7)"
          :show="currentIndex == 9"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_10>
      </swiper-slide>
      <swiper-slide>
        <Page_11
          v-if="(currentIndex >= 8)"
          :show="currentIndex == 10"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_11>
      </swiper-slide>
      <swiper-slide>
        <Page_12
          v-if="(currentIndex >= 9)"
          :show="currentIndex == 11"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_12>
      </swiper-slide>

      <swiper-slide>
        <Page_13
          v-if="(currentIndex >= 10)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 12"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_13>
      </swiper-slide>
      <swiper-slide>
        <Page_14
          v-if="(currentIndex >= 11)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 13"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_14>
      </swiper-slide>
      <!-- <swiper-slide>
        <Page_14After
          v-if="(currentIndex >= 12)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 14"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_14After>
      </swiper-slide> -->
      <swiper-slide>
        <Page_15
          v-if="(currentIndex >= 12)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 14"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_15>
      </swiper-slide>

      <swiper-slide>
        <Page_16
          v-if="(currentIndex >= 13)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 15"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_16>
      </swiper-slide>
      <swiper-slide>
        <Page_17
          v-if="(currentIndex >= 14)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 16"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_17>
      </swiper-slide>
      <swiper-slide>
        <Page_18
          v-if="(currentIndex >= 15)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 17"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_18>
      </swiper-slide>
      <swiper-slide>
        <Page_19
          v-if="(currentIndex >= 16)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 18"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_19>
      </swiper-slide>
      <swiper-slide>
        <Page_20
          v-if="(currentIndex >= 17)"
          @nextSwiperSlide="nextSwiperSlide"
          :show="currentIndex == 19"
          :index="1"
          :currentIndex="currentIndex"
          @showDownloadModal="showDownloadModal"
        >
        </Page_20>
      </swiper-slide>
      <swiper-slide>
        <RollingPictures
          v-if="(currentIndex >= 18)"
          :show="currentIndex == 20"
          :index="1"
          :currentIndexOut="currentIndex"
          @showDownloadModal="showDownloadModal"
          :clickRollPage="clickRollPage"
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
      <div
        class="save-modal"
        v-on:click.stop.prevent="modalClick"
      >
        <img :src="saveModalImg" />
        <button
          class="left"
          @click="hideDownloadModal"
        ></button>
        <button
          class="right"
          @click="previewImage"
        ></button>
      </div>
    </div>

    <div :class='["preview-list", showPreview == true && currentIndex > 0?"show":""]'>
      <div class="preview-scroll-wrapper">
        <div
          v-for="(value, index) in prevImages"
          :key="index"
          @click="swiperToSpecSlide($event, index)"
        >
          <img
            v-if="!(index == 13)"
            :src="value"
          />
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
import ActionTipsPage from "./ActionTipsPage_3.vue";
import VideoPage1 from "./VideoPage1.vue";
// import RealPage1 from "./RealPage1.vue";
import Page_2 from "./Page_2.vue";
import Page_4 from "./Page_4.vue";
import Page_5 from "./Page_5.vue";
import Page_6 from "./Page_6.vue";
import Page_7 from "./Page_7.vue";
import Page_8 from "./Page_8.vue";
import Page_9 from "./Page_9.vue";
import Page_10 from "./Page_10.vue";
import Page_11 from "./Page_11.vue";
import Page_12 from "./Page_12.vue";
import Page_13 from "./Page_13.vue";
import Page_14 from "./Page_14.vue";
// import Page_14After from "./Page_14_After.vue";
import Page_15 from "./Page_15.vue";
import Page_16 from "./Page_16.vue";
import Page_17 from "./Page_17.vue";
import Page_18 from "./Page_18.vue";
import Page_19 from "./Page_19.vue";
import Page_20 from "./Page_20.vue";

import RollingPictures from "./RollingPictures.vue";

import { getHeight } from "../utils/utils.js";

import {
  isWeiXin,
  // isWeiXinReady,
  isAndroidDevice,
  wxConfig
} from "../utils/utils";

const wx = require("weixin-js-sdk");

export default {
  name: "SwiperEntry",
  components: {
    VideoPage1,
    ActionTipsPage,
    // RealPage1,
    Page_2,
    Page_4,
    Page_5,
    Page_6,
    Page_7,
    Page_8,
    Page_9,
    Page_10,
    Page_11,
    Page_12,
    Page_13,
    Page_14,
    // Page_14After,
    Page_15,
    Page_16,
    Page_17,
    Page_18,
    Page_19,
    Page_20,
    RollingPictures
    // test
  },
  data() {
    return {
      height: getHeight(),
      clientHeight: document.documentElement.clientWidth,
      // 是否显示previewmodal
      showPreview: false,
      showLoadingGif: true,
      loadingGif: require("../assets/images/logo-gif.gif"),
      saveModalImg: require("../assets/images/save-modal.jpeg"),
      prevImages: [
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
        require("../assets/images/yulan_14.jpg"),
        require("../assets/images/yulan_15.jpg"),
        require("../assets/images/yulan_16.jpg"),
        require("../assets/images/yulan_17.jpg"),
        require("../assets/images/yulan_18.jpg"),
        require("../assets/images/yulan_19.jpg"),
        require("../assets/images/yulan_20.jpg"),
        require("../assets/images/yulan_21.jpg")
      ],
      prevBtnImg: require("../assets/images/yulan_icon.png"),
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      currentIndex: 0,
      downloadImageFlag: false,
      downloadImageUrl: require("../assets/images/yulan_21.jpg"),
      showAudioPlayIcon: false,
      audioIcon: require("../assets/images/audio-icon.png"),
      audioFile: require("../assets/images/audio.mp3"),
      audioPlaying: false,
      clickRollPage: false
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    /// 调用微信的预览图片
    previewImage() {
      if (window.WeixinJSBridge) {
        this.hideDownloadModal();
        window.WeixinJSBridge.invoke("imagePreview", {
          current: this.downloadImageUrl,
          urls: [this.downloadImageUrl]
        });
      }
    },
    modalClick(event) {
      if (event) {
        event.preventDefault();
      }
    },
    triggerPreview() {
      this.showPreview = !this.showPreview;
    },
    onLongPressStart() {
      console.log("体验过程中遇到问题联系开发人员wx：wx1yus2yus3");
    },
    slideChangeTransitionEnd() {
      window.scrollTo(0, 0);
    },
    showDownloadModal(img) {
      this.$data.downloadImageFlag = true;
      this.$data.downloadImageUrl = img;
      document.querySelector("body").style = "overflow: hidden";
    },
    hideDownloadModal() {
      this.$data.downloadImageFlag = false;
      document.querySelector("body").style = "overflow-y: auto";
      // this.$data.downloadImageUrl = null;
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
      this.$data.clickRollPage = false;
    },
    swiperToSpecSlide(ele, index) {
      // if (index >= 10) {
      //   this.swiper.slideTo(index + 2, 0, false);
      //   this.$data.currentIndex = index + 2;
      // } else {
      //   this.swiper.slideTo(index + 1, 0, false);
      //   this.$data.currentIndex = index + 1;
      // }
      this.swiper.slideTo(index + 1, 0, false);
      this.$data.currentIndex = index + 1;
    
      if (index == 13) {
        this.$data.clickRollPage = true;
      } else {
        this.$data.clickRollPage = false;
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
    width: 50%;
    height: auto;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
  }
}

.download-image-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease-in;
  overflow: hidden;

  .save-modal {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -200px;
    transition: bottom 0.3s ease-in;
    img {
      width: 100%;
    }

    .left {
      position: absolute;
      left: 0;
      bottom: 10%;
      width: 50%;
      height: 30%;
    }

    .right {
      position: absolute;
      right: 0;
      bottom: 10%;
      width: 50%;
      height: 30%;
    }
  }

  &.show {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
    .save-modal {
      bottom: 0;
    }
  }

  &.hide {
    opacity: 0;
    pointer-events: none;
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
    width: 1200px;
    div {
      float: left;
      img {
        width: 50px;
        margin: 0 5px;
        display: block;
      }
    }
  }
}
</style>
