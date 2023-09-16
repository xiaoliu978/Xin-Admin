<?php

namespace app\admin\model\system;

use app\common\model\BaseModel;
use think\model\relation\HasMany;

class SettingGroup extends BaseModel
{
    public function setting(): HasMany
    {
        return $this->hasMany(Setting::class,'group_id');
    }
}