<?php

namespace app\admin\model;

use think\Model;
use think\model\relation\BelongsToMany;

class AdminGroup extends Model
{

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(AdminRule::class, AdminGroupRule::class,'rule_id','group_id');
    }


}