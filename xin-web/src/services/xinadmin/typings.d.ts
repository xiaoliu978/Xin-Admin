declare namespace API {
  type adminGroupModel = {
    /** ID */
    id?: number;
    /** 父ID */
    pid?: string;
    /** 分组权限 */
    rules?: string;
    /** 分组名称 */
    name?: string;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type adminModel = {
    /** ID */
    id?: number;
    /** 用户名 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 性别 */
    sex?: string;
    /** 邮箱 */
    email?: string;
    /** 状态 */
    status?: string;
    /** 分组ID */
    group_id?: string;
    /** 头像ID */
    avatar_id?: number;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type adminRuleModel = {
    /** ID */
    id?: number;
    /** 父ID */
    pid?: number;
    /** 类型 0：页面 1：数据 2：按钮 */
    type?: number;
    /** 排序 */
    sort?: number;
    /** 标题 */
    name?: string;
    /** 路由地址 */
    path?: string;
    /** 图标 */
    icon?: string;
    /** 权限标识 */
    key?: string;
    /** 国际化标识 */
    locale?: string;
    /** 状态 */
    status?: number;
    /** 显示状态 */
    show?: number;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type baseList = {
    /** 响应消息 */
    data?: { current_page?: any; data?: any; last_page?: any; per_page?: any; total?: any };
  };

  type dictItemListParams = {
    /** 字典ID */
    int?: any;
  };

  type dictItemModel = {
    /** ID */
    id?: number;
    /** 字典ID */
    'dict_id '?: string;
    /** 字典项名称 */
    label?: string;
    /** 数据值 */
    value?: number;
    /** 是否启用：0：禁用，1：启用 */
    switch?: string;
    /** 状态 */
    status?: string;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type dictModel = {
    /** ID */
    id?: number;
    /** 字典名称 */
    'name '?: string;
    /** 字典类型 */
    type?: string;
    /** 字典描述 */
    describe?: number;
    /** 字典编码 */
    code?: string;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type fileGroupModel = {
    /** 分组ID */
    group_id?: number;
    /** 分组名称 */
    'name '?: string;
    /** 父节点ID */
    parent_id?: number;
    /** 排序 */
    sort?: number;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type fileModel = {
    /** 文件ID */
    file_id?: number;
    /** 文件分组ID */
    group_id?: number;
    /** 上传来源 */
    channel?: number;
    /** 储存方式 */
    storage?: string;
    /** 储存域名 */
    domain?: string;
    /** 文件类型 */
    file_type?: number;
    /** 文件名称 */
    file_name?: string;
    /** 文件路径 */
    file_path?: string;
    /** 文件大小 */
    file_size?: number;
    /** 文件扩展名 */
    file_ext?: string;
    /** 文件封面 */
    cover?: string;
    /** 上传用户ID */
    uploader_id?: number;
    /** 是否在回收站 */
    is_recycle?: number;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type onlineTableModel = {
    /** ID */
    id?: number;
    /** 表格名称 */
    table_name?: string;
    /** 表头Json */
    columns?: string;
    /** 数据库配置 */
    sql_config?: number;
    /** crud配置 */
    crud_config?: string;
    /** 基础配置 */
    table_config?: string;
    /** 描述 */
    describe?: string;
    /** 更新时间 */
    update_time?: string;
    /** 创建时间 */
    create_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type requestError = {
    /** 响应消息 */
    msg?: string;
    /** 错误显示类型 */
    showType?: number;
    /** 状态码 */
    status?: number;
    /** 成功状态 */
    success?: boolean;
    /** 响应数据 */
    data?: Record<string, any>;
  };

  type requestSuccess = {
    /** 响应消息 */
    msg?: string;
    /** 错误显示类型 */
    showType?: number;
    /** 状态码 */
    status?: number;
    /** 成功状态 */
    success?: boolean;
    /** 响应数据 */
    data?: Record<string, any>;
  };

  type requestWarn = {
    /** 响应消息 */
    msg?: string;
    /** 错误显示类型 */
    showType?: number;
    /** 状态码 */
    status?: number;
    /** 成功状态 */
    success?: boolean;
    /** 响应数据 */
    data?: Record<string, any>;
  };

  type sendMailCodeParams = {
    /** 邮箱 */
    email?: any;
  };

  type settingGroupModel = {
    /** ID */
    id?: number;
    /** 父ID */
    pid?: number;
    /** 分组标题 */
    title?: number;
    /** 分组KEY */
    key?: string;
    /** 分组类型1：设置菜单 2：设置组  */
    type?: string;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type settingListParams = {
    /** 分组ID */
    int?: any;
  };

  type settingModel = {
    /** 设置ID */
    id?: number;
    /** 设置项标示 */
    key?: string;
    /** 设置标题 */
    title?: string;
    /** 设置项描述 */
    describe?: string;
    /** 设置值 */
    value?: string;
    /** 设置类型 */
    type?: string;
    /** options配置 */
    options?: string;
    /** 表单项配置 */
    props?: string;
    /** 分组ID */
    group_id?: number;
    /** 排序 */
    sort?: number;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type setUserInfo = {
    /** 用户名 */
    username: string;
    /** 密码 */
    nickname: string;
    /** 性别 */
    gender: string;
    /** 邮箱 */
    email: string;
    /** 头像 */
    avatar: string;
    /** 手机号 */
    mobile: string;
  };

  type setUserPassword = {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
    /** 验证新密码 */
    rePassword: string;
  };

  type testTableModel = {
    /** ID */
    id?: number;
    /** 姓名 */
    name?: string;
    /** 标题 */
    title?: string;
    /** 点赞量 */
    star?: number;
    /** 地址 */
    url?: string;
    /** 邮箱 */
    email?: string;
    /** 城市 */
    caty?: string;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type userGroupModel = {
    /** ID */
    id?: number;
    /** 父ID */
    pid?: string;
    /** 分组权限 */
    rules?: string;
    /** 分组名称 */
    name?: string;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type userModel = {
    /** ID */
    id?: number;
    /** 用户名 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 手机号 */
    mobile?: string;
    /** 邮箱 */
    email?: string;
    /** 性别 */
    gender?: string;
    /** 生日 */
    birthday?: string;
    /** 用户余额 */
    money?: number;
    /** 用户积分 */
    score?: number;
    /** 签名 */
    motto?: string;
    /** 状态 */
    status?: string;
    /** 分组ID */
    group_id?: string;
    /** 头像ID */
    avatar_id?: number;
    /** 创建时间 */
    create_time?: string;
    /** 修改时间 */
    update_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type userMoneyLogModel = {
    /** ID */
    id?: number;
    /** 用户id */
    user_id?: number;
    /** 余额变动场景 */
    scene?: string;
    /** 变动金额 */
    money?: number;
    /** 描述/说明 */
    describe?: string;
    /** 创建时间 */
    create_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type userRuleModel = {
    /** ID */
    id?: number;
    /** 父ID */
    pid?: number;
    /** 类型 0：页面 1：数据 2：按钮 */
    type?: string;
    /** 排序 */
    sort?: number;
    /** 标题 */
    name?: string;
    /** 路由地址 */
    path?: string;
    /** 图标 */
    icon?: string;
    /** 权限标识 */
    key?: string;
    /** 多语言标识 */
    locale?: string;
    /** 权限状态 */
    status?: string;
    /** 显示状态 */
    show?: string;
    /** 更新时间 */
    update_time?: string;
    /** 创建时间 */
    create_time?: string;
    /** 响应消息 */
    msg?: string;
  };

  type userVagueSearchParams = {
    /** 搜索内容 */
    search?: any;
  };

  type verificationCodeModel = {
    /** ID */
    id?: number;
    /** 类型 */
    type?: string;
    /** 验证码 */
    code?: string;
    /** 状态0：未发送 1：已发送 2：已验证 */
    status?: number;
    /** 有效期 */
    interval?: string;
    /** 接收方 */
    data?: string;
    /** 创建时间 */
    create_time?: string;
    /** 响应消息 */
    msg?: string;
  };
}
