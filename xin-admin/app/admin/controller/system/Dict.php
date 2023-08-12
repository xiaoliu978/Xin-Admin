<?php

namespace app\admin\controller\system;

use app\admin\controller\Controller;
use app\admin\model\system\Dict as DictModel;
use app\admin\validate\system\Dict as DictVal;

class Dict extends Controller
{
    protected array $searchField = [
        'id'        => '=',
        'name'      => 'like',
        'code'      => '=',
        'create_time' => 'date',
        'update_time' => 'date'
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new DictModel();
        $this->validate = new DictVal();
    }
}