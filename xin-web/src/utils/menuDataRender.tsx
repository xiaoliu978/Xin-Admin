import React from 'react';
import { MenuDataItem } from '@ant-design/pro-components';
import * as AntdIcons from "@ant-design/icons";
import { createFromIconfontCN } from '@ant-design/icons';

const allIcons: { [key: string]: any } = AntdIcons;

let IconFont = createFromIconfontCN({
  // 以下是默认值，也可以按需要指定
  scriptUrl: '//at.alicdn.com/t/c/font_4413039_4ep4ccllu9b.js',
});

// 从接口获取菜单时icon为string类型
const fixMenuItemIcon = (menus: MenuDataItem[]): MenuDataItem[] => {
  menus.forEach((item) => {
    if(item.icon && typeof item.icon === 'string' && allIcons[item.icon]){
      if (item.icon.startsWith('icon-')) {
        item.icon = <IconFont type={item.icon} className={item.icon} />;
      } else {
        item.icon = React.createElement(allIcons[item.icon]);
      }
    }
    // TODO 二级菜单暂时不可通过此方式解决图标无法渲染问题，等待 Umi 官方更新
    // if(item.children && item.children.length > 0){
    //   item.children = fixMenuItemIcon(item.children)
    // }
  });

  return menus;
};

export default fixMenuItemIcon;
