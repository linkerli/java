import React from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.less'

class MyCodeItem extends React.Component {

  copy = () => {
    const {
      invalid,
      readCode
    } = this.props;
    if (invalid) {
      return;
    }
    Taro.setClipboardData({
      data: readCode,
      success: function () { }
    })
  }

  onShareAppMessage() {
    const { readCode } = this.props;
    return {
      // title: recMagazineDto?.title ?? '',
      // path: `/pages/detail/index?options=${JSON.stringify(recMagazineDto)}`,
      // imageUrl: '../../../assets/images/default-avatar.png'
    }
  }

  render() {
    const {
      invalid,
      readCode
    } = this.props;

    return (
      <View className='my-code-item-container'>
        <View className='code'>
          <Text className={invalid ? 'code-text-invalid' : 'code-text'}>{readCode ?? ''}</Text>
          {invalid ? <Text className='code-status'>已使用</Text> : null}
        </View>

        <Button className={invalid ? 'my-code-copy-button invalid-button' : 'my-code-copy-button'} onClick={() => this.copy()}>复制</Button>
        <Button open-type='share' className={invalid ? 'my-code-share-button invalid-button' : 'my-code-share-button'}>分享</Button>
      </View>
    )
  }
}

export default MyCodeItem