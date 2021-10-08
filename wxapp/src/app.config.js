export default {
  pages: [
    /// 首页
    'pages/index/index',
    /// 订阅列表页面
    'pages/sub-list/index',
    /// 我的页面
    'pages/my/index',
    /// 阅读详情页面
    'pages/detail/index',
    /// 我的阅读码列表页面
    'pages/my-code-list/index',
    /// webbiew
    'pages/web-view/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: '_/assets/images/home-selected-icon.png',
        selectedIconPath: '_/assets/images/home-selected-icon.png',
        text: '首页'
      },
      {
        pagePath: 'pages/my/index',
        iconPath: '_/assets/images/my-selected-icon.png',
        selectedIconPath: '_/assets/images/my-selected-icon.png',
        text: '我的'
      },
    ]
  }
}
