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
        <Tabs.TabPane title="XinAdmin">XinAdmin</Tabs.TabPane>
        <Tabs.TabPane title="Github">Github</Tabs.TabPane>
        <Tabs.TabPane title="要闻">要闻</Tabs.TabPane>
        <Tabs.TabPane title="真的好好用">真的好好用</Tabs.TabPane>
      </Tabs>

    </View>
  )
}

export default Index
