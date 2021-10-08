import Taro from '@tarojs/taro';
import { baseUrl, showDebugger } from '../config/config';

export default async (options = { method: 'GET', query: {}, params: {} }) => {
  if (!showDebugger) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    );
  }

  let token;

  try {
    token = Taro.getStorageSync('token');
    console.log('token       ' + token);
  } catch { }

  const header = {
    'Content-Type': 'application/json'
  }

  if (token) {
    header['Authorization'] = 'bearer' + token;
  }

  let url = baseUrl + options.url;

  const queries = Object.entries(options?.query ?? {});

  for (let i = 0; i < queries.length; i++) {
    if (url.indexOf('?') >= 0) {
      url += '&' + queries[i][0] + '=' + queries[i][1]
    } else {
      url += '?' + queries[i][0] + '=' + queries[i][1]
    }
  }

  return Taro.request({
    url,
    data: {
      ...options.data,
    },
    header,
    method: options?.method?.toUpperCase() ?? 'GET',
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!showDebugger) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        );
      }
      if (data.status !== 'ok') {
        const { code } = data;
        if (!code) {

        } else if (code == 1002 || code == 700) {
          console.log('未授权登录');
          // Taro.navigateTo({
          //   url: '/pages/login/index'
          // })
        } else {
          Taro.showToast({
            title: res.message,
            icon: 'none',
            mask: true,
          });
        }
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  }).catch(e => {
    return e;
  });
};