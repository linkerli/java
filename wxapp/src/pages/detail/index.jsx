import React, { Component } from 'react'
import { View, Image, Text, Swiper, SwiperItem, Button } from '@tarojs/components'

import Taro, { getCurrentInstance } from '@tarojs/taro'

import BaseButton from '../../components/base-button/index'
import MoreIcon from '../../components/more-icon/index'
import InputReadCode from '../../components/input-read-code/index'
import CheckReadCode from '../../components/check-read-code/index'
import PageWrapper from '../../components/page-wrapper/index'
import './index.less'

import { verifyMagazineCode, checkUserGetMagazine, getMagazineDetail } from '../../api/magazine-api'

import shareIcon from '../../../assets/images/share-icon.png'

export default class Index extends Component {

  state = {
    showModal: false,
    opacity: 0,
    height: 0,
    magId: null,
    recMagazineDto: {},
    readCode: null,
    // 如果链接上携带了阅读码，则提示是否核销阅读码
    showComfirmModal: false,
    ///分享人的头像和昵称
    userNickName: null,
    userHeadPic: null,
    h5Url: null,
    hasChecked: false
  }

  componentDidMount() {
    this.initStyle();
    const params = getCurrentInstance().router.params;
    let scene;
    let magId;
    if (params.scene) {
      scene = decodeURIComponent(params.scene);
      scene = scene.split('&');
      scene = scene.map(item => item.split('='));
      for (let i = 0; i < scene.length; i++) {
        if (scene[i][0] == 'magaId') {
          magId = scene[i][1];
        }
      }
    }
    if (!magId) {
      magId = params.magId;
    }
    this.setState({
      magId: magId ?? null,
      userNickName: params.userNickName ? decodeURIComponent(params?.userNickName ?? '') : null,
      userHeadPic: params.userHeadPic ? decodeURIComponent(params?.userHeadPic ?? '') : null,
      readCode: params?.readCode ?? null
    }, () => {
      /// 获取杂志详情
      this.getMagazineInfo();
    });
  }

  onPullDownRefresh() {
    this.getMagazineInfo();
  }

  onPageScroll(e) {
    let { scrollTop } = e
    let opacity = 0
    if (scrollTop < 0) {
      opacity = 0
    } else if (scrollTop >= 0 && scrollTop <= 50) {
      opacity = scrollTop / 50
    } else {
      opacity = 1
    }

    this.setState({
      opacity
    })
  }

  initStyle = () => {
    const info = Taro.getSystemInfoSync();

    this.setState({
      height: info.screenHeight
    })
  }

  onShareAppMessage() {
    const { recMagazineDto } = this.state;
    return {
      title: recMagazineDto?.title ?? '',
      path: `/pages/detail/index?magId=${recMagazineDto.magId}`
    }
  }

  navigateToSubList() {
    const { recMagazineDto } = this.state;
    const itemPrePics = recMagazineDto?.itemPreviewPic?.split(',') ?? [];
    Taro.navigateTo({
      url: '/pages/sub-list/index?magId=' +
        recMagazineDto.magId +
        '&pic=' + encodeURIComponent(itemPrePics[0]) +
        '&rankIntroPic=' + encodeURIComponent(recMagazineDto.rankIntroPic)
    })
  }


  navigateToWebview() {
    Taro.navigateTo({
      url: `/pages/web-view/index?h5Url=${this.state.h5Url}`
    })
  }

  /// 点击开始阅读按钮
  readAction = async () => {

    Taro.showLoading({
      title: '加载中',
    });
    const res = await checkUserGetMagazine(this.state.magId);
    /// 如果获取到了阅读码，则直接跳转阅读码；否则，弹出输入框
    if (res) {
      this.setState({ h5Url: res }, () => {
        if (this.state.h5Url) {
          this.navigateToWebview();
          return;
        }
      });
    } else {
      this.showModalHandler();
    }
    Taro.stopPullDownRefresh();
    Taro.hideLoading();

  }

  /// 隐藏输入阅读码的modal
  hideModalHandler = () => {
    this.setState({
      showModal: false
    });
  }

  /// 显示输入阅读码的modal
  showModalHandler = () => {
    this.setState({
      showModal: true
    });
  }

  showOrHideComfirmModal = () => {
    this.setState({
      showComfirmModal: !this.state.showComfirmModal
    });
  }

  /// 获取杂志详情
  getMagazineInfo = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    console.log('>>>>>>>>>>>> magId' + this.state.magId);
    const res = await getMagazineDetail(this.state.magId);
    if (!res.code) {
      this.setState({ recMagazineDto: res }, () => {
        this.getMagazineByUser();
      });
    }
    Taro.stopPullDownRefresh();
    Taro.hideLoading();
  }

  getMagazineByUser = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const res = await checkUserGetMagazine(this.state.magId);
    /// 如果获取不到h5地址，且url上有readcode，则弹出检查的逻辑
    if (res) {
      this.setState({ h5Url: res });
    } else if (this.state.readCode && !this.state.hasChecked) {
      this.setState({
        hasChecked: true
      });
      this.showOrHideComfirmModal();
    }
    Taro.stopPullDownRefresh();
    Taro.hideLoading();
  }

  /// 核销阅读码
  // "magaId": 0,
  // "readCode": "",
  // "userInputOrNot": true
  verify = async (userInputOrNot, readCode) => {
    Taro.showLoading({
      title: '加载中',
    });
    const { recMagazineDto } = this.state;
    const readCodeFromRoute = this.state.readCode;
    const res = await verifyMagazineCode({
      magaId: recMagazineDto.magId,
      readCode: readCode ?? readCodeFromRoute,
      userInputOrNot: userInputOrNot
    });

    if (!!res && !res.code) {
      this.setState({
        h5Url: res,
        showComfirmModal: false
      }, () => {
        this.navigateToWebview();
      });
    } else {
      Taro.showModal({
        title: '提醒',
        content: res.message
      })
    }

    Taro.stopPullDownRefresh();
    Taro.hideLoading();
  }

  render() {
    const { recMagazineDto, opacity, showModal, showComfirmModal, height, userNickName, userHeadPic } = this.state;

    const itemPrePics = recMagazineDto?.itemPreviewPic?.split(',') ?? [];

    return (
      <PageWrapper opacity={opacity} loginSuccessCallback={() => { this.getMagazineInfo() }} title='' needCheckLoginStatus showBackHomeButtons>
        <View className='detail-container' style={{ height: height + 'px' }}>

          <View className='detail-swiper-container'>
            <Swiper
              className='swiper'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
              autoplay
            >
              {itemPrePics.map(item => (<SwiperItem key={item.toString()}>
                <View className='swiper-item-image'
                  style={{
                    backgroundImage: `url(${item})`,
                    backgroundPosition: 'top',
                    backgroundSize: 'cover'
                  }}
                ></View>
              </SwiperItem>))}
            </Swiper>
            <View className='swiper-cover'></View>
          </View>

          <View className='detail-cover'>
            <Text className='detail-name'>
              {recMagazineDto?.title ?? ''}
            </Text>

         {/*   <Text className='detail-desc'>
              {recMagazineDto?.itemDesc ?? ''}
            </Text>*/}

            <View className='detail-info-container'>
              <Text className='detail-info-sub'>已有 <Text style={{ fontWeight: 'bold' }}>{recMagazineDto?.readCount ?? 0}</Text> 本订阅</Text>
              {
                recMagazineDto?.showRankOrNot ? <View className='detail-info-navigator' onClick={() => this.navigateToSubList()}>
                  <Text className='detail-info-navigator-text' style={{ fontWeight: 'bold' }}>查看订阅详情</Text>
                  <View className='next-icon-container'>
                    <MoreIcon></MoreIcon>
                  </View>
                </View> : null
              }
            </View>

            {/* 底部阅读和分享按钮 */}
            <View className='detail-buttons-container'>
              <BaseButton onClick={() => this.readAction()}>开始阅读</BaseButton>
              <Button className='share-button' open-type='share'>
                <Image className='share-button-share-icon' mode='widthFix' src={shareIcon} />
              </Button>
            </View>
          </View>

          {showModal ? <InputReadCode hideModalHandler={this.hideModalHandler} confirmHandler={this.verify}></InputReadCode> : null}
          {showComfirmModal ? <CheckReadCode
            showOrHideCodeModal={this.showOrHideComfirmModal}
            confirmHandler={this.verify}
            recMagazineDto={recMagazineDto}
            userNickName={userNickName}
            userHeadPic={userHeadPic}
          ></CheckReadCode> : null}
        </View>
      </PageWrapper>
    )
  }
}
