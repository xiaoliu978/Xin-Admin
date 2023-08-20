<?php

namespace app\admin\validate\system;

use think\Validate;

class DictItem extends Validate
{
    protected $rule = [
        'id'    =>  'require',
        'label'  =>  'require|max:20',
        'value'  =>  'require|max:20',
        'weigh' =>  'require',
        'status'=>  'require'
    ];

    protected $scene = [
        'edit'    =>  ['id','label','value','status'],
        'add'      =>  ['label','value','status']
    ];
}