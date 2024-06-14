import { View } from '@tarojs/components'
import {useEffect, useState} from "react";
import {Search, Tab, Tabs} from "@antmjs/vantui"
import './index.less'
import Home from "./components/Home";
import { index } from '../../api';

export default function Index() {

  const [tab4value, setTab4value] = useState<any>('0');

  useEffect(() => {
    index().then((res) => {
      console.log(res)
    })
  },[])

  return (
    <View className='home'>
      <Search placeholder='请输入搜索关键词' />
      <Tabs sticky active={tab4value} onChange={(e) => {
        setTab4value(e.detail.name)
      }}
      >
        <Tab title='首页' name='0'><Home></Home></Tab>
        <Tab title='Xin' name='1'>XinAdmin</Tab>
        <Tab title='小刘同学' name='2'>小刘同学</Tab>
        <Tab title='要闻' name='3'>要闻</Tab>
        <Tab title='Gitee' name='4'>Gitee</Tab>
        <Tab title='Antd' name='5'>Antd</Tab>
      </Tabs>
    </View>
  )
}

// export default class Index extends Component {

//   componentWillMount () { }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   render () {
//     return (
//       <View className='index'>
//         <View><Button type='primary'>Hello world!</Button></View>
//         <View>上面的按钮的颜色已经通过全局主题重写覆盖了，参见src/style/index.less</View>
//       </View>
//     )
//   }
// }
