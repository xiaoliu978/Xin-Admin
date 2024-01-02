<?php
namespace app\api\controller;

use app\common\attribute\Method;
use app\common\controller\ApiController as Controller;
use app\api\model\User as UserModel;
use app\api\validate\User as UserVal;
use app\common\model\user\UserGroup;
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
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function index()
    {
        $group = (new UserGroup())->with(['roles' => function($query){
            $query->order('sort');
        }])->where('id',2)->find();
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
        $web_setting = get_setting('web');
        return $this->success('ok',compact('web_setting', 'menus'));
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


    /**
     * 用户登录
     * @return Json
     */
    #[Method('POST')]
    public function login(): Json
    {
        $data = $this->request->post();

        // 账号密码登录
        if(isset($data['loginType']) && $data['loginType'] === 'account') {
            // 规则验证
            $result = $this->validate->scene('account')->check($data);
            if(!$result){
                return $this->warn($this->validate->getError());
            }

            $data = $this->model->login($data['username'],$data['password']);
            if($data) {
                return $this->success('ok',$data);
            }
            return $this->error($this->model->getErrorMsg());
        }

        // 手机号登录
        if(isset($data['loginType']) && $data['loginType'] === 'phone') {
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
}
