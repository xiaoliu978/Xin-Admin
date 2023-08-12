<?php
namespace app\api\controller;

use app\BaseController;
use think\facade\Db;
use think\db\exception\PDOException;

class Controller extends BaseController
{

    // 登录验证白名单
    protected $allowAllAction = [];

    // 当前路由：分组名称
    protected $group = '';

    /**
     * 强制验证当前访问的控制器方法method
     * 例: [ 'login' => 'POST' ]
     * @var array
     */
    protected $methodRules = [];

    public function initialize()
    {
        parent::initialize();

        // 检测数据库连接
        try {
            Db::execute("SELECT 1");
        } catch (PDOException $e) {
            $this->error($e->getMessage(),[],200,'throw');
        }
        $this->getRouteinfo();
        $this->checkLogin();
    }

    /**
     * 获取当前登录用户信息
     * @return {*}
     */    
    public function getAdminInfo()
    {

    }


    /**
     * 验证登录状态
     * @return void
     * @throws BaseException
     */
    private function checkLogin(): void
    {
        // 验证当前请求是否在白名单
        if (in_array($this->routeUri, $this->allowAllAction)) {
            return;
        }
        // 验证登录状态
        if (true) {
            
        }
    }

}