import Mock from 'mockjs';
import {OnlineType} from "@/pages/Online/typings";

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: {},
      errorCode: 0,
    });
  },
  'GET /admin.php/online.onlineTable/list': (req: any, res: any) => {
    // console.log(req.params.data)
    let data = JSON.parse(req.param('data'))
    let dataIndex = {}
    data.forEach((item: OnlineType.ColumnsConfig) => {
      // @ts-ignore
      dataIndex[item.dataIndex] = item.mock
    })

    res.json({
      msg: "ok",
      showType: 0,
      status: 200,
      success: true,
      data: Mock.mock({
        "data|10": [dataIndex],
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 10,
      })
    });
  },
};
