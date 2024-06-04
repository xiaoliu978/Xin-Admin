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
namespace app\common\library\sms;

/**
 * Sms 驱动抽象类
 */
abstract class Driver
{

    /**
     * 获取服务
     */
    abstract static function getService();

    /**
     * 发送验证码
     * @param $sendNo
     * @return bool|string
     */
    abstract function sendCode($sendNo): bool|string;


    /**
     * 验证验证码
     * @param $sendNo
     * @param $code
     * @return bool|string
     */
    abstract function verify($sendNo, $code): bool|string;
}