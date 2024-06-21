import { View, Image as TaroImage} from '@tarojs/components'
import {Col, Row, Sidebar, SidebarItem} from "@antmjs/vantui"
import './index.less';

definePageConfig({
  navigationBarTitleText: '分类'
})

const goodsList = [
  {
    key: '1',
    image: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/2217205998496/O1CN01V3sW9Y2CdDw7a7gcn_!!0-item_pic.jpg_.webp',
    title: '夏季温柔女装'
  },
  {
    key: '2',
    image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2206584084866/O1CN019qX3ZC1logCjLPFQk_!!2206584084866.jpg_.webp',
    title: '学院风时尚女装'
  },
  {
    key: '3',
    image: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2206379415043/O1CN01EyuF8A1n7kAsNRteG_!!0-item_pic.jpg_.webp',
    title: '高级别质感JK'
  },
  {
    key: '4',
    image: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2455352241/O1CN01gdcgHF1SQQY09VzQd_!!0-item_pic.jpg_.webp',
    title: 'polo领学院风'
  }
]

const goodsList2 = [
  {
    key: '1',
    image: 'https://img.alicdn.com/bao/uploaded/i4/353571709/O1CN012fDmHc1OUllhqJtI2_!!353571709.jpg_180x180.jpg',
    title: '两千公里'
  },
  {
    key: '2',
    image: 'https://img.alicdn.com/bao/uploaded/https://picasso.alicdn.com/imgextra/O1CNA1wCKj2x1OUlqHxEYK0_!!353571709-0-psf.jpg_180x180.jpg',
    title: '氢风6'
  },
  {
    key: '3',
    image: 'https://img.alicdn.com/bao/uploaded/i4/353571709/O1CN01EXjXhF1OUlqJUW8LN-353571709.jpg_180x180.jpg',
    title: '轻翼2'
  },
  {
    key: '4',
    image: 'https://img.alicdn.com/bao/uploaded/https://gw.alicdn.com/imgextra/O1CN01bHQyYQ1OUlqHbpm9J_!!353571709-0-picasso.jpg_180x180.jpg',
    title: '特步260X'
  },
  {
    key: '5',
    image: 'https://img.alicdn.com/bao/uploaded/i4/353571709/O1CN01id0rKE1OUlqHPbHzU-353571709.jpg_180x180.jpg',
    title: '特步男鞋'
  },
  {
    key: '6',
    image: 'https://img.alicdn.com/bao/uploaded/i4/353571709/O1CN01YcRFaj1OUlqLPYyS7-353571709.jpg_180x180.jpg',
    title: '王鹤同款'
  },
  {
    key: '7',
    image: 'https://img.alicdn.com/bao/uploaded/i4/353571709/O1CN01YcRFaj1OUlqLPYyS7-353571709.jpg_180x180.jpg',
    title: '山海一念'
  },
  {
    key: '8',
    image: 'https://img.alicdn.com/bao/uploaded/i3/353571709/O1CN01uZxDNr1OUlqIKp9Yy-353571709.jpg_180x180.jpg',
    title: '行云'
  },
  {
    key: '9',
    image: 'https://img.alicdn.com/bao/uploaded/i4/353571709/O1CN01rXZpkx1OUlqHFzg9j-353571709.jpg_180x180.jpg',
    title: '260 2.0'
  },
]

function Index() {
  return (
    <View className='class-page' style={{display: 'flex', width: '100vw'}}>
      <View style={{height: '100vh',overflow: 'auto'}}>
        <Sidebar activeKey={0}>
          <SidebarItem title="女装" />
          <SidebarItem title="男装" />
          <SidebarItem title="运动" />
          <SidebarItem title="男鞋" />
          <SidebarItem title="内衣" />
          <SidebarItem title="进口" />
          <SidebarItem title="百货" />
          <SidebarItem title="手机" />
          <SidebarItem title="洗护" />
          <SidebarItem title="电器" />
        </Sidebar>
      </View>
      <View className='content'>
        <View className='title'>热搜活动</View>
        <View className={'advertising'}>
          <TaroImage
            src={'https://gdp.alicdn.com/imgextra/i1/353571709/O1CN01l0nhcn1OUlqHfMJA8_!!353571709.jpg'}
            mode='heightFix'
            style={{width: 'auto',height: '160px'}}
          />
        </View>
        <View className={'title'}>精品推荐</View>
        <Row gutter={20} className={'card'}>
          {goodsList.map((item) => {
            return (
              <Col span={12} key={item.key}>
                <View className={'goods-card'}>
                  <View className={'goods-img'}>
                    <TaroImage
                      src={item.image}
                      className='img'
                      style={{width: '100%',height: 'auto'}}
                      mode='widthFix'
                    />
                  </View>
                  <View className={'goods-name'}>{item.title}</View>
                </View>
              </Col>
            )
          })}
        </Row>
        <View className={'advertising'}>
          <TaroImage
            src={'https://gdp.alicdn.com/imgextra/i4/353571709/O1CN01gcDSF51OUlkbFpEVC_!!353571709.jpg'}
            mode='heightFix'
            style={{width: 'auto',height: '120px'}}
          />
        </View>
        <View className={'title'}>新品推荐</View>
        <Row gutter={16} className={'card'}>
          {goodsList2.map((item) => {
            return (
              <Col span={8} key={item.key}>
                <View className={'goods-card'}>
                  <View className={'goods-img'} style={{height: '80px'}}>
                    <TaroImage
                      src={item.image}
                      className='img'
                      style={{width: '100%',height: 'auto'}}
                      mode='widthFix'
                    />
                  </View>
                  <View className={'goods-name'}>{item.title}</View>
                </View>
              </Col>
            )
          })}
        </Row>
      </View>
    </View>
  )
}

export default Index
