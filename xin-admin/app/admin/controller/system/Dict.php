<?php

namespace app\admin\controller\system;

use app\common\controller\AdminController as Controller;
use app\admin\model\system\Dict as DictModel;
use app\admin\validate\system\Setting as DictVal;

class Dict extends Controller
{
    protected string $authName = 'system.dict';

    protected array $searchField = [
        'id'            => '=',
        'name'          => 'like',
        'code'          => '=',
        'create_time'   => 'date',
        'update_time'   => 'date'
    ];

    protected array $funRule = [
        'add'      => 'system:dict:add',
        'delete'   => 'system:dict:delete',
        'edit'     => 'system:dict:edit',
        'list'     => 'system:dict:list',
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new DictModel();
        $this->validate = new DictVal();
    }
}