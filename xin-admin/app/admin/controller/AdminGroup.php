<?php
declare (strict_types=1);
namespace app\admin\controller;

use app\common\controller\AdminController as Controller;
use app\admin\model\AdminGroup as AdminGroupModel;
use app\admin\validate\AdminGroup as AdminGroupVal;
class AdminGroup extends Controller
{

    protected array $allowAction = [];
    protected array $searchField = [
        'id' => '=',
        'name'=> 'like',
        'pid' => '=',
        'status' => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];
    
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new AdminGroupModel();
        $this->validate = new AdminGroupVal();
    }

}