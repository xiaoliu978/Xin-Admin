<?php
declare (strict_types=1);
namespace app\admin\controller;

use app\admin\model\AdminGroup;
use app\common\attribute\Auth;
use app\common\controller\AdminController as Controller;
use app\admin\model\Admin as AdminModel;
use app\admin\validate\Admin as AdminVal;
use app\common\library\Token;
use Exception;
use think\response\Json;

#[Auth]
class Admin extends Controller
{

    protected string $authName = 'admin:list';
    protected array $allowAction = ['refreshToken','login'];
    protected array $searchField = [
        'id'        => '=',
        'username'  => '=',
        'mobile'    => '=',
        'email'     => '=',
        'sex'       => '=',
        'nickname'  => 'like'
    ];
    
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new AdminModel();
        $this->validate = new AdminVal();
    }

    #[Auth]
    public function getAdminInfo(): Json
    {
        $user_id = $this->getAdminId();
        $admin = new AdminModel;
        $userinfo = $admin->where('id',$user_id)->find();
        return $this->success('ok',compact('userinfo'));
    }

    public function refreshToken(): Json
    {
        $token =  $this->request->header('Authorization');
        $reToken = $this->request->header('Refreshtoken');
        if($this->request->isPost() && $reToken){
            $Token = new Token;
            $Token->delete($token);
            $user_id = $Token->get($reToken)['user_id'];
            $token =  md5(random_bytes(10));
            $Token->set($token,'admin',$user_id);
            return $this->success('ok',compact('token'));
        }else {
            return $this->error('请先登录！',[],403);
        }
    }

    public function login(): Json
    {
        if(!$this->request->isPost()){
            return $this->warn('请求方法错误！');
        }
        
        $loginType = $this->request->post('loginType');
        
        // 账号密码登录
        if(isset($loginType) && $loginType === 'account') {
            $username = $this->request->post('username');
            $password = $this->request->post('password');
            // 规则验证
            $result = $this->validate->scene('account')->check([
                'username' => $username,
                'password' => $password
            ]);
            if(!$result){
                return $this->warn($this->validate->getError());
            }
            
            $model = new AdminModel();
            $data = $model->login($username,$password);
            if($data) {
                return $this->success('ok',$data);
            }
            return $this->error($model->getErrorMsg());
        }

        // 手机号登录
        if(isset($loginType) && $loginType === 'phone') {
            $mobile = $this->request->post('mobile');
            $captcha = $this->request->post('captcha');

            $result = $this->validate->scene('phone')->check([
                'mobile' => $mobile,
                'captcha' => $captcha
            ]);

            if(!$result){
                return $this->warn($this->validate->getError());
            }
            return $this->success('phone ok');
        }

        return $this->warn('请选择登录方式！');
        
    }

    public function logout(): Json
    {
        $user_id = $this->getAdminId();
        $admin = new AdminModel;
        if($admin->logout($user_id)){
            return $this->success('退出登录成功');
        } else {
            return $this->error($admin->getErrorMsg());
        }
    }

    /**
     * 基础控制器编辑方法
     * @return Json
     */
    #[Auth('edit')]
    public function edit(): Json
    {
        $data = $this->request->param();
        if (!$this->validate->scene('edit')->check($data)) {
            return $this->warn($this->validate->getError());
        }
        $data['id'] = $this->getAdminId();
        $this->model->update($data);
        return $this->success('ok');
    }

    /**
     * @return Json
     * @throws Exception
     */
    #[Auth]
    public function getAdminRule(): Json
    {
        $adminInfo = (new Auth)->getAdminInfo();
        // 获取用户所有权限
        $group = (new AdminGroup())->where('id',$adminInfo['group_id'])->find();
        $access = [];
        foreach ($group->roles as $role) {
            $access[] =  $role->key;
        }
        return $this->success('ok',compact('access'));
    }
    

}