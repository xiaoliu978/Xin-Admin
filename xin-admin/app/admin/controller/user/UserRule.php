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
        $rootNode = $this->model->where('pid',0)->order('sort')->paginate([
            'page' => 1,
            'list_rows' => 100
        ])->toArray();
        foreach ($rootNode['data'] as &$item){
            $this->parentNode($item, $this->model);
        }
        return $this->success('ok',$rootNode);
    }

    #[Auth('add'),Method('POST')]
    public function add(): Json
    {
        $data = $this->request->post();
        if (!$this->validate->scene('add')->check($data)) {
            return $this->error($this->validate->getError());
        }
        if($data['type'] == '1' || $data['type'] == '0'){
            $data['key'] = str_replace('/','.',substr($data['path'],1));
        }
        $this->model->save($data);
        return $this->success('ok');
    }

    #[Auth('edit'),Method('PUT')]
    public function edit(): Json
    {
        $data = $this->request->param();
        if (!$this->validate->scene('edit')->check($data)) {
            return $this->warn($this->validate->getError());
        }
        if($data['type'] == '1'){
            $data['key'] = str_replace('/','.',substr($data['path'],1));
        }
        if($data['type'] == '0'){
            $data['pid'] = 0;
        }
        $this->model->update($data);
        return $this->success('ok',$data);
    }


    /**
     * @param $node
     * @param Model $model
     * @return void
     * @throws Exception
     */
    public function parentNode(&$node, Model $model): void
    {
        $childNode = $model->where('pid',$node['id'])->order('sort')->select()->toArray();
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
            ->field('id as value,name as label')
            ->where('type','<>','2')
            ->where('pid',0)
            ->order('sort')
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
            ->field('id as value,name as label')
            ->where('pid',$node['value'])
            ->where('type','<>','2')
            ->order('sort')
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

        $groupModel = new UserGroupModel();
        $group = $groupModel->where('id',$params['group_id'])->find();
        if(!$group){
            return $this->warn('管理员分组不存在');
        }

        if($group['pid'] == 0){
            $rootNode = $this->model->field('*,name as title')->where('pid',0)->paginate([
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
            $rootNode = $this->model->field('*,name as title')->where('pid',0)->where($where)->paginate([
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
        $childNode = $model->where('pid',$node['id'])->field('*,name as title')->where($where)->select()->toArray();
        if(!count($childNode)){
            return;
        }
        foreach ($childNode as &$item){
            $this->parentNodeByGroup($item, $model, $where);
        }
        $node['children'] = $childNode;
    }

}