import {ProFormColumnsAndProColumns, TableProps} from "@/components/XinTable/typings";

declare namespace OnlineType {
  type TableConfig = {
    headerTitle: string;
    search: boolean;
    addShow: boolean;
    operateShow: boolean;
    editShow: boolean;
    deleteShow: boolean;
    rowSelectionShow: boolean;
  } & TableProps

  interface SqlConfig{
    sqlTableName: string
    sqlTableRemark: string
  }

  type ColumnsConfig = ProFormColumnsAndProColumns<any> & {
    valueType?: string;
    sqlType?: string;
    isKey?: boolean;
    remark?: string;
    defaultValue?: string;
    length?: number;
    decimal?: number;
    unsign?: boolean;
    null?:boolean;
    autoIncrement?: boolean;
    dict?: string;
    enum?:string;
    isDict?: boolean;
  }

  interface CrudConfig {
    name: string
    controllerPath: string
    modelPath: string
    validatePath: string
    pagePath: string

  }

}