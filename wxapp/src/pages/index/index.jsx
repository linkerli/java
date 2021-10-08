import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import BaseButton from '../../components/base-button/index'
import PageWrapper from '../../components/page-wrapper/index'

import { getMagazineViewDto } from '../../api/magazine-api'

import { formatRowList, throttle } from '../../utils/utils'

import gifLogo from '../../../assets/images/logo-gif.gif'

import './index.less'

import nextIcon from '../../../assets/images/next-icon.png'

export default class Index extends Component {

  state = {
    initializing: true,
    isLoading: true,
    opacity: 0,
    data: {
      "titleDoc": '',
      "recMagazineDto": {},
      "magazineDtoList": []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initializing: false
      });
    }, 3000);
  }

  componentDidShow() {
    this.refreshData();
  }

  onPageScroll = throttle(
    (e) => {
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
    , 0, 500)

  // onPageScroll(e) {

  // }

  onPullDownRefresh() {
    this.refreshData();
  }

  initData = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const res = await getMagazineViewDto();
    if (!res.code) {
      this.setState({ data: res });
    }
    Taro.hideLoading();
  }

  refreshData = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const res = await getMagazineViewDto();
    if (!res.code) {
      this.setState({ data: res, isLoading: false });
    }
    Taro.stopPullDownRefresh();
    Taro.hideLoading();
  }

  navigateToDetail(options) {
    Taro.navigateTo({
      url: `/pages/detail/index?magId=${options.magId}`
    })
  }

  navigateToPreReading() {
    Taro.navigateTo({
      url: '/pages/pre-reading/index'
    })
  }

  navigateToUserCenter() {
    Taro.navigateTo({
      url: '/pages/user-center/index'
    })
  }

  navigateToMy() {
    Taro.navigateTo({
      url: '/pages/my/index'
    })
  }

  navigateToMyCodeList() {
    Taro.navigateTo({
      url: '/pages/my-code-list/index'
    })
  }

  navigateToLogin() {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  onShareAppMessage() {
    return {
      title: `ETWAS电子刊`,
      path: `/pages/index/index`,
      imageUrl: decodeURIComponent(this.state.recMagazineDto.itemCover)
    }
  }

  render() {

    const { data: { recMagazineDto, magazineDtoList, titleDoc }, opacity, isLoading, initializing } = this.state;

    const itemPrePics = recMagazineDto?.itemPreviewPic?.split(',') ?? [];

    const magazineDtoListRowList = formatRowList(magazineDtoList);

    return (
      <PageWrapper hasTabbar opacity={opacity} isHomePage title='ETWAS' currentPage='/pages/index/index'>
        <View className={initializing ? 'gif-logo-background' : 'gif-logo-background hide'}>
          <Image src={gifLogo} mode='widthFix' className='gif-logo' />
        </View>

        {isLoading ? null : <View className='index-container'>
          <View className='filter-background'
            style={{
              backgroundImage: `url(${recMagazineDto?.itemCover ?? ''})`,
              backgroundPosition: 'top',
              backgroundSize: 'cover'
            }}
          >
          </View>

          <View className='filter-background-cover'></View>

          {/* 顶部推荐的杂志 */}
          <View className='index-top-container'>
            <Text className='index-title'>{recMagazineDto?.year ?? ''}年{recMagazineDto?.month ?? ''}月  {recMagazineDto?.issue ?? ''}</Text>
            <View className='index-image' style={{ backgroundImage: `url(${recMagazineDto?.itemCover ?? ''})` }}>
              <View className='button-container'>
                <BaseButton onClick={() => this.navigateToDetail(recMagazineDto)}>开始阅读</BaseButton>
              </View>
            </View>

            <Text className='top-mag-name'>{recMagazineDto?.title ?? ''}</Text>

            <View className='index-top-detail-container'>
              <Text>已有 <Text style={{ fontWeight: 'bold' }}>{recMagazineDto?.readCount}</Text> 本订阅</Text>
              <View className='right' onClick={() => this.navigateToDetail(recMagazineDto)}>
                <Text style={{ fontWeight: 'bold' }}>查看详情</Text>
                <Image className='next-icon' src={nextIcon} />
              </View>
            </View>
          </View>

          {/* 中间热门期刊 */}
          <View className='index-hot-list'>
            <Text className='index-hot-title'>{titleDoc}</Text>

            {magazineDtoListRowList.map(item =>
              <View className='index-hot-row' key={item.toString()}>

                {item?.map((innerItem => {
                  return <View key={innerItem.magId} className='index-hot-item' onClick={() => this.navigateToDetail(innerItem)}>
                    <View className='index-hot-item-image' style={{ backgroundImage: `url(${innerItem.itemCover})` }}></View>
                    <Text className='index-hot-item-time'>{innerItem?.year ?? ''}年{innerItem?.month ?? ''}月</Text>
                    <Text className='index-hot-item-name'>{innerItem?.title ?? ''}</Text>
                    <Text className='index-hot-item-des'>已有 {innerItem?.readCount ?? 0} 本订阅</Text>
                  </View>;
                }))}
              </View>
            )}

          </View>
        </View>}
      </PageWrapper>
    )
  }
}
