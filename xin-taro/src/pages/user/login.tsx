import {View} from "@tarojs/components";
import { Tabs, ConfigProvider, Input, Space, Button } from '@nutui/nutui-react-taro';
import './index.less'
import {useState} from "react";
definePageConfig({
  navigationBarTitleText: '登录'
})


const page = () => {

  const [tab1value,setTab1value] = useState<'phone' | 'user'>('phone')


  return (
    <ConfigProvider className={'login'} theme={{
      nutuiTabsTitlesBackgroundColor: '#FFF',
      nutuiTabsTitlesItemActiveColor: '#409EFE',
      nutuiTabsHorizontalTitlesItemActiveLineHeight: '1px',
      nutuiTabsTitlesItemFontSize: '18px',
      nutuiTabsTitlesItemActiveFontWeight: '400',
      nutuiSpaceGap: '20px',
    }}>
      <View className={'login-b'}>
        <View className={'login-title'}>
          <View className={'title'}>您好!</View>
          <View className={'remark'}>欢迎来到收银台系统</View>
        </View>
        <View className={'login-card'}>
          <Tabs value={tab1value} onChange={(value:'phone' | 'user' ) => {
            setTab1value(value)
          }} activeColor={'#409EFE'}>
            <Tabs.TabPane value={'phone'} title="手机号登录">
              <Space direction="vertical">
                <Input type="text" placeholder="请输入手机号" className={'input user iconfont'} />
                <Input type="password" placeholder="请输入密码" className={'input suo iconfont'} />
                <Button block type="info">登录</Button>
                <View className={'login-setting'}>
                  <View>忘记密码</View>
                  <View>帮助</View>
                </View>
              </Space>
            </Tabs.TabPane>
            <Tabs.TabPane value={'user'} title="账号密码登录">
              <Space direction="vertical">
                <Input type="text" placeholder="请输入手机号" className={'input user iconfont'} />
                <Input type="password" placeholder="请输入密码" className={'input suo iconfont'} />
                <Button block type="info">登录</Button>
                <View className={'login-setting'}>
                  <View>忘记密码</View>
                  <View>帮助</View>
                </View>
              </Space>
            </Tabs.TabPane>
          </Tabs>
        </View>
      </View>
    </ConfigProvider>
  )
}

export default page;
