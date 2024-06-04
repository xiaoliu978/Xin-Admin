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
use think\model\relation\HasMany;
use OpenApi\Attributes as OAT;

/**
 * 设置分组模型
 */
#[OAT\Schema(schema: 'setting_group_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'pid', description: '父ID', type: 'int'),
    new OAT\Property(property: 'title', description: '分组标题', type: 'int'),
    new OAT\Property(property: 'key', description: '分组KEY', type: 'string'),
    new OAT\Property(property: 'type', description: '分组类型1：设置菜单 2：设置组 ', type: 'string'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class SettingGroupModel extends BaseModel
{
    protected $table = 'xin_setting_group';

    protected $schema = [
        'id' => 'int',
        'pid' => 'int',
        'title' => 'varchar',
        'key' => 'varchar',
        'type' => 'enum',
        'create_time' => 'int',
        'update_time' => 'int'
    ];

    public function setting(): HasMany
    {
        return $this->hasMany(SettingModel::class,'group_id');
    }
}