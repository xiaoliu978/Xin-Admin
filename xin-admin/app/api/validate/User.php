<?php

namespace app\api\validate;

use think\Validate;

class User extends Validate
{
    protected $rule = [
        'id'        =>  'require|max:10|int',
        'username'  =>  'require|max:10|alphaDash',
        'password'  =>  'require|max:10|graph',
        'autoLogin' =>  'boolean',
        'mobile'    =>  'require|mobile',
        'captcha'   =>  'require|max:4',
        'nickname'  =>  'require',
        'sex'       =>  'max:1|string',
        'email'     =>  'require|email'
    ];

    protected $message  =   [
        'username.require'  => '用户名不能为空',
        'username.max'      => '用户名最多不能超过10个字符',
        'username.alphaDash'=> '用户名只能为字母和数字、下划线_及破折号-',

        'password.require'  => '密码不能为空',
        'password.max'      => '密码最多不能超过10个字符',
        'password.graph'    => '密码不能包含非法字符',

        'mobile.require'    => '手机号不能为空',
        'mobile.mobile'     => '手机号格式错误',

        'captcha.require'   => '验证码不能为空',
        'captcha.max'       => '验证码最多不能超过4个字符',

    ];

    protected $scene = [
        // 账号密码登录
        'account'  =>  ['username','password'],
        // 手机号登录
        'phone'    =>  ['mobile','captcha'],
        // 新增管理员
        'add'      =>  ['username','nickname','password'],
        // 注册会员
        'reg'      =>  ['username','nickname','password','mobile','email']
    ];

}