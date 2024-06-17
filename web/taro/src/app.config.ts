export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/class/index',
    'pages/user/index',
    'pages/like/index'
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './images/tabbar/home.png',
        selectedIconPath: './images/tabbar/home-selected.png',
      },
      {
        pagePath: 'pages/class/index',
        text: '分类',
        iconPath: './images/tabbar/class.png',
        selectedIconPath: './images/tabbar/class-selected.png',
      },
      {
        pagePath: 'pages/like/index',
        text: '喜欢',
        iconPath: './images/tabbar/like.png',
        selectedIconPath: './images/tabbar/like-selected.png',
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: './images/tabbar/me.png',
        selectedIconPath: './images/tabbar/me-selected.png',
      },
    ],
    color: '#515151',
    selectedColor: '#f40',
    backgroundColor: '#fff',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  animation: false,
}
)
