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
namespace app\admin\controller;

use app\admin\model\Admin as AdminModel;
use app\admin\validate\Admin as AdminVal;
use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\Controller as Controller;
use think\response\Json;

class Admin extends Controller
{

    protected array $withModel = ['avatar'];

    protected string $authName = 'admin.list';

    protected array $searchField = [
        'id' => '=',
        'username' => '=',
        'mobile' => '=',
        'email' => '=',
        'sex' => '=',
        'nickname' => 'like'
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new AdminModel();
        $this->validate = new AdminVal();
    }


    /**
     * 基础控制器编辑方法
     * @return Json
     */
    #[Auth('add'), Method('POST')]
    public function add(): Json
    {
        $data = $this->request->param();
        if (!$this->validate->scene('add')->check($data)) {
            return $this->warn($this->validate->getError());
        }
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        $this->model->save($data);
        return $this->success('ok');
    }

    /**
     * 基础控制器编辑方法
     * @return Json
     */
    #[Auth('edit'), Method('PUT')]
    public function edit(): Json
    {
        $data = $this->request->param();
        if (!$this->validate->scene('edit')->check($data)) {
            return $this->warn($this->validate->getError());
        }
        $this->model->allowField(['nickname', 'email', 'sex', 'group_id', 'avatar', 'status'])->update($data);
        return $this->success('ok');
    }

    /**
     * 修改密码
     * @return Json
     */
    #[Auth('updatePwd'), Method('PUT')]
    public function updatePassword(): Json
    {
        $data = $this->request->param();
        if (!$this->validate->scene('updatePassword')->check($data)) {
            return $this->warn($this->validate->getError());
        }
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        $this->model->allowField(['password'])->update($data);
        return $this->success('ok');
    }

    /**
     * 修改管理员信息
     * @return Json
     */
    #[Auth, Method('PUT')]
    public function updateAdmin(): Json
    {
        $data = $this->request->param();
        if (!$this->validate->scene('updateAdmin')->check($data)) {
            return $this->warn($this->validate->getError());
        }
        $user_id = Auth::getAdminId();
        $model = $this->model->findOrEmpty($user_id);
        $model->allowField(['mobile','nickname','email','avatar_id'])->save($data);
        return $this->success('ok');
    }

}