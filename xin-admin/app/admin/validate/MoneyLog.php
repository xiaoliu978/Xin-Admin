<?php

namespace app\admin\validate;

use think\Validate;

class MoneyLog extends Validate
{

    protected $rule = [
        'id' => 'require|number|max:10|min:1',
        'money' => 'require|integer',
        'remark' => 'require'
    ];

    protected $scene = [
        'add' => ['id','money','remark']
    ];

}