import { View } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"

definePageConfig({
    navigationBarTitleText: '用户页'
})

function Index() {
  return (
    <View className="nutui-react-demo">
      <View className="index">
        <Button type="primary" className="btn">
          NutUI React Button
        </Button>
      </View>
    </View>
  )
}

export default Index
