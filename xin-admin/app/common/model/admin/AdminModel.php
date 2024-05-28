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
 * 管理员模型
 */
#[OAT\Schema(schema: 'admin_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'username', description: '用户名', type: 'string'),
    new OAT\Property(property: 'nickname', description: '昵称', type: 'string'),
    new OAT\Property(property: 'sex', description: '性别', type: 'string'),
    new OAT\Property(property: 'email', description: '邮箱', type: 'string'),
    new OAT\Property(property: 'status', description: '状态', type: 'string'),
    new OAT\Property(property: 'group_id', description: '分组ID', type: 'string'),
    new OAT\Property(property: 'avatar_id', description: '头像ID', type: 'int'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class AdminModel extends BaseModel
{
    protected $table = 'xin_admin';

    protected $hidden = ['password'];

    protected $schema = [
        'id' => 'int',
        'username' => 'varchar',
        'nickname' => 'varchar',
        'avatar_id' => 'int',
        'sex' => 'varchar',
        'email' => 'varchar',
        'mobile' => 'varchar',
        'status' => 'enum',
        'group_id' => 'int',
        'password' => 'varchar',
        'create_time' => 'int',
        'update_time' => 'int'
    ];
}