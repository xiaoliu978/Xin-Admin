<?php

namespace app\common\library;

use think\facade\Db;
use think\facade\View;

class Crud
{

    /**
     * @param array $sql_config
     * @param array $columns
     * @return void
     */
    public function buildSql(array $sql_config, array $columns): void
    {

        $sql  = "CREATE TABLE IF NOT EXISTS `{$sql_config['sqlTableName']}` (" . PHP_EOL;
        $pk   = '';
        foreach ($columns as $field) {

            // 数据库 sql 配置
            if (!isset($field['sqlType']) || !$field['sqlType']) {
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
                $default = " DEFAULT '{$field['defaultValue']}'";
            }
            $fieldComment = (isset($field['remark']) && $field['remark']) ? " COMMENT '{$field['remark']}'" : '';
            $sql          .= "`{$field['dataIndex']}` {$field['sqlType']}$length$unsigned$null$autoIncrement$default$fieldComment ," . PHP_EOL;
            if (isset($field['isKey']) && $field['isKey']) {
                $pk = $field['dataIndex'];
            }
        }
        $sql .= "PRIMARY KEY (`$pk`)" . PHP_EOL . ") ";
        $sql .= "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='{$sql_config['sqlTableRemark']}'";
        Db::execute($sql);
    }

    /**
     * @param array $crud_config
     * @param array $viewData
     * @return void
     */
    public function buildController(array $crud_config, array $viewData): void
    {
        // 控制器渲染
        $controllerView = View::fetch('../crud/controller',$viewData);
        $path = root_path().$crud_config['controllerPath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$crud_config['name'].'.php', $controllerView);
    }

    /**
     * @param array $crud_config
     * @param array $viewData
     * @return void
     */
    public function buildModel(array $crud_config, array $viewData): void
    {
        // 模型渲染
        $modelView = View::fetch('../crud/model',$viewData);
        $path = root_path().$crud_config['modelPath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$crud_config['name'].'.php', $modelView);
    }

    /**
     * @param array $crud_config
     * @param array $viewData
     * @return void
     */
    public function buildValidate(array $crud_config, array $viewData): void
    {
        // 验证器渲染
        $validateView = View::fetch('../crud/validate',$viewData);
        $path = root_path().$crud_config['validatePath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$crud_config['name'].'.php', $validateView);
    }

    public function buildPage($data): void
    {
        $columns = '['.PHP_EOL;
        $isDict = false;

        foreach ($data['columns'] as $field) {
            if(!isset($field['valueType']) && !$field['valueType']){
                continue;
            }
            $columnsData = '    {'. PHP_EOL;

            if($field['valueType'] == 'id'){
                $columnsData .= "";
            }else if(in_array($field['valueType'],['select','checkbox','radio','radioButton'])) {
                if(!$field['isDict']){
                    $columnsData .= "      valueType:'{$field['valueType']}',".PHP_EOL;
                    $columnsData .= "      valueEnum: new Map([".PHP_EOL;
                    $enum = explode("\n",$field['enum']);
                    foreach($enum as $item){
                        $l = explode(':',$item);
                        $columnsData .= "        [{$l[0]},'{$l[1]}'],".PHP_EOL;
                    }
                    $columnsData .= "      ]),".PHP_EOL;
                }else {
                    $isDict = true;
                    $columnsData .= "      request: async () => getDictionaryData('{$field['dict']}'),".PHP_EOL;
                    $columnsData .= "      render: (_, data) => <XinDict value={data.{$field['dataIndex']}} dict={'{$field['dict']}'} />,".PHP_EOL;
                }
            }else {
                $columnsData .= "      valueType:'{$field['valueType']}',".PHP_EOL;
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
        $columns .= '  ]';


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
        $controller = 'app/admin/controller/';
        $con = str_replace($controller,'',$data['crud_config']['controllerPath']);
        // 替换路径分隔符为点号
        $api = str_replace('/', '.', $con).'.'.$data['crud_config']['name'];
        // 视图渲染
        $pageData = [
            'isDict'    => $isDict,
            'columns' => $columns,
            'name'    => $data['crud_config']['name'],
            'table_config' => $tableConfig,
            'api'     => $api
        ];
        $pagePath = root_path().env('web_path').'/'.$data['crud_config']['pagePath'].'/'.$data['crud_config']['name'];
        if(!is_dir($pagePath)){
            mkdir($pagePath, 0777, true); // 使用递归创建目录
        }
        $modelView = View::fetch('../crud/pages',$pageData);
        file_put_contents($pagePath.'/index.tsx', $modelView);
    }


}