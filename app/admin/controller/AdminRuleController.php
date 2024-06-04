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

use app\admin\model\admin\AdminRuleModel as AdminRuleModel;
use app\admin\validate\AdminRule as AdminRuleVal;
use app\common\attribute as XinAttr;
use Exception;
use think\db\exception\DbException;
use think\response\Json;

class AdminRuleController extends Controller
{
    protected array $searchField = [
        'id' => '=',
        'pid' => '=',
        'type' => '=',
        'name' => 'like',
        'key' => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];

    protected string $authName = 'admin.rule';


    #[XinAttr\OpenApi\Post(title: '新增管理员权限', path: '/admin.php/admin_rule/add', operationId: 'admin_rule_add', tags: ['后台管理员'], bodyRef: '#/components/schemas/admin_rule_model')]
    #[XinAttr\OpenApi\Put(title: '修改管理员权限', path: '/admin.php/admin_rule/edit', operationId: 'admin_rule_edit', tags: ['后台管理员'], ref: '#/components/schemas/admin_rule_model')]
    #[XinAttr\OpenApi\Delete(title: '删除管理员权限', path: '/admin.php/admin_rule/delete',operationId: 'admin_rule_delete', tags: ['后台管理员'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new AdminRuleModel();
        $this->validate = new AdminRuleVal();
    }

    /**
     * 查询列表
     * @return Json
     * @throws DbException
     */
    #[XinAttr\OpenApi\Get(
        title: '获取管理员权限列表',
        description: '获取管理员权限列表',
        path: '/admin.php/admin_rule/list',
        operationId: 'admin_rule_list',
        tags: ['后台管理员'],
        ref: '#/components/schemas/admin_rule_model'
    )]
    #[XinAttr\Auth('list')]
    public function list(): Json
    {
        $rootNode = $this->model->order('sort', 'desc')->select()->toArray();
        $data = $this->getTreeData($rootNode);
        return $this->success('ok', compact('data'));
    }

    /**
     * 获取菜单节点
     * @return Json
     * @throws Exception
     */
    #[XinAttr\OpenApi\Get(
        title: '获取权限菜单节点',
        description: '获取菜单节点，用于选择父节点',
        path: '/admin.php/admin_rule/getRulePid',
        operationId: 'admin_rule_getRulePid',
        tags: ['后台管理员']
    )]
    #[XinAttr\Auth]
    public function getRulePid(): Json
    {
        $rootNode = $this->model
            ->where('type', '<>', '2')
            ->order('sort', 'desc')
            ->select()
            ->toArray();
        $data = $this->getTreeData($rootNode);
        return $this->success('ok', compact('data'));
    }
}