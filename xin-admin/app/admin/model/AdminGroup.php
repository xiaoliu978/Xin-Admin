<?php

namespace app\admin\model;

use app\admin\model\AdminRule as AdminRuleModel;
use app\common\model\BaseModel;

class AdminGroup extends BaseModel
{

    public function getRulesAttr($value): array
    {
        if($value == '*') {
            return (new AdminRuleModel())->where('status',1)->column('id');
        }else {
            return array_map('intval',explode(',',$value));
        }
    }

}