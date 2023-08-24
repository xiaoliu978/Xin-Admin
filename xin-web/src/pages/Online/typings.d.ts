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
    sqlType?: string;
    isKey?: boolean;
    remark?: string;
    defaultValue?: string;
    length?: string;
    decimal?: number;
    unsign?: boolean;
    null?:boolean;
    autoIncrement?: boolean;
  }

  interface CrudConfig {
    name: string
    controllerPath: string
    modelPath: string
    validatePath: string
    pagePath: string

  }

}