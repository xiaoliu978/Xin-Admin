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
use OpenApi\Attributes as OAT;

/**
 * 字典项模型
 */
#[OAT\Schema(schema: 'dict_item_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'dict_id ', description: '字典ID', type: 'string'),
    new OAT\Property(property: 'label', description: '字典项名称', type: 'string'),
    new OAT\Property(property: 'value', description: '数据值', type: 'int'),
    new OAT\Property(property: 'switch', description: '是否启用：0：禁用，1：启用', type: 'string'),
    new OAT\Property(property: 'status', description: '状态', type: 'string'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class DictItemModel extends BaseModel
{

    protected $table = 'xin_dict_item';

    protected $schema = [
        'id' => 'int',
        'dict_id' => 'int',
        'label' => 'varchar',
        'value' => 'varchar',
        'switch' => 'enum',
        'status' => 'enum',
        'create_time' => 'int',
        'update_time' => 'int'
    ];

}