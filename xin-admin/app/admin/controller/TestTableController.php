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
namespace app\admin\controller;

use app\admin\model\TestTableModel as TestTableModel;
use app\admin\validate\TestTable as TestTableVal;
use app\common\attribute as XinAttr;

#[XinAttr\OpenApi\Tag(name: "测试控制器", description: "
    Controller： 测试控制器 \n
    File： app\admin\controller\TestTableController \n
    Auth： TestTable \n
    Author: 小刘同学 <2302563948@qq.com> \n
")]
class TestTableController extends Controller
{

    protected string $authName = 'TestTable';

    /**
     * 字段查询表达式
     */
    protected array $searchField = [
        'id' => '=',
        'name' => 'like',
        'title' => 'like',
        'star' => '=',
        'url' => 'like',
        'email' => 'like',
        'caty' => 'like',
        'create_time' => 'date',
        'update_time' => 'date',
    ];

    #[XinAttr\OpenApi\Get(title: '查询列表', path: '/admin.php/test_table/list', operationId: 'test_table_list', tags: ['测试控制器'], ref: '#/components/schemas/test_table_model')]
    #[XinAttr\OpenApi\Post(title: '新增', path: '/admin.php/test_table/add', operationId: 'test_table_add', tags: ['测试控制器'], bodyRef: '#/components/schemas/test_table_model')]
    #[XinAttr\OpenApi\Put(title: '编辑', path: '/admin.php/test_table/edit', operationId: 'test_table_edit', tags: ['测试控制器'], ref: '#/components/schemas/test_table_model')]
    #[XinAttr\OpenApi\Delete(title: '删除', path: '/admin.php/test_table/delete',operationId: 'test_table_delete', tags: ['测试控制器'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new TestTableModel();
        $this->validate = new TestTableVal();
    }

}