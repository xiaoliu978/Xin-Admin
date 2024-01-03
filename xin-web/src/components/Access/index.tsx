import { Access, useModel, useLocation, Link } from '@umijs/max';
import { Result } from 'antd';
import React, { useEffect, useState } from 'react';
import noAuthRouter from '@/default/noAuthRouter';


export  default  (
  props: {children: React.ReactNode}
) => {
  const {initialState} = useModel('@@initialState');

  const { pathname} = useLocation();

  const [isAccess,setIsAccess] = useState<boolean>(false);



  useEffect(() => {

    let accessName = pathname.slice(1).replace(/\//g,'.');

    console.log('当前页面权限标识: ' + accessName);

    if(initialState!.access.includes(accessName) || noAuthRouter.includes(pathname)){
      setIsAccess(true);
    }else {
      setIsAccess(false)
    }

  },[pathname])

  return (
    <Access accessible={isAccess} fallback={(
      <Result
        status="403"
        title="403"
        subTitle="抱歉, 你暂时没有此页面的权限."
        extra={<Link to="/">去首页</Link>}
      />
    )}>
      {props.children}
    </Access>
  );
}
