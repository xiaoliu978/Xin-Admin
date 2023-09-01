import {ProLayoutProps} from '@ant-design/pro-components';

const Settings: ProLayoutProps  = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  // colorPrimary: '#2F54EB',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  token: {
    sider: {
      colorMenuBackground: 'rgb(43, 46, 61)',
      colorTextMenuTitle: '#e6f4ff',
      colorTextMenu: '#fff',
      colorTextMenuSelected: '#e6f4ff',
      colorTextMenuItemHover: '#e6f4ff'
    },
    header: {
      colorBgHeader: 'rgb(43, 46, 61)',
      colorHeaderTitle: '#fff'
    },
    pageContainer: {
      paddingBlockPageContainerContent: 0,
      paddingInlinePageContainerContent: 0,
      colorBgPageContainer: '#eee'
    }
  },
};


export default Settings;