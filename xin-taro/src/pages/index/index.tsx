import { View } from '@tarojs/components'
import { SearchBar, Tabs } from "@nutui/nutui-react-taro"
import './index.less'
import {useEffect, useState} from "react";
import Home from "./components/Home";
import { index } from '../../api';



function Index() {
  const [tab4value, setTab4value] = useState<string| number>('0');

  useEffect(() => {
    index().then((res) => {
      console.log(res)
    })
  },[])

  return (
    <View className={'home'}>
      <SearchBar placeholder="上京东，购好物" />
      <Tabs value={tab4value} onChange={(value) => {
        setTab4value(value)
      }}>
        <Tabs.TabPane title="首页">
          <Home></Home>
        </Tabs.TabPane>
        <Tabs.TabPane title="上新日">上新日</Tabs.TabPane>
        <Tabs.TabPane title="百亿补贴">百亿补贴</Tabs.TabPane>
        <Tabs.TabPane title="今日聚超值">今日聚超值</Tabs.TabPane>
        <Tabs.TabPane title="真好真便宜">真好真便宜</Tabs.TabPane>
      </Tabs>

    </View>
  )
}

export default Index
