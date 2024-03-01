<?php
// 应用公共文件
use app\admin\model\system\SettingGroup;
use app\common\enum\ApiEnum\ShowType;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\exception\HttpResponseException;
use think\facade\Request;
use think\Response;
use think\facade\Config;
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


/**
 * 文本左斜杠转换为右斜杠
 * @param string $string
 * @return string
 */
function convert_left_slash(string $string): string
{
    return str_replace('\\', '/', $string);
}

/**
 * 获取web根目录
 * @return string
 */
function web_path(): string
{
    static $webPath = '';
    if (empty($webPath)) {
        $request = Request::instance();
        $webPath = dirname($request->server('SCRIPT_FILENAME')) . DIRECTORY_SEPARATOR;
    }
    return $webPath;
}

/**
 * 获取当前域名及根路径
 * @return string
 */
function base_url(): string
{
    static $baseUrl = '';
    if (empty($baseUrl)) {
        $request = Request::instance();
        // url协议，设置强制https或自动获取
        $scheme = $request->scheme();
        // url子目录
        $rootUrl = root_url();
        // 拼接完整url
        $baseUrl = "{$scheme}://" . $request->host() . $rootUrl;
    }
    return $baseUrl;
}

/**
 * 获取当前url的子目录路径
 * @return string
 */
function root_url(): string
{
    static $rootUrl = '';
    if (empty($rootUrl)) {
        $request = Request::instance();
        $subUrl = str_replace('\\', '/', dirname($request->baseFile()));
        $rootUrl = $subUrl . ($subUrl === '/' ? '' : '/');
    }
    return $rootUrl;
}

/**
 * 获取当前uploads目录访问地址
 * @return string
 */
function uploads_url(): string
{
    return base_url() . 'storage/';
}