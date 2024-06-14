import {Image, Swiper} from "@antmjs/vantui";
import {SwiperItem, View} from "@tarojs/components";
import toast from "../../../utils/toast";
import navList from './navList'

const list = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
]

const Home = () => {
  return (
    <View>
      <Swiper
        height={140}
        paginationColor='#426543'
        autoPlay='0'
        initPage={0}
        paginationVisible
      >
        {list.map((item) => {
          return (
            <SwiperItem key={item}>
              <View style={{width: '100vw', height: '140px', padding: '10px',background: '#fff',marginBottom: '10px'}}>
                <Image
                  fit='cover'
                  src={item}
                  width='100%'
                  height='120px'
                  style={{borderRadius: '10px', overflow: "hidden"}}
                />
              </View>
            </SwiperItem>
          )
        })}
      </Swiper>
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
              marginBottom: '10px',
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
    </View>
  )
}

export default Home
