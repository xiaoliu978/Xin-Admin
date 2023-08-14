import { useEffect, useState } from 'react';
import { GetAdminInfo } from '@/services/admin';
 
export default function Page() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refresh_token, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [userinfo, setUserinfo ] = useState<USER.UserInfo>({});

  const getAdminInfo = () => {
    GetAdminInfo().then(res=>{
      if (res.success) {
        setUserinfo(res.data)
        localStorage.setItem('userinfo', JSON.stringify(res.data));
      }
    })
  }

  useEffect(() => {
    if(token && refresh_token){
      localStorage.setItem('token', token)
      localStorage.setItem('refresh_token', refresh_token)
      getAdminInfo()
    }
  }, [token,refresh_token]);

  return {
    userinfo,
    token,
    setToken,
    setRefreshToken,
    getAdminInfo,
  };
};