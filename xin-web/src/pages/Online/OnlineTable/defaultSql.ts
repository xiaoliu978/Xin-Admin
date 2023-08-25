import {OnlineType} from "@/pages/Online/typings";

const dict = {
  remark: '数据字典',
  sqlType: 'varchar',
  defaultValue: 'empty string',
  title: '数据字典',
  isKey: false,
  isDict: false,
  enum:
    '1:one\n' +
    '2:two\n' +
    '3:three',
  valueEnum: new Map([
    [1, "one"],
    [2, "two"],
    [3, "three"],
  ]),
  null: false,
  length: 26,
  decimal: 0,
  unsign: false
}

const defaultSql: {[key: string]: OnlineType.ColumnsConfig} = {
  id: {
    remark: 'ID',
    sqlType: 'int',
    defaultValue: '',
    dataIndex: 'id',
    title: '主键ID',
    order: 99,
    isKey: true,
    hideInForm: true,
    null: true,
    autoIncrement: true,
    length: 10,
    decimal: 0,
    unsign: true
  },
  select: dict,
  checkbox: dict,
  radio: dict,
  radioButton: dict,
  password: {
    remark: '密码输入框',
    sqlType: 'varchar',
    defaultValue: 'empty string',
    isKey: false,
    null: false,
    autoIncrement: false,
    length: 30,
    decimal: 0,
    unsign: false
  },
  text: {
    remark: '文本框',
    sqlType: 'varchar',
    defaultValue: 'empty string',
    isKey: false,
    null: false,
    autoIncrement: false,
    length: 255,
    unsign: false
  },
  textarea: {
    remark: '文本域',
    sqlType: 'text',
    defaultValue: '',
    isKey: false,
    null: false,
    autoIncrement: false,
    length: 0,
    unsign: false
  },
  digit: {
    remark: '数字',
    sqlType: 'int',
    defaultValue: 'null',
    isKey: false,
    null: false,
    autoIncrement: false,
    length: 10,
    unsign: false
  },
  money: {
    remark: '金额',
    sqlType: 'double',
    defaultValue: '',
    isKey: false,
    null: false,
    decimal: 2,
    autoIncrement: false,
    length: 0,
    unsign: false
  },
  switch: {
    remark: '开关',
    sqlType: 'char',
    defaultValue: '0',
    dataIndex: 'switch',
    title: '开关',
    isKey: false,
    null: false,
    length: 1,
    decimal: 0,
    unsign: true
  },
  rate: {
    remark: '评分',
    sqlType: 'char',
    defaultValue: '0',
    dataIndex: 'rate',
    title: '评分',
    isKey: false,
    null: false,
    length: 1,
    decimal: 0,
    unsign: true
  },
  date: {
    remark: '日期',
    sqlType: 'date',
    defaultValue: 'null',
    dataIndex: 'date',
    title: '日期',
    isKey: false,
    null: false,
    length: 0,
    decimal: 0,
    unsign: false
  },
  dateTime: {
    remark: '日期时间',
    sqlType: 'datetime',
    defaultValue: 'null',
    dataIndex: 'datetime',
    title: '日期时间',
    isKey: false,
    null: false,
    length: 0,
    decimal: 0,
    unsign: false
  },
  createTime: {
    remark: '创建时间',
    sqlType: 'int',
    defaultValue: 'null',
    dataIndex: 'create_time',
    title: '创建时间',
    isKey: false,
    null: false,
    length: 11,
    decimal: 0,
    unsign: false
  },
  updateTime: {
    remark: '更新时间',
    sqlType: 'int',
    defaultValue: 'null',
    dataIndex: 'update_time',
    title: '更新时间',
    isKey: false,
    null: false,
    length: 11,
    decimal: 0,
    unsign: false
  }
}
export default defaultSql;
