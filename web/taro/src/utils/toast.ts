import Taro from "@tarojs/taro";

const toast = (type: 'none' | 'success' | 'error' | 'loading',msg: string | undefined) => {
  Taro.showToast({
    title: msg?msg: '',
    icon: type,
    duration: 2000
  })
}

export default toast
