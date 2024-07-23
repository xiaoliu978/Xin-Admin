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

use app\admin\controller\Controller;
use app\admin\validate\MoneyLog as MoneyLogVal;
use app\common\attribute as XinAttr;
use app\common\model\user\UserModel;
use app\common\model\user\UserMoneyLogModel as MoneyLogModel;
use think\response\Json;

class UserMoneyLogController extends Controller
{

    protected string $authName = 'user.moneyLog';


    #[XinAttr\OpenApi\Put(title: '编辑用户余额记录', path: '/admin.php/user.user_money_log/edit', operationId: 'user_money_log_edit', tags: ['后台用户'], ref: '#/components/schemas/user_money_log_model')]
    #[XinAttr\OpenApi\Delete(title: '删除用户余额记录', path: '/admin.php/user.user_money_log/delete', operationId: 'user_money_log_delete', tags: ['后台用户'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new MoneyLogModel();
        $this->validate = new MoneyLogVal();
    }

    #[XinAttr\OpenApi\Get(
        title: '用户余额记录列表',
        path: '/admin.php/user.user_money_log/list',
        operationId: 'user_money_log_list',
        tags: ['后台用户'],
        ref: '#/components/schemas/user_money_log_model'
    )]
    #[XinAttr\Auth('list')]
    #[XinAttr\Method('GET')]
    public function list(): Json
    {
        list($where, $paginate) = $this->buildSearch();
        $list = $this->model
            ->with('user')
            ->where($where)
            ->paginate($paginate)
            ->toArray();
        return $this->success($list);
    }

    #[XinAttr\OpenApi\Post(
        title: '新增用户余额变动记录',
        path: '/admin.php/user.user_money_log/add',
        operationId: 'user_money_log_add',
        tags: ['后台用户'],
        body: [
            ['id', '用户ID', 'int'],
            ['money', '变动余额', 'int'],
            ['remark', '备注', 'string']
        ]
    )]
    #[XinAttr\Auth('add')]
    #[XinAttr\Method('POST')]
    public function add(): Json
    {
        $data = $this->request->post();
        if (!$this->validate->scene('add')->check($data)) {
            return $this->error($this->validate->getError());
        }
        $userModel = new UserModel();
        if ($data['money'] > 0) {
            $userModel->setIncMoney($data['id'], abs($data['money']), $data['remark'], '0', []);
        } else {
            $userModel->setDecMoney($data['id'], abs($data['money']), $data['remark'], '0', []);
        }
        return $this->success();

    }

}