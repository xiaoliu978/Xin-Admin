import {useLocation, useNavigate} from '@umijs/max'
import {useEffect, useState} from "react";
import {getMenuData, getPageTitle, PageContainer} from "@ant-design/pro-components";
import type { MenuProps, TabsProps } from 'antd';
import routes from "../../../config/routes";

const XinTabs = (props: {children: never[]}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string>('');
  const [tabsItem, setTabsItem] = useState<Exclude<TabsProps['items'], undefined>>([
    {key: '/home', label: '首页', closeIcon: null}
  ]);
  const {breadcrumb} = getMenuData(routes);

  useEffect(() => {
    const title = getPageTitle({
      pathname: location.pathname,
      breadcrumb: breadcrumb
    });
    if(!title) return
    const inTabs = tabsItem.some((item) => {
      return item.key === location.pathname
    })
    if (!inTabs) {
      setTabsItem([...tabsItem, {
        key: location.pathname,
        label: title
      }]);
    }
    setActiveKey(location.pathname)
  }, [location])

  const onEdit: TabsProps['onEdit'] = (key, action) => {
    if (action === 'remove') {
      let itemIndex = tabsItem.findIndex((item) => item.key === key)
      tabsItem.splice(itemIndex, 1)
      setTabsItem([...tabsItem])
    }
  }

  const onClick: TabsProps['onTabClick'] = (key) => {
    navigate(key, {replace: true})
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={ ()=> {
          setTabsItem([{key: '/home', label: '首页', closeIcon: null}])
          navigate('/home')
        }}>
          关闭所有
        </a>
      ),
    },
  ]


  const tabProps: TabsProps = {
    id: 'tabs',
    size: 'small',
    activeKey: activeKey,
    type: "editable-card",
    tabBarGutter: 5,
    hideAdd: true,
    items: tabsItem,
    onTabClick: onClick,
    onEdit: onEdit,
  }


  return (
    <PageContainer fixedHeader tabProps={tabProps} tabList={tabProps.items} breadcrumb={{}}>
      {props.children}
    </PageContainer>

  )
}

export default XinTabs