export default (lazyLoad: (moduleName: string) => JSX.Element) => {
  return [
    {
      name: '表格设计',
      path: '/online/table/devise/:id',
      id: 'devise',
      element: lazyLoad('Online/Table/Devise'),
      layout: false,
    },
    {
      name: '登录',
      path: 'admin/login',
      id: 'adminLogin',
      element: lazyLoad('Public/Login'),
      layout: false,
    },
    {
      name: '注册',
      path: 'reg',
      id: 'reg',
      element: lazyLoad('Public/Reg'),
      layout: false,
    },
  ];
}
