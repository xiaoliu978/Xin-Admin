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

use app\admin\model\admin\AdminModel as AdminModel;
use app\admin\validate\Admin as AdminVal;
use app\common\attribute as XinAttr;
use app\common\attribute\Auth;
use think\response\Json;

#[XinAttr\OpenApi\Tag(name: "后台管理员", description: "
    Controller： 后台管理员 \n
    Author: 小刘同学 <2302563948@qq.com> \n
")]
class AdminController extends Controller
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

    #[XinAttr\OpenApi\Get(title: '获取管理员列表', path: '/admin.php/admin/list', operationId: 'admin_list', tags: ['后台管理员'], ref: '#/components/schemas/admin_model')]
    #[XinAttr\OpenApi\Delete('删除管理员','/admin.php/admin/delete', 'admin_delete', ['后台管理员'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new AdminModel();
        $this->validate = new AdminVal();
    }


    /**
     * 新增管理员
     * @return Json
     */
    #[XinAttr\OpenApi\Post(
        title: '新增管理员',
        path: '/admin.php/admin/add',
        operationId: 'admin_add',
        tags: ['后台管理员'],
        bodyRef: '#/components/schemas/admin_model'
    )]
    #[XinAttr\Auth('add')]
    #[XinAttr\Method('POST')]
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
     * 编辑
     * @return Json
     */
    #[XinAttr\OpenApi\Put(
        title: '编辑管理员',
        description: '编辑管理员',
        path: '/admin.php/admin/edit',
        operationId: 'admin_edit',
        tags: ['后台管理员'],
        ref: '#/components/schemas/admin_model'
    )]
    #[XinAttr\Auth('edit')]
    #[XinAttr\Method('PUT')]
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
    #[XinAttr\OpenApi\Put(
        title: '修改管理员密码',
        description: '修改管理员密码',
        path: '/admin.php/admin/updatePassword',
        operationId: 'admin_updatePassword',
        tags: ['后台管理员'],
        body: [
            ['id', '用户ID', 'int'],
            ['password', '密码', 'string'],
            ['rePassword', '确认密码', 'string']
        ]
    )]
    #[XinAttr\Auth('updatePwd')]
    #[XinAttr\Method('PUT')]
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
    #[XinAttr\OpenApi\Put(
        title: '修改管理员信息',
        description: '修改管理员信息',
        path: '/admin.php/admin/updateAdmin',
        operationId: 'admin_updateAdmin',
        tags: ['后台管理员'],
        body: [
            ['username', '用户ID', 'int'],
            ['mobile', '手机号', 'string'],
            ['nickname', '昵称', 'string'],
            ['email', '邮箱', 'string'],
            ['avatar_id', '头像ID', 'int']
        ]
    )]
    #[XinAttr\Auth]
    #[XinAttr\Method('PUT')]
    public function updateAdmin(): Json
    {
        $data = $this->request->param();
        if (!$this->validate->scene('updateAdmin')->check($data)) {
            return $this->warn($this->validate->getError());
        }
        $user_id = Auth::getAdminId();
        $model = $this->model->findOrEmpty($user_id);
        $model->allowField(['mobile', 'nickname', 'email', 'avatar_id'])->save($data);
        return $this->success('ok');
    }


}