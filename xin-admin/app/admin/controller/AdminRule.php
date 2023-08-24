<?php

namespace app\admin\controller;

use app\admin\validate\AdminRule as AdminRuleVal;
use app\admin\model\AdminRule as AdminRuleModel;
use app\common\attribute\Auth;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Model;
use think\response\Json;
use app\common\controller\AdminController as Controller;
use app\admin\model\AdminGroup as AdminGroupModel;

#[Auth]
class AdminRule extends Controller
{
    protected array $searchField = [
        'id'        => '=',
        'pid'       => '=',
        'type'      => '=',
        'title'     => 'like',
        'key'       => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];

    protected string $authName = 'admin:rule';

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
    public function getRulePid(): Json
    {
        $rootNode = $this->model
            ->field('id as value,title as label')
            ->where('type','<>','2')
            ->where('pid',0)
            ->paginate([
                'page' => 1,
                'list_rows' => 100
            ])->toArray();
        foreach ($rootNode['data'] as &$item){
            $this->getRulePidNode($item, $this->model);
        }
        return $this->success('ok',$rootNode);
    }

    /**
     * @param $node
     * @param Model $model
     * @return void
     * @throws Exception
     */
    public function getRulePidNode(&$node, Model $model): void
    {
        $childNode = $model
            ->field('id as value,title as label')
            ->where('pid',$node['value'])
            ->where('type','<>','2')
            ->select()
            ->toArray();
        if(!count($childNode)){
            return;
        }
        foreach ($childNode as &$item){
            $this->getRulePidNode($item, $model);
        }
        $node['children'] = $childNode;
    }


    /**
     * 通过管理员分组获取
     * @return Json
     * @throws Exception
     */
    public function getRuleByGroup(): Json
    {
        $params = $this->request->param();
        if(!isset($params['group_id'])){
            return $this->warn('请选择管理员分组');
        }

        $groupModel = new AdminGroupModel();
        $group = $groupModel->where('id',$params['group_id'])->find();
        if(!$group){
            return $this->warn('管理员分组不存在');
        }

        if($group['pid'] == 0){
            $rootNode = $this->model->where('pid',0)->paginate([
                'page' => 1,
                'list_rows' => 100
            ])->toArray();
            foreach ($rootNode['data'] as &$item){
                $this->parentNodeByGroup($item, $this->model);
            }
        }else {
            $parentGroupRule = $groupModel->where('id',$group['pid'])->find();
            $roles = $parentGroupRule->roles;
            $rules = [];
            foreach ($roles as $rule){
                $rules[] = $rule->id;
            }
            $where[] = ['id','in',implode(',',$rules)];
            $rootNode = $this->model->where('pid',0)->where($where)->paginate([
                'page' => 1,
                'list_rows' => 100
            ])->toArray();
            foreach ($rootNode['data'] as &$item){
                $this->parentNodeByGroup($item, $this->model,$where);
            }
        }
        return $this->success('ok',$rootNode);
    }

    /**
     * @param $node
     * @param Model $model
     * @param array $where
     * @return void
     * @throws Exception
     */
    public function parentNodeByGroup(&$node, Model $model, array $where = []): void
    {
        $childNode = $model->where('pid',$node['id'])->where($where)->select()->toArray();
        if(!count($childNode)){
            return;
        }
        foreach ($childNode as &$item){
            $this->parentNodeByGroup($item, $model, $where);
        }
        $node['children'] = $childNode;
    }
}