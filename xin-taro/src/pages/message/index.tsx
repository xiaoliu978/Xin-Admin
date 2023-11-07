import { View } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"

definePageConfig({
    navigationBarTitleText: '消息页面'
})

function Index() {
  return (
    <View className="nutui-react-demo">
      <View className="index">
        <Button type="primary" className="btn">
          NutUI React
        </Button>
      </View>
    </View>
  )
}

export default Index
