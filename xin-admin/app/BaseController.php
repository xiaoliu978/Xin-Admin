<?php
declare (strict_types = 1);

namespace app;

use think\App;
use think\Response;
use think\exception\ValidateException;
use think\exception\HttpResponseException;
use think\Validate;
use think\response\Json;
use app\common\enum\ApiEnum\ShowType as ShopTypeEnum;

/**
 * 控制器基础类
 */
abstract class BaseController
{
    /**
     * Request实例
     * @var \think\Request
     */
    protected \think\Request $request;

    /**
     * 应用实例
     * @var App
     */
    protected App $app;

    /**
     * 是否批量验证
     * @var bool
     */
    protected bool $batchValidate = false;

    /**
     * 控制器中间件
     * @var array
     */
    protected array $middleware = [];

    /**
     * 控制器名称
     * @var string
     */
    protected string $controller;

    /**
     * 方法名称
     * @var string
     */
    protected string $action;

    /**
     * 当前uri
     * @var string
     */
    protected string $routeUri;

    /**
     * 构造方法
     * @access public
     * @param  App  $app  应用对象
     */
    public function __construct(App $app)
    {
        $this->app     = $app;
        $this->request = $this->app->request;

        // 控制器初始化
        $this->initialize();
    }

    // 初始化
    protected function initialize()
    {}

    /**
     * 解析当前路由参数 （分组名称、控制器名称、方法名）
     */
    protected function getRouteinfo(): void
    {
        $this->controller = uncamelize($this->request->controller());
        $this->action = $this->request->action();
        // 当前uri
        $this->routeUri = "{$this->controller}/$this->action";
    }

}
