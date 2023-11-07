import {Cell, Grid, NoticeBar, Swiper, Image, Avatar, Space} from "@nutui/nutui-react-taro";
import {Dongdong, Fabulous} from "@nutui/icons-react-taro";
import {View} from "@tarojs/components";

const list = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
]

const text = 'NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。'


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
    img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2023%2F1107%2Fb29fd4bep00s3qyce0017c0009c0070c.png&thumbnail=330x2147483647&quality=75&type=webp',
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
    title: '伟伟道来 | 美国媒体释疑伤亡数字 加沙地带人道危机在加剧',
    userInfo: {
      username: '小刘同学',
      avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
    },
    img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2023%2F1107%2Fe18b57f7p00s3qrn20024c0009c0070c.png&thumbnail=330x2147483647&quality=75&type=webp',
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
              <img src={item} style={{}} alt="" />
            </Swiper.Item>
          )
        })}
      </Swiper>

      <NoticeBar content={text} />

      <Grid>
        <Grid.Item text="模块市场"><Dongdong /></Grid.Item>
        <Grid.Item text="演示站"><Dongdong /></Grid.Item>
        <Grid.Item text="GitHub"><Dongdong /></Grid.Item>
        <Grid.Item text="Gitee"><Dongdong /></Grid.Item>
        <Grid.Item text="开发文档"><Dongdong /></Grid.Item>
        <Grid.Item text="我的消息"><Dongdong /></Grid.Item>
        <Grid.Item text="消费记录"><Dongdong /></Grid.Item>
        <Grid.Item text="个人中心"><Dongdong /></Grid.Item>
      </Grid>

      {data.map((item) => {
        return (
          <Cell>
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
