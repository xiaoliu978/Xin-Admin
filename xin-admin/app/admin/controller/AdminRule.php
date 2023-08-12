<?php

namespace app\admin\controller;

use app\admin\validate\AdminRule as AdminRuleVal;
use app\admin\model\AdminRule as AdminRuleModel;
use Exception;
use think\Model;
use think\response\Json;

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

    public function getRulePid(): Json
    {
        $rootNode = $this->model->field('id as value,title as label')->where('type','<>','2')->paginate([
            'page' => 1,
            'list_rows' => 100
        ])->toArray();
        return $this->success('ok',$rootNode);
    }
}