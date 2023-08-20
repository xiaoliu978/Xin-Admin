<?php

namespace app\admin\controller\online;

use app\common\attribute\Auth;
use app\common\controller\AdminController as Controller;
use app\admin\model\online\OnlineTable as OnlineTableModel;
use app\admin\validate\online\OnlineTable as OnlineTableVal;

#[Auth]
class OnlineTable extends Controller
{
    protected array $searchField = [
        'table_id'      => '=',
        'table_name'    => 'like',
        'create_time'   => 'date',
        'update_time'   => 'date'
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new OnlineTableModel();
        $this->validate = new OnlineTableVal();
    }
}