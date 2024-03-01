<?php
declare (strict_types = 1);

namespace app\common\library\storage;

use \Exception;
use app\common\library\storage\engine\Local;

/**
 * 存储模块驱动
 * Class driver
 * @package app\common\library\storage
 */
class Driver
{
    private $config;    // upload 配置
    private $engine;    // 当前存储引擎类

    /**
     * 存储引擎类列表
     */
    const ENGINE_CLASS_LIST = [
        'local' => Local::class,
    ];

    /**
     * 构造方法
     * Driver constructor.
     * @param $config
     * @param string|null $storage 指定存储方式，如不指定则为系统默认
     * @throws Exception
     */
    public function __construct($config, string $storage = null)
    {
        $this->config = $config;
        // 实例化当前存储引擎
        $this->engine = $this->getEngineClass($storage);
    }

    /**
     * 设置上传的文件信息
     * @param string $name
     * @return mixed
     */
    public function setUploadFile(string $name = 'iFile'): mixed
    {
        return $this->engine->setUploadFile($name);
    }

    /**
     * 设置上传的文件信息
     * @param string $filePath
     * @return mixed
     */
    public function setUploadFileByReal(string $filePath): mixed
    {
        return $this->engine->setUploadFileByReal($filePath);
    }

    /**
     * 设置上传的文件信息
     * @param string $name
     * @return mixed
     */
    public function setRootName(string $name = ''): mixed
    {
        return $this->engine->setRootName($name);
    }

    /**
     * 设置上传文件的验证规则
     * @param array $rules
     * @return mixed
     */
    public function setValidationScene(array $rules = []): mixed
    {
        return $this->engine->setValidationScene($rules);
    }

    /**
     * 执行文件上传
     */
    public function upload()
    {
        return $this->engine->upload();
    }

    /**
     * 执行文件删除
     * @param string $filePath
     * @return mixed
     */
    public function delete(string $filePath): mixed
    {
        return $this->engine->delete($filePath);
    }

    /**
     * 获取错误信息
     * @return mixed
     */
    public function getError(): mixed
    {
        return $this->engine->getError();
    }

    /**
     * 返回保存的文件信息
     * @return mixed
     */
    public function getSaveFileInfo(): mixed
    {
        return $this->engine->getSaveFileInfo();
    }

    /**
     * 获取当前的存储引擎
     * @param string|null $storage 指定存储方式，如不指定则为系统默认
     * @return mixed
     * @throws Exception
     */
    private function getEngineClass(string $storage = null): mixed
    {
        $storage = is_null($storage) ? $this->config['default'] : $storage;
        if (!isset(self::ENGINE_CLASS_LIST[$storage])) {
            throw new Exception("未找到存储引擎类: {$storage}");
        }
        $class = self::ENGINE_CLASS_LIST[$storage];
        return new $class($storage, $this->config['engine'][$storage]);
    }
}
