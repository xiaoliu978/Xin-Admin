import {Toast} from "@nutui/nutui-react-taro";

const toast = (type: 'text' | 'success' | 'fail' | 'warn' | 'loading',msg: string | undefined) => {
  Toast.show('xin-toast', {
    title: msg,
    type: type,
    duration: 3,
    position: 'center',
    size: 'large',
    lockScroll: true,
  })
}

export default toast
