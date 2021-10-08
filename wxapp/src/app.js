import { Component } from 'react'
import { Taro } from '@tarojs/taro'

import { miniLogin } from './api/login-api'

import './app.less'

class App extends Component {

  componentDidShow() {
    console.log('>>>>>>>>>>componentDidShow');
    this.login();
  }

  componentWillMount() {
    console.log('>>>>>>>>>>componentDidShow' + Taro);
  }

  /// 静默登录
  login = async () => {
    console.log('>>>>>>>>>>>>    login');
    const userInfo = wx.getSystemInfoSync();
    wx.login({
      success: res => {
        console.log('>>>>>>>>>>res from wx.login');
        console.log(Taro);
      }
    });
    console.log('sdfsdfsdfsdfs>>>>>' + userInfo);
    // const codeRes = await Taro.login();
    // const response = await miniLogin({ code: codeRes.code });
    // if (!response.code) {
    //   await Taro.setStorage({ key: 'token', data: response.token });
    // }
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
