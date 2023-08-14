<?php
declare (strict_types = 1);

namespace app\common\controller;

use app\BaseController;
use think\Response;
use think\exception\HttpResponseException;
use think\response\Json;
use app\common\enum\ApiEnum\ShowType as ShopTypeEnum;

/**
 * 控制器基础类
 */
class RequestController extends  BaseController
{

    /**
     *  成功响应，支持抛出响应中断程序和返回 json
     * @param string $message 响应内容
     * @param array  $data    响应数据
     * @param int    $status  响应状态码
     * @param string $type    响应类型 render | throw
     * @return Json
     */
    protected function success(string $message, array $data = [], int $status = 200, string $type = 'render') : Json
    {
        if($type === 'throw') {
            $this->renderThrow(true, $data, $status, $message);
        }
        return $this->renderJson(true, $data, $status, $message);
    }


    /**
     *  返回失败响应，支持抛出响应中断程序和返回 json
     * @param string $message 响应内容
     * @param array  $data    响应数据
     * @param int    $status  响应状态码
     * @param string $type    响应类型 render | throw
     * @return Json
     */
    protected function error(string $message, array $data = [], int $status = 200, string $type = 'render') : Json
    {
        if($type === 'throw'){
            $this->renderThrow(false, $data, $status, $message, ShopTypeEnum::ERROR_MESSAGE->value);
        }
        return $this->renderJson(false, $data, $status, $message, ShopTypeEnum::ERROR_MESSAGE->value);
    }

    /**
     *  返回警告响应，支持抛出响应中断程序和返回 json
     * @param string $message 响应内容
     * @param array  $data    响应数据
     * @param int    $status  响应状态码
     * @param string $type    响应类型 render | throw
     * @return Json
     */
    protected function warn(string $message, array $data = [], int $status = 200, string $type = 'render') : Json
    {
        if($type === 'throw'){
            $this->renderThrow(false, $data, $status, $message, ShopTypeEnum::WARN_MESSAGE->value);
        }
        return $this->renderJson(false, $data, $status, $message, ShopTypeEnum::WARN_MESSAGE->value);
    }

    /**
     *  返回没有任何状态的响应，支持抛出响应中断程序和返回 json
     * @param string $message 响应内容
     * @param array  $data    响应数据
     * @param int    $status  响应状态码
     * @param string $type    响应类型 render | throw
     * @return Json
     */
    protected function silent(string $message, array $data = [], int $status = 200, string $type = 'render') : Json
    {
        if($type === 'throw'){
            $this->renderThrow(false, $data, $status, $message, ShopTypeEnum::SILENT->value);
        }
        return $this->renderJson(false, $data, $status, $message, ShopTypeEnum::SILENT->value);
    }

    /**
     *  返回 Json 响应
     * @param bool   $success  响应状态
     * @param array  $data     响应数据
     * @param int    $status   响应码
     * @param string $msg  响应内容
     * @param int    $showType 响应类型
     * @return Json
     */
    protected function renderJson(bool $success = true, array $data = [], int $status = 200, string $msg = '', int $showType = 0) : Json
    {
        return json(compact('data', 'success', 'status', 'msg', 'showType'), 200);
    }

    /**
     *  抛出 API 数据
     * @param bool $success
     * @param mixed $data 返回数据
     * @param int $status
     * @param string $msg
     * @param int $showType
     */
    public function renderThrow(bool $success = true, array $data = [], int $status = 200, string $msg = '', int $showType = 0)
    {
        $response = Response::create(compact('data', 'success', 'status', 'msg', 'showType'), 'json', 200);
        throw new HttpResponseException($response);
    }


}
