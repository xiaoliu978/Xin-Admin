const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 3, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 4, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 5, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 6, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 7, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 8, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'GET /admin.php/online.test/list': (req: any, res: any) => {
    res.json({
      msg: "ok",
      showType: 0,
      status: 200,
      success: true,
      data: {
        current_page: 1,
        data: users,
        last_page: 1,
        per_page: 20,
        total: 8,
      },
    });
  },
};
