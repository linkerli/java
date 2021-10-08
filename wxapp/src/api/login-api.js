import Taro from '@tarojs/taro'
import http from '../utils/http';

export const miniLogin = (param = {
  code: '',
  encryptedData: '',
  iv: ''
}) => http({
  // method: 'POST',
  url: '/miniLogin',
  data: param
});

export const mpLogin = (param = {
  code: '',
  encryptedData: '',
  iv: ''
}) => http({
  method: 'POST',
  url: '/api/magazine/getMagazineViewDto',
  data: param
});

export const checkMpLoginStatus = () => http({
  url: '/checkMpLoginStatus',
});

export const getUserInfo = async () => {

  let userInfo;

  // try {
  //   userInfo = Taro.getStorageSync('userInfo');
  // } catch { }

  if (!userInfo) {
    const resp = await Taro.getUserInfo({ withCredentials: true });
    userInfo = {
      encryptedData: resp.encryptedData,
      iv: resp.iv,
      rawData: resp.rawData,
      signature: resp.signature
    }
  }

  return userInfo;
}
