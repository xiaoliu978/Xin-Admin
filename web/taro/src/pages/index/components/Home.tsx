import {Cell, Grid, NoticeBar, Swiper, Image, Avatar, Space} from "@nutui/nutui-react-taro";
import {Fabulous} from "@nutui/icons-react-taro";
import {View} from "@tarojs/components";

const list = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
]

const text = 'Xin Admin 移动端项目上新，与 Web 端完全统一的 Api 接口，让开发成为乐趣~'


interface DataItem {
  id: number
  title: string
  userInfo: {
    username: string
    avatar: string
  },
  content: string
  like: number
  star: number
  img?: string
  tip?: string[]
}

const data:DataItem[] = [
  {
    id: 1,
    title: '零基础开始学 Web 前端开发，有什么建议吗？',
    userInfo: {
      username: '小刘同学',
      avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
    },
    img: 'https://nimg.ws.126.net/?url=https%3A%2F%2Fcms-bucket.ws.126.net%2F2024%2F0425%2F67d815b0p00schvw600c8c0005k002ic.png&thumbnail=200y90&quality=100&type=jpg',
    content: '时间过得是真快，不知不觉已经在这个行业摸爬滚打近十年了。看到有很多人被网上的一些言论误导，基础不扎实的情况下就直接上手框架，最终只能成为框架使用者、代码搬运工，得不到好的发展，于是趁着周末写下这篇回答，给各位初学者提供一些学习建议。',
    like: 0,
    star: 5
  },
  {
    id: 2,
    title: '零基础开始学 Web 前端开发，有什么建议吗？',
    userInfo: {
      username: '可爱物理超级大坏蛋',
      avatar: 'https://pic1.zhimg.com/v2-ccb1e26d316ff8a7d1f5b58da724e412_xs.jpg?source=32738c0c'

    },
    content: '时间过得是真快，不知不觉已经在这个行业摸爬滚打近十年了。看到有很多人被网上的一些言论误导，基础不扎实的情况下就直接上手框架，最终只能成为框架使用者、代码搬运工，得不到好的发展，于是趁着周末写下这篇回答，给各位初学者提供一些学习建议。',
    like: 0,
    star: 5
  },
  {
    id: 3,
    title: '伟伟道来 | 美国媒体释疑伤亡数字 加沙地带人道危机在加剧伟伟道来 | 美国媒体释疑伤亡数字 加沙地带人道危机在加剧伟伟道来 | 美国媒体释疑伤亡数字 加沙地带人道危机在加剧',
    userInfo: {
      username: '小刘同学',
      avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
    },
    img: 'https://nimg.ws.126.net/?url=https%3A%2F%2Fcms-bucket.ws.126.net%2F2024%2F0425%2F67d815b0p00schvw600c8c0005k002ic.png&thumbnail=200y90&quality=100&type=jpg',
    content: '根据巴勒斯坦加沙地带卫生部门11月6日发布的最新数据，自10月7日冲突爆发以来，加沙地带，已有10022人死亡，其中包括4104名儿童和2641名妇女，此外还有25408人受伤。约旦河西岸有155人死亡，2250人受伤。',
    like: 0,
    star: 5
  },
  {
    id: 4,
    title: '零基础开始学 Web 前端开发，有什么建议吗？',
    userInfo: {
      username: '小刘同学',
      avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
    },
    content: '时间过得是真快，不知不觉已经在这个行业摸爬滚打近十年了。看到有很多人被网上的一些言论误导，基础不扎实的情况下就直接上手框架，最终只能成为框架使用者、代码搬运工，得不到好的发展，于是趁着周末写下这篇回答，给各位初学者提供一些学习建议。',
    like: 0,
    star: 5
  },
]

const navList = [
  {
    id: 1,
    src: 'https://file.xinadmin.cn/nav/%E6%9B%B4%E5%A4%9A%E6%A8%A1%E5%9D%97.png',
    title: '模块市场'
  },
  {
    id: 2,
    src: 'https://file.xinadmin.cn/nav/%E5%91%98%E5%B7%A5%E7%AE%A1%E7%90%86.png',
    title: '员工管理'
  },
  {
    id: 3,
    src: 'https://file.xinadmin.cn/nav/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86.png',
    title: '后台管理'
  },
  {
    id: 4,
    src: 'https://file.xinadmin.cn/nav/%E5%94%AE%E5%90%8E%E6%9C%8D%E5%8A%A1.png',
    title: '售后服务'
  },
  {
    id: 5,
    src: 'https://file.xinadmin.cn/nav/%E6%8B%9B%E5%95%86%E9%94%80%E5%94%AE.png',
    title: '招商销售'
  },
  {
    id: 6,
    src: 'https://file.xinadmin.cn/nav/%E8%AE%A2%E5%8D%95%E7%AE%A1%E7%90%86.png',
    title: '订单管理'
  },
  {
    id: 7,
    src: 'https://file.xinadmin.cn/nav/%E8%BF%9B%E9%A1%B9%E7%B3%BB%E7%BB%9F.png',
    title: '进项系统'
  },
  {
    id: 8,
    src: 'https://file.xinadmin.cn/nav/%E9%94%80%E9%A1%B9%E7%B3%BB%E7%BB%9F.png',
    title: '销项系统'
  }
]

const Home = () => {
  return (
    <View>
      <Swiper
        className={'swiper'}
        defaultValue={0}
        autoPlay
        height={180}
      >
        {list.map((item) => {
          return (
            <Swiper.Item key={item}>
              <Image src={item} width="100%" />
            </Swiper.Item>
          )
        })}
      </Swiper>

      <NoticeBar content={text} />

      <Grid>
        {navList.map((item) => (
          <Grid.Item text={item.title}>
            <Image
              src={item.src}
              mode="scaleToFill"
              width="36"
              height="36"
              radius="10px"
            />
          </Grid.Item>
        ))}
      </Grid>

      {data.map((item) => {
        return (
          <Cell radius={0}>
            <View>
              <View className={'card-title'}>{item.title}</View>
              {item.userInfo ?
                <View className={'user-info'}>
                  <Avatar size="18" src={item.userInfo.avatar} style={{marginRight: 10}}/>
                  {item.userInfo.username}
                </View>: null
              }
              <View className={'card-content'}>
                <View className={'content'}>
                  <View className={'content-text'}>{item.content}</View>
                  <Space className={'content-like'}>
                    <Fabulous color={'#757575'} size={12} />
                    <View>{item.like}</View>
                    <View>•</View>
                    <Fabulous color={'#757575'} size={12} />
                    <View>{item.star}</View>
                  </Space>
                </View>
                {item.img? <View className={'img'}>
                  <Image
                    src={item.img}
                    mode="scaleToFill"
                    width="80"
                    height="80"
                    radius="10px"
                  />
                </View>: null}
              </View>
            </View>
          </Cell>
        )
      })}

    </View>
  )
}

export default Home
