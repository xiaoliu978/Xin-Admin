<?php

namespace app\common\attribute;
use app\admin\model\Admin as AdminModel;
use app\admin\model\AdminGroup;
use app\common\library\Token;
use Attribute;
use Exception;
use ReflectionClass;
use think\db\exception\DbException;
use app\common\library\RequestJson;
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
            // 使用反射机制获取当前控制器的 AuthName
            $class = 'app\\'.app('http')->getName().'\\controller\\'.str_replace(".","\\",request()->controller());
            $reflection = new ReflectionClass($class);
            $properties = $reflection->getProperty('authName')->getDefaultValue();

            if($properties){
                $authKey = $properties . ':' . $key;

                $tokenData = (new Token)->get($this->token);
                // 获取用户所在用户组
                $admin = new AdminModel;
                $adminInfo = $admin->where('id',$tokenData['user_id'])->find();
                // 获取用户所有权限
                $group = (new AdminGroup())->where('id',$adminInfo['group_id'])->find();
                $rules = [];
                foreach ($group->roles as $role) {
                    $rules[] =  $role->key;
                }
                if(!in_array($authKey,$rules)){
                    $this->warn('暂无权限',[],200,'throw');
                }
            }
        }
    }

    /**
     * 获取管理员ID
     * @return int
     */
    public function getAdminId(): int
    {
        $tokenData = (new Token)->get($this->token);
        return $tokenData['user_id'];
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