<?php

namespace app\admin\validate\system;

use think\Validate;

class Dict extends Validate
{
    protected $rule = [
        'id'    =>  'require',
        'name'  =>  'require|max:10',
        'code'  =>  'require|max:10',
    ];

    protected $scene = [
        'edit'    =>  ['id','name','code'],
        'add'      =>  ['name','code']
    ];
}