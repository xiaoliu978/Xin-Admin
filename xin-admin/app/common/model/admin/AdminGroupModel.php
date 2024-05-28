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
 * 管理员分组模型
 */
#[OAT\Schema(schema: 'admin_group_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'pid', description: '父ID', type: 'string'),
    new OAT\Property(property: 'rules', description: '分组权限', type: 'string'),
    new OAT\Property(property: 'name', description: '分组名称', type: 'string'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class AdminGroupModel extends BaseModel
{
    protected $table = 'xin_admin_group';

    protected $schema = [
        'id' => 'int',
        'pid' => 'int',
        'rules' => 'text',
        'name'=>  'varchar',
        'create_time' => 'int',
        'update_time' => 'int'
    ];


}