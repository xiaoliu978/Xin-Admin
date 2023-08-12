import {Access, useAccess} from '@umijs/max';
import {Button} from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <Access accessible={access.canSeeAdmin}>
      <Button>只有 Admin 可以看到这个按钮</Button>
    </Access>
  );
};

export default AccessPage;
