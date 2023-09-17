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
        'type'  =>  'require',
        'describe'=>'require',
        'values' => 'require',
        'group_id'=> 'require',
    ];

    protected $scene = [
        'addGroup'    =>  ['pid','title','key','type'],
        'editGroup'      =>  ['id','pid','title','key','type'],
        'add'          => ['key','describe','values','group_id'],
        'list'      => ['group_id'],
        'edit'  => ['id','key','describe','values']
    ];
}