<?php

namespace app\admin\controller\system;

use app\common\attribute\Auth;
use app\common\controller\AdminController as Controller;
use app\admin\model\system\DictItem as DictItemModel;
use app\admin\validate\system\DictItem as DictItemVal;
use think\response\Json;
use app\admin\model\system\Dict as DictModel;


class DictItem extends Controller
{

    protected string $authName = 'system:dict:item';

    protected array $searchField = [
        'name'      => 'like'
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new DictItemModel();
        $this->validate = new DictItemVal();
    }

    #[Auth('list')]
    public function list(): Json
    {
        list($where, $paginate) = $this->buildSearch();
        $params = $this->request->get();
        if(!isset($params['dictId'])){
            return $this->warn('字典ID不存在');
        }

        $list = $this->model
            ->where('dict_id',$params['dictId'])
            ->where($where)
            ->paginate($paginate)
            ->toArray();
        return $this->success('ok', $list);
    }

    public function dictList(): Json
    {
        $dict = (new DictModel())->with('dictItems')->visible(['dictItems'=>['label','value','status']])->select()->toArray();
        return $this->success('ok',$dict);
    }
}