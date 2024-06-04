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
namespace app\common\model\dict;

use app\common\model\BaseModel;
use think\model\relation\HasMany;
use OpenApi\Attributes as OAT;

/**
 * 字典模型
 */
#[OAT\Schema(schema: 'dict_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'name ', description: '字典名称', type: 'string'),
    new OAT\Property(property: 'type', description: '字典类型', type: 'string'),
    new OAT\Property(property: 'describe', description: '字典描述', type: 'int'),
    new OAT\Property(property: 'code', description: '字典编码', type: 'string'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class DictModel extends BaseModel
{

    protected $table = 'xin_dict';

    protected $schema = [
        'id' => 'int',
        'name' => 'varchar',
        'type' => 'enum',
        'describe' => 'varchar',
        'code' => 'varchar',
        'create_time' => 'int',
        'update_time' => 'int'
    ];

    public function dictItems(): HasMany
    {
        return $this->hasMany(DictItemModel::class,'dict_id');
    }
}