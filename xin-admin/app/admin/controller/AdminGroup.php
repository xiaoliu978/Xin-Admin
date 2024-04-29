<?php
declare (strict_types=1);

namespace app\admin\controller;

use app\admin\model\AdminGroup as AdminGroupModel;
use app\admin\validate\AdminGroup as AdminGroupVal;
use app\common\attribute\Auth;
use app\common\controller\Controller as Controller;
use Exception;
use think\response\Json;

#[Auth]
class AdminGroup extends Controller
{

    protected string $authName = 'admin.group';

    protected array $searchField = [
        'id' => '=',
        'name' => 'like',
        'pid' => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new AdminGroupModel();
        $this->validate = new AdminGroupVal();
    }

    /**
     * @return Json
     * @throws Exception
     */
    #[Auth('list')]
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