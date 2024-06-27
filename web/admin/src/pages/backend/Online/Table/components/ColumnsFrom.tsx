import { Button, message, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { EditableProTable, ProColumns, useDebounceFn } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import defaultSql from './defaultSql';
import { buildColumns } from '@/pages/backend/Online/Table/components/utils';
import TableConfigContext from '@/pages/backend/Online/Table/components/TableConfigContext';

function CreateForm() {
  const {tableConfig,setTableConfig} = useContext(TableConfigContext);
  const { getDictionaryData } = useModel('dictModel');
  const [modelShow, setModelShow] = useState<boolean>(false);

  const [dataSource, setDataSource] = useState(
    () => tableConfig.columns
  );
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    dataSource.map((item: any) => item.key!),
  );
  const isMenu = ['select', 'checkbox', 'radio', 'radioButton'];

  const columns: ProColumns[] = [
    {
      title: '基本配置',
      children: [
        {
          title: '表单类型',
          dataIndex: 'valueType',
          valueType: 'select',
          align: 'center',
          tooltip: '生成CRUD表单的类型',
          request: async () => await getDictionaryData('valueType'),
          fieldProps: (form, { rowKey }) => {
            return {
              onChange: (value: any) => {
                if (defaultSql.hasOwnProperty(value)) {
                  form.setFieldValue(rowKey, {
                    ...defaultSql[value],
                    ...form.getFieldValue(rowKey),
                  });
                }
              },
            };
          },
          formItemProps: {
            rules: [
              { required: true, message: '此项为必填项' },
            ],
          },
          fixed: 'left',
          width: 160,
        },
        {
          title: '字段名',
          dataIndex: 'dataIndex',
          tooltip: '作为数据库字段名和列索引',
          valueType: 'text',
          formItemProps: {
            rules: [
              { required: true, message: '此项为必填项' },
            ],
          },
          width: 120,
          align: 'center',
          fixed: 'left',
        },
        {
          title: '字段备注',
          dataIndex: 'title',
          valueType: 'text',
          tooltip: '作为表格表头和表单项名称',
          width: 120,
          align: 'center',
          formItemProps: {
            rules: [
              { required: true, message: '此项为必填项' },
            ],
          },
          fixed: 'left',
        },
      ],
    },
    {
      title: '生成设置',
      children: [
        {
          title: '查询方式',
          align: 'center',
          dataIndex: 'select',
          request: async () => await getDictionaryData('select'),
          valueType: 'text',
          width: 120,
        },
        {
          title: '验证规则',
          dataIndex: 'validation',
          valueType: 'select',
          request: async () => await getDictionaryData('validation'),
          align: 'center',
          fieldProps: { mode: 'multiple' },
          tooltip: '内置部分验证规则，需要自定义验证规则请看文档',
          width: 120,
        },
        {
          title: '搜索隐藏',
          dataIndex: 'hideInSearch',
          valueType: 'switch',
          width: 100,
          align: 'center',
        },
        {
          title: '表格隐藏',
          dataIndex: 'hideInTable',
          valueType: 'switch',
          width: 100,
          align: 'center',
        },
        {
          title: '表单隐藏',
          dataIndex: 'hideInForm',
          valueType: 'switch',
          width: 100,
          align: 'center',
        },
        {
          title: '是否字典',
          dataIndex: 'isDict',
          valueType: 'switch',
          width: 100,
          align: 'center',
          fieldProps: (form, { rowKey }) => {
            let valueType = form?.getFieldValue([rowKey, 'valueType']);
            if (isMenu.includes(valueType)) {
              return {};
            }
            return { disabled: true };
          },
        },
        {
          title: '数据枚举',
          dataIndex: 'enum',
          valueType: 'textarea',
          tooltip: 'key:label 格式，以换行分割',
          formItemProps: {
            rules: [
              { required: true, message: '此项为必填项' },
            ],
          },
          fieldProps: (form, { rowKey }) => {
            let valueType = form?.getFieldValue([rowKey, 'valueType']);
            let isDict = form?.getFieldValue([rowKey, 'isDict']);
            if (isMenu.includes(valueType) && !isDict) {
              return { disabled: false, autoSize: true };
            }
            return { disabled: true, autoSize: true };
          },
        },
        {
          title: '字典Code',
          dataIndex: 'dict',
          valueType: 'text',
          tooltip: '字典需要生成之后才可以看到效果，如果你有办法请提交PR',
          formItemProps: {
            rules: [
              { required: true, message: '此项为必填项' },
            ],
          },
          fieldProps: (form, { rowKey }) => {
            let valueType = form?.getFieldValue([rowKey, 'valueType']);
            let isDict = form?.getFieldValue([rowKey, 'isDict']);
            if (isMenu.includes(valueType) && isDict) {
              return { disabled: false };
            }
            return { disabled: true };
          },
        },
      ],
    },
    {
      title: '数据库配置',
      children: [
        {
          title: '字段类型',
          dataIndex: 'sqlType',
          valueType: 'select',
          request: async () => await getDictionaryData('sqlType'),
          align: 'center',
        },
        {
          title: '字段备注',
          dataIndex: 'remark',
          valueType: 'text',
          align: 'center',
        },
        {
          title: '字段默认值',
          dataIndex: 'defaultValue',
          valueType: 'text',
          initialValue: 'null',
          align: 'center',
        },
        {
          title: '是否主键',
          dataIndex: 'isKey',
          valueType: 'switch',
          initialValue: false,
          width: 100,
          align: 'center',
        },
        {
          title: '不为空',
          dataIndex: 'null',
          valueType: 'switch',
          initialValue: false,
          width: 100,
          align: 'center',
        },
        {
          title: '自动递增',
          dataIndex: 'autoIncrement',
          valueType: 'switch',
          initialValue: false,
          width: 100,
          align: 'center',
        },
        {
          title: '字段长度',
          dataIndex: 'length',
          valueType: 'digit',
          align: 'center',
        },
        {
          title: '小数点',
          dataIndex: 'decimal',
          valueType: 'digit',
          align: 'center',
        },
        {
          title: '无符号',
          dataIndex: 'unsign',
          valueType: 'switch',
          width: 100,
          align: 'center',
        },
      ],
    },
    {
      title: 'Mock 模拟数据',
      dataIndex: 'mock',
      valueType: 'text',
      align: 'center',
      tooltip: <>模拟数据格式，请查看文档 <a href={'http://mockjs.com/examples.html'} rel='noreferrer'
                                            target='_blank'>Mock</a> </>,
      initialValue: '@string',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <a key='delete' onClick={() => {
          setDataSource(dataSource.filter((item: any) => item.dataIndex !== record.dataIndex));
        }}
        >删除</a>
      ),
      fixed: 'right',
    },
  ];

  const onSave = () => {
    let reDataIndex = dataSource.some((item: any, index: any) => {
      return dataSource.some((innerItem: any, innerIndex: any) => {
        return index !== innerIndex && item.dataIndex === innerItem.dataIndex && item.title === innerItem.title;
      });
    });
    if (reDataIndex) {
      message.warning('字段种存在相同字段名或字段备注！');
      return;
    }
    setTableConfig({
      ...tableConfig,
      columns: buildColumns(dataSource)
    });
    message.success('保存字段成功！');
    setModelShow(false);
  };

  /** 去抖配置 */
  const updateConfig = useDebounceFn(async (state) => {
    setDataSource(state);
  }, 200);

  return (
    <>
      <Button onClick={() => setModelShow(true)} type={'primary'} block style={{ marginTop: 10 }}>编辑字段</Button>
      <Modal open={modelShow} onCancel={() => setModelShow(false)} width={'80%'} onOk={onSave} okText={'保存字段'}>
        <EditableProTable
          headerTitle={'字段设置'}
          columns={columns}
          rowKey='key'
          scroll={{ x: 2800, y: 500 }}
          value={dataSource}
          bordered
          onChange={(value) => updateConfig.run(value)}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              key: Date.now(),
              dataIndex: 'newKey',
            }),
          }}
          size={'small'}
          editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            onValuesChange: (record, recordList) => {
              updateConfig.run(recordList)
            },
            onChange: setEditableRowKeys,
          }}
        />
      </Modal>
    </>
  );
}

export default CreateForm;
