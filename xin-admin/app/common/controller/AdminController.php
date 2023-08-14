<?php

namespace app\common\controller;

use app\BaseController;
use think\db\exception\DbException;
use think\facade\Db;
use app\common\library\Token;
use think\db\exception\PDOException;
use think\Model;
use think\response\Json;

class AdminController extends RequestController
{

    // 登录验证白名单
    protected array $allowAction = [];

    // 当前请求 token
    protected string $token = '';

    // 查询字段
    protected array $searchField = [];

    // 模型
    protected Model $model;

    // 验证器
    protected $validate = null;

    // 可直接使用数据库术语
    protected array $sqlTerm = ['=', '>', '<>', '<', '>=', '<='];

    /**
     * 强制验证当前访问的控制器方法method
     * 例: [ 'login' => 'POST' ]
     * @var array
     */
    protected array $methodRules = [];

    public function initialize(): void
    {
        parent::initialize();

        // 检测数据库连接
        try {
            Db::execute("SELECT 1");
        } catch (PDOException $e) {
            $this->error($e->getMessage(), [], 200, 'throw');
        }
        $this->getRouteinfo();
        $this->checkLogin();
        $this->checkMethodRules();
    }

    /**
     * 验证请求方式
     * @return void
     */
    private function checkMethodRules(): void
    {
        $this->methodRules += [
            'list' => 'GET',
            'add' => 'POST',
            'edit' => 'PUT',
            'delete' => 'DELETE'
        ];
        if (!isset($this->methodRules[$this->action])) {
            return;
        }
        $methodRule = $this->methodRules[$this->action];
        $currentMethod = $this->request->method();
        if (empty($methodRule)) {
            return;
        }
        if (is_array($methodRule) && in_array($currentMethod, $methodRule)) {
            return;
        }
        if (is_string($methodRule) && $methodRule == $currentMethod) {
            return;
        }
        $this->error('请求错误', [], 200, 'throw');
    }

    /**
     * 验证登录状态
     * @return void
     */
    private function checkLogin(): void
    {
        // 验证当前请求是否在白名单
        if (in_array($this->action, $this->allowAction)) {
            return;
        }
        // 验证登录状态
        $token = $this->request->header('Authorization');
        if (!$token || !(new Token)->get($token)) {
            $this->error('请先登录！', [], 403, 'throw');
        }
        $this->token = $token;
    }

    public function getAdminId(): int
    {
        $tokenData = (new Token)->get($this->token);
        return $tokenData['user_id'];
    }

    /**
     * 构建查询方法
     * @return array
     */
    public function buildSearch(): array
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
    public function list(): Json
    {
        list($where, $paginate) = $this->buildSearch();
        $list = $this->model
            ->where($where)
            ->paginate($paginate)
            ->toArray();
        return $this->success('ok', $list);
    }

    /**
     * 基础控制器新增方法
     * @return Json
     */
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
    public function delete(): Json
    {
        $data = $this->request->param();
        if (!isset($data['ids'])) {
            return $this->error('请选择ID');
        }
        $delArr = explode(',', $data['ids']);

        $delNum = $this->model->where('id', 'in', $delArr)->delete();
        if ($delNum) {
            return $this->success('删除成功，删除了' . $delNum . '条数据');
        } else {
            return $this->warn('没有删除任何数据');
        }

    }

}