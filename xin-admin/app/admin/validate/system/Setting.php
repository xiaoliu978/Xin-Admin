<?php

namespace app\admin\validate\system;

use think\Validate;

class Setting extends Validate
{
    protected $rule = [
        'id'    =>  'require|max:10|number',
        'title' =>  'require|max:10',
        'key'   =>  'require|max:10',
        'describe'=>'require',
        'values' => 'require',
        'group_id'=> 'require',
    ];

    protected $scene = [
        'addGroup'    =>  ['title','key',],
        'editGroup'      =>  ['id','title','key'],
        'add'          => ['key','describe','values','group_id'],
        'list'      => ['group_id'],
        'edit'  => ['id','key','describe','values']
    ];
}
