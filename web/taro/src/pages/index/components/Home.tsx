import {Icon, Image, ShareSheet, Swiper, SwiperItem, Tag, Toast, WaterfallFlow} from "@antmjs/vantui";
import {useState} from "react";
import {View,Text, Image as TaroImage} from "@tarojs/components";
import toast from "../../../utils/toast";
import navList from './navList'
import nikeImg from './images/nike.png';
import nikeN3Img from './images/nike-n3.png';
import * as COMMON from './common'

const swiperList = [
  'https://file.xinadmin.cn/taro/swiper/1.png',
  'https://file.xinadmin.cn/taro/swiper/2.png',
  'https://file.xinadmin.cn/taro/swiper/3.png',
  'https://file.xinadmin.cn/taro/swiper/4.png',
]

const options = [
  [
    {
      name: '微信',
      icon: 'wechat',
    },
    {
      name: '微博',
      icon: 'weibo',
    },
    {
      name: 'QQ',
      icon: 'qq',
    },
  ],
  [
    {
      name: '复制链接',
      icon: 'link',
    },
    {
      name: '分享海报',
      icon: 'poster',
    },
    {
      name: '二维码',
      icon: 'qrcode',
    },
  ],
]

const Home = () => {
  const [show, setShow] = useState(false)
  const { mockGoods } = COMMON
  const [list] = useState(mockGoods())

  const renderItem = (item, forceResize) => {
    return (
      <View style={{padding: '0 5px'}}>
        <View style={{background: '#F4F8FB',borderRadius: '10px', overflow: 'hidden'}}>
          <TaroImage
            src={item.image}
            className='img'
            onLoad={forceResize} // 当图片加载完成时触发forceResize
            style={{width: '100%',height: 'auto'}}
            mode='widthFix'
          />
          <View style={{padding: '0 10px 10px'}}>
            <View style={{fontSize: '12px'}}>{item.title}</View>
            {item.isCutPrice && <Tag color='#fff0f6' textColor='#ff2078' style={{fontSize: '10px'}}>最近大降价</Tag>}
            <View style={{display: "flex", justifyContent: 'space-between',alignItems: 'center'}}>
              <Text style={{fontSize: '14px', color: '#ff4142',padding: '5px', textAlign: 'left'}}>{item.price}</Text>
              <Icon name='like' size='14px' style={{color: "#888888"}} onClick={() => setShow(true)} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View>
      <View style={{background: '#fff'}}>
        <Swiper
          height='160px'
          paginationColor='#426543'
          autoPlay='3000'
          initPage={0}
          paginationVisible
        >
          {swiperList.map((item) => {
            return (
              <SwiperItem key={item} style={{padding: '15px'}}>
                <View style={{width: '100%',height: '140px', borderRadius: '10px', overflow: 'hidden'}}>
                  <TaroImage
                    src={item}
                    className='img'
                    style={{width: '100%',height: 'auto'}}
                    mode='widthFix'
                  />
                </View>
              </SwiperItem>
            )
          })}
        </Swiper>
      </View>
      <View style={{padding: '10px',background: '#fff',display:"flex",flexWrap: 'wrap'}}>
        {navList.map((item) => (
          <View
            onClick={() => {toast('none',`您点击了：${item.title}`)}}
            key={item.id}
            style={{
              textAlign: 'center',
              background: '#fff',
              borderRadius: '10px',
              padding: '10px',
              width: '20%',
              fontSize: 10
            }}
          >
            <View style={{marginBottom: '5px'}}>
              <Image src={item.src} width={46} height={46} />
            </View>
            <View>{item.title}</View>
          </View>
        ))}
      </View>
      <View style={{padding: '0 10px 10px', background: '#fff',color: '#000',display: 'flex'}} >
        <View style={{flex: '0 0 50%',padding: 10}}>
          <View style={{background: '#F4F8FB',borderRadius: '10px',width: '100%',padding: 10}}  onClick={() => setShow(true)}>
            <View style={{display: 'flex',justifyContent: "space-between",alignItems: 'center',marginBottom: 10}}>
              <View>精品好物</View>
              <View><Icon name='like' size='14px' style={{color: "#888888"}} /></View>
            </View>
            <View style={{display: "flex",justifyContent: 'center',marginBottom: 10}}>
              <Image width='100px' height='100px' src={nikeImg} />
            </View>
            <View>Nike Shoes</View>
            <View>$120 <Text style={{color:"#888888",fontSize: '12px',textDecoration: 'line-through'}}>$160</Text></View>
          </View>
        </View>
        <View style={{flex: 'auto',padding: 10}}>
          <View style={{background: '#F4F8FB',borderRadius: '10px',width: '100%',padding: 10}}  onClick={() => setShow(true)}>
            <View style={{display: 'flex',justifyContent: "space-between",alignItems: 'center',marginBottom: 10}} >
              <View>热门推荐</View>
              <View><Icon name='like' size='14px' style={{color: "#888888"}} /></View>
            </View>
            <View style={{display: "flex",justifyContent: 'center',marginBottom: 10}}>
              <Image width='100px' height='100px' src={nikeN3Img} />
            </View>
            <View>Nike Shoes</View>
            <View>$140 <Text style={{color:"#888888",fontSize: '12px',textDecoration: 'line-through'}}>$180</Text></View>
          </View>
        </View>
      </View>
      <View style={{background: '#fff',padding: '0 15px 20px'}}>
        <WaterfallFlow
          dataSource={list}
          columnNum={2}
          gutter={8}
          renderItem={renderItem}
          calculationDelay={1000}
        />
      </View>


      <ShareSheet
        show={show}
        title='立即分享给好友'
        options={options}
        onSelect={(e) => Toast.show(e.detail.name)}
        onClose={() => setShow(false)}
      />
      <Toast />
    </View>
  )
}

export default Home
