<?php
namespace app\admin\controller\user;

use app\admin\validate\User as UserVal;
use app\common\controller\AdminController as Controller;
use app\common\model\User as UserModel;

class User extends Controller
{

    protected string $authName = 'user';

    protected array $searchField = [];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserModel();
        $this->validate = new UserVal();
    }
}