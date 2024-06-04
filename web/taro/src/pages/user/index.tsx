import {Text, View} from '@tarojs/components';
import {Col, ConfigProvider, Grid, Row} from '@nutui/nutui-react-taro';
import './index.less';
import {ArrowRight, IconFont} from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";

definePageConfig({
  navigationBarTitleText: '用户页'
})

function Index() {

  return (
    <ConfigProvider theme={{nutuiGridBorderColor: '#fff'}} style={{position: "relative"}}>
      <View className="user-page">
        <View className={'user-background'}></View>
        <Row gutter={'10'} className={'user'} onClick={() => Taro.navigateTo({ url: '/pages/user/login' })}>
          <Col span={5}>
            <IconFont fontClassName="iconfont" classPrefix='icon' size={60} name="weidenglu-touxiang"/>
          </Col>
          <Col span={19}>点击登录</Col>
        </Row>
        <View className={"order"}>
          <View className={'title'}>
            <View className={'right-text'}><Text style={{marginRight: 5}}>全部业务</Text><ArrowRight size={'12px'}/></View>
            <View className={'title-text'}>我的业务</View>
          </View>
          <Grid columns={5}>
            <Grid.Item text="待确认"><IconFont color={'#f40'} fontClassName="iconfont" classPrefix='icon' size={26} name="31daifahuo"/></Grid.Item>
            <Grid.Item text="待付款"><IconFont color={'#f40'} fontClassName="iconfont" classPrefix='icon' size={26} name="31daifukuan"/></Grid.Item>
            <Grid.Item text="进行中"><IconFont color={'#f40'} fontClassName="iconfont" classPrefix='icon' size={26} name="31daishouhuo"/></Grid.Item>
            <Grid.Item text="已结单"><IconFont color={'#f40'} fontClassName="iconfont" classPrefix='icon' size={26} name="tuikuantuihuo"/></Grid.Item>
            <Grid.Item text="评论"><IconFont color={'#f40'} fontClassName="iconfont" classPrefix='icon' size={26} name="31pinglun"/></Grid.Item>
          </Grid>
        </View>

        <View className={"order"}>
          <View className={'title'}>
            <View className={'title-text'}>我的服务</View>
          </View>
          <Grid columns={4}>
            <Grid.Item text="收银台"><IconFont color={'#fa2b18'} fontClassName="iconfont" classPrefix='icon' size={26} name="shouyintai"/></Grid.Item>
            <Grid.Item text="采购管理"><IconFont color={'#817ff8'} fontClassName="iconfont" classPrefix='icon' size={26} name="caigou-caigou"/></Grid.Item>
            <Grid.Item text="采购记录"><IconFont color={'#fbc737'} fontClassName="iconfont" classPrefix='icon' size={26} name="caigouguanli-caigouzhihang"/></Grid.Item>
            <Grid.Item text="产品管理"><IconFont color={'#fa8435'} fontClassName="iconfont" classPrefix='icon' size={26} name="chanpin"/></Grid.Item>
            <Grid.Item text="订单管理"><IconFont color={'#ff623e'} fontClassName="iconfont" classPrefix='icon' size={26} name="dingdan"/></Grid.Item>
            <Grid.Item text="支付记录"><IconFont color={'#f96a97'} fontClassName="iconfont" classPrefix='icon' size={26} name="zhifu"/></Grid.Item>
            <Grid.Item text="我的收藏"><IconFont color={'#ff623e'} fontClassName="iconfont" classPrefix='icon' size={26} name="shoucang"/></Grid.Item>
            <Grid.Item text="地址管理"><IconFont color={'#ff623e'} fontClassName="iconfont" classPrefix='icon' size={26} name="dizhi"/></Grid.Item>
            <Grid.Item text="发票管理"><IconFont color={'#ff623e'} fontClassName="iconfont" classPrefix='icon' size={26} name="fapiao"/></Grid.Item>
            <Grid.Item text="设置"><IconFont color={'#ff934a'} fontClassName="iconfont" classPrefix='icon' size={26} name="shezhi"/></Grid.Item>
            <Grid.Item text="帮助中心"><IconFont color={'#ff2b2b'} fontClassName="iconfont" classPrefix='icon' size={26} name="bangzhu"/></Grid.Item>
          </Grid>
        </View>
      </View>
    </ConfigProvider>
  )
}

export default Index
