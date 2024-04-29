<?php
declare (strict_types=1);
namespace app\admin\controller\user;

use app\api\validate\user\UserRule as UserRuleVal;
use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\Controller as Controller;
use app\common\model\user\UserGroup as UserGroupModel;
use app\common\model\user\UserRule as UserRuleModel;
use Exception;
use think\Model;
use think\response\Json;

#[Auth]
class UserRule extends Controller
{

    protected array $searchField = [
        'id'        => '=',
        'pid'       => '=',
        'type'      => '=',
        'name'     => 'like',
        'key'       => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];

    protected string $authName = 'admin.rule';

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