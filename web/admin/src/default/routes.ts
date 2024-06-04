/**
 * 基础路由
 * @param lazyLoad
 */
export default (lazyLoad: (moduleName: string) => JSX.Element) => {
  return [
    {
      name: '表格设计',
      path: '/online/table/devise/:id',
      id: 'devise',
      element: lazyLoad('backend/Online/Table/Devise'),
      layout: false,
    },
    {
      name: '登录',
      path: 'admin/login',
      id: 'adminLogin',
      element: lazyLoad('backend/Login'),
      layout: false,
    },
  ];
}
