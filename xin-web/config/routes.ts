/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
const router =  [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
    access: 'index'
  },
  {
    name: '数据展示',
    path: '/data',
    access: 'data',
    routes: [
      {
        name: '定义列表',
        path: '/data/descriptions',
        component: './Data/Descriptions',
        access: 'dataList'
      },
      {
        name: '高级列表',
        path: '/data/list',
        component: './Data/List',
        access:  'dataListUp'
      },
      {
        name: '单选卡片',
        path: '/data/checkcard',
        component: './Data/CheckCard',
        access: 'dataCard'
      }
    ]
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
    access: 'rule'
  },
  {
    name: 'CRUD 示例',
    path: '/table',
    component: './Table',
    access: 'crud'
  },
  {
    name: '管理员设置',
    path: '/admin',
    access: 'admin',
    routes: [
      {
        name: '管理员列表',
        path: '/admin/list',
        component: './Admin/AdminList',
        access: 'adminList'
      },
      {
        name: '管理员分组',
        path: '/admin/group',
        component: './Admin/AdminGroup',
        access: 'adminGroup'
      },
      {
        name: '权限管理',
        path: '/admin/rule',
        component: './Admin/AdminRule',
        access: 'adminRule'
      }
    ]
  },
  {
    name: '系统管理',
    path: '/system',
    access: 'system',
    routes: [
      {
        name: '字典管理',
        path: '/system/dict',
        component: './System/Dict',
        access: 'systemDict'
      },
    ]
  },
  {
    name: '登录',
    path: '/login',
    component: './Admin/Login',
    layout: false,
  },
]

export default router;