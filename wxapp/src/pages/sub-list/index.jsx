import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import './index.less'

import SubListTopItem from './components/sub-list-top-item/index'
import SubListItem from './components/sub-list-item/index'
import PageWrapper from '../../components/page-wrapper/index'

import { getMagazineRankList } from '../../api/magazine-api'


export default class Index extends Component {

  state = {
    opacity: 0,
    pic: null,
    rankIntroPic: null,
    list: [
      {
        userId: 1,
        userName: '用户名',
        userHeadPic: '',
        helpReadCount: 100,
      },
      {
        userId: 2,
        userName: '用户名',
        userHeadPic: '',
        helpReadCount: 100,
      },
      {
        userId: 3,
        userName: '用户名',
        userHeadPic: '',
        helpReadCount: 100,
      },
      {
        userId: 3,
        userName: '用户名',
        userHeadPic: '',
        helpReadCount: 100,
      },
      {
        userId: 3,
        userName: '用户名',
        userHeadPic: '',
        helpReadCount: 100,
      },
      {
        userId: 3,
        userName: '用户名',
        userHeadPic: '',
        helpReadCount: 100,
      },
      {
        userId: 3,
        userName: '用户名',
        userHeadPic: '',
        helpReadCount: 100,
      },
    ]
  }

  componentWillMount() {
    console.log('>>>>>>>>>>componentWillMount>>>>>>>>>');
  }

  componentDidMount() {
    this.refreshData();
    this.getBackgroundPic();
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>componentWillUnmount>>>>>>>>>');
  }

  componentDidShow() {
    console.log('>>>>>>>>>>componentDidShow>>>>>>>>>');
  }

  componentDidHide() {
    console.log('>>>>>>>>>>componentDidHide>>>>>>>>>');
  }

  onPullDownRefresh() {
    this.refreshData();
  }

  /// 获取url上的图片，放置到背景中
  getBackgroundPic = () => {
    const params = getCurrentInstance().router.params;

    const newState = {}
    if (params.pic) {
      newState['pic'] = decodeURIComponent(params.pic);
    }
    if (params.rankIntroPic) {
      newState['rankIntroPic'] = decodeURIComponent(params.rankIntroPic);
    }
    this.setState(newState);
  }

  refreshData = async () => {

    const params = getCurrentInstance().router.params;

    Taro.showLoading({
      title: '加载中',
    });
    const list = await getMagazineRankList(params.magId);
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

  render() {

    const { opacity, list, rankIntroPic, pic } = this.state;

    const top3List = list.slice(0, 3);
    const leftList = list.slice(3, list.length);

    const top3ListViews = [];
    const leftListViews = [];

    top3List.forEach((item, index) => {
      top3ListViews.push(<SubListTopItem
        userId={item.userId}
        userName={item.userName}
        userHeadPic={item.userHeadPic}
        helpReadCount={item.helpReadCount}
        index={index}
        key={item.toString()}
      ></SubListTopItem>);
    })

    leftList.forEach((item, index) => {
      leftListViews.push(<SubListItem
        userId={item.userId}
        userName={item.userName}
        userHeadPic={item.userHeadPic}
        helpReadCount={item.helpReadCount}
        index={index}
        key={item.toString()}
      ></SubListItem>);
    })

    return (
      <PageWrapper opacity={opacity} navBarTextStyle='light' title=''>
        {/* <View className='sub-list-background'
          style={{
            backgroundImage: `url(${pic})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></View> */}
        <View className='sub-list-container'>
          <View className='sub-list-tips'>
            <Image className='tips-image' mode='widthFix' src={rankIntroPic} />
          </View>
          <View className='sub-list-top-container'>
            {list.length > 1 ? <SubListTopItem
              userId={list[1].userId}
              userName={list[1].userName}
              userHeadPic={list[1].userHeadPic}
              helpReadCount={list[1].helpReadCount}
              index={1}
            ></SubListTopItem> : <SubListTopItem opacity='0' index={1}></SubListTopItem>}
            {list.length > 0 ? <SubListTopItem
              userId={list[0].userId}
              userName={list[0].userName}
              userHeadPic={list[0].userHeadPic}
              helpReadCount={list[0].helpReadCount}
              index={0}
            ></SubListTopItem> : <SubListTopItem opacity='0' index={0}></SubListTopItem>}
            {list.length > 2 ? <SubListTopItem
              userId={list[2].userId}
              userName={list[2].userName}
              userHeadPic={list[2].userHeadPic}
              helpReadCount={list[2].helpReadCount}
              index={2}

            ></SubListTopItem> : <SubListTopItem opacity='0' index={2}></SubListTopItem>}
          </View>

          <View className='sub-list-container'>
            {leftListViews}
          </View>
        </View>

      </PageWrapper>
    )
  }
}
