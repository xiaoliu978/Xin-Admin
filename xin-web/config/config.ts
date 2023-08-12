import { defineConfig } from '@umijs/max';
import routes from './routes';
import defaultSettings from "./defaultSettings";
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: defaultSettings,
  routes,
  npmClient: 'pnpm',
  mock: false,
  // base: '/assets',
  // webpack 配置修改
  ssr: {}
});

