<?php
namespace app\admin\controller\test;

use app\common\controller\AdminController as Controller;
use app\admin\model\test\TestTable as TestTableModel;
use app\admin\validate\test\TestTable as TestTableVal;

class TestTable extends Controller
{
    /**
     * 字段查询表达式
     */
    protected array $searchField = [
        'id'=> '=',
        'title'=> 'like',
        'number'=> '=',
        'date'=> '=',
        'money'=> '=',
        'sex'=> '=',
        'check'=> '=',
        'sex_dict'=> '=',
        'rate'=> '=',
        'op'=> '=',
        'switch'=> '=',
        'datetime'=> '=',
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