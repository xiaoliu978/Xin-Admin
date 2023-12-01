<?php

namespace xin;

use PDO;
use PDOException;
use ZipArchive;

class Modules
{

    protected string $baseUrl =  '';

    // 项目根目录
    protected string $rootDir = '';

    // 安装目录
    protected string $installDir = '';

    // 备份目录
    protected string $ebakDir = '';

    // 模块目录
    protected string $modulesDir = '';

    // 后端文件夹
    protected string $adminDir = '';

    // 前端文件夹
    protected string $webDir = '';

    // taro 文件夹
    protected string $taroDir = '';

    // 安装模块名
    protected string $uid = '';

    // 变量
    protected array $devEnv = [];

    public function __construct(string $uid)
    {

        $this->rootDir      = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR;
        $this->installDir   = $this->rootDir . 'modules' . DIRECTORY_SEPARATOR;
        $this->adminDir     = $this->rootDir . 'xin-admin' . DIRECTORY_SEPARATOR;
        $this->webDir       = $this->rootDir . 'xin-web' . DIRECTORY_SEPARATOR;
        $this->taroDir      = $this->rootDir . 'xin-taro' . DIRECTORY_SEPARATOR;
        $this->ebakDir      = $this->installDir . 'ebak' . DIRECTORY_SEPARATOR;
        $this->uid          = $uid;
        if (!is_dir($this->installDir)) {
            mkdir($this->installDir, 0755, true);
        }
        if (!is_dir($this->ebakDir)) {
            mkdir($this->ebakDir, 0755, true);
        }

        $jsonString = file_get_contents('./project.json');
        $data = json_decode($jsonString,true);
        if ($data === null) {
            echo "\033[31m Error：无法解析 JSON 文件  \033[0m";
            die;
        } else {
            $this->devEnv = $data['dev'];
        }

        if ($uid) {
            $this->modulesDir = $this->installDir . $uid . DIRECTORY_SEPARATOR;
            $this->install();
        }
    }

    public function install(): void
    {

        $url = 'https://xin-modules.oss-cn-zhangjiakou.aliyuncs.com/modules/' . $this->uid . 'zip'; // 替换为要下载的文件的URL
        $destination = $this->installDir . $this->uid . '.zip'; // 替换为要保存文件的本地路径
        // 发送HTTP请求并获取文件内容
        $fileContent = file_get_contents($url);
        // 将文件内容保存到本地
        if ($fileContent === false) {
            echo "文件下载失败！";
            die;
        }
        if (file_put_contents($destination, $fileContent) === false) {
            echo "文件保存失败！";
            die;
        }

        // 创建ZipArchive对象
        $zip = new ZipArchive;
        if ($zip->open($destination) !== true) {
            echo "ZIP文件解压失败！";
            die;
        }

        // 解压ZIP文件到目标文件夹
        $zip->extractTo($this->installDir);
        // 关闭ZIP文件
        $zip->close();

        if (is_dir($this->modulesDir . 'xin-admin' . DIRECTORY_SEPARATOR)) {
            $this->copyFolder($this->modulesDir . 'xin-admin' . DIRECTORY_SEPARATOR,$this->adminDir);
        }
        if(is_dir($this->modulesDir . 'xin-web' . DIRECTORY_SEPARATOR)) {
            $this->copyFolder($this->modulesDir . 'xin-web' . DIRECTORY_SEPARATOR,$this->webDir);
        }
        if(is_dir($this->modulesDir . 'xin-taro' . DIRECTORY_SEPARATOR)) {
            $this->copyFolder($this->modulesDir . 'xin-taro' . DIRECTORY_SEPARATOR,$this->taroDir);
        }
        $color_red = "\033[0;31m";      // 红色
        $color_reset = "\033[0m";       // 重置颜色
        if(is_file($this->modulesDir . 'install.sql')) {
            try {
                $servername = $this->devEnv['db_host'];
                $username = $this->devEnv['db_user'];
                $password = $this->devEnv['db_pass'];
                $dbname = $this->devEnv['db_name'];
                if(!$username || !$servername || !$password || !$dbname){
                    echo "$color_red 请在 `project.json` 中完善数据库信息$color_reset";
                    die;
                }
                $connection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $sql = file_get_contents($this->modulesDir . 'install.sql');
                $connection->exec($sql);
                $connection = null;
                echo "successfully";
            } catch(PDOException $e){
                echo "$color_red 数据库连接失败: {$e->getMessage()} $color_reset";
                echo "$color_red 数据库错误，请检查开发环境数据库是否正确后再次执行";
                die;
            }
        }
    }


    public function copyFolder($sourceDir, $destinationDir): void
    {
        // 创建目标文件夹
        if (!is_dir($destinationDir)) {
            mkdir($destinationDir, 0777, true);
        }

        // 打开源文件夹
        $dir = opendir($sourceDir);

        // 遍历源文件夹中的每个文件和目录
        while (($file = readdir($dir)) !== false) {
            if ($file != '.' && $file != '..') {
                $sourceFile = $sourceDir . '/' . $file;
                $destinationFile = $destinationDir . '/' . $file;

                if (is_dir($sourceFile)) {
                    // 如果是目录，则递归调用moveFolder()函数
                    $this->copyFolder($sourceFile, $destinationFile);
                } else {
                    // 如果是文件，则移动文件
                    if (copy($sourceFile, $destinationFile)) {
                        echo "文件 $file 移动成功！\n";
                    } else {
                        echo "文件 $file 移动失败！\n";
                    }
                }
            }
        }
        // 关闭文件夹句柄
        closedir($dir);
    }
}