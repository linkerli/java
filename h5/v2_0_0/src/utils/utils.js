// 加载图片的promise
// downloadImagePromise(url){
//   return new Promise((){ });
// }

import axios from 'axios';

const wx = require("weixin-js-sdk");

const BAAE_URL = '//api.etwas.cn';

const isWeiXin = () => {
  return navigator.userAgent.indexOf("MicroMessenger") >= 0;
}

const isWeiXinReady = () => {
  return typeof window.WeixinJSBridge == "object" && typeof window.WeixinJSBridge.invoke == "function";
}

const isAndroidDevice = () => {
  const useragent = navigator.userAgent.toLowerCase().match(/android/);
  return useragent != null || useragent == 0;
}

const get = async (url) => {
  try {
    const response = await axios({
      method: 'get',
      url: BAAE_URL + url,
    });
    return response.data
  } catch (error) {
    console.error(error);
  }
}

/// 配置wx jssdk
const wxConfig = async () => {
  //配置jsssdk
  var jssignRes = await get('/wxMpSignature?url=' + encodeURIComponent(window.location.href));
  if (!jssignRes.code) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: jssignRes.appId, // 必填，公众号的唯一标识
      timestamp: jssignRes.timestamp, // 必填，生成签名的时间戳
      nonceStr: jssignRes.nonceStr, // 必填，生成签名的随机串
      signature: jssignRes.signature,// 必填，签名
      jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
    });
  }
}

const getHeight = () => {
  let width = document.documentElement.clientWidth;
  console.log("width====>:" + width);
    console.log("getHeight====>:" + width / (750 / 1334));
  return width / (750 / 1334);
}

export {
  isWeiXin,
  isWeiXinReady,
  isAndroidDevice,
  get,
  wxConfig,
  getHeight
}
