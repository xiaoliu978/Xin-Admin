<?php
namespace app\admin\validate\test;;

use think\Validate;

class TestTable extends Validate
{
    /**
     *  字段验证规则
     */
    protected $rule = [
        'string'  => 'require',

    ];


    /**
     *  字段验证场景
     */
    protected $scene = [
        'string.require' => '字段文本框必填',

    ];


}