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
namespace app\admin\controller\user;

use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\Controller;
use app\common\model\user\UserMoneyLog as MoneyLogModel;
use app\admin\validate\MoneyLog as MoneyLogVal;
use think\response\Json;

class UserMoneyLog extends Controller
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