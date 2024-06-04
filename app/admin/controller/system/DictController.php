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
use app\admin\model\dict\DictModel as DictModel;
use app\admin\validate\system\Dict as DictVal;
use app\common\attribute as XinAttr;

#[XinAttr\OpenApi\Tag(name: "系统设置", description: "
    Controller： 系统设置 \n
    Author: 小刘同学 <2302563948@qq.com> \n
")]
class DictController extends Controller
{
    protected string $authName = 'system.dict';

    protected array $searchField = [
        'id'            => '=',
        'name'          => 'like',
        'code'          => '=',
        'create_time'   => 'date',
        'update_time'   => 'date'
    ];

    #[XinAttr\OpenApi\Get(title: '获取字典列表', path: '/admin.php/system.dict/list', operationId: 'dict_list', tags: ['系统设置'], ref: '#/components/schemas/dict_model')]
    #[XinAttr\OpenApi\Post(title: '新增字典', path: '/admin.php/system.dict/add', operationId: 'dict_add', tags: ['系统设置'], bodyRef: '#/components/schemas/dict_model')]
    #[XinAttr\OpenApi\Put(title: '编辑字典', path: '/admin.php/system.dict/edit', operationId: 'dict_edit', tags: ['系统设置'], ref: '#/components/schemas/dict_model')]
    #[XinAttr\OpenApi\Delete(title: '删除字典', path: '/admin.php/system.dict/delete',operationId: 'dict_delete', tags: ['系统设置'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new DictModel();
        $this->validate = new DictVal();
    }
}