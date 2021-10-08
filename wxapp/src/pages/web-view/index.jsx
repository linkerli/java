import React, { Component } from 'react'
import { WebView } from '@tarojs/components'

import { getCurrentInstance } from '@tarojs/taro'

import './index.less'

export default class Index extends Component {

  state = {
    h5Url: null
  }

  componentDidMount() {
    const params = getCurrentInstance().router.params;
    this.setState({
      h5Url: params.h5Url ? decodeURIComponent(params?.h5Url ?? '') : null,
    }, () => {
      console.log('>>>>>>>>>>>>>>>>>>sdfsdfsdfsdfs' + this.state.h5Url);
    });
  }

  render() {
    const { h5Url } = this.state;

    return (
      <WebView src={h5Url} />
    )
  }
}
