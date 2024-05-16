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

use app\common\attribute\Method;
use app\common\controller\Controller as Controller;
use app\api\model\User as UserModel;
use app\api\validate\User as UserVal;
use app\common\library\sms\driver\Mail;
use app\common\model\user\UserGroup;
use app\common\model\user\UserRule;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\response\Json;

class Index extends Controller
{

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserModel();
        $this->validate = new UserVal();
    }

    /**
     * 获取系统基本信息
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function index(): Json
    {
        $group = (new UserGroup)->where('id',2)->findOrEmpty()->toArray();
        trace($group);
        $rule_model = new UserRule();
        $menus = $rule_model->where('id','in',$group['rules'])->order('sort', 'desc')->select()->toArray();
        trace($menus);
        $menus = $this->getTreeData($menus);
        $web_setting = get_setting('web');
        return $this->success('ok',compact('web_setting', 'menus'));
    }

    /**
     * 用户登录
     * @return Json
     */
    #[Method('POST')]
    public function login(): Json
    {
        $data = $this->request->post();
        $model = new UserModel();
        // 账号密码登录
        if(isset($data['loginType']) && $data['loginType'] === 'account') {
            // 规则验证
            $result = $this->validate->scene('account')->check($data);
            if(!$result){
                return $this->warn($this->validate->getError());
            }
            $data = $model->login($data['username'],$data['password']);
            if($data) {
                return $this->success('ok',$data);
            }
            return $this->error($this->model->getErrorMsg());
        }
        // 邮箱登录
        if(isset($data['loginType']) && $data['loginType'] === 'email') {
            if(get_setting('mail.login') != 1) {
                return $this->warn('暂未开启邮箱登录！');
            }
            // 规则验证
            $result = $this->validate->scene('email')->check($data);
            if(!$result){
                return $this->warn($this->validate->getError());
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
            $result = $this->validate->scene('phone')->check($data);
            if(!$result){
                return $this->warn($this->validate->getError());
            }
            return $this->warn('暂未开通手机号登录！');
        }
        return $this->warn('请选择登录方式！');
    }

    /**
     * 用户注册
     * @return Json
     */
    #[Method('POST')]
    public function register(): Json
    {
        $data = $this->request->post();
        // 规则验证
        $result = $this->validate->scene('reg')->check($data);
        if(!$result){
            return $this->warn($this->validate->getError());
        }
        $data = $this->model->register($data);
        if($data) {
            return $this->success('ok',$data);
        }
        return $this->error($this->model->getErrorMsg());
    }

    /**
     * 发送验证码
     * @return Json
     */
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
