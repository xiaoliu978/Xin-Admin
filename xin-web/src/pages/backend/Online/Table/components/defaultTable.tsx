import { BetaSchemaForm, ProFormColumnsType, ProFormInstance, useDebounceFn } from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';
import { OnlineType } from '@/pages/backend/Online/typings';

export const defaultTableSetting: OnlineType.TableConfig = {
  bordered: false,
  size: 'default',
  showHeader: false,
  footer: false,
  rowSelectionShow: false,
  addShow: false,
  deleteShow: false,
  editShow: false,
  optionsShow: true,
  options: {
    density: true,
    search: false,
    fullScreen: false,
    setting: true,
  },
  headerTitle: '表格标题',
  tooltip: '表格 tooltip',
  searchShow: true,
  search: {
    searchText: '查询',
    resetText: '重置',
    collapseRender: false,
    collapsed: true,
    span: 12,
    layout: 'vertical',
    filterType: 'query'
  },
  paginationShow: true,
  pagination: {
    show: true,
    pageSize: 5,
    current: 1,
    total: 100,
  },
}

const tableColumns: ProFormColumnsType[] = [
  {
    valueType: 'divider',
    fieldProps: {
      orientation: 'left',
      children: '功能开关'
    }
  },
  {
    title: '表格多选',
    valueType: 'switch',
    dataIndex: 'rowSelectionShow',
  },
  {
    title: '表格新增',
    valueType: 'switch',
    dataIndex: 'addShow',
  },
  {
    title: '表格删除',
    valueType: 'switch',
    dataIndex: 'deleteShow',
  },
  {
    title: '表格编辑',
    valueType: 'switch',
    dataIndex: 'editShow',
  },
  {
    title: '表格边框',
    valueType: 'switch',
    dataIndex: 'bordered',
  },
  {
    title: '显示标题',
    valueType: 'switch',
    dataIndex: 'showHeader',
  },
  {
    title: '显示页脚',
    valueType: 'switch',
    dataIndex: 'footer',
  },
  {
    valueType: 'divider',
    fieldProps: {
      orientation: 'left',
      children: '查询配置'
    }
  },
  {
    title: '表格查询',
    valueType: 'switch',
    dataIndex: 'searchShow',
  },
  {
    valueType: 'dependency',
    name: ['searchShow'],
    columns: ({searchShow}) => {
      if(searchShow === false) return []
      return [
        {
          title: '收起按钮',
          valueType: 'switch',
          dataIndex: ['search','collapseRender'],
        },
        {
          title: '表单收起',
          valueType: 'switch',
          dataIndex: ['search','collapsed'],
        },
        {
          title: '重置按钮文案',
          valueType: 'text',
          dataIndex: ['search','resetText'],
        },
        {
          title: '查询按钮文案',
          valueType: 'text',
          dataIndex: ['search','searchText'],
        },
        {
          title: '表单栅格',
          valueType: 'radio',
          dataIndex: ['search','span'],
          valueEnum: new Map([
            [24,'24'],
            [12,'12'],
            [8,'8'],
            [6,'6'],
          ]),
        },
        {
          title: '表单布局',
          valueType: 'radioButton',
          dataIndex: ['search','layout'],
          valueEnum: new Map([
            ['vertical','垂直'],
            ['horizontal','水平']
          ]),
        },
        {
          title: '表单类型',
          valueType: 'radioButton',
          dataIndex: ['search','filterType'],
          valueEnum: new Map([
            ['query', '默认'],
            ['light', '轻量']
          ]),
        },
      ]
    }
  },
  {
    valueType: 'divider',
    fieldProps: {
      orientation: 'left',
      children: '操作栏配置'
    }
  },
  {
    title: '表格操作栏',
    valueType: 'switch',
    dataIndex: 'optionsShow',
  },
  {
    valueType: 'dependency',
    name: ['optionsShow'],
    columns: ({optionsShow}) => {
      if(optionsShow === false) return []
      return [
        {
          title: '密度 Icon',
          valueType: 'switch',
          dataIndex: ['options','density'],
        },
        {
          title: 'keyWords',
          valueType: 'switch',
          dataIndex: ['options','search'],
        },
        {
          title: '全屏 Icon',
          valueType: 'switch',
          dataIndex: ['options','fullScreen'],
        },
        {
          title: '列设置 Icon',
          valueType: 'switch',
          dataIndex: ['options','setting'],
        },
      ]
    }
  },
  {
    valueType: 'divider',
    fieldProps: {
      orientation: 'left',
      children: '分页配置',
    }
  },
  {
    title: '分页器',
    valueType: 'switch',
    dataIndex: 'paginationShow',
  },
  {
    valueType: 'dependency',
    name: ['paginationShow'],
    columns: ({paginationShow}) => {
      if(paginationShow === false) return []
      return [
        {
          title: '分页尺寸',
          valueType: 'radioButton',
          dataIndex: ['pagination','size'],
          valueEnum: new Map([
            ['default', '默认'],
            ['small', '小'],
          ])
        },
        {
          title: '页码',
          valueType: 'digit',
          dataIndex: ['pagination','current'],
        },
        {
          title: '每页数量',
          valueType: 'digit',
          dataIndex: ['pagination','pageSize'],
        },
        {
          title: '数据总数',
          valueType: 'digit',
          dataIndex: ['pagination','total'],
        },
      ]
    }
  },
  {
    valueType: 'divider',
    fieldProps: {
      orientation: 'left',
      children: '其它配置'
    }
  },
  {
    title: '表格标题',
    valueType: 'text',
    dataIndex: 'headerTitle',
  },
  {
    title: '表格的tooltip',
    valueType: 'text',
    dataIndex: 'tooltip',
  },
  {
    title: '表格尺寸',
    valueType: 'radio',
    dataIndex: 'size',
    valueEnum: new Map([
      ['default', '大'],
      ['middle', '中'],
      ['small', '小'],
    ])
  },
]


export default (props: {setTableSetting: React.Dispatch<any>,tableSetting?: OnlineType.TableConfig}) => {
  const { setTableSetting, tableSetting } = props
  /** 去抖配置 */
  const updateConfig = useDebounceFn(async (state) => {
    console.log(state)
    setTableSetting(state);
  }, 20);
  const form = useRef<ProFormInstance>()

  useEffect(()=>{
    form.current?.setFieldsValue(tableSetting)
  },[tableSetting])

  return (
    <BetaSchemaForm<OnlineType.TableConfig>
      layout="inline"
      layoutType={'Form'}
      formRef={form}
      rowProps={{ gutter: [16, 16], }}
      colProps={{ span: 24, }}
      onValuesChange={(changeValue, values) => {
        if(values.footer === true) values.footer = () => <>页脚</>
        if(!values.searchShow) values.search = false
        if(!values.optionsShow) values.options = false
        if(!values.paginationShow) values.pagination = false
        updateConfig.run(values)
      }}
      initialValues={defaultTableSetting}
      columns={tableColumns}
      submitter={{ render: () => [] }}
    />
  )
}
