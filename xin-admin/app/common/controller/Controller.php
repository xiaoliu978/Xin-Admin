<?php

namespace app\common\controller;

use app\BaseController;
use app\common\attribute\Method;
use app\common\library\RequestJson;
use Exception;
use think\db\exception\DbException;
use app\common\library\Token;
use think\Model;
use think\response\Json;
use think\Validate;
use app\common\attribute\Auth;

class Controller extends BaseController
{
    use RequestJson;

    /**
     * 登录验证白名单
     * @var array
     */
    protected array $allowAction = [];

    protected array $withModel = [];

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

    /**
     * 构建查询方法
     * @return array
     */
    protected function buildSearch(): array
    {
        $params = $this->request->get();
        $where = [];
        $paginate = [
            'list_rows' => $params['pageSize'] ?? 10,
            'page' => $params['current'] ?? 1,
        ];
        foreach ($this->searchField as $key => $op) {
            if (isset($params[$key]) && $params[$key]) {
                if (in_array($op, $this->sqlTerm)) {
                    $where[] = [$key, $op, $params[$key]];
                    continue;
                }
                if ($op == 'like') {
                    $where[] = [$key, $op, '%' . $params[$key] . '%'];
                    continue;
                }
                if ($op == 'date') {
                    $start = strtotime($params[$key]);
                    $end = strtotime('+1 day', $start);
                    $where[] = [$key, '>=', $start];
                    $where[] = [$key, '<=', $end];
                    continue;
                }
            }
        }
        return [$where, $paginate];
    }

    /**
     * 基础控制器查询方法
     * @return Json
     * @throws DbException
     */
    #[Auth('list'),Method('GET')]
    public function list(): Json
    {
        list($where, $paginate) = $this->buildSearch();
        $list = $this->model
            ->with($this->withModel)
            ->where($where)
            ->paginate($paginate)
            ->toArray();
        return $this->success('ok', $list);
    }

    /**
     * 基础控制器新增方法
     * @return Json
     */
    #[Auth('add'),Method('POST')]
    public function add(): Json
    {
        $data = $this->request->post();
        if (!$this->validate->scene('add')->check($data)) {
            return $this->error($this->validate->getError());
        }
        $this->model->save($data);
        return $this->success('ok');
    }

    /**
     * 基础控制器编辑方法
     * @return Json
     */
    #[Auth('edit'),Method('PUT')]
    public function edit(): Json
    {
        $data = $this->request->param();
        if (!$this->validate->scene('edit')->check($data)) {
            return $this->warn($this->validate->getError());
        }
        $this->model->update($data);
        return $this->success('ok');
    }

    /**
     * 基础控制器删除方法
     * @return Json
     */
    #[Auth('delete'),Method('DELETE')]
    public function delete(): Json
    {
        $data = $this->request->param();
        if (!isset($data['ids'])) {
            return $this->error('请选择ID');
        }
        $delArr = explode(',', $data['ids']);

        $delNum = $this->model->destroy($delArr);
        if ($delNum != 0 ) {
            return $this->success('删除成功，删除了' . $delNum . '条数据');
        } else {
            return $this->warn('没有删除任何数据');
        }
    }

}