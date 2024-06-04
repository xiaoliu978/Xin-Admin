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
namespace app\common\model;

use OpenApi\Attributes as OAT;

/**
 * 在线开发记录模型
 */
#[OAT\Schema(schema: 'online_table_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'table_name', description: '表格名称', type: 'string'),
    new OAT\Property(property: 'columns', description: '表头Json', type: 'string'),
    new OAT\Property(property: 'sql_config', description: '数据库配置', type: 'int'),
    new OAT\Property(property: 'crud_config', description: 'crud配置', type: 'string'),
    new OAT\Property(property: 'table_config', description: '基础配置', type: 'string'),
    new OAT\Property(property: 'describe', description: '描述', type: 'string'),
    new OAT\Property(property: 'update_time', description: '更新时间', type: 'string'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
])]
class OnlineTableModel extends BaseModel
{

    protected $pk = 'id';

    protected $table = 'xin_online_table';

    protected $schema = [
        'id' => 'int',
        'table_name' => 'varchar',
        'columns' => 'longtext',
        'sql_config' => 'longtext',
        'crud_config' => 'longtext',
        'table_config' => 'longtext',
        'describe' => 'varchar',
        'update_time' => 'int',
        'create_time' => 'int',
    ];

}