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
use app\api\validate\user\UserRule as UserRuleVal;
use app\common\attribute as XinAttr;
use app\common\model\user\UserRuleModel as UserRuleModel;
use Exception;
use think\response\Json;

class UserRuleController extends Controller
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

    protected string $authName = 'user.rule';

    #[XinAttr\OpenApi\Post(title: '新增用户权限', path: '/admin.php/user.user_rule/add', operationId: 'user_rule_add', tags: ['后台用户'], bodyRef: '#/components/schemas/user_rule_model')]
    #[XinAttr\OpenApi\Put(title: '修改用户权限', path: '/admin.php/user.user_rule/edit', operationId: 'user_rule_edit', tags: ['后台用户'], ref: '#/components/schemas/user_rule_model')]
    #[XinAttr\OpenApi\Delete(title: '删除用户权限', path: '/admin.php/user.user_rule/delete', operationId: 'user_rule_delete', tags: ['后台用户'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserRuleModel();
        $this->validate = new UserRuleVal();
    }


    /**
     * @return Json
     * @throws Exception
     */
    #[XinAttr\OpenApi\Get(
        title: '获取用户权限列表',
        path: '/admin.php/user.user_rule/list',
        operationId: 'user_rule_list',
        tags: ['后台用户'],
        ref: '#/components/schemas/user_rule_model'
    )]
    #[XinAttr\Auth('list')]
    public function list(): Json
    {
        $rootNode = $this->model->order('sort', 'desc')->select()->toArray();
        $data = $this->getTreeData($rootNode);
        return $this->success(compact('data'));
    }

    /**
     * 获取菜单节点
     * @return Json
     * @throws Exception
     */
    #[XinAttr\OpenApi\Get(
        title: '获取用户权限父ID列表',
        path: '/admin.php/user.user_rule/getRulePid',
        operationId: 'user_rule_getRulePid',
        tags: ['后台用户'],
        ref: '#/components/schemas/user_rule_model'
    )]
    #[XinAttr\Auth('list')]
    public function getRulePid(): Json
    {
        $rootNode = $this->model
            ->where('type', '<>', '2')
            ->order('sort', 'desc')
            ->select()
            ->toArray();
        $data = $this->getTreeData($rootNode);
        return $this->success(compact('data'));
    }
}