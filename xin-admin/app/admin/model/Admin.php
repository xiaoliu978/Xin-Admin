<?php

namespace app\admin\model;

use app\common\model\BaseModel;
use app\common\library\Token;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

class Admin extends BaseModel
{

    protected $hidden = ['password'];

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
            if(!$user['status']){
                $this->setErrorMsg('账户已被禁用');
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
                $token->set($data['token'],'admin',$user['id'],600) &&
                $token->set($data['refresh_token'],'admin-refresh',$user['id'],2592000)
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

    /**
     * 退出登录
     * @param $user_id
     * @return bool
     */
    public function logout($user_id): bool
    {
        try {
            $user = $this->where('id', $user_id)->find();
        } catch (DbException $e) {
            $this->setErrorMsg('用户不存在');
            return false;
        }
        if(!$user) {
            $this->setErrorMsg('用户不存在');
            return false;
        }
        try {
            $token = new Token;
            $token->clear('admin',$user['id']);
            $token->clear('admin-refresh',$user['id']);
            return true;
        }catch(\Exception $e){
            $this->setErrorMsg($e->getMessage());
            return false;
        }
    }


}