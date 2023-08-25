<?php
namespace app\admin\controller\test;

use app\common\controller\AdminController as Controller;
use app\admin\model\test\TestTable as TestTableModel;
use app\admin\validate\test\TestTable as TestTableVal;

class TestTable extends Controller
{

    protected array $searchField = [];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new TestTableModel();
        $this->validate = new TestTableVal();
    }
}