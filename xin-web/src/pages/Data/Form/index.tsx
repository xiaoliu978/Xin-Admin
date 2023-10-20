import { ProCard, ProFormRadio } from '@ant-design/pro-components';
import { useState } from 'react';
import LightFilter from './components/LightFilter';
import QueryFilter from './components/QueryFilter';
import LoginForm from './components/LoginForm';
import StepsForm from './components/StepsForm';
import ModalForm from './components/ModalForm';
import ProForm from './components/ProForm';

export default () => {
  const [type,setType] = useState('ProForm');

  return (
    <ProCard style={{ minHeight: '90vh' }} >
      <ProFormRadio.Group
        style={{
          margin: 16,
        }}
        radioType="button"
        fieldProps={{
          value: type,
          onChange: (e) => setType(e.target.value),
        }}
        options={[
          'ProForm',
          'LightFilter',
          'QueryFilter',
          'ModalForm/DrawerForm',
          'StepsForm',
          'LoginForm',
        ]}
      />
      {type === 'LightFilter' ? <LightFilter/> : ''}
      {type === 'QueryFilter' ? <QueryFilter/> : ''}
      {type === 'ProForm' ? <ProForm/> : ''}
      {type === 'ModalForm/DrawerForm' ? <ModalForm/> : ''}
      {type === 'StepsForm' ? <StepsForm/> : ''}
      {type === 'LoginForm' ? <LoginForm/> : ''}
    </ProCard>
  )
};
