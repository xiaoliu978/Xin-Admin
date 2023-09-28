<?php

namespace app\api\controller;

use app\api\model\User as UserModel;
use app\api\validate\User as UserVal;
use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\ApiController;
use app\common\library\Token;
use app\common\model\user\UserGroup;
use think\response\Json;

class User extends ApiController
{

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserModel();
        $this->validate = new UserVal();
    }

    #[Auth,Method('GET')]
    public function getUserInfo(): Json
    {
        $info = (new Auth)->getUserInfo();
        // 获取权限
        $group = (new UserGroup())->where('id',$info['group_id'])->find();
        $access = [];
        foreach ($group->roles as $role) {
            $access[] =  $role->key;
        }

        $group = (new UserGroup)->with(['roles' => function($query){
            $query->order('sort');
        }])->where('id',$info['group_id'])->find();
        $rules = $group->roles;
        $menus = [];
        foreach ($rules as $role) {
            if($role->type == 0){
                $menu = $this->getMenu($role);
                foreach ($rules as $childRole){
                    if($childRole->type == 1 && $childRole->pid == $role->id){
                        $childMenu = $this->getMenu($childRole);
                        $menu['children'][] = $childMenu;
                    }
                }
                $menus[] =  $menu;
            }
        }

        $layout = [
            'navTheme' => 'light',
            'colorPrimary' => '#1890ff',
            'layout' => 'top',
            'contentWidth' => 'Fluid',
            'fixedHeader' => true,
            'token' => [
                'pageContainer' => [
                    'paddingBlockPageContainerContent' => 0,
                    'paddingInlinePageContainerContent' => 0
                ]
            ],
            "fixSiderbar" => true,
            "splitMenus" => false,
            "siderMenuType" => "sub"
        ];

        return $this->success('ok',compact('info','access','menus','layout'));
    }

    /**
     * @param mixed $role
     * @return array
     */
    private function getMenu (mixed $role): array
    {
        $menu = [];
        !$role->name ?: $menu['name'] = $role->name;
        !$role->path ?: $menu['path'] = $role->path;
        !$role->component ?: $menu['component'] = $role->component;
        !$role->key ?: $menu['key'] = $role->key;
        !$role->icon ?: $menu['icon'] = $role->icon;
        return $menu;
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
            $Token->set($token,'user',$user_id);
            return $this->success('ok',compact('token'));
        }else {
            return $this->error('请先登录！',[],403);
        }
    }

    #[Auth]
    public function logout(): Json
    {
        $user_id = (new Auth())->getUserId();
        if($this->model->logout($user_id)){
            return $this->success('退出登录成功');
        } else {
            return $this->error($this->model->getErrorMsg());
        }
    }

}