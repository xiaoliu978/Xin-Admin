export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/message/index',
    'pages/user/index'
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '',
        iconPath: './images/tabbar/home.png',
        selectedIconPath: './images/tabbar/home_selected.png',
      },
      {
        pagePath: 'pages/message/index',
        text: '',
        iconPath: './images/tabbar/to_do_list.png',
        selectedIconPath: './images/tabbar/to_do_list_selected.png',
      },
      {
        pagePath: 'pages/user/index',
        text: '',
        iconPath: './images/tabbar/personal.png',
        selectedIconPath: './images/tabbar/personal_selected.png',
      },
    ],
    color: '#000',
    selectedColor: '#fa2c19',
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
