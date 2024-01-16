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
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\exception\HttpResponseException;
use think\Model;
use think\Response;
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
        $tokenData = self::getTokenData();
        if($key == '') return;
        $rules = [];
        if(!isset($tokenData['type'])) {
            self::throwError('Token 类型不正确！');
        }
        if($tokenData['type'] == 'admin') {
            $adminInfo = self::getAdminInfo();
            if(!$adminInfo['status']) $this->error('账户已被禁用！', [], 403,'throw');
            // 获取用户所有权限
            $group = (new AdminGroup())->where('id',$adminInfo['group_id'])->find();
            foreach ($group->roles as $rule){
                $rules[] = strtolower($rule->key);
            }
        }
        if($tokenData['type'] == 'user') {
            $userInfo = self::getUserInfo();
            $group = (new UserGroup())->where('id',$userInfo['group_id'])->find();
            foreach ($group->roles as $rule){
                $rules[] = strtolower($rule->key);
            }
        }
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

    /**
     * 是否登录
     * @return string
     */
    static public function getToken(): string
    {
        $token = request()->header('Authorization');
        if(!$token){
            static::throwError('请先登录！');
        }
        return $token;
    }

    /**
     * 获取 Token Data
     * @return array
     */
    static public function getTokenData(): array
    {
        $tokenData = (new Token)->get(self::getToken());
        if(!$tokenData){
            static::throwError('请先登录！');
        }
        return $tokenData;
    }

    /**
     * 获取管理员ID
     * @return int
     */
    static public function getUserId(): int
    {
        $tokenData = self::getTokenData();
        if($tokenData['type'] != 'user' || !isset($tokenData['user_id'])){
            self::throwError('请先登录！');
        }
        return $tokenData['user_id'];
    }

    /**
     * 获取用户信息
     * @return array
     */
    public static function getUserInfo(): array
    {
        $user_id = self::getUserId();
        $userModel = new UserModel;
        $user = $userModel->where('id',$user_id)->findOrEmpty();
        if($user->isEmpty()) {
            self::throwError('用户不存在！');
        }
        return $user->toArray();
    }

    /**
     * 获取管理员ID
     * @return int
     */
    static public function getAdminId(): int
    {
        $tokenData = self::getTokenData();
        if($tokenData['type'] != 'admin' || !isset($tokenData['user_id'])){
            self::throwError('请先登录！');
        }
        return $tokenData['user_id'];
    }

    /**
     * 获取用户信息
     * @return array
     */
    public static function getAdminInfo(): array
    {
        $user_id = self::getUserId();
        $userModel = new AdminModel;
        $user = $userModel->where('id',$user_id)->findOrEmpty();
        if($user->isEmpty()) {
            self::throwError('用户不存在！');
        }
        return $user->toArray();
    }

    /**
     * @param string $msg
     * @return void
     */
    static private function throwError(string $msg = ''): void
    {
        $data = [
            'data' => ['type' => 'user'],
            'success' => false,
            'status' => 200,
            'msg' => $msg,
            'showType' => 1
        ];
        $response = Response::create($data, 'json');
        throw new HttpResponseException($response);
    }

}