import {ProLayoutProps} from '@ant-design/pro-components';

const Settings: ProLayoutProps  = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  // colorPrimary: '#2F54EB',
  layout: 'top',
  contentWidth: 'Fluid',
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


export default Settings;