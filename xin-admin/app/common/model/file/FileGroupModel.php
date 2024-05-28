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
namespace app\common\model\file;

use app\common\model\BaseModel;
use OpenApi\Attributes as OAT;

/**
 * 文件分组模型
 */
#[OAT\Schema(schema: 'file_group_model', properties: [
    new OAT\Property(property: 'group_id', description: '分组ID', type: 'int'),
    new OAT\Property(property: 'name ', description: '分组名称', type: 'string'),
    new OAT\Property(property: 'parent_id', description: '父节点ID', type: 'int'),
    new OAT\Property(property: 'sort', description: '排序', type: 'int'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class FileGroupModel extends BaseModel
{
    protected $table = 'xin_file_group';

    protected $pk = 'group_id';

    protected $schema = [
        'group_id' => 'int',
        'name' => 'varchar',
        'parent_id' => 'int',
        'sort' => 'int',
        'create_time' => 'int',
        'update_time' => 'int'
    ];

    /**
     * 分组详情
     * @param array|int $where
     * @return static|array|null
     */
    public static function detail(array|int $where): array|static|null
    {
        return self::get($where);
    }
}