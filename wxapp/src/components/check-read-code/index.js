import React from 'react'
import { View, Text, Button, Image } from '@tarojs/components'

import './index.less'

class Index extends React.Component {

  render() {

    const { recMagazineDto, showOrHideCodeModal, confirmHandler, userNickName, userHeadPic } = this.props;

    const itemPrePics = recMagazineDto?.itemPreviewPic?.split(',') ?? [];

    return (
      <View className='input-read-code-container' onClick={() => showOrHideCodeModal()}>

        <View className='input-read-code-modal' onClick={e => e.stopPropagation()}>
          <View className='input-read-code-avatar-wrapper'>
            <View className='avatar' src={userHeadPic ?? ''} style={{
              backgroundImage: `url(${userHeadPic})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            ></View>
          </View>
          <Text className='avatar-name'>{userNickName ?? ''}</Text>
          <Text className='input-read-code-title'>赠予你一枚阅读码</Text>
          <View className='mag-info-wrapper'>
            <View className='mag-pic-wrapper' style={{
              backgroundImage: `url(${itemPrePics.length > 0 ? itemPrePics[0] : ''})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            >
            </View>
            <View className='mag-detail'>
              <Text className='mag-name'>{recMagazineDto?.title ?? ''}</Text>
              <Text className='mag-time'>{recMagazineDto?.year ?? ''}年10月 {recMagazineDto?.issue ?? ''}</Text>
            </View>
          </View>
          <Button className='read-code-button' onClick={() => confirmHandler()}>接受赠予的阅读码</Button>
          <Button className='read-code-cancel-button' onClick={() => showOrHideCodeModal()}>放弃阅读码</Button>
        </View>

      </View>
    )
  }
}

export default Index