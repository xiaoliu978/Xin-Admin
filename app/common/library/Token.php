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

use think\helper\Arr;
use think\helper\Str;
use think\facade\Config;
use InvalidArgumentException;

/**
 * Token 管理类
 */
class Token
{
    // 实例
    public  $instance = [];

    // token驱动类句柄
    public $handler;

    // 驱动类命名空间
    protected $namespace = '\\app\\common\\library\\token\\driver\\';

    /**
     * 获取驱动句柄
     * @param string $name
     * @return mixed
     */
    public function getDriver(string $name = ''): mixed
    {
        if (!is_null($this->handler)) {
            return $this->handler;
        }
        $name = $name ?: $this->getDefaultDriver();

        if (is_null($name)) {
            throw new InvalidArgumentException(sprintf(
                'Unable to resolve NULL driver for [%s].',
                static::class
            ));
        }
        return $this->createDriver($name);
    }

    /**
     * 创建驱动句柄
     * @param string $name
     * @return mixed
     */
    protected function createDriver(string $name): mixed
    {
        $type = (string)$this->resolveType($name);

        $method = 'create' . Str::studly($type) . 'Driver';

        $params = $this->resolveParams($name);

        if (method_exists($this, $method)) {
            return $this->$method(...$params);
        }

        $class = $this->resolveClass($type);

        if (isset($this->instance[$type])) {
            return $this->instance[$type];
        }

        return new $class(...$params);
    }

    /**
     * 默认驱动
     * @return string
     */
    protected function getDefaultDriver(): string
    {
        return $this->getConfig('default');
    }

    /**
     * 获取驱动配置
     * @param string|null $name
     * @param null        $default
     * @return mixed
     */
    protected function getConfig(string $name = null, $default = null): mixed
    {
        if (!is_null($name)) {
            return Config::get('xinadmin.token.' . $name, $default);
        }

        return Config::get('xinadmin.token');
    }

    /**
     * 获取驱动配置参数
     * @param $name
     * @return array
     */
    protected function resolveParams($name): array
    {
        $config = $this->getStoreConfig($name);
        return [$config];
    }

    /**
     * 获取驱动类
     * @param string $type
     * @return string
     */
    protected function resolveClass(string $type): string
    {
        if ($this->namespace || false !== strpos($type, '\\')) {
            $class = false !== strpos($type, '\\') ? $type : $this->namespace . Str::studly($type);

            if (class_exists($class)) {
                return $class;
            }
        }

        throw new InvalidArgumentException("Driver [$type] not supported.");
    }

    /**
     * 获取驱动配置
     * @param string      $store
     * @param string|null $name
     * @param null        $default
     * @return array|string
     */
    protected function getStoreConfig(string $store, string $name = null, $default = null)
    {
        if ($config = $this->getConfig("stores.{$store}")) {
            return Arr::get($config, $name, $default);
        }

        throw new InvalidArgumentException("Store [$store] not found.");
    }

    /**
     * 获取驱动类型
     * @param string $name
     * @return array|string
     */
    protected function resolveType(string $name)
    {
        return $this->getStoreConfig($name, 'type', 'Mysql');
    }

    /**
     * 设置token
     * @param string   $token
     * @param string   $type
     * @param int      $user_id
     * @param int|null $expire
     * @return bool
     */
    public function set(string $token, string $type, int $user_id, int $expire = null): bool
    {
        return $this->getDriver()->set($token, $type, $user_id, $expire);
    }

    /**
     * 获取token
     * @param string $token
     * @param bool   $expirationException
     * @return array
     */
    public function get(string $token, bool $expirationException = true): array
    {
        return $this->getDriver()->get($token, $expirationException);
    }

    /**
     * 检查token
     * @param string $token
     * @param string $type
     * @param int    $user_id
     * @param bool   $expirationException
     * @return bool
     */
    public function check(string $token, string $type, int $user_id, bool $expirationException = true): bool
    {
        return $this->getDriver()->check($token, $type, $user_id, $expirationException);
    }

    /**
     * 删除token
     * @param string $token
     * @return bool
     */
    public function delete(string $token): bool
    {
        return $this->getDriver()->delete($token);
    }

    /**
     * 清理指定用户token
     * @param string $type
     * @param int    $user_id
     * @return bool
     */
    public function clear(string $type, int $user_id): bool
    {
        return $this->getDriver()->clear($type, $user_id);
    }
}