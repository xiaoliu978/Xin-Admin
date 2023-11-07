import {Grid, NoticeBar, Swiper} from "@nutui/nutui-react-taro";
import {Dongdong} from "@nutui/icons-react-taro";
import {View} from "@tarojs/components";

const list = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
]

const text = 'NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。'

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
    </View>
  )
}

export default Home
