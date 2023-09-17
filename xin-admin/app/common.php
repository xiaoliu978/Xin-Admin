<?php
// 应用公共文件
use app\admin\model\system\SettingGroup;
use app\common\enum\ApiEnum\ShowType;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\exception\HttpResponseException;
use think\Response;

/**
 * 驼峰转下划线
 * @param string $camelCaps
 * @param string $separator
 * @return string
 */
function uncamelize(string $camelCaps, string $separator = '_'): string
{
    return strtolower(preg_replace('/([a-z])([A-Z])/', "$1" . $separator . "$2", $camelCaps));
}



/**
 * 获取站点的系统配置，不传递参数则获取所有配置项
 * @param string $name 变量名
 * @return string | array
 * @throws DataNotFoundException
 * @throws DbException
 * @throws ModelNotFoundException
 */
function get_setting(string $name): array|string
{
    $setting_name = explode('.',$name);
    $setting_group = (new SettingGroup())->where('key',$setting_name[0])->find();
    if(!$setting_group){
        $data = [
            'data' => [],
            'success' => false,
            'status' => 200,
            'msg'   => '设置不存在',
            'showType' => ShowType::WARN_MESSAGE->value
        ];
        $response = Response::create($data, 'json', 200);
        throw new HttpResponseException($response);
    }
    if(count($setting_name) > 1){
        $setting = $setting_group->setting()->where('key',$setting_name[1])->find();
        if(!$setting){
            $data = [
                'data' => [],
                'success' => false,
                'status' => 200,
                'msg'   => '设置不存在',
                'showType' => ShowType::WARN_MESSAGE->value
            ];
            $response = Response::create($data, 'json', 200);
            throw new HttpResponseException($response);
        }
        return $setting['values'];
    }else {
        $setting = $setting_group->setting()->select();
        $arr = [];
        foreach ($setting as $set){
            $arr[$set['key']] = $set['values'];
        }
        return $arr;
    }


}
