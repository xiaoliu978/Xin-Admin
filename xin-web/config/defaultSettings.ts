import {ProLayoutProps} from '@ant-design/pro-components';

export const appSettings: ProLayoutProps  = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  // colorPrimary: '#2F54EB',
  layout: 'top',
  contentWidth: 'Fixed',
  fixedHeader: true,
  token: {
    pageContainer: {
      paddingBlockPageContainerContent: 0,
      paddingInlinePageContainerContent: 0,
    }
  },
  fixSiderbar: true,
  splitMenus: false,
  siderMenuType: "sub"
};

export const adminSettings: ProLayoutProps = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  // colorPrimary: '#2F54EB',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  token: {
    pageContainer: {
      paddingBlockPageContainerContent: 20,
      paddingInlinePageContainerContent: 20,
    },
    sider: {
      colorMenuBackground: '#fff',
      colorBgMenuItemSelected: '#f4f6fc',
      colorTextMenuSelected: '#1890ff',
    },
    header: {
      colorBgHeader: '#fff'
    }
  },
}
