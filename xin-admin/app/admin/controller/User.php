<?php
namespace app\admin\controller;

use app\common\controller\AdminController as Controller;
use app\common\model\User as UserModel;
use app\admin\validate\User as UserVal;

class User extends Controller
{

    protected array $searchField = [];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserModel();
        $this->validate = new UserVal();
    }
}