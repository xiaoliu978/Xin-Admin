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

use app\admin\model\admin\AdminGroupModel as AdminGroupModel;
use app\admin\validate\AdminGroup as AdminGroupVal;
use app\common\attribute as XinAttr;
use Exception;
use think\response\Json;

class AdminGroupController extends Controller
{

    protected string $authName = 'admin.group';

    protected array $searchField = [
        'id' => '=',
        'name' => 'like',
        'pid' => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];


    #[XinAttr\OpenApi\Post(title: '新增管理员分组', path: '/admin.php/admin_group/add', operationId: 'admin_group_add', tags: ['后台管理员'], bodyRef: '#/components/schemas/admin_group_model')]
    #[XinAttr\OpenApi\Put(title: '编辑管理员分组', path: '/admin.php/admin_group/edit', operationId: 'admin_group_edit', tags: ['后台管理员'], ref: '#/components/schemas/admin_group_model')]
    #[XinAttr\OpenApi\Delete(title: '删除管理员分组',path: '/admin.php/admin_group/delete', operationId: 'admin_group_delete', tags: ['后台管理员'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new AdminGroupModel();
        $this->validate = new AdminGroupVal();
    }

    /**
     * 查询
     * @return Json
     * @throws Exception
     */
    #[XinAttr\OpenApi\Get(
        title: '获取管理员分组列表',
        description: '获取管理员分组列表',
        path: '/admin.php/admin_group/list',
        operationId: 'admin_group_list',
        tags: ['后台管理员'],
        ref: '#/components/schemas/admin_group_model'
    )]
    #[XinAttr\Auth('list')]
    #[XinAttr\Method('GET')]
    public function list(): Json
    {
        $rootNode = $this->model->select()->toArray();
        $data = $this->getTreeData($rootNode);
        return $this->success(compact('data'));
    }

    /**
     * 设置分组权限
     * @return Json
     * @throws Exception
     */
    #[XinAttr\OpenApi\Post(
        title: '设置分组权限',
        description: '设置分组权限',
        path: '/admin.php/admin_group/setGroupRule',
        operationId: 'admin_group_setGroupRule',
        tags: ['后台管理员'],
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
        return $this->success();
    }
}