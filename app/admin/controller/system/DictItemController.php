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
namespace app\admin\controller\system;

use app\admin\controller\Controller;
use app\admin\model\dict\DictItemModel as DictItemModel;
use app\admin\model\dict\DictModel as DictModel;
use app\admin\validate\system\DictItem as DictItemVal;
use think\response\Json;
use app\common\attribute as XinAttr;

class DictItemController extends Controller
{

    protected string $authName = 'system.dict.item';

    protected array $searchField = [
        'name'      => 'like'
    ];


    #[XinAttr\OpenApi\Post(title: '新增字典项', path: '/admin.php/system.dict_item/add', operationId: 'dict_item_add', tags: ['系统设置'], bodyRef: '#/components/schemas/dict_item_model')]
    #[XinAttr\OpenApi\Put(title: '编辑字典项', path: '/admin.php/system.dict_item/edit', operationId: 'dict_item_edit', tags: ['系统设置'], ref: '#/components/schemas/dict_item_model')]
    #[XinAttr\OpenApi\Delete(title: '删除字典项', path: '/admin.php/system.dict_item/delete',operationId: 'dict_item_delete', tags: ['系统设置'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new DictItemModel();
        $this->validate = new DictItemVal();
    }

    #[XinAttr\OpenApi\Get(
        title: '获取字典项列表',
        path: '/admin.php/system.dict_item/list',
        operationId: 'dict_item_list',
        tags: ['系统设置'],
        ref: '#/components/schemas/dict_item_model',
        params: [
            ['dictId','字典ID','int']
        ]
    )]
    #[XinAttr\Auth('list')]
    public function list(): Json
    {
        list($where, $paginate, $order) = $this->buildSearch();
        $params = $this->request->get();
        if(!isset($params['dictId'])){
            return $this->warn('字典ID不存在');
        }

        $list = $this->model
            ->where('dict_id',$params['dictId'])
            ->where($where)
            ->order($order)
            ->paginate($paginate)
            ->toArray();
        return $this->success($list);
    }

    #[XinAttr\OpenApi\Get(
        title: '获取字典',
        path: '/admin.php/system.dict_item/dictList',
        operationId: 'dict_item_dictList',
        tags: ['系统设置'],
        ref: '#/components/schemas/dict_item_model',
    )]
    public function dictList(): Json
    {
        $dict = (new DictModel())->with('dictItems')->visible(['dictItems'=>['label','value','status']])->select()->toArray();
        return $this->success($dict);
    }
}