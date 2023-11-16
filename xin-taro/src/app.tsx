import { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式
import './app.less'
import './assets/font/iconfont.css';
import { View } from '@tarojs/components'

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return (
    <View>
      { props.children }
    </View>
  )
}

export default App
