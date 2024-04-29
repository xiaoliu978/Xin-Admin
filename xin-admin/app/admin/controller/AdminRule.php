<?php

namespace app\admin\controller;

use app\admin\model\AdminRule as AdminRuleModel;
use app\admin\validate\AdminRule as AdminRuleVal;
use app\common\attribute\Auth;
use app\common\controller\Controller as Controller;
use Exception;
use think\response\Json;

#[Auth]
class AdminRule extends Controller
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

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new AdminRuleModel();
        $this->validate = new AdminRuleVal();
    }

    /**
     * @return Json
     * @throws Exception
     */
    #[Auth('list')]
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