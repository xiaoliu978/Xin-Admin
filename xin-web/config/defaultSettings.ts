import {ProLayoutProps} from '@ant-design/pro-components';

const Settings: ProLayoutProps  = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  // colorPrimary: '#2F54EB',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  token: {
    sider: {
      colorMenuBackground: '#ffffff',
      colorTextMenuTitle: '#1890ff',
      colorTextMenu: 'rgba(0, 0, 0, 0.88)',
      colorTextMenuSelected: '#1890ff',
      colorTextMenuItemHover: '#1890ff'
    },
    header: {
      colorBgHeader: '#ffffff',
      colorHeaderTitle: '#000'
    }
  },
};

export default Settings;