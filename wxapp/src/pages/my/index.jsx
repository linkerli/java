import React, { Component } from 'react'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

import PageWrapper from '../../components/page-wrapper/index'

import { getWxUserDto, getUserReadMagazineList, updateUserInfo, createQiNiuUploadToken } from '../../api/user-center-api'

import { formatRowList, chooseImagePromise, upload } from '../../utils/utils'

import editIcon from '../../../assets/images/edit-icon.png'
import serviceImage from '../../../assets/images/service.png'
import logo from '../../../assets/images/logo.png'

import './index.less'

export default class Index extends Component {

  state = {
    opacity: 0,
    userHeadPic: null,
    editUserNickName: null,
    userNickName: null,
    list: [],
    showEditNickName: false
  }


  componentDidMount() {
    this.refreshData();
  }

  onPageScroll(e) {
    let { scrollTop } = e
    let opacity = 0
    if (scrollTop < 0) {
      opacity = 0
    } else if (scrollTop >= 0 && scrollTop <= 50) {
      opacity = scrollTop / 50
    } else {
      opacity = 1
    }

    this.setState({
      opacity
    })
  }

  changeHandler = e => {
    this.setState({
      editUserNickName: e.detail.value
    });
  }

  showEditModal = () => {
    this.setState({
      showEditNickName: true
    });
  }

  hideEditModal = () => {
    this.setState({
      showEditNickName: false
    });
  }

  refreshData = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const res = await getWxUserDto();
    const list = await getUserReadMagazineList();

    if (!list.code) {
      this.setState({
        list: formatRowList(list)
      })
    }

    if (!res.code) {
      const { userHeadPic,
        userNickName } = res
      this.setState({ userHeadPic, userNickName });
    }
    Taro.stopPullDownRefresh();
    Taro.hideLoading();
  }

  updateInfo = async (params) => {
    Taro.showLoading({
      title: '更新中...',
    });
    const res = await updateUserInfo(params);

    if (!res.code) {
      Taro.showToast({
        title: '更新成功',
        icon: 'success',
        duration: 2000
      })
      this.refreshData();
    }
    this.setState({
      showEditNickName: false
    });
    Taro.stopPullDownRefresh();
    Taro.hideLoading();
  }

  uploadFileHandler = async () => {

    const tempFilePaths = await chooseImagePromise();

    if (!tempFilePaths) {
      return;
    }

    Taro.showLoading({ title: '上传图片中' });

    const tokenRes = await createQiNiuUploadToken();

    const uploadRes = await upload(tempFilePaths[0], tokenRes);

    if (!!uploadRes && uploadRes.imageURL) {
      this.updateInfo({
        userHeadPic: uploadRes.imageURL
      });
    }
  }

  onPullDownRefresh() {
    this.refreshData();
  }

  navigateToDetail(magId) {
    Taro.navigateTo({
      url: `/pages/detail/index?magId=${magId}`
    })
  }

  navigateToMyCodeList(item) {
    const itemPrePics = item.itemPreviewPic?.split(',') ?? [];
    Taro.navigateTo({
      url: `/pages/my-code-list/index?magId=${item.magId}&pic=${encodeURIComponent(itemPrePics)}&title=${item.title}`
    })
  }

  render() {

    const { opacity, userNickName, userHeadPic, list, showEditNickName } = this.state;

    return (
      <PageWrapper opacity={opacity} hasTabbar loginSuccessCallback={() => { this.refreshData() }} needCheckLoginStatus navBarTextStyle='light' title='ETWAS' currentPage='/pages/my/index'>
        <View className='my-container'>
          <View className='my-top'>
            <View className='my-top-name'>
              <Text className='my-name'>Hi,</Text>
              <Text className='my-name'>{userNickName}</Text>
            </View>

            <View className='my-avatar-container'>
              <View className='my-avatar' onClick={() => this.uploadFileHandler()}>
                <Image className='user-avatar' src={userHeadPic} />
              </View>
              <View className='edit-my-name'>
                <Text className='edit-my-name-text' onClick={() => this.showEditModal()}>编辑个人资料</Text>
                <Image className='edit-icon' src={editIcon} />
              </View>
            </View>
          </View>

          <View className='index-hot-list'>
            <Text className='index-hot-title'>订阅记录</Text>

            {
              list.length > 0 ? list.map(item => (
                <View className='index-hot-row' key={item.toString()}>
                  {
                    item.map(innerItem => (
                      <View onClick={() => this.navigateToMyCodeList(innerItem)} className='index-hot-item' key={innerItem.magId}>
                        <View className='index-hot-item-image' style={{
                          backgroundImage: `url(${innerItem?.itemCover ?? ''})`,
                          backgroundPosition: 'top',
                          backgroundSize: 'cover'
                        }}
                        >
                        </View>
                        <Text className='index-hot-item-name'>{innerItem?.title ?? ''}</Text>
                        <Text className='index-hot-item-des'>{innerItem?.userReadCodeCount ?? 0} 本订阅</Text>
                        <Button className='index-hot-item-button'>查看阅读码</Button>
                      </View>
                    ))
                  }
                </View>
              )) : <View className='no-sub'>
                  <View className='no-sub-linear'></View>
                  <View className='no-sub-text'>暂无订购记录</View>
                  <View className='no-sub-linear'></View>
                </View>
            }
          </View>

          <View className='services'>
            <Button className='services-button' open-type='contact'>
              <Image className='services-button-image' src={serviceImage} />
            </Button>
          </View>

          {showEditNickName ? <View className='edit-nick-name-modal' onClick={() => this.hideEditModal()}>
            <View className='login-modal' onClick={e => e.stopPropagation()}>
              <Image className='logo' src={logo} />
              <Text className='login-tips'>修改昵称</Text>
              <Input className='read-code-input' maxlength={15} onInput={e => this.changeHandler(e)} placeholder='请输入你的昵称' />
              <Button open-type='getUserInfo' className='login-button' onClick={() => this.updateInfo({
                userNickName: this.state.editUserNickName
              })}
              >确认修改</Button>
              <Button className='login-cancel-button' onClick={() => this.hideEditModal()}>取消</Button>
            </View>
          </View> : null}

        </View>
      </PageWrapper>
    )
  }
}
