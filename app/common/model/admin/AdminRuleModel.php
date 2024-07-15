<?php
// +----------------------------------------------------------------------
// | XinAdmin [ A Full stack framework ]
// +----------------------------------------------------------------------
// | Copyright (c) 2023~2024 http://xinadmin.cn All rights reserved.
// +----------------------------------------------------------------------
// | Apache License ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 小刘同学 <2302563948@qq.com>
// +----------------------------------------------------------------------
namespace app\common\model\admin;

use app\common\model\BaseModel;
use OpenApi\Attributes as OAT;

/**
 * 管理员权限模型
 */
#[OAT\Schema(schema: 'admin_rule_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'pid', description: '父ID', type: 'int'),
    new OAT\Property(property: 'type', description: '类型 0：页面 1：数据 2：按钮', type: 'int'),
    new OAT\Property(property: 'sort', description: '排序', type: 'int'),
    new OAT\Property(property: 'name', description: '标题', type: 'string'),
    new OAT\Property(property: 'path', description: '路由地址', type: 'string'),
    new OAT\Property(property: 'icon', description: '图标', type: 'string'),
    new OAT\Property(property: 'key', description: '权限标识', type: 'string'),
    new OAT\Property(property: 'locale', description: '国际化标识', type: 'string'),
    new OAT\Property(property: 'status', description: '状态', type: 'int'),
    new OAT\Property(property: 'show', description: '显示状态', type: 'int'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class AdminRuleModel extends BaseModel
{
    protected $table = 'xin_admin_rule';

}