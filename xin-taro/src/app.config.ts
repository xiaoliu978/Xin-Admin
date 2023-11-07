export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/user/index',
    'pages/message/index',
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './images/tabbar/home.png',
        selectedIconPath: './images/tabbar/home_selected.png',
      },
      {
        pagePath: 'pages/message/index',
        text: '消息',
        iconPath: './images/tabbar/message.png',
        selectedIconPath: './images/tabbar/message_selected.png',
      },
      {
        pagePath: 'pages/user/index',
        text: '个人',
        iconPath: './images/tabbar/personal.png',
        selectedIconPath: './images/tabbar/personal_selected.png',
      },
    ],
    color: '#000',
    selectedColor: '#1296db',
    backgroundColor: '#fff',
    borderStyle: 'white',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'V2EX',
    navigationBarTextStyle: 'black',
  },
})
