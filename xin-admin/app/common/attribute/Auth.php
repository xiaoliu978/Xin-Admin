<?php

namespace app\common\attribute;
use app\admin\model\Admin as AdminModel;
use app\admin\model\AdminGroup;
use app\api\model\User as UserModel;
use app\common\library\RequestJson;
use app\common\library\Token;
use app\common\model\user\UserGroup;
use Attribute;
use Exception;
use ReflectionClass;
use think\db\exception\DbException;
use think\Model;
use think\response\Json;

/**
 * 接口权限注解
 */
#[Attribute]
class Auth
{
    use RequestJson;

    /**
     * @var string
     */
    public string $token;


    /**
     * 权限初始化，获取请求用户验证权限
     * @param string $key
     * @throws Exception
     */
    public function __construct(string $key = '')
    {
        // 验证登录状态
        $token = request()->header('Authorization');
        if (!$token || !(new Token)->get($token)) {
            $this->error('请先登录！', [], 403,'throw');
        }

        $this->token = $token;
        if($key != ''){
            // 获取用户 Token
            $tokenData = (new Token)->get($this->token);
            if($tokenData['type'] == 'admin'){
                // 获取用户所在用户组
                $admin = new AdminModel;
                $adminInfo = $admin->where('id',$tokenData['user_id'])->find();
                if(!$adminInfo['status']) $this->error('账户已被禁用！', [], 403,'throw');
                // 获取用户所有权限
                $group = (new AdminGroup())->where('id',$adminInfo['group_id'])->find();
                $rules = [];
                foreach ($group->roles as $rule){
                    $rules[] = strtolower($rule->key);
                }
            }elseif ($tokenData['type'] == 'user' ) {
                // 获取用户所在用户组
                $user = new UserModel;
                $userInfo = $user->where('id',$tokenData['user_id'])->find();
                // 获取用户所有权限
                $group = (new UserGroup())->where('id',$userInfo['group_id'])->find();
                $rules = [];
                foreach ($group->roles as $rule){
                    $rules[] = strtolower($rule->key);
                }
            }else {
                $this->error('为啥会出现这种情况！', [], 403,'throw');
            }

            // $rules = array_column($group->roles->toArray(),'key');

            // 使用反射机制获取当前控制器的 AuthName
            $class = 'app\\'.app('http')->getName().'\\controller\\'.str_replace(".","\\",request()->controller());
            $reflection = new ReflectionClass($class);
            $properties = $reflection->getProperty('authName')->getDefaultValue();
            $allowAction = $reflection->getProperty('allowAction')->getDefaultValue();
            if(in_array(request()->controller(),$allowAction)){
                return;
            }

            if($properties){
                $authKey = strtolower($properties . '.' . $key);
            }else {
                $authKey = strtolower(str_replace("\\",".",request()->controller()). '.' . $key);
            }

            if(!in_array($authKey,$rules)){
                $this->warn('暂无权限',[],200,'throw');
            }
        }
    }

    /**
     * 获取管理员ID
     * @return Json|int
     */
    public function getUserId(): Json | int
    {
        $tokenData = (new Token)->get($this->token);
        if($tokenData['type'] == 'user'){
            return $tokenData['user_id'];
        }else {
            return $this->error('请先登录！', ['type' => 'user'], 403,'throw');
        }
    }

    /**
     * 获取用户信息
     * @return Model
     * @throws DbException
     */
    public function getUserInfo(): Model
    {
        $user_id = $this->getUserId();
        $user = new UserModel;
        return $user->where('id',$user_id)->find();
    }

    /**
     * 获取管理员ID
     * @return Json|int
     */
    public function getAdminId(): Json | int
    {
        $tokenData = (new Token)->get($this->token);
        if($tokenData['type'] == 'admin'){
            return $tokenData['user_id'];
        }else {
            return $this->error('请先登录！', ['type' => 'user'], 403,'throw');
        }
    }

    /**
     * 获取管理员信息
     * @return Model
     * @throws DbException
     */
    public function getAdminInfo(): Model
    {
        $user_id = $this->getAdminId();
        $admin = new AdminModel;
        return $admin->where('id',$user_id)->find();
    }

}