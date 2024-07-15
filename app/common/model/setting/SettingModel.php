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
namespace app\common\model\setting;

use app\common\model\BaseModel;
use OpenApi\Attributes as OAT;

/**
 * 设置模型
 */
#[OAT\Schema(schema: 'setting_model',properties: [
    new OAT\Property(property: 'id', description: '设置ID', type: 'int'),
    new OAT\Property(property: 'key', description: '设置项标示', type: 'string'),
    new OAT\Property(property: 'title', description: '设置标题', type: 'string'),
    new OAT\Property(property: 'describe', description: '设置项描述', type: 'string'),
    new OAT\Property(property: 'values', description: '设置值', type: 'string'),
    new OAT\Property(property: 'type', description: '设置类型', type: 'string'),
    new OAT\Property(property: 'options', description: 'options配置', type: 'string'),
    new OAT\Property(property: 'props', description: '表单项配置', type: 'string'),
    new OAT\Property(property: 'group_id', description: '分组ID', type: 'int'),
    new OAT\Property(property: 'sort', description: '排序', type: 'int'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class SettingModel extends BaseModel
{

    protected $table = 'xin_setting';


}