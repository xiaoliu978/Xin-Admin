<?php

namespace app\admin\validate\system;

use think\Validate;

class DictItem extends Validate
{
    protected $rule = [
        'id'    =>  'require',
        'label'  =>  'require|max:10',
        'value'  =>  'require|max:10',
        'weigh' =>  'require',
        'status'=>  'require'
    ];

    protected $scene = [
        'edit'    =>  ['id','label','value','status'],
        'add'      =>  ['label','value','status']
    ];
}