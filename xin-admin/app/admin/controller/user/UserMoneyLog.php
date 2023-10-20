<?php

namespace app\admin\controller\user;

use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\AdminController;
use app\common\model\user\UserMoneyLog as MoneyLogModel;
use app\admin\validate\MoneyLog as MoneyLogVal;
use think\response\Json;

class UserMoneyLog extends AdminController
{

    protected string $authName = 'user.moneyLog';

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new MoneyLogModel();
        $this->validate = new MoneyLogVal();
    }

    #[Auth('list'),Method('GET')]
    public function list(): Json
    {
        list($where, $paginate) = $this->buildSearch();
        $list = $this->model
            ->with('user')
            ->where($where)
            ->paginate($paginate)
            ->toArray();
        return $this->success('ok', $list);
    }

    #[Auth('add'),Method('POST')]
    public function add(): Json
    {
        $data = $this->request->post();
        if (!$this->validate->scene('add')->check($data)) {
            return $this->error($this->validate->getError());
        }
        $userModel = new \app\common\model\User();
        if($data['money'] > 0){
            $userModel->setIncMoney($data['id'],abs($data['money']),$data['remark'],'0',[]);
        }else {
            $userModel->setDecMoney($data['id'],abs($data['money']),$data['remark'],'0',[]);
        }
        return $this->success('ok');

    }

}