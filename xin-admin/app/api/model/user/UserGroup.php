<?php

namespace app\api\model\user;


use app\common\model\BaseModel;
use think\model\relation\BelongsToMany;

class UserGroup extends BaseModel
{

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(UserRule::class, UserGroupRule::class,'rule_id','group_id');
    }


}