import { View, Text } from '@tarojs/components';
import {Row, Col, Grid, ConfigProvider, Cell} from '@nutui/nutui-react-taro';
import './index.less';
import {ArrowRight, Right} from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import { IconFont } from '@nutui/icons-react-taro'

definePageConfig({
    navigationBarTitleText: '用户页'
})

function Index() {
  const onJumpclick = (link: string) => {
    const replace = false
    if (link) {
      replace ? Taro.redirectTo({ url: link }) : Taro.navigateTo({ url: link })
    }
  }



  return (
    <ConfigProvider theme={{
      nutuiGridBorderColor: '#fff',
    }} style={{position:"relative"}}>
      <View className={'user-background'}></View>
      <View className="user-page">
        <Row gutter={'10'} className={'user'} onClick={() => onJumpclick('/pages/user/login')}>
          <Col span={5}>
            <IconFont fontClassName="iconfont" classPrefix='icon' size={60} name="weidenglu-touxiang"/>
            {/*<Image*/}
            {/*  src={'https://newnmsd.sanheshangcheng.cn/uploads/10001/20231114/49190ef7910ea135026daaa41226be03.png'}*/}
            {/*  width="60"*/}
            {/*  height="60"*/}
            {/*  radius="50%"*/}
            {/*/>*/}
          </Col>
          <Col span={19}>
            请登录
          </Col>
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

        <Cell.Group>
          <Cell
            className='nutui-cell--clickable'
            title='链接'
            align='center'
            extra={<Right />}
          />
          <Cell
            className='nutui-cell--clickable'
            title='URL 跳转'
            extra={
              <>
                <span style={{ marginRight: '5px' }}>/pages/index/index</span>
                <Right />
              </>
            }
            align='center'
            onClick={() => onJumpclick('/pages/index/index')}
          />
        </Cell.Group>



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
