<?php

namespace app\admin\validate\file;

use think\Validate;

class Group extends Validate
{
    protected $rule = [
        'name'        =>  'require',
        'parent_id'  =>  'require',
        'sort'  =>  'max:10|number',
    ];

    protected $scene = [
        // 新增
        'add'      =>  ['name','parent_id','sort'],
    ];
}