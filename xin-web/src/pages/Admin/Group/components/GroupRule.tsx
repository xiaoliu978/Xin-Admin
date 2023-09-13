import {Button, Drawer, message, Space, Tree, TreeProps} from 'antd';
import React, {useEffect, useState} from "react";
import {getGroupRule, getRuleByGroup, setGroupRule} from "@/services/admin";
import type { DataNode } from 'antd/es/tree';

const App: React.FC<{open : boolean;onClose: ()=>void; record: {
  id?: number
  name?: string
  pid?: string
  create_time?: string
  updata_time?: string
}}> = (props) => {
  const { open, onClose, record } = props;
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(record.id){
      getRuleByGroup({group_id: record.id!}).then(res=>{
        if(res.success){
          setTreeData(res.data.data)
        }
      })
      getGroupRule({group_id: record.id!}).then(res=>{
        if(res.success){
          setCheckedKeys(res.data)
        }
      })
    }
  },[record])

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  const onCheck: TreeProps['onCheck'] = (checked,e) => {
    console.log(e)

    console.log('onCheck', checked);
    if(Array.isArray(checked)){
      setCheckedKeys(checked);
    }else {
      setCheckedKeys(checked.checked);
    }
  };

  /**
   * 保存权限规则
   */
  const onSave = () => {
    setLoading(true)
    if(record.id){
      let data = {
        'id': record.id,
        'rule_ids': checkedKeys
      }
      setGroupRule(data).then(res=>{
        if(res.success){
          message.success('保存成功')
        }
      }).finally(()=>setLoading(false))
    }else {
      message.warning('请先选择分组')
      setLoading(false)
    }
  }

  return (
    <Drawer
      title={record.name}
      width={520}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onSave} type="primary" loading={loading}>
            保存
          </Button>
        </Space>
      }
    >

      <Tree
        checkable
        checkStrictly
        treeData={treeData}
        fieldNames={{
          title: 'title',
          key: 'id',
          children: 'children',
        }}
        onCheck={onCheck}
        onSelect={onSelect}
        checkedKeys={checkedKeys}
        selectedKeys={selectedKeys}
      />
    </Drawer>
  );
};

export default App;