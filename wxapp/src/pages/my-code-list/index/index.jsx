import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  state = {
    msg: 'testmsg'
  }

  componentWillMount() {
    console.log('>>>>>>>>>>componentWillMount>>>>>>>>>');
  }

  componentDidMount() {
    console.log('>>>>>>>>>>componentDidMount>>>>>>>>>');
    setTimeout(() => {
      this.setState({
        msg: 'change to test msg'
      });
    }, 2000);
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

  render() {

    const { msg } = this.state;

    return (
      <View className='index'>
        <Text>{msg}</Text>
      </View>
    )
  }
}
