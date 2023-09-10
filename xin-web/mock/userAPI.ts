import Mock from 'mockjs';


const mockDefault = {
  varchar: Mock.mock('@name'),
  int: Mock.mock('@integer(60, 100)'),
  id: Mock.mock('@integer(60, 100)'),
  data: Mock.mock('@data'),
  datatime: Mock.mock('@datatime'),
  float: Mock.mock('@float(1, 100, 2, 2)'),
  decimal: Mock.mock('@float(1, 100, 2, 2)'),
  double: Mock.mock('@float(1, 100, 2, 2)'),
  boolean: Mock.mock('@boolean')
}


export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: {},
      errorCode: 0,
    });
  },
  'GET /admin.php/online.test/list': (req: any, res: any) => {
    // console.log(req.params.data)
    let data = JSON.parse(req.param('data'))

    let mockData = {}
    Object.keys(data).forEach((item: string)=> {
      Object.assign(mockData,{
        [item]: mockDefault[data[item]]
      })
    })

    res.json({
      msg: "ok",
      showType: 0,
      status: 200,
      success: true,
      data: Mock.mock({
        "data|10": [mockData],
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 10,
      })
    });
  },
};
