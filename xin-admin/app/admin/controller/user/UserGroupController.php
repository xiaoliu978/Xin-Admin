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
namespace app\admin\controller\user;

use app\admin\controller\Controller;
use app\api\validate\user\UserGroup as UserGroupVal;
use app\common\model\user\UserGroupModel as UserGroupModel;
use Exception;
use think\response\Json;
use app\common\attribute as XinAttr;

class UserGroupController extends Controller
{

    protected string $authName = 'user.group';

    protected array $searchField = [
        'id' => '=',
        'name' => 'like',
        'pid' => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];


    #[XinAttr\OpenApi\Post(title: '新增用户分组', path: '/admin.php/user.user_group/add', operationId: 'user_group_add', tags: ['后台用户'], bodyRef: '#/components/schemas/user_group_model')]
    #[XinAttr\OpenApi\Put(title: '编辑用户分组',path: '/admin.php/user.user_group/edit', operationId: 'user_group_edit', tags: ['后台用户'], ref: '#/components/schemas/user_group_model')]
    #[XinAttr\OpenApi\Delete(title: '删除用户分组', path: '/admin.php/user.user_group/delete',operationId: 'user_group_delete',tags: ['后台用户'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserGroupModel();
        $this->validate = new UserGroupVal();
    }

    /**
     * @return Json
     * @throws Exception
     */
    #[XinAttr\OpenApi\Get(
        title: '用户分组列表',
        path: '/admin.php/user.user_group/list',
        operationId: 'user_group_list',
        tags: ['后台用户'],
        ref: '#/components/schemas/user_group_model'
    )]
    #[XinAttr\Auth('list')]
    public function list(): Json
    {
        $rootNode = $this->model->select()->toArray();
        $data = $this->getTreeData($rootNode);
        return $this->success('ok', compact('data'));
    }

    /**
     * 设置分组权限
     * @return Json
     * @throws Exception
     */
    #[XinAttr\OpenApi\Post(
        title: '设置分组权限',
        description: '设置分组权限',
        path: '/admin.php/user.user_group/setGroupRule',
        operationId: 'user_group_setGroupRule',
        tags: ['后台用户'],
        body: [
            ['id', '设置分组ID', 'int'],
            ['rule_ids', '权限ID', 'string']
        ]
    )]
    #[XinAttr\Auth]
    #[XinAttr\Method('POST')]
    public function setGroupRule(): Json
    {
        $params = $this->request->param();
        if (!isset($params['id'])) {
            return $this->warn('请选择管理分组');
        }
        $group = $this->model->where('id', $params['id'])->findOrEmpty();
        if ($group->isEmpty()) {
            return $this->warn('用户组不存在');
        }
        $group->rules = implode(',', $params['rule_ids']);
        $group->save();
        return $this->success('ok');
    }
}