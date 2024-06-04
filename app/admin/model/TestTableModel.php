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
namespace app\admin\model;

use app\common\model\BaseModel;
use think\model\concern\SoftDelete;
use OpenApi\Attributes as OAT;

/**
 * 测试模型
 */
#[OAT\Schema(schema: 'test_table_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'name', description: '姓名', type: 'string'),
    new OAT\Property(property: 'title', description: '标题', type: 'string'),
    new OAT\Property(property: 'star', description: '点赞量', type: 'int'),
    new OAT\Property(property: 'url', description: '地址', type: 'string'),
    new OAT\Property(property: 'email', description: '邮箱', type: 'string'),
    new OAT\Property(property: 'caty', description: '城市', type: 'string'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class TestTableModel extends BaseModel
{

    use SoftDelete;
    protected $deleteTime = 'delete_time';
    protected $table = 'xin_test';

    protected $schema = [
        'id' => 'int',
        'name' => 'varchar',
        'title' => 'varchar',
        'star' => 'int',
        'url' => 'varchar',
        'email' => 'varchar',
        'caty' => 'varchar',
        'update_time' => 'int',
        'delete_time' => 'int',
        'create_time' => 'int'
    ];
}
