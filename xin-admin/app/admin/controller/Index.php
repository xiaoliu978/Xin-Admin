<?php
declare (strict_types=1);

namespace app\admin\controller;

use app\admin\model\Admin as AdminModel;
use app\admin\model\AdminRule as AdminRuleModel;
use app\admin\model\AdminGroup;
use app\admin\validate\Admin as AdminVal;
use app\common\attribute\Auth;
use app\common\library\Token;
use app\common\controller\Controller as Controller;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\response\Json;


class Index extends Controller
{

    public function initialize(): void
    {
        parent::initialize();
        $this->validate = new AdminVal();
    }

    public function index(): Json
    {
        $webSetting = get_setting('web');
        return $this->success('恭喜你已经成功安装 Xin Admin',compact('webSetting'));
    }

    public function queryUserInfo(): Json
    {
        $token = new Token();
        $data = $token->get('f57d0e41ebdc8b9008cdb027ebddbd39f6efea15');
        return $this->success('ok',$data);
    }

    /**
     * 刷新令牌
     * @return Json
     * @throws Exception
     */
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

    /**
     * 登录
     * @return Json
     */
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
            return $this->error('暂不支持此方式登录');
        }

        return $this->warn('请选择登录方式！');

    }

    /**
     * 退出登录
     * @return Json
     */
    #[Auth]
    public function logout(): Json
    {
        $user_id = Auth::getAdminId();
        $admin = new AdminModel;
        if($admin->logout($user_id)){
            return $this->success('退出登录成功');
        } else {
            return $this->error($admin->getErrorMsg());
        }
    }

    /**
     * 获取管理员信息
     * @return Json
     * @throws Exception
     */
    #[Auth]
    public function getAdminInfo(): Json
    {
        $info = Auth::getAdminInfo();
        // 获取权限
        $access = [];
        if($info['id'] == 1) {
            $roles = (new AdminRuleModel())->select()->toArray();
            $menus = (new AdminRuleModel())->where('type',0)->whereOr('type',1)->order('sort')->select()->toArray();
        }else {
            $roles = (new AdminGroup())->where('id', $info['group_id'])->find()->roles;
            // 获取一级菜单
            $menus = (new AdminGroup)->with(['roles' => function($query){
                $query->where('type',0)->whereOr('type',1)->order('sort');
            }])->where('id',$info['group_id'])->find()->roles->toArray();
        }
        foreach ($roles as $item) {
            $access[] =  $item['key'];
        }
        $menus = $this->getTreeData($menus);
        return $this->success('ok',compact('menus','access','info'));
    }


    /**
     * @param $role
     * @param $menus
     * @return void
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function childrenNode(&$role, $menus): void
    {
        $childNode = [];

        foreach($menus as &$item){
            if($item['pid'] == $role['id']){
                $this->childrenNode($item,$menus);
                $childNode[] = $item;
            }
        }
        if(!count($childNode)) return;

        $role['children'] = $childNode;
    }



}