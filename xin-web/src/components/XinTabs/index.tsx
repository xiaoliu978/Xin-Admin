import './index.less';
import {Affix, Avatar, Button, Dropdown, Space, Tabs} from 'antd';
import {MoreOutlined, SearchOutlined, UserOutlined} from '@ant-design/icons'
import {useLocation, useNavigate} from '@umijs/max'
import {useEffect, useState} from "react";
import {getMenuData, getPageTitle} from "@ant-design/pro-components";
import {PageContainer, PageContainerProps } from '@ant-design/pro-components';
import type { MenuProps, TabsProps } from 'antd';
import routes from "../../../config/routes";
import './index.less';
import {Question, XinRight} from '../XinTitle';

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
    <Space className={ 'tabsRight' } size={'large'}>
      <Dropdown menu={{ items }}>
        <Button type="text" onClick={(e) => e.preventDefault()}>
          <MoreOutlined/>
        </Button>
      </Dropdown>
      <Button color={'#ccd1d5'} shape="circle" ghost icon={<SearchOutlined />} href="https://www.google.com" size={'small'}/>
      <XinRight/>
    </Space>
  )

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
    <>
      <Affix offsetTop={0} >
        <Tabs {...tabProps}/>
      </Affix>
      <div style={{paddingRight:'10px',paddingLeft: '10px',marginTop:'10px'}}>
        { props.children }
      </div>
    </>

  )
}

export default XinTabs