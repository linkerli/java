import React from 'react'
import { View, Image, Text } from '@tarojs/components'

import './index.less'

class Index extends React.Component {

  render() {

    const { userName, userHeadPic, helpReadCount, index, opacity = 1 } = this.props;

    return (
      <View className='sub-list-top-item-container' style={{ opacity: opacity }}>
        {/* 头像 */}
        <View className={index === 0 ? 'avatar-container avatar-top1' : 'avatar-container'}>

          <View className='default-avatar'>
            <View className='avatar' style={{
              backgroundImage: `url(${userHeadPic ?? ''})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            ></View>
          </View>

          {index === 0 ? <View className='top-icon1'></View> : null}

          {index === 1 ? <View className='top-icon top-icon2'>
            2
          </View> : null}

          {index === 2 ? <View className='top-icon top-icon3'>
            3
          </View> : null}
        </View>

        <View className='name'><View className='name-text'>{userName ?? ''}</View></View>

        <View className='count' style={{ fontWeight: 'bold' }}>{helpReadCount ?? 0} 本</View>
      </View>
    )
  }
}

export default Index