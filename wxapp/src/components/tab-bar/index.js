import React from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.less'

import homeSelectedIcon from '../../../assets/images/home-selected-icon.png'
import homeUnselectedIcon from '../../../assets/images/home-unselected-icon.png'
import mySelectedIcon from '../../../assets/images/my-selected-icon.png'
import myUnselectedIcon from '../../../assets/images/my-unselected-icon.png'

class Index extends React.Component {

  state = {
    list: [
      {
        text: '首页',
        pagePath: '/pages/index/index',
        iconPath: homeUnselectedIcon,
        selectedIconPath: homeSelectedIcon,
      },
      {
        text: '我的',
        pagePath: '/pages/my/index',
        iconPath: myUnselectedIcon,
        selectedIconPath: mySelectedIcon,
      },
    ],
  }

  navigateTo = url => {
    Taro.switchTab({
      url
    })
  }

  render() {

    const { list } = this.state;
    const { currentPage } = this.props;

    return (
      <View className='tab-bar-container'>
        {
          list.map(item => (
            <View onClick={() => this.navigateTo(item.pagePath)} className='tab-bar-item' key={item.text}>
              <Image className='tab-bar-image' src={item.pagePath == currentPage ? item.selectedIconPath : item.iconPath}></Image>
            </View>
          ))
        }
      </View>
    )
  }
}

export default Index