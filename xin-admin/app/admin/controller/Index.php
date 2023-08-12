<?php
declare (strict_types=1);

namespace app\admin\controller;

use app\common\library\Token;
use app\admin\validate\Login as LoginVal;
use app\admin\model\Admin as AdminModel;
class Index extends Controller
{

    // 登录验证白名单
    protected array $allowAction = ['login', 'index'];


    public function index()
    {
        // $token = new Token();
        // $token->clear('admin',1);
        // $data = ['token' => $token->set('123456','admin',1,10000)];
        $data = [
            'pwd' => password_hash("123456", PASSWORD_BCRYPT)
        ];
        $data = [
            'id',
            'username' => 'like',
            'mobile'
        ];
        return $this->success('ok',$data);
    }

    public function queryUserInfo()
    {
        $token = new Token();
        $data = $token->get('f57d0e41ebdc8b9008cdb027ebddbd39f6efea15');
        return $this->success('ok',$data);
    }
    
    

}