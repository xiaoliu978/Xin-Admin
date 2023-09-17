<?php

namespace app\admin\controller\system;

use app\admin\model\system\SettingGroup as SettingGroupModel;
use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\AdminController;
use app\admin\model\system\Setting as SettingModel;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Model;
use think\response\Json;
use app\admin\validate\system\Setting as SettingVal;

class Setting extends AdminController
{

    protected array $searchField = [
        'group_id' => '='
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new SettingModel();
        $this->validate = new SettingVal();
    }


    /**
     * 新增分组
     * @return Json
     */
    #[Auth('addGroup'),Method('POST')]
    public function addGroup(): Json
    {
        $params = $this->request->param();
        if (!$this->validate->scene('addGroup')->check($params)) {
            return $this->error($this->validate->getError());
        }
        $settingGroupModel = new SettingGroupModel();
        $settingGroupModel->save($params);
        return $this->success('ok');
    }

    /**
     * 查询设置分组
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    #[Auth('querySettingGroup'),Method('GET')]
    public function querySettingGroup(): Json
    {
        $settingGroupModel = new SettingGroupModel();
        $rootGroup = $settingGroupModel->where('pid',0)->select()->toArray();
        foreach ($rootGroup as &$item){
            $this->buildGroupNode($item, $settingGroupModel);
        }
        return $this->success('ok',$rootGroup);
    }

    /**
     * @param $node
     * @param Model $model
     * @return void
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    private function buildGroupNode(&$node, Model $model): void
    {
        if($node['type'] == 2){
            return;
        }
        $childNode = $model
            ->where('pid',$node['id'])
            ->select()
            ->toArray();
        if(!count($childNode)){
            return;
        }
        foreach ($childNode as &$item){
            $this->buildGroupNode($item, $model);
        }
        $node['children'] = $childNode;
    }

    /**
     * 查询设置父 ID
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    #[Auth('querySettingPid'),Method('GET')]
    public function querySettingPid(): Json
    {
        $settingGroupModel = new SettingGroupModel();
        $rootGroup = $settingGroupModel->where('type','=',1)->where('pid','=',0)->field('id as value,title,type')->select()->toArray();
        foreach ($rootGroup as &$item){
            $this->buildGroupPidNode($item, $settingGroupModel);
        }
        return $this->success('ok',$rootGroup);
    }

    /**
     * @param $node
     * @param Model $model
     * @return void
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    private function buildGroupPidNode(&$node, Model $model): void
    {
        if($node['type'] == 2){
            return;
        }
        $childNode = $model
            ->field('id as value,title,type')
            ->where('pid',$node['value'])
            ->where('type','=',1)
            ->select()
            ->toArray();
        if(!count($childNode)){
            return;
        }
        foreach ($childNode as &$item){
            $this->buildGroupPidNode($item, $model);
        }
        $node['children'] = $childNode;
    }

}