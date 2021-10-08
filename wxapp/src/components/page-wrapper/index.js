import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import Tabbar from '../tab-bar/index'

import LoginModal from '../login-modal/index'

import { checkMpLoginStatus, getUserInfo, miniLogin } from '../../api/login-api'

import './index.less'

import backIcon from '../../../assets/images/go-back-icon.png'
import homeIcon from '../../../assets/images/go-home-icon.png'
import logo from '../../../assets/images/logo.png'

class Index extends React.Component {

  state = {
    // 根据currentpage的length来决定是否显示返回按钮
    historyLength: 0,
    phoneXPadding: false,
    height: 0,
    paddingTop: 0,
    btnWidth: 0,
    btnHeight: 0,
    btnsPaddingTop: 0,
    pageLength: 0,
    showLoginModal: false
  }

  componentDidMount() {
    this.initStyle();
    this.checkTokenStatus();
  }

  /// 检查登录是否过期
  async checkTokenStatus() {
    const { needCheckLoginStatus } = this.props;
    if (!needCheckLoginStatus) {
      return;
    }
    let res = await checkMpLoginStatus();
    if (!res && !res.code) {
      this.setState({ showLoginModal: true });
    }
  }

  initStyle() {

    const info = Taro.getSystemInfoSync();

    this.getClientRectTimer().then(res => {
      let menuInfo = res
      const { screenWidth } = info;
      // top-nav-content的高度是胶囊高度 + 2 *（16/750*width）；padding-top是胶囊的top - （16/750*width）
      let paddingTop = Math.round(menuInfo.top - (16 / 750 * screenWidth))
      let height = Math.round(menuInfo.height + (2 * (16 / 750 * screenWidth)))
      // 按钮的宽高
      let btnWidth = height / 2
      let btnHeight = height / 2
      // 按钮container的padding-top值：(height - btnHeight )/ 2
      let btnsPaddingTop = paddingTop + ((height - btnHeight) / 2)

      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>.menuInfoPromise', res)

      this.setState({
        paddingTop,
        height,
        btnWidth,
        btnHeight,
        btnsPaddingTop,
        pageLength: Taro.getCurrentPages().length
      })
    })

  }

  // 调用微信getMenuButtonBoundingClientRect，失败后，则开启定时器，继续请求，直到请求成功
  getClientRectTimer = () => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      let getClientRectIndex = 0
      this.getClientRectTimer = setInterval(() => {
        let menuInfo = null
        // 如果次数超过10次，也就是2秒钟，则赋值默认值，防止一直无法请求到，导致css一直坍塌
        if (getClientRectIndex > 10) {
          clearTimeout(this.getClientRectTimer)
          resolve({
            bottom: 58,
            height: 32,
            left: 278,
            right: 365,
            top: 26,
            width: 87
          })
        } else {
          getClientRectIndex++
          try {
            menuInfo = Taro.getMenuButtonBoundingClientRect()
          } catch (error) {
            menuInfo = null
          }
          if (menuInfo && menuInfo.bottom != 0 && menuInfo.top != 0 && menuInfo.height != 0 && menuInfo.right != 0 && menuInfo.width != 0 && menuInfo.left != 0) {
            clearTimeout(this.getClientRectTimer)
            resolve(menuInfo)
          }
        }
      }, 200)
    })
  }

  login = async () => {
    if (this.state.isLogin) {
      return;
    }
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isLogin: true });

    const userInfo = await getUserInfo();

    const codeRes = await Taro.login();

    if (userInfo) {
      //发起网络请求
      const response = await miniLogin({ code: codeRes.code, encryptedData: userInfo.encryptedData, iv: userInfo.iv });
      console.log(response);
      await Taro.setStorage({ key: 'token', data: response.token });
      Taro.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      this.setState({
        showLoginModal: false
      });
      /// 登录成功，回调页面传过来的回调方法
      if (this.props.loginSuccessCallback) {
        this.props.loginSuccessCallback();
      }
    } else {
      console.log('登录失败！');
    }

    this.setState({ isLogin: false });
  }


  goback = () => {
    Taro.navigateBack()
  }

  gohome = () => {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }

  render() {

    const { opacity, title, hasTabbar, children, currentPage, showBackHomeButtons, isHomePage } = this.props;
    const { height, paddingTop, pageLength, btnHeight, showLoginModal } = this.state;

    return (
      <View className='page-wrapper'>
        <View className={opacity >= 1 ? 'nav-bar-wrapper-background fill-background' : 'nav-bar-wrapper-background'} style={{ height: height + paddingTop + 'px' }}></View>
        {/* 可以调整颜色的顶部bar */}
        <View className='nav-bar-wrapper' style={{ height: height + paddingTop + 'px' }}>
          <Text className='nav-bar-text'>{title ?? '首页'}</Text>

          {pageLength > 1 || showBackHomeButtons ?
            <View className='go-back-home-container' style={{ height: btnHeight + 'px' }}>
              <View className='nav-bar-back-button' style={{ height: btnHeight + 'px' }} onClick={() => this.goback()}>
                <Image className='nav-bar-back-icon' mode='heightFix' src={backIcon} />
              </View>
              <View className='nav-bar-linear' style={{ height: btnHeight + 'px' }}></View>
              <View className='nav-bar-home-button' style={{ height: btnHeight + 'px' }} onClick={() => this.gohome()}>
                <Image className='nav-bar-home-icon' mode='heightFix' src={homeIcon} />
              </View>
            </View>
            : null}
        </View>

        {isHomePage ? <View className='nav-bar-wrapper' style={{
          height: height + paddingTop + 'px', backgroundColor: 'white',
          filter: 'blur(0)'
        }}
        >
          <Image className='logo' style={{ top: paddingTop + 14 + 'px' }} mode='widthFix' src={logo} />
        </View> : null}

        {children}
        {
          hasTabbar ? <Tabbar currentPage={currentPage}></Tabbar> : null
        }
        {showLoginModal ? <LoginModal miniLogin={this.login}></LoginModal> : null}
      </View>
    )
  }
}

export default Index