import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { getMagazineReadCodeList, getWxUserDto } from '../../api/user-center-api'

import PageWrapper from '../../components/page-wrapper/index'

import './index.less'

export default class Index extends Component {

  state = {
    opacity: 0,
    pic: null,
    list: [],
    userHeadPic: null, userNickName: null
  }

  componentDidMount() {
    this.refreshData();
    this.getPicFromUrl();
    this.getUserInfo();
  }

  onPullDownRefresh() {
    this.refreshData();
  }

  getUserInfo = async () => {
    const res = await getWxUserDto();

    if (!res.code) {
      const { userHeadPic,
        userNickName } = res
      this.setState({ userHeadPic, userNickName });
    }
    Taro.stopPullDownRefresh();
    Taro.hideLoading();
  }

  getPicFromUrl = () => {
    const params = getCurrentInstance().router.params;
    if (params.pic) {
      this.setState({ pic: decodeURIComponent(params.pic) });
    }
  }

  refreshData = async () => {

    const params = getCurrentInstance().router.params;

    if (!params.magId) {
      return;
    }

    Taro.showLoading({
      title: '加载中',
    });
    const list = await getMagazineReadCodeList(params.magId);

    if (!list.code) {
      this.setState({
        list
      })
    }
    Taro.stopPullDownRefresh();
    Taro.hideLoading();
  }

  onPullDownRefresh() {
    this.refreshData();
  }

  copy = (invalid, item) => {
    if (invalid) {
      return;
    }
    Taro.setClipboardData({
      data: item?.readCode,
      success: function () { }
    })
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

  onShareAppMessage(e) {
    const { item } = e.target.dataset;
    const params = getCurrentInstance().router.params;
    let { userHeadPic, userNickName } = this.state;
    if (!userHeadPic) {
      userHeadPic = ''
    }
    if (!userNickName) {
      userNickName = ''
    }

    console.log(`/pages/detail/index?magId=${params?.magId}&userNickName=${encodeURIComponent(userNickName)}&userHeadPic=${encodeURIComponent(userHeadPic)}&readCode=${item.readCode}`);

    return {
      title: decodeURIComponent(params.title),
      path: `/pages/detail/index?magId=${params?.magId}&userNickName=${encodeURIComponent(userNickName)}&userHeadPic=${encodeURIComponent(userHeadPic)}&readCode=${item.readCode}`,
      imageUrl: decodeURIComponent(params.pic),
    }
  }

  render() {

    const { opacity, list, pic } = this.state;

    return (
      <PageWrapper opacity={opacity} navBarTextStyle='light' title=''>
        <View className='my-code-list-background'
          style={{
            backgroundImage: `url(${pic})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></View>
        <View className='background-cover'></View>
        <View className='my-code-list-container'>
          <Text className='my-code-list-title'>共 {list.length} 本订阅</Text>
          {list.map(item => <View className='my-code-item-container' key={item.toString()}>
            <View className='code'>
              <Text className={item.status == 1 ? 'code-text-invalid' : 'code-text'}>{item?.readCode ?? ''}</Text>
              {item.status == 1 ? <Text className='code-status'>已使用</Text> : null}
            </View>

            <Button
              className={item.status == 1 ? 'my-code-copy-button invalid-button' : 'my-code-copy-button'}
              onClick={() => this.copy(item.status == 1, item)}
            >复制</Button>
            {item.status == 1 ? <Button className={item.status == 1 ?
              'my-code-share-button invalid-button' : 'my-code-share-button'}
            >分享</Button> : <Button open-type='share' data-item={item} className={item.status == 1 ? 'my-code-share-button invalid-button' : 'my-code-share-button'}>分享</Button>}
          </View>)}
        </View>
      </PageWrapper>
    )
  }
}
