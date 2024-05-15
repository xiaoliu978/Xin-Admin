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

use app\common\controller\Controller as Controller;
use app\admin\model\TestTable as TestTableModel;
use app\admin\validate\TestTable as TestTableVal;

class TestTable extends Controller
{

    protected string $authName = 'TestTable';

    /**
     * 字段查询表达式
     */
    protected array $searchField = [
        'id'=> '=',
        'name'=> 'like',
        'title'=> 'like',
        'star'=> '=',
        'url'=> 'like',
        'email'=> 'like',
        'caty'=> 'like',
        'create_time'=> 'date',
        'update_time'=> 'date',
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new TestTableModel();
        $this->validate = new TestTableVal();
    }
}