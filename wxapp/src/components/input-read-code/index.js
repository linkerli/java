import React from 'react'
import { View, Text, Input, Button } from '@tarojs/components'

import './index.less'

class Index extends React.Component {

  state = {
    readCode: null
  }

  changeHandler = e => {
    this.setState({
      readCode: e.detail.value
    });
  }

  render() {

    const { hideModalHandler, confirmHandler } = this.props;

    const { changeHandler } = this;

    const { readCode } = this.state;

    return (
      <View className='input-read-code-container' onClick={e => {
        e.preventDefault();
        hideModalHandler();
      }}
      >

        <View className='input-read-code-modal' onClick={e => e.stopPropagation()}>
          <Text className='input-read-code-title'>输入阅读码</Text>
          <Input className='read-code-input' onInput={e => changeHandler(e)} placeholder='请输入阅读码' />
          <Button className='read-code-button' onClick={e => {
            e.stopPropagation();
            confirmHandler(true, readCode);
          }}
          >提交</Button>
          <Button className='read-code-cancel-button' onClick={() => hideModalHandler()}>取消</Button>
          <View className='read-code-linear' style={{ width: '100%', height: '1px', backgroundColor: 'rgba(159, 159, 159, 1)' }}></View>
          <Text className='read-code-tips'>前往ETWAS VISION公众号，了解如何获取阅读码</Text>
        </View>

      </View>
    )
  }
}

export default Index