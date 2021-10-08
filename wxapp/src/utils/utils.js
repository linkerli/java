import Taro from '@tarojs/taro'

const qiniu = require('../utils/qiniu.min');

export const formatRowList = (list) => {
  if (!list || list.length <= 0) {
    return [];
  }
  const newList = [];
  let temp = [];

  for (let i = 0; i < list.length; i++) {
    temp.push(list[i]);
    if (i == list.length - 1 || (i != 0 && (i + 1) % 2 == 0)) {
      newList.push(temp);
      temp = [];
    }
  }

  return newList;
}

export const throttle = (func, delay, duration) => {
  let timer = null
  let begin = new Date()
  return function () {
    let context = this
    const args = arguments
    const current = new Date()
    clearTimeout(timer)
    if (current - begin >= duration) {
      func.apply(context, args)
      begin = current
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, delay)
    }
  }
}

export const chooseImagePromise = () => {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        resolve(tempFilePaths);
      },
      fail(res) {
        reject(res);
      }
    })
  });
}

export const upload = (file, options) => {
  return new Promise((resolve, reject) => {
    qiniu.upload(
      file
      , (res) => {
        console.log(res)
        resolve(res);
      }, (error) => {
        console.log(error);
        reject(error);
      }, {
      region: 'ECN',
      domain: options.domain,
      key: options.keyPrefix + wxuuid(),
      uptoken: options.uptoken,
      uploadURL: options.uploadUrl,
    })
  });
}

export const wxuuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("").replace("-", "");
  return uuid

}