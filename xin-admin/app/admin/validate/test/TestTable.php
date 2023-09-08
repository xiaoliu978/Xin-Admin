<?php
namespace app\admin\validate\test;;

use think\Validate;

class TestTable extends Validate
{
    /**
     *  字段验证规则
     */
    protected $rule = [
        'title'  => 'require|string',
        'age'  => 'number|require',
        'money'  => 'number',
        'sex'  => 'require',
        'sex_dict'  => 'require',
        'op'  => 'require',

    ];


    /**
     *  字段验证场景
     */
    protected $scene = [
        'title.require' => '字段标题必填',
        'title.string' => '标题必须为字符串',
        'age.number' => '年龄必须为数字',
        'age.require' => '字段年龄必填',
        'money.number' => '余额必须为数字',
        'sex.require' => '字段性别必填',
        'sex_dict.require' => '字段性别字典必填',
        'op.require' => '字段学历必填',
    ];


}