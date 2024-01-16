<?php
declare (strict_types=1);
namespace app\admin\controller\user;

use app\api\validate\user\UserGroup as UserGroupVal;
use app\common\attribute\Auth;
use app\common\controller\Controller as Controller;
use app\common\model\user\UserGroup as UserGroupModel;
use app\common\model\user\UserGroupRule as UserGroupRuleModel;
use Exception;
use think\Model;
use think\response\Json;

#[Auth]
class UserGroup extends Controller
{

    protected string $authName = 'user.group';

    protected array $searchField = [
        'id'          => '=',
        'name'        => 'like',
        'pid'         => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];
    
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
    #[Auth('list')]
    public function list(): Json
    {
        $rootNode = $this->model->where('pid',0)->paginate([
            'page' => 1,
            'list_rows' => 100
        ])->toArray();
        foreach ($rootNode['data'] as &$item){
            $this->parentNode($item, $this->model);
        }
        return $this->success('ok',$rootNode);
    }

    /**
     * @param $node
     * @param Model $model
     * @return void
     * @throws Exception
     */
    public function parentNode(&$node, Model $model): void
    {
        $childNode = $model->where('pid',$node['id'])->select()->toArray();
        if(!count($childNode)){
            return;
        }
        foreach ($childNode as &$item){
            $this->parentNode($item, $model);
        }
        $node['children'] = $childNode;
    }

    /**
     * 获取菜单节点
     * @return Json
     * @throws Exception
     */
    public function getGroupPid(): Json
    {
        $rootNode = $this->model
            ->field('id as value,name as label')
            ->where('pid',0)
            ->paginate([
                'page' => 1,
                'list_rows' => 100
            ])->toArray();
        foreach ($rootNode['data'] as &$item){
            $this->getGroupPidNode($item, $this->model);
        }
        return $this->success('ok',$rootNode);
    }

    /**
     * @param $node
     * @param Model $model
     * @return void
     * @throws Exception
     */
    public function getGroupPidNode(&$node, Model $model): void
    {
        $childNode = $model
            ->field('id as value,name as label')
            ->where('pid',$node['value'])
            ->select()
            ->toArray();
        if(!count($childNode)){
            return;
        }
        foreach ($childNode as &$item){
            $this->getGroupPidNode($item, $model);
        }
        $node['children'] = $childNode;
    }

    /**
     * 获取分组权限
     */
    public function getGroupRule(): Json
    {
        $params = $this->request->param();
        if(!isset($params['group_id'])){
            return $this->warn('请选择管理分组');
        }
        $group = new UserGroupRuleModel();
        $rules = $group->field('rule_id')->where('group_id',$params['group_id'])->select()->toArray();

        return $this->success('ok',array_column($rules,'rule_id'));
    }

    /**
     * 设置分组权限
     * @return Json
     * @throws Exception
     */
    public function setGroupRule(): Json
    {
        $params = $this->request->param();
        if(!isset($params['id'])){
            return $this->warn('请选择管理分组');
        }
        $group = $this->model->where('id',$params['id'])->find();
        if(!$group){
            return $this->warn('用户组不存在');
        }
        $group->roles()->detach();
        $group->roles()->saveAll($params['rule_ids']);

        return $this->success('ok');
    }

}