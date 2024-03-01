interface GroupDataType {
  create_time?: string;
  group_id: number;
  name: string;
  parent_id?: number;
  sort?: number;
  update_time?: string;
  selectable?: boolean;
  children?: GroupDataType[];
}


interface FileType {
  channel: number; // 来源
  cover: string; // 封面
  create_time: string; // 创建时间
  domain: string;
  external_url: string;
  file_ext: string;
  file_id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: number;
  group_id: number;
  is_recycle: number;
  preview_url: string;
  storage: string;
  uploader_id: number;
}
