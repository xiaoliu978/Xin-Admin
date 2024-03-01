<?php

namespace app\common\model\file;

use app\common\model\BaseModel;
use think\model\concern\SoftDelete;

class FileGroup extends  BaseModel
{
    protected $pk = 'group_id';

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