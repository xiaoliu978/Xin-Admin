<?php

namespace app\api\model;

use app\common\library\Token;
use app\common\model\BaseModel;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

class User extends BaseModel
{

    protected $hidden = [
        'password', 'create_time', 'update_time', 'status'
    ];

    /**
     * @description: 模型登录
     * @param string $username 用户名
     * @param string $password 密码
     * @return bool | array
     */
    public function login(string $username, string $password): bool | array
    {
        try {
            $user = $this->where('username',$username)->find();
            if(!$user) {
                $this->setErrorMsg('用户不存在');
                return false;
            }
            // 验证密码
            if(!password_verify($password,$user['password'])){
                $this->setErrorMsg('密码错误');
                return false;
            }

            $token = new Token();
            $token->clear('admin',$user['id']);
            $token->clear('admin-refresh',$user['id']);

            $data = [];
            $data['refresh_token'] =  md5(random_bytes(10));
            $data['token'] =  md5(random_bytes(10));
            $data['id'] = $user['id'];
            if(
                $token->set($data['token'],'user',$user['id'],600) &&
                $token->set($data['refresh_token'],'user-refresh',$user['id'],2592000)
            ) {
                return $data;
            } else {
                $this->setErrorMsg('token 生成失败');
                return false;
            }

        }catch(\Exception $e){
            $this->setErrorMsg($e->getMessage());
            return false;
        }

    }

    public function register($data): bool|array
    {
        try {
            $user = $this->where('username',$data['username'])->find();
            if($user) {
                $this->setErrorMsg('用户名被占用');
                return false;
            }
            $user = $this->where('email',$data['email'])->find();
            if($user) {
                $this->setErrorMsg('注册邮箱被占用');
                return false;
            }
            $data['password'] = password_hash($data['password'],PASSWORD_DEFAULT);

            $user = self::create($data,['username','nickname','password','mobile','email']);
            if($user){
                $token = new Token();
                $token->clear('user',$user['id']);
                $token->clear('user-refresh',$user['id']);
                $data = [];
                $data['refresh_token'] =  md5(random_bytes(10));
                $data['token'] =  md5(random_bytes(10));
                $data['id'] = $user['id'];
                if(
                    $token->set($data['token'],'user',$user['id'],600) &&
                    $token->set($data['refresh_token'],'user-refresh',$user['id'],2592000)
                ) {
                    return $data;
                } else {
                    $this->setErrorMsg('token 生成失败');
                    return false;
                }
            }else {
                $this->setErrorMsg('注册失败');
                return false;
            }

        }catch(\Exception $e){
            $this->setErrorMsg('系统错误'.$e->getMessage());
            return false;
        }

    }

    /**
     * @description: 退出登录
     * @param {*} $user_id
     * @return bool {*}
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function logout($user_id): bool
    {
        $user = $this->where('id',$user_id)->find();
        if(!$user) {
            $this->setErrorMsg('用户不存在');
            return false;
        }
        try {
            $token = new Token;
            $token->clear('user',$user['id']);
            $token->clear('user-refresh',$user['id']);
            return true;
        }catch(\Exception $e){
            $this->setErrorMsg($e->getMessage());
            return false;
        }
    }
}