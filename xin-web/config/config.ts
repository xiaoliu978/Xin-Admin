import { defineConfig } from '@umijs/max';
import {appSettings} from "./defaultSettings";
export default defineConfig({
  /**
   * Ant Design 配置
   */
  antd: {
    theme: {
      components: {
        Tabs: {
          cardHeight: 26
        }
      }
    },
  },
  /**
   * 权限配置
   */
  access: {},
  /**
   * 数据流
   */
  model: {},
  dva: false,
  /**
   * 约定式路由配置
   */
  conventionRoutes: {
    exclude: [/\/components\//, /\/models\//,/\/noLayoutPage\//,/\/Public\//],
  },
  /**
   * 初始化状态
   */
  initialState: {},
  /**
   * 请求配置
   */
  request: {},
  /**
   * 运行时配置
   */
  layout: appSettings,
  esbuildMinifyIIFE: true,
  npmClient: 'pnpm',
  /**
   * 第三方统计，百度统计配置
   */
  analytics: {
    baidu: '03fb97a161517001d21cf900d8d328df',
  },
  publicPath: '/assets/',
  hash: true,
  favicons: [
    'https://file.xinadmin.cn/file/favicons.ico'
  ],
  metas: [
    { name: 'keywords', content: 'Xin Admin,Umi,Umi js,中后台管理框架,React,ThinkPHP,xinadmin,admin,react admin,think admin' },
    { name: 'description', content: 'Xin Admin是一款基于 Ant Design Pro components 构建一套完善的 Xin Table， 只需一个 Columns 就可以实现增删改查等表单、表格、查询等功能，以及组件的高度自定义' },
  ],

  /**
   *  代理设置
   */
  proxy: {
    '/admin.php': {
      target: 'http://127.0.0.1:8000/admin.php',
      changeOrigin: true,
      pathRewrite: { '^/admin.php': '' },
    },
    '/api.php': {
      target: 'http://127.0.0.1:8000/api.php',
      changeOrigin: true,
      pathRewrite: { '^/api.php': '' },
    },
  },
});

