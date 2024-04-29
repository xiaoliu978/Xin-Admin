<?php
namespace app\common\model\user;

use app\common\model\BaseModel;

class UserGroup extends BaseModel
{

    public function getRulesAttr($value): array
    {
        if($value == '*') {
            return (new UserRule())->where('status',1)->column('id');
        }else {
            return array_map('intval',explode(',',$value));
        }
    }

}