import React from 'react'
import { View, Text, Button, Image } from '@tarojs/components'

import logo from '../../../assets/images/logo.png'

import './index.less'

class Index extends React.Component {

  render() {

    const { miniLogin } = this.props;

    return (
      <View className='login-modal-container' onClick={() => miniLogin()}>

        <View className='login-modal'>
          <Image className='logo' src={logo} />
          <Text className='login-tips'>ETWAS需要您的微信授权</Text>
          <Button open-type='getUserInfo' className='login-button'>微信登录</Button>
        </View>

      </View>
    )
  }
}

export default Index