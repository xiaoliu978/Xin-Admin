export const mockGoods = () => {
  const initData = [
    {
      image: 'https://gw.alicdn.com/imgextra/O1CN011TJL0Z2LY1zSYFUDZ_!!3937219703-0-C2M.jpg_.webp',
      title: '白色新款百褶裙女夏季小个子高腰a字显瘦遮胯美式半身西装jk短裙',
      price: '¥39.80',
    },
    {
      image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2517626912/O1CN01PTf6U720vkZA2kIE5_!!2517626912.jpg_.webp',
      title: '拉夏贝尔黑色方领正肩短袖t恤女夏季2024新款设计感宽松显瘦上衣',
      price: '¥52.00',
    },
    {
      image: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2036787744/O1CN01ltba73274nxOFCMSu_!!2036787744.jpg_.webp',
      title: 'jk制服收腰衬衫上衣女短袖原创夏季学院风泡泡袖绑带衬衣jk套装女',
      price: '￥56.00',
    },
    {
      image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i1/884356407/O1CN01FIbtgM1xCSYIpKlyE_!!884356407.jpg_.webp',
      title: '拉夏贝尔浅色高腰牛仔半身裙女2024年新款夏季显瘦a字百褶短裙子',
      price: '¥61.00',
    },
    {
      image: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/2211885419054/O1CN01cqNmPd2GkmwHpqNbw_!!0-item_pic.jpg_.webp',
      title: '夏季黑色连衣裙子高冷御姐风小众设计气质收腰短裙',
      price: '¥31.00',
    },
    {
      image: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2109023069/O1CN01Kz4ZDd1YXeMZIFJlJ_!!0-item_pic.jpg_.webp',
      title: '小个子穿搭一整套甜辣上衣炸街网红爆款奶系小香风套装裙子女夏季',
      price: '¥162.00',
    },
    {
      image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i4/1686722756/O1CN01W028w41WEIVMs0zjP_!!1686722756.jpg_.webp',
      title: '日系学院风jk制服短裙套装女夏季小个子条纹短袖衬衫百褶裙两件套',
      price: '¥86.00',
    },
    {
      image: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/2222221854/O1CN0163VF281PZBFMmBr2Y_!!2222221854.jpg_.webp',
      title: '制服套装裙夏季日系学院风短袖半身裙女班服',
      price: '¥36.00',
    },
    {
      image: 'https://img.alicdn.com/bao/uploaded/i1/101440255/O1CN01EsgSvW1DkpfmazktL_!!101440255.jpg',
      title: '禾子先生男士短袖T恤简约宽松印花chic韩版潮牌半袖学生百搭体恤',
      price: '￥54.00'
    },
    {
      image: 'https://img.alicdn.com/bao/uploaded/i1/101440255/O1CN01O82jCG1DkppW3kTBD_!!101440255.jpg',
      title: '禾子先生夏装男士短袖T恤字母印花时尚体恤bf风宽松少年感五分袖',
      price: '￥73.00'
    }
  ]
  return initData.map((data, index) => {
    return {
      key: index,
      ...data,
      isCutPrice: index % 2 === 0,
    }
  })
}
