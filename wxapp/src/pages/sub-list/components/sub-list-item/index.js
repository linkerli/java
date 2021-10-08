import React from 'react'
import { View, Image, Text } from '@tarojs/components'

import './index.less'

class Index extends React.Component {

  render() {

    const {
      userName,
      userHeadPic,
      helpReadCount,
      index } = this.props;

    return (
      <View className='sub-list-item-container'>
        <View className='sub-list-item-left'>
          {/* 序号 */}
          <Text className='sub-list-item-index'>{index + 4}</Text>

          {/* 头像 */}
          <View className='avatar-container'>

            <View className='default-avatar'>
              <View className='avatar' style={{
                backgroundImage: `url(${userHeadPic ?? ''})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
              ></View>
            </View>
          </View>

          <Text className='name'>{userName}</Text>
        </View>

        <View className='count' style={{ fontWeight: 'bold' }}>{helpReadCount} 本</View>
      </View>
    )
  }
}

export default Index