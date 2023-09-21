<?php

namespace app\admin\model;

use app\common\model\BaseModel;
use think\model\relation\BelongsToMany;

class AdminGroup extends BaseModel
{

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(AdminRule::class, AdminGroupRule::class,'rule_id','group_id');
    }


}