<?php

namespace app\admin\model\system;

use app\common\model\BaseModel;

class Dict extends BaseModel
{
    public function dictItems()
    {
        return $this->hasMany(DictItem::class,'dict_id');
    }
}