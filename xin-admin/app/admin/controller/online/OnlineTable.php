<?php

namespace app\admin\controller\online;

use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\AdminController as Controller;
use app\admin\model\online\OnlineTable as OnlineTableModel;
use app\admin\validate\online\OnlineTable as OnlineTableVal;
use app\common\library\Crud;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;
use think\facade\Validate;
use think\facade\View;
use think\response\Json;

#[Auth]
class OnlineTable extends Controller
{
    protected array $searchField = [
        'table_id'      => '=',
        'table_name'    => 'like',
        'create_time'   => 'date',
        'update_time'   => 'date'
    ];

    protected string $authName = 'online.table';

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new OnlineTableModel();
        $this->validate = new OnlineTableVal();
    }

    /**
     * 保存更改
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    #[Auth('saveData'),Method('POST')]
    public function saveData(): Json
    {
        $data = request()->post();
        $validate = Validate::rule([
            'id'  => 'require',
            'columns' => 'require',
            'table_config' => 'require',
            'sql_config' => 'require',
            'crud_config' => 'require'
        ]);
        if (!$validate->check($data)) {
            return $this->warn($validate->getError());
        }
        $data['id'] = (int)$data['id'];
        $online = $this->model->where('id',$data['id'])->find();
        if($online){
            $online->columns = $data['columns'];
            $online->table_config = $data['table_config'];
            $online->sql_config = $data['sql_config'];
            $online->crud_config = $data['crud_config'];
            $online->save();
            return $this->success('保存成功',$data);
        }
        return $this->error('保存失败');
    }

    /**
     * 获取 CRUD 数据
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    #[Auth('getData'),Method('GET')]
    public function getData(): Json
    {
        $id = request()->param('id');
        if(!$id){
            return $this->warn('id不存在');
        }

        $data = $this->model->field('columns,table_config,sql_config,crud_config')->where('id',$id)->find();
        if(!$data){
            return $this->warn('表单不存在');
        }
        return $this->success('ok',compact('data'));

    }

    /**
     * CRUD
     * @return Json
     */
    #[Auth('crud'),Method('POST')]
    public function crud(): Json
    {
        $data = request()->post();
        $validate = Validate::rule([
            'id'  => 'require',
            'columns' => 'require',
            'table_config' => 'require',
            'sql_config' => 'require',
            'crud_config' => 'require'
        ]);
        if (!$validate->check($data)) {
            return $this->warn($validate->getError());
        }

        $viewData = [
            'controllerPath'  => str_replace('/', '\\', $data['crud_config']['controllerPath']),
            'modelPath'  => str_replace('/', '\\', $data['crud_config']['modelPath']),
            'validatePath'  => str_replace('/', '\\', $data['crud_config']['validatePath']),
            'name' => $data['crud_config']['name']
        ];

        $crud = new Crud();
        $crud->buildSql($data['sql_config'],$data['columns']);
        $crud->buildController($data['columns'],$data['crud_config'],$viewData);
        $crud->buildModel($data['crud_config'],$viewData,$data['sql_config']);
        $crud->buildValidate($data['columns'],$data['crud_config'],$viewData);
        $crud->buildPage($data);

        return $this->success('ok');
    }

}