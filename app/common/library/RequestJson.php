<?php
// +----------------------------------------------------------------------
// | XinAdmin [ A Full stack framework ]
// +----------------------------------------------------------------------
// | Copyright (c) 2023~2024 http://xinadmin.cn All rights reserved.
// +----------------------------------------------------------------------
// | Apache License ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 小刘同学 <2302563948@qq.com>
// +----------------------------------------------------------------------
namespace app\common\library;

use think\Response;
use think\exception\HttpResponseException;
use think\response\Json;
use app\common\enum\ApiEnum\ShowType as ShopTypeEnum;
use OpenApi\Attributes as OAT;

/**
 * 控制器基础类
 */
trait RequestJson
{

    /**
     *  成功响应，支持抛出响应中断程序和返回 json
     * @param string $message 响应内容
     * @param array $data 响应数据
     * @param int $status 响应状态码
     * @param string $type 响应类型 render | throw
     * @return Json
     */
    #[OAT\Schema(schema: 'requestSuccess', properties: [
        new OAT\Property(property: 'msg', description: '响应消息', type: 'string'),
        new OAT\Property(property: 'showType', description: '错误显示类型', type: 'int'),
        new OAT\Property(property: 'status', description: '状态码', type: 'int', default: 200),
        new OAT\Property(property: 'success', description: '成功状态', type: 'boolean'),
        new OAT\Property(property: 'data', description: '响应数据', type: 'object', default: [])
    ])]
    protected function success(string $message, array $data = [], int $status = 200, string $type = 'render'): Json
    {
        if ($type === 'throw') {
            self::renderThrow(true, $data, $status, $message);
        }
        return self::renderJson(true, $data, $status, $message);
    }


    /**
     *  返回失败响应，支持抛出响应中断程序和返回 json
     * @param string $message 响应内容
     * @param array $data 响应数据
     * @param int $status 响应状态码
     * @param string $type 响应类型 render | throw
     * @return Json
     */
    #[OAT\Schema(schema: 'requestError', properties: [
        new OAT\Property(property: 'msg', description: '响应消息', type: 'string', default: '报错内容'),
        new OAT\Property(property: 'showType', description: '错误显示类型', type: 'int', default: 2),
        new OAT\Property(property: 'status', description: '状态码', type: 'int', default: 400),
        new OAT\Property(property: 'success', description: '成功状态', type: 'boolean', default: false),
        new OAT\Property(property: 'data', description: '响应数据', type: 'object', default: [])
    ])]
    protected function error(string $message, array $data = [], int $status = 400, string $type = 'render'): Json
    {
        if ($type === 'throw') {
            self::renderThrow(false, $data, $status, $message, ShopTypeEnum::ERROR_MESSAGE->value);
        }
        return self::renderJson(false, $data, $status, $message, ShopTypeEnum::ERROR_MESSAGE->value);
    }

    /**
     *  返回警告响应，支持抛出响应中断程序和返回 json
     * @param string $message 响应内容
     * @param array $data 响应数据
     * @param int $status 响应状态码
     * @param string $type 响应类型 render | throw
     * @return Json
     */
    #[OAT\Schema(schema: 'requestWarn', properties: [
        new OAT\Property(property: 'msg', description: '响应消息', type: 'string', default: '警告内容'),
        new OAT\Property(property: 'showType', description: '错误显示类型', type: 'int', default: 1),
        new OAT\Property(property: 'status', description: '状态码', type: 'int', default: 403),
        new OAT\Property(property: 'success', description: '成功状态', type: 'boolean', default: false),
        new OAT\Property(property: 'data', description: '响应数据', type: 'object', default: [])
    ])]
    protected function warn(string $message, array $data = [], int $status = 403, string $type = 'render'): Json
    {
        if ($type === 'throw') {
            self::renderThrow(false, $data, $status, $message, ShopTypeEnum::WARN_MESSAGE->value);
        }
        return self::renderJson(false, $data, $status, $message, ShopTypeEnum::WARN_MESSAGE->value);
    }

    /**
     *  返回没有任何状态的响应，支持抛出响应中断程序和返回 json
     * @param string $message 响应内容
     * @param array $data 响应数据
     * @param int $status 响应状态码
     * @param string $type 响应类型 render | throw
     * @return Json
     */
    protected function silent(string $message, array $data = [], int $status = 200, string $type = 'render'): Json
    {
        if ($type === 'throw') {
            self::renderThrow(false, $data, $status, $message, ShopTypeEnum::SILENT->value);
        }
        return self::renderJson(false, $data, $status, $message, ShopTypeEnum::SILENT->value);
    }

    /**
     *  返回 Json 响应
     * @param bool $success 响应状态
     * @param array $data 响应数据
     * @param int $status 响应码
     * @param string $msg 响应内容
     * @param int $showType 响应类型
     * @return Json
     */
    protected static function renderJson(bool $success = true, array $data = [], int $status = 200, string $msg = '', int $showType = 0): Json
    {
        return json(compact('data', 'success', 'status', 'msg', 'showType'), $status);
    }

    /**
     *  抛出 API 数据
     * @param bool $success
     * @param mixed $data 返回数据
     * @param int $status
     * @param string $msg
     * @param int $showType
     */
    public static function renderThrow(bool $success = true, array $data = [], int $status = 200, string $msg = '', int $showType = 0)
    {
        $response = Response::create(compact('data', 'success', 'status', 'msg', 'showType'), 'json', $status);
        throw new HttpResponseException($response);
    }


}
