<?php
namespace app\common\controller;

use app\BaseController;
use app\common\library\RequestJson;
use Exception;
use think\facade\Db;
use think\db\exception\PDOException;
use think\Model;
use think\Validate;

class ApiController extends BaseController
{

    use RequestJson;

    /**
     * 登录验证白名单
     * @var array
     */
    protected array $allowAction = [];

    /**
     * 查询字段
     * @var array
     */
    protected array $searchField = [];

    /**
     * 当前控制器模型
     * @var Model
     */
    protected Model $model;

    /**
     * 验证器
     * @var Validate|null
     */
    protected null | Validate  $validate = null;

    /**
     * 当前类权限标识
     * @var string
     */
    protected string $authName;

    /**
     * 可直接使用的数据库术语
     * @var array|string[]
     */
    protected array $sqlTerm = ['=', '>', '<>', '<', '>=', '<='];

    /**
     * 初始化
     * @return void
     * @throws Exception
     */
    public function initialize(): void
    {
        parent::initialize();

        // 运行注解
        $ref = new \ReflectionObject($this);
        $attrs = $ref->getMethod($this->action)->getAttributes();
        foreach ($attrs as $attr){
            $attr->newInstance();
        }
    }

}