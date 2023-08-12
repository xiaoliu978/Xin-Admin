import './index.less';
import {Button, Dropdown} from 'antd';
import {MoreOutlined } from '@ant-design/icons'
import {useLocation, useNavigate} from '@umijs/max'
import {useEffect, useState} from "react";
import {getMenuData, getPageTitle} from "@ant-design/pro-components";
import {PageContainer, PageContainerProps } from '@ant-design/pro-components';
import type { MenuProps, TabsProps } from 'antd';
import routes from "../../../config/routes";
import './index.less'

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

  const operations = (
    <div className={ 'tabsRight' }>
      <Dropdown menu={{ items }}>
        <Button type="text" onClick={(e) => e.preventDefault()}>
          <MoreOutlined />
        </Button>
      </Dropdown>
    </div>
  )

  const PageContainerConfig: PageContainerProps = {
    ghost: true,
    title: false,
    header: {
      breadcrumb: {},
      style: {
        height: '56px',
        background: '#fff',
        padding: '0px 20px'
      },
    },
    content: null,
    tabProps: {
      id: 'tabs',
      size: 'small',
      activeKey: activeKey,
      type: "editable-card",
      tabBarGutter: 5,
      hideAdd: true,
      items: tabsItem,
      onTabClick: onClick,
      onEdit: onEdit
    },
    tabBarExtraContent: operations,
  }

  return (
    <PageContainer {...PageContainerConfig} style={{ padding: 0 }}>
      { props.children }
    </PageContainer>
  )
}

export default XinTabs