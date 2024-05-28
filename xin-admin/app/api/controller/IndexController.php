<?php
// +----------------------------------------------------------------------
// | XinAdmin [ A Full stack framework ]
// +----------------------------------------------------------------------
// | Copyright (c) 2023~2024 http://xinadmin.cn All rights reserved.
// +----------------------------------------------------------------------
// | Apache License ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 小刘同学 <2302563948@qq.com>
// +----------------------------------------------------------------------
namespace app\api\controller;

use app\BaseController;
use app\api\model\UserModel as UserModel;
use app\api\validate\User as UserVal;
use app\common\library\sms\driver\Mail;
use app\common\model\user\UserGroupModel;
use app\common\model\user\UserRuleModel;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\response\Json;
use app\common\attribute as XinAttr;

#[XinAttr\OpenApi\Tag(name: "前台基本接口", description: "前台基本接口")]
class IndexController extends BaseController
{

    /**
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    #[XinAttr\OpenApi\Get(
        title: '获取系统基本信息',
        path: '/api.php/index/index',
        operationId: 'index',
        tags: ['前台基本接口'],
        response: [
            ['web_setting', 'Web 设置', [
                ['title', '网站标题', 'string'],
                ['logo', '网站LOGO', 'string'],
                ['subtitle', '副标题', 'string'],
            ]],
            new XinAttr\OpenApi\Property(property: 'menus', ref: '#/components/schemas/user_rule_model', title: '菜单导航', description: '菜单导航')
        ]
    )]
    public function index(): Json
    {
        $group = (new UserGroupModel)->where('id',2)->findOrEmpty()->toArray();
        $rule_model = new UserRuleModel();
        $menus = $rule_model->where('id','in',$group['rules'])->order('sort', 'desc')->select()->toArray();
        $menus = $this->getTreeData($menus);
        $web_setting = get_setting('web');
        return $this->success('ok',compact('web_setting', 'menus'));
    }

    /**
     * 用户登录
     * @return Json
     */
    #[XinAttr\OpenApi\Post(
        title: '用户登录',
        description: '用户登录',
        path: '/api.php/index/login',
        operationId: 'login',
        tags: ['前台基本接口'],
        body: [
            ['loginType','登录方式','string'],
            ['username','用户名','string'],
            ['password','密码','string'],
            ['email','登录方式','邮箱'],
            ['captcha','邮箱验证码','string'],
        ],
        required: ['loginType']
    )]
    #[XinAttr\Method('POST')]
    public function login(): Json
    {
        $data = $this->request->post();
        $model = new UserModel();
        $validate = new UserVal();
        // 账号密码登录
        if(isset($data['loginType']) && $data['loginType'] === 'account') {
            // 规则验证
            $result = $validate->scene('account')->check($data);
            if(!$result){
                return $this->warn($validate->getError());
            }
            $data = $model->login($data['username'],$data['password']);
            if($data) {
                return $this->success('ok',$data);
            }
            return $this->error($model->getErrorMsg());
        }
        // 邮箱登录
        if(isset($data['loginType']) && $data['loginType'] === 'email') {
            if(get_setting('mail.login') != 1) {
                return $this->warn('暂未开启邮箱登录！');
            }
            // 规则验证
            $result = $validate->scene('email')->check($data);
            if(!$result){
                return $this->warn($validate->getError());
            }
            $mail = new Mail();
            $verify = $mail->verify($data['email'],$data['captcha']);
            if($verify !== true){
                return $this->error($verify);
            }
            $data = $model->mailLogin($data['email']);
            if($data){
                return $this->success('ok',$data);
            }
            return $this->error($model->getErrorMsg());
        }

        // 手机号登录
        if(isset($data['loginType']) && $data['loginType'] === 'phone') {
            // 规则验证
            $result = $validate->scene('phone')->check($data);
            if(!$result){
                return $this->warn($validate->getError());
            }
            return $this->warn('暂未开通手机号登录！');
        }
        return $this->warn('请选择登录方式！');
    }

    /**
     * 用户注册
     * @return Json
     */
    #[XinAttr\OpenApi\Post(
        title: '用户注册',
        description: '用户注册',
        path: '/api.php/index/register',
        operationId: 'register',
        tags: ['前台基本接口'],
        body: [
            ['username','用户名','string'],
            ['nickname','昵称','string'],
            ['password','密码','string'],
            ['rePassword','确认密码','string'],
            ['regType','注册方式','string'],
        ],
        required: ['username','nickname','password','rePassword','regType']
    )]
    #[XinAttr\Method('POST')]
    public function register(): Json
    {
        $data = $this->request->post();
        // 规则验证
        $validate = new UserVal();
        $model = new UserModel();
        $result = $validate->scene('reg')->check($data);
        if(!$result){
            return $this->warn($validate->getError());
        }
        $data = $model->register($data);
        if($data) {
            return $this->success('ok',$data);
        }
        return $this->error($model->getErrorMsg());
    }

    /**
     * 发送邮箱验证码
     * @return Json
     */
    #[XinAttr\OpenApi\Get(
        title: '发送邮箱验证码',
        description: '发送邮箱验证码',
        path: '/api.php/index/sendMailCode',
        operationId: 'sendMailCode',
        tags: ['前台基本接口'],
        params: [
            ['email','邮箱','email']
        ],
    )]
    public function sendMailCode(): Json
    {
        $params = $this->request->param();
        if(!isset($params['email'])) {
            return $this->error('请输入邮箱！');
        }
        $SMS = new Mail();
        $data = $SMS->sendCode($params['email']);
        if($data === true){
            return $this->success('ok');
        }else {
            return $this->error($data);
        }
    }
}
