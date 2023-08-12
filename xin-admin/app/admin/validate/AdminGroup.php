<?php
declare (strict_types = 1);

namespace app\admin\validate;

use think\Validate;

class AdminGroup extends Validate
{
    /**
     * 定义验证规则
     * 格式：'字段名' =>  ['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'name'  => 'require',
        'pid'   => 'require|number|max:2',
        'status'=> 'require|number|max:1',
        'rules' => 'require'
    ];

    /**
     * 定义错误信息
     * 格式：'字段名.规则名' =>  '错误信息'
     *
     * @var array
     */
    protected $message = [
        'name.require' => '请输入名字',
        'pid.require'  => '请输入父ID',
        'pid.number'   => '父ID格式错误',
        'status.require'=> '请输入状态',
        'rules.require'=> '请输入权限'
    ];
}
