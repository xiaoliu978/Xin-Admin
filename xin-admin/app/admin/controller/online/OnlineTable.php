<?php

namespace app\admin\controller\online;

use app\common\attribute\Auth;
use app\common\controller\AdminController as Controller;
use app\admin\model\online\OnlineTable as OnlineTableModel;
use app\admin\validate\online\OnlineTable as OnlineTableVal;
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

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new OnlineTableModel();
        $this->validate = new OnlineTableVal();
    }

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
        $online = $this->model->where('table_id',$data['id'])->find();
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

    public function getData(): Json
    {
        $id = request()->param('id');
        if(!$id){
            return $this->warn('id不存在');
        }

        $data = $this->model->field('columns,table_config,sql_config,crud_config')->where('table_id',$id)->find();
        if(!$data){
            return $this->warn('表单不存在');
        }
        return $this->success('ok',compact('data'));

    }
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

        $sql  = "CREATE TABLE IF NOT EXISTS `{$data['sql_config']['sqlTableName']}` (" . PHP_EOL;
        $pk   = '';
        $columns = '['.PHP_EOL;

        foreach ($data['columns'] as $field) {

            // 数据库 sql 配置
            if (!isset($field['sqlType']) || !$field['sqlType']) {
                if (!$field['valueType']) {

                }
                continue;
            }
            $unsigned      = (isset($field['unsign']) && $field['unsign']) ? ' UNSIGNED' : '';
            $null          = (isset($field['null']) && $field['null']) ? ' NOT NULL' : ' NULL' ;
            $autoIncrement = (isset($field['autoIncrement']) && $field['autoIncrement']) ? ' AUTO_INCREMENT' : '';
            $length        = (isset($field['length']) && $field['length']) ? "({$field['length']})": '';
            $default       = '';
            if (strtolower((string)$field['defaultValue']) == 'null') {
                $default = ' DEFAULT NULL';
            } elseif ($field['defaultValue'] == '0') {
                $default = " DEFAULT '0'";
            } elseif ($field['defaultValue'] == 'empty string') {
                $default = " DEFAULT ''";
            } elseif ($field['defaultValue']) {
                $default = " DEFAULT '{$field['default']}'";
            }
            $fieldComment = (isset($field['remark']) && $field['remark']) ? " COMMENT '{$field['remark']}'" : '';
            $sql          .= "`{$field['dataIndex']}` {$field['sqlType']}$length$unsigned$null$autoIncrement$default$fieldComment ," . PHP_EOL;
            if (isset($field['isKey']) && $field['isKey']) {
                $pk = $field['dataIndex'];
            }

            $columnsData = '    {'. PHP_EOL;

            if(isset($field['valueType']) && $field['valueType']){
                $columnsData .= "      valueType:'{$field['valueType']}',".PHP_EOL;
            }else {
                continue;
            }
            if(isset($field['title']) && $field['title']){
                $columnsData .= "      title:'{$field['title']}'," . PHP_EOL;
            }
            if(isset($field['order']) && $field['order']){
                $columnsData .= "      order:{$field['order']}," . PHP_EOL;
            }
            if(isset($field['hideInSearch']) && $field['hideInSearch']){
                $columnsData .= '      hideInSearch: true,' . PHP_EOL;
            }
            if(isset($field['hideInTable']) && $field['hideInTable']){
                $columnsData .= '      hideInTable: true,' . PHP_EOL;
            }
            if(isset($field['hideInForm']) && $field['hideInForm']){
                $columnsData .= '      hideInForm: true,' . PHP_EOL;
            }
            $columnsData .= "      dataIndex:'{$field['dataIndex']}'," .PHP_EOL. '    },'.PHP_EOL;

            $columns .= $columnsData;
        }
        $sql .= "PRIMARY KEY (`$pk`)" . PHP_EOL . ") ";
        $sql .= "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='{$data['sql_config']['sqlTableRemark']}'";
        $columns .= '  ]';
        Db::execute($sql);

        $viewData = [
            'controllerPath'  => str_replace('/', '\\', $data['crud_config']['controllerPath']),
            'modelPath'  => str_replace('/', '\\', $data['crud_config']['modelPath']),
            'validatePath'  => str_replace('/', '\\', $data['crud_config']['validatePath']),
            'name' => $data['crud_config']['name']
        ];

        $file_name = $data['crud_config']['name'];

        // 控制器渲染
        $controllerView = View::fetch('../crud/controller',$viewData);
        $path = root_path().$data['crud_config']['controllerPath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$file_name.'.php', $controllerView);

        // 验证器渲染
        $validateView = View::fetch('../crud/validate',$viewData);
        $path = root_path().$data['crud_config']['validatePath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$file_name.'.php', $validateView);

        // 模型渲染
        $modelView = View::fetch('../crud/model',$viewData);
        $path = root_path().$data['crud_config']['modelPath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$file_name.'.php', $modelView);

        $tableConfig = '';
        foreach ($data['table_config'] as $key=>$item) {
            if($key == 'search') {
                $tableConfig .= !$item?"      {$key}={false}" . PHP_EOL: '';
                continue;
            }
            if($key == 'headerTitle') {
                $tableConfig .= "      headerTitle={'{$item}'}" . PHP_EOL;
                continue;
            }
            if($item) {
                $tableConfig .= "      {$key}={true}" . PHP_EOL;
                continue;
            }
            $tableConfig .= "      {$key}={false}" . PHP_EOL;
        }
        // 提取控制器名称（去除路径和文件扩展名）
        $controller = root_path().'app/admin/controller/';
        $con = str_replace($controller,'',root_path().$data['crud_config']['controllerPath']);
        // 替换路径分隔符为点号
        $api = str_replace('/', '.', $con).'.'.$data['crud_config']['name'];
        // 视图渲染
        $pageData = [
            'columns' => $columns,
            'name'    => $data['crud_config']['name'],
            'table_config' => $tableConfig,
            'api'     => $api
        ];
        $pagePath = root_path().env('web_path').'/'.$data['crud_config']['pagePath'].'/'.$file_name;
        if(!is_dir($pagePath)){
            mkdir($pagePath, 0777, true); // 使用递归创建目录
        }
        $modelView = View::fetch('../crud/pages',$pageData);
        file_put_contents($pagePath.'/index.tsx', $modelView);

        return $this->success('ok');
    }

}