import Vue from 'vue'
import App from './App.vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'

import 'animate.css'

import './app.scss'

import LongPress from 'vue-directive-long-press'

import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

import VueDragDrop from 'vue-drag-drop';

Vue.use(VueDragDrop);

Vue.use(VueVideoPlayer)

Vue.directive('long-press', LongPress)

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
