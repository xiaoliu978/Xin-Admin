<?php
declare (strict_types=1);

namespace app\common\library\storage\engine;

use app\common\library\RequestJson;
use Exception;
use think\facade\Request;
use think\file\UploadedFile;

/**
 * 存储引擎抽象类
 * Class Basics
 * @package app\common\library\storage\drivers
 */
abstract class Basics
{
    use RequestJson;

    protected string $error;

    // 当前存储引擎
    protected string $storage;

    // 存储配置
    protected $config;

    // file对象句柄
    /* @var $file UploadedFile */
    protected $file;

    // 验证规则
    protected $validateRuleScene;

    // 磁盘配置
    protected $disk = 'public';

    // 保存的根文件夹名称
    protected $rootDirName;

    /**
     * 构造函数
     * Server constructor.
     * @param string $storage 存储方式
     * @param array|null $config 存储配置
     */
    public function __construct(string $storage, array $config = null)
    {
        $this->storage = $storage;
        $this->config = $config;
    }

    /**
     * 设置上传的文件信息 (外部用户上传)
     * @param string $name
     * @return $this
     */
    public function setUploadFile(string $name): Basics
    {
        // 接收上传的文件
        try {
            $this->file = Request::file($name);
        } catch (Exception $e) {
            $this->throwFileError($e);
        }
        empty($this->file) && $this->error('未找到上传文件的信息',[],200,'throw');
        return $this;
    }

    /**
     * 文件异常处理
     * @param Exception $e
     */
    private function throwFileError(Exception $e): void
    {
        $maxSize = ini_get('upload_max_filesize');
        $myMsg = $e->getCode() === 1 ? "上传的文件超出了服务器最大限制: {$maxSize}；可修改php.ini文件中upload_max_filesize项调整" : false;
        $this->error($myMsg ?: $e->getMessage(),[],200,'throw');
    }

    /**
     * 设置上传的文件信息 (系统内部上传)
     * @param string $filePath 文件路径
     * @return $this
     */
    public function setUploadFileByReal(string $filePath): Basics
    {
        // 接收上传的文件
        $this->file = new UploadedFile($filePath, basename($filePath));
        if (empty($this->file)) {
            $this->error('未找到上传文件的信息',[],200,'throw');
        }
        return $this;
    }

    /**
     * 设置上传文件的验证规则
     * @param string $scene
     * @return Basics
     */
    public function setValidationScene(string $scene = ''): Basics
    {
        $this->validateRuleScene = $scene;
        return $this;
    }

    /**
     * 设置磁盘配置
     * @param string $disk
     * @return $this
     */
    public function setDisk(string $disk): Basics
    {
        $this->disk = $disk;
        return $this;
    }

    /**
     * 设置上传的文件根目录名称
     * [通常是商城的id, 例如: 10001]
     * @param string $name
     * @return $this
     */
    public function setRootDirName(string $name): Basics
    {
        $this->rootDirName = $name;
        return $this;
    }

    /**
     * 文件上传
     * @return mixed
     */
    abstract protected function upload(): mixed;

    /**
     * 文件删除
     * @param string $filePath
     * @return mixed
     */
    abstract protected function delete(string $filePath): mixed;

    /**
     * 临时文件的绝对路径
     * @return mixed
     */
    protected function getRealPath(): string
    {
        return $this->file->getRealPath();
    }

    /**
     * 返回错误信息
     * @return mixed
     */
    public function getError(): string
    {
        return $this->error;
    }

    /**
     * 生成保存的文件信息
     * @return array
     */
    public function getSaveFileInfo(): array
    {
        // 自动生成的文件名称
        //$hashName = $this->file->hashName(null);
        $hashName = $this->hashName();
        // 存储目录
        $filePath = $this->getFilePath($hashName);
        // 文件名称
        // 去除扩展名的写法 stristr($this->file->getOriginalName(), '.', true)
        $fileName = $this->file->getOriginalName();
        // 文件扩展名
        $fileExt = strtolower($this->file->extension());
        return [
            'storage' => $this->storage,                 // 存储方式
            'domain' => $this->config['domain'] ?? '',   // 存储域名
            'file_path' => $filePath,                    // 文件路径
            'file_name' => $fileName,                    // 文件名称
            'file_size' => $this->file->getSize(),       // 文件大小(字节)
            'file_ext' => $fileExt,                      // 文件扩展名
        ];
    }

    /**
     * 自动生成文件名
     * @return string
     */
    private function hashName(): string
    {
        return $this->file->hashName(function () {
            return date('Ymd') . DIRECTORY_SEPARATOR . md5(uniqid((string)mt_rand(), true));
        });
    }

    /**
     * 获取hashName的路径
     * @param string $hashName
     * @return string
     */
    private function getFilePath(string $hashName): string
    {
        $filePath = empty($this->rootDirName) ? "{$hashName}" : "{$this->rootDirName}/{$hashName}";
        return convert_left_slash($filePath);
    }

    /**
     * 获取hashName的文件名
     * @param string $filePath
     * @return string
     */
    protected function getFileHashName(string $filePath): string
    {
        return basename($filePath);
    }

    /**
     * 获取hashName的文件目录
     * @param string $filePath
     * @return string
     */
    protected function getFileHashRoute(string $filePath): string
    {
        return dirname($filePath);
    }
}
