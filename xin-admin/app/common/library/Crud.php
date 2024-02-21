<?php

namespace app\common\library;

use think\facade\Db;
use think\facade\View;

class Crud
{

    /**
     * 构建 sql
     * @param array $sql_config
     * @param array $columns
     * @return void
     */
    public function buildSql(array $sql_config, array $columns): void
    {
        $tableName = 'xin-'.$sql_config['sqlTableName'];
        $sql  = "CREATE TABLE IF NOT EXISTS `{$tableName}` (" . PHP_EOL;
        $pk   = '';
        foreach ($columns as $field) {
            // 数据库 sql 配置
            if (!isset($field['sqlType']) || !$field['sqlType']) {
                continue;
            }
            $unsigned      = (isset($field['unsign']) && $field['unsign']) ? ' UNSIGNED' : '';
            $null          = (isset($field['null']) && $field['null']) ? ' NOT NULL' : '' ;
            $autoIncrement = (isset($field['autoIncrement']) && $field['autoIncrement']) ? ' AUTO_INCREMENT' : '';
            $length        = (isset($field['length']) && $field['length']) ? "({$field['length']})": '';
            $default       = '';
            if (strtolower((string)$field['defaultValue']) == 'null') {
                $default = ' DEFAULT NULL';
            } elseif ($field['defaultValue'] == '0') {
                $default = " DEFAULT 0";
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
        if($sql_config['autoDeletetime']){
            $sql .= "`delete_time` INT(10) UNSIGNED DEFAULT NULL COMMENT '删除时间',";
        }
        $sql .= "PRIMARY KEY (`$pk`)" . PHP_EOL . ") ";
        $comment = $sql_config['sqlTableRemark']??'';
        $sql .= "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='{$comment}'";
        Db::execute($sql);
    }

    /**
     * 构建控制器
     * @param array $columns
     * @param array $crud_config
     * @param array $viewData
     * @return void
     */
    public function buildController(array $columns ,array $crud_config, array $viewData): void
    {
        $select = '';
        foreach ($columns as $item){
            if(!isset($item['hideInSearch']) || !$item['hideInSearch']){
                if(isset($item['select'])){
                    $select .= "        '{$item['dataIndex']}'=> '{$item['select']}',".PHP_EOL;
                }else {
                    $select .= "        '{$item['dataIndex']}'=> '=',".PHP_EOL;
                }
            }
        }
        $viewData['select'] = $select;
        // 控制器渲染
        $controllerView = View::fetch('../crud/controller',$viewData);
        $path = root_path().$crud_config['controllerPath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$crud_config['name'].'.php', $controllerView);
    }

    /**
     * 构建模型
     * @param array $crud_config
     * @param array $viewData
     * @return void
     */
    public function buildModel(array $crud_config, array $viewData): void
    {
        // 模型渲染
        $viewData['autoDeletetime'] = $crud_config['autoDeletetime'];

        $modelView = View::fetch('../crud/model',$viewData);
        $path = root_path().$crud_config['modelPath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$crud_config['name'].'.php', $modelView);
    }

    /**
     * 构建验证器
     * @param array $columns
     * @param array $crud_config
     * @param array $viewData
     * @return void
     */
    public function buildValidate(array $columns,array $crud_config, array $viewData): void
    {
        $validation = '';
        $massage = '';
        foreach ($columns as $item){
            if(isset($item['validation']) && $item['validation']){
                $validation .= "        '{$item['dataIndex']}'  => '";

                foreach ($item['validation'] as $val){
                    switch ($val){
                        case 'verifyRequired':
                            $validation .= 'require|';
                            $massage .= "        '{$item['dataIndex']}.require' => '字段{$item['title']}必填'," . PHP_EOL;
                            break;
                        case 'verifyEmail':
                            $validation .= 'email|';
                            $massage .= "        '{$item['dataIndex']}.email' => '{$item['title']}必须为 email'," . PHP_EOL;
                            break;
                        case 'verifyUrl':
                            $validation .= 'url|';
                            $massage .= "        '{$item['dataIndex']}.url' => '{$item['title']}必须为URL'," . PHP_EOL;
                            break;
                        case 'verifyNumber':
                            $validation .= 'number|';
                            $massage .= "        '{$item['dataIndex']}.number' => '{$item['title']}必须为数字'," . PHP_EOL;
                            break;
                        case 'verifyString':
                            $validation .= 'string|';
                            $massage .= "        '{$item['dataIndex']}.string' => '{$item['title']}必须为字符串'," . PHP_EOL;
                            break;
                        case 'verifyInteger':
                            $validation .= 'integer|';
                            $massage .= "        '{$item['dataIndex']}.integer' => '{$item['title']}必须为纯数字'," . PHP_EOL;
                            break;
                        case 'verifyMobile':
                            $validation .= 'mobile|';
                            $massage .= "        '{$item['dataIndex']}.mobile' => '{$item['title']}必须为手机号'," . PHP_EOL;
                            break;
                        case 'verifyIdCard':
                            $validation .= 'idCard|';
                            $massage .= "        '{$item['dataIndex']}.idCard' => '{$item['title']}必须为身份证号'," . PHP_EOL;
                            break;
                    }
                }
                $validation = substr($validation, 0, -1);
                $validation .= "',".PHP_EOL;
            }
        }
        $viewData['validation'] = $validation;
        $viewData['massage']    = $massage;

        // 验证器渲染
        $validateView = View::fetch('../crud/validate',$viewData);
        $path = root_path().$crud_config['validatePath'].'/';
        if(!is_dir($path)){
            mkdir($path, 0777, true);
        }
        file_put_contents($path.$crud_config['name'].'.php', $validateView);
    }


    /**
     * 构建前端页面
     * @param $data
     * @return void
     */
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
            $columnsData .= "      dataIndex:'{$field['dataIndex']}'," .PHP_EOL;

            if(isset($field['validation']) && $field['validation']){
                $val = '';
                foreach ($field['validation'] as $item){
                    $val .= "          verify.{$item},".PHP_EOL;
                }
                $columnsData .= "      formItemProps: {".PHP_EOL."        rules: [".PHP_EOL . $val .'        ]'.PHP_EOL."      },".PHP_EOL;
            }

            $columnsData .= '    },'.PHP_EOL;
            $columns .= $columnsData;
        }
        $columns .= '  ]';


        $tableConfig = '{'.PHP_EOL;
        $tableConfig .= '    tableApi: api,'.PHP_EOL;
        $tableConfig .= '    columns: columns,'.PHP_EOL;
        foreach ($data['table_config'] as $key=>$item) {
            if($key == 'paginationShow') {
                if($item === true) {
                    continue;
                }else {
                    $tableConfig .= "    {$key}: false," . PHP_EOL;
                }
            }
            if($key == 'pagination' || $key == 'searchShow') {
                continue;
            }
            if(is_array($item)) {
                $tableConfig .= "    {$key}: {" . PHP_EOL;
                foreach ($item as $key2 => $item2) {
                    if($item2 === false) {
                        $tableConfig .= "      {$key2}: false," . PHP_EOL;
                        continue;
                    }
                    if($key2 == 'collapseRender' && $item2 === true) {
                        continue;
                    }
                    if($item2 === true) {
                        $tableConfig .= "      {$key2}: true," . PHP_EOL;
                        continue;
                    }
                    if($key2 == 'span') {
                        $tableConfig .= "      {$key2}: $item2," . PHP_EOL;
                        continue;
                    }
                    $tableConfig .= "      {$key2}:'{$item2}'," . PHP_EOL;
                }
                $tableConfig .= "    }," . PHP_EOL;
                continue;
            }
            if($item === false) {
                $tableConfig .= "    {$key}: false," . PHP_EOL;
                continue;
            }
            if($item === true) {
                $tableConfig .= "    {$key}: true," . PHP_EOL;
                continue;
            }
            $tableConfig .= "    {$key}: '{$item}'," . PHP_EOL;
        }
        $tableConfig .= '  }' . PHP_EOL;
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