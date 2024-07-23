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
namespace app\common\library\token\driver;

use think\facade\Config;

/**
 * Token 驱动抽象类
 */
abstract class Driver
{
    /**
     * @var null|object 具体驱动的句柄 Mysql|Redis
     */
    protected object|null $handler = null;

    /**
     * @var array 配置数据
     */
    protected array $options = [];

    /**
     * 设置 token
     * @param string $token   Token
     * @param string $type    Type: admin | user
     * @param int    $user_id 用户ID
     * @param int    $expire  过期时间
     * @return bool
     */
    abstract function set(string $token, string $type, int $user_id, int $expire = 0): bool;

    /**
     * 获取 token 的数据
     * @param string $token               Token
     * @param bool   $expirationException 过期直接抛出异常
     * @return array
     */
    abstract function get(string $token, bool $expirationException = true): array;

    /**
     * 检查token是否有效
     * @param string $token
     * @param string $type
     * @param int    $user_id
     * @param bool   $expirationException
     * @return bool
     */
    abstract function check(string $token, string $type, int $user_id, bool $expirationException = true): bool;

    /**
     * 删除一个token
     * @param string $token
     * @return bool
     */
    abstract function delete(string $token): bool;

    /**
     * 清理一个用户的所有token
     * @param string $type
     * @param int    $user_id
     * @return bool
     */
    abstract function clear(string $type, int $user_id): bool;

    /**
     * 返回句柄对象
     * @access public
     * @return object|null
     */
    public function handler(): ?object
    {
        return $this->handler;
    }

    /**
     * @param string $token
     * @return string
     */
    protected function getEncryptedToken(string $token): string
    {
        $config = Config::get('xin.token');
        return hash_hmac($config['algo'], $token, $config['key']);
    }

    /**
     * @param int $expiretime
     * @return int
     */
    protected function getExpiredIn(int $expiretime): int
    {
        return $expiretime ? max(0, $expiretime - time()) : 365 * 86400;
    }
}