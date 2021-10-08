import React from 'react'
import { Button } from '@tarojs/components'

import './index.less'

class Index extends React.Component {

  render() {

    const { onClick, children } = this.props;

    return (
      <Button className='base-button' onClick={() => onClick()}>{children}</Button>
    )
  }
}

export default Index