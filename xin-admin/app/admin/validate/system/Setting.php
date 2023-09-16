<?php

namespace app\admin\validate\system;

use think\Validate;

class Setting extends Validate
{
    protected $rule = [
        'id'    =>  'require|max:10|number',
        'pid'   =>  'max:10|number',
        'title' =>  'require|max:10',
        'key'   =>  'require|max:10',
        'type'  =>  'require|max:1|number'
    ];

    protected $scene = [
        'addGroup'    =>  ['pid','title','key','type'],
        'editGroup'      =>  ['id','pid','title','key','type'],
    ];
}