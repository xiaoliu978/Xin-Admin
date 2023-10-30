<?php
namespace Xin;

use PDO;
use PDOException;

class Xin
{

    /**
     * 依赖项
     * @var array
     */
    protected array $require = [];

    /**
     * 环境变量
     * @var array
     */
    protected array $devEnv = [];
    protected array $produce = [];

    /**
     * 命令参数
     * @var array
     */
    protected array $argv = [];

    /**
     * 命令行资源
     * @var resource|bool proc_open 返回的 resource
     */
    protected $process = false;

    protected PDO | null $connection = null;

    /**
     * 运行日志文件
     * @var string
     */
    protected string $runFile;
    private int $procStatus;
    private string $outputFile;
    private array $descriptorsPec;


    public function __construct(array $argv)
    {
        // 记录运行日志
        $outputDir = '.'. DIRECTORY_SEPARATOR . 'log' ;
        $runDate = time();

        if (!is_dir($outputDir)) {
            mkdir($outputDir, 0755, true);
        }

        $this->runFile = $outputDir . DIRECTORY_SEPARATOR . 'run.log';

        $log = file_get_contents($this->runFile);
        file_put_contents($this->runFile, $log . date('Y-m-d H:i:s',$runDate) . ' ' . implode(' ', $argv) . PHP_EOL );

        $this->argv = $argv;

        $color_yellow = "\033[0;33m";
        $color_reset = "\033[0m";
        $this->echoLogo();
        if(!isset($argv[1])){
            echo str_pad('Welcome to Xin Admin', 20 , ' ') . PHP_EOL . PHP_EOL;
            $this->help();
            return;
        }

        if($argv[1] != 'install' && $argv[1] != 'dev' && $argv[1] != 'produce' && $argv[1] != 'i'){
            echo $color_yellow . '未识别的命令，请执行以下操作：' . $color_reset . PHP_EOL . PHP_EOL;
            $this->help();
            return;
        }

        $this->outputFile = $outputDir . DIRECTORY_SEPARATOR . 'run-' . time() . '.log';
        file_put_contents($this->outputFile, '');
        /**
         * 命令执行结果输出到文件而不是管道 build admin
         * 因为输出到管道时有延迟，而文件虽然需要频繁读取和对比内容，但是输出实时的
         */
        $this->descriptorsPec = [0 => ['pipe', 'r'], 1 => ['file', $this->outputFile, 'w'], 2 => ['file', $this->outputFile, 'w']];

        $argv[1] == 'install' && $this->install();
        $argv[1] == 'dev' && $this->dev();
        $argv[1] == 'produce' && $this->produce();
        $argv[1] == 'i' && $this->installModules($argv[2]);
    }


    /**
     * 安装依赖
     * @return void
     */
    public function install(): void
    {
        $this->getEnv();


        // 安装PHP 依赖
        echo '开始安装 PHP 依赖' .PHP_EOL;
        $command = "cd ./xin-admin && composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/ && composer install";
        $this->runCommand($command);
        // 安装 PNPM 依赖
        echo '开始安装 前端 依赖' .PHP_EOL;
        $command = "cd ./xin-web && npm config set registry https://registry.npmmirror.com && npm install -g pnpm && pnpm config set registry https://registry.npmmirror.com && pnpm install";
        $this->runCommand($command);
        // 导入数据库
        echo '开始导入数据库' .PHP_EOL;
        if($this->connection) {
            try {
                $filePath = '.'. DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'install.sql';
                if (file_exists($filePath)) {
                    $sql = file_get_contents($filePath);
                    $this->connection->exec($sql);
                    $this->connection = null;
                    echo "successfully";
                } else {
                    echo "\033[31m Error: File doesn't exist  \033[0m";
                }
            } catch(PDOException $e) {
                echo "\033[31m SQL execution failed: {$e->getMessage()} \033[0m";
            }
        }
    }

    /**
     * 开发服务
     * @return void
     */
    public function dev():void
    {
        $this->process = proc_open('cd ./xin-admin && php think run', $this->descriptorsPec, $pipes);

        if (!is_resource($this->process)) {
            echo 'Failed to execute';
            die;
        }

        while ($this->getProcStatus()) {
            // 读取输出流的数据
            $contents = file_get_contents($this->outputFile);
            echo $contents;
            usleep(500000);
        }
        echo PHP_EOL;
        $returnValue = proc_close($this->process);
        if ($returnValue !== 0) {
            echo '命令执行失败，错误代码: ' . $returnValue;
            die;
        }

    }

    /**
     * 部署打包
     * @return void
     */
    public function produce ():void
    {
        $this->getEnv();

        $targetDir = '.'. DIRECTORY_SEPARATOR . 'build' ;
        $sourceDir = '.'. DIRECTORY_SEPARATOR . 'xin-admin'; // 要复制的文件夹

        // 删除目标文件夹
        if (is_dir($targetDir)) {
            $this->removeDirectory($targetDir);
        }

        // 安装 PNPM 依赖
        echo '开始打包 前端 代码' .PHP_EOL;
        $command = "cd ./xin-web && pnpm run build";
        $this->runCommand($command);

        // 复制后端项目文件
        echo "开始复制后端项目文件" .PHP_EOL;

        // 创建新的目标文件夹
        if (!mkdir($targetDir, 0777, true)) {
            die('无法创建新的目标文件夹');
        }

        // 复制文件夹中的文件
        $this->copyDirectory($sourceDir, $targetDir, ['.env','composer.lock','runtime']);

        // 开始复制前端文件
        echo "开始复制前端项目文件" .PHP_EOL;
        $targetDir = '.'. DIRECTORY_SEPARATOR . 'build' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'assets';
        $sourceDir = '.'. DIRECTORY_SEPARATOR . 'xin-web' . DIRECTORY_SEPARATOR . 'dist' ; // 要复制的文件夹

        // 创建新的目标文件夹
        if (!mkdir($targetDir, 0777, true)) {
            die('无法创建新的目标文件夹');
        }
        // 复制文件夹中的文件
        $this->copyDirectory($sourceDir, $targetDir, ['index.html']);

        $targetDir = '.'. DIRECTORY_SEPARATOR . 'build' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'index.html';
        $sourceDir = '.'. DIRECTORY_SEPARATOR . 'xin-web' . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR .'index.html' ; // 要复制的文件夹
        copy($sourceDir, $targetDir);

        $envCount = "APP_DEBUG = true" . PHP_EOL;
        $envCount .= "DB_TYPE = {$this->produce['db_type']}". PHP_EOL;
        $envCount .= "DB_HOST = {$this->produce['db_host']}". PHP_EOL;
        $envCount .= "DB_NAME = {$this->produce['db_name']}". PHP_EOL;
        $envCount .= "DB_PREFIX = xin_". PHP_EOL;
        $envCount .= "DB_USER = {$this->produce['db_user']}". PHP_EOL;
        $envCount .= "DB_PASS = {$this->produce['db_pass']}". PHP_EOL;
        $envCount .= "DB_PORT = {$this->produce['db_port']}". PHP_EOL;
        $envCount .= "DB_CHARSET = {$this->produce['db_charset']}" . PHP_EOL;
        $envCount .= "DEFAULT_LANG = zh-cn". PHP_EOL;
        $envCount .= "# 用于 Crud 代码生成目录 相对于 应用根目录位置". PHP_EOL;
        $envCount .= "WEB_PATH = ../xin-web". PHP_EOL;

        file_put_contents('./build/.env', $envCount );


    }

    public function removeDirectory($dir): void
    {
        $files = glob($dir . '/{,.}*', GLOB_MARK | GLOB_NOSORT | GLOB_BRACE);
        foreach ($files as $file) {
            if (basename($file) == '.' || basename($file) == '..') {
                continue;
            }
            if (is_dir($file)) {
                $this->removeDirectory($file); // 递归删除子文件夹
            } else {
                unlink($file); // 删除文件
            }
        }
        if(is_dir($dir)){
            rmdir($dir); // 删除文件夹
        }
    }

    public function copyDirectory($source, $dest, $ignore_files = array()): void
    {
        $dir = opendir($source);

        if (is_dir($dest)) {
            $this->removeDirectory($dest);
        }
        mkdir($dest);
        while(false !== ( $file = readdir($dir)) ) {
            if (($file != '.' ) && ( $file != '..' ) && !in_array($file, $ignore_files)) {
                if ( is_dir($source . '/' . $file) ) {
                    $this->copyDirectory($source . '/' . $file, $dest . '/' . $file);
                }
                else {
                    copy($source . '/' . $file, $dest . '/' . $file);
                }
            }
        }
        closedir($dir);
    }



    /**
     * 安装模块
     * @return void
     */
    public function installModules():void
    {

    }

    public function getEnv(): void
    {
        $jsonString = file_get_contents('./project.json');
        $data = json_decode($jsonString,true);
        if ($data === null) {
            echo "\033[31m Error：无法解析 JSON 文件  \033[0m";
            die;
        } else {
            $this->require = $data['require'];
            $this->devEnv = $data['dev'];
            $this->produce = $data['produce'];
        }
        $color_green = "\033[0;32m";
        $color_reset = "\033[0m";
        echo str_pad('环境', 14) . str_pad('已有版本', 16) . str_pad('需求版本', 16) . PHP_EOL;
        echo $color_green . str_pad('Xin Admin', 12, ' ') . $color_reset . str_pad($data['version'], 12) . str_pad($data['version'], 12) . PHP_EOL;
        $this->verifyPHP();
        $this->verifyComposer();
        $this->verifyNode();
        $this->verifySql();
        $this->format('',true);

        echo "环境检测完成".PHP_EOL;
    }


    public function runCommand(string $command): void
    {

        $this->process = proc_open($command, $this->descriptorsPec, $pipes);

        if (!is_resource($this->process)) {
            echo 'Failed to execute';
            die;
        }

        while ($this->getProcStatus()) {
            // 读取输出流的数据
            $contents = file_get_contents($this->outputFile);
            $lines = explode("\n", $contents);
            echo end($lines);
            usleep(500000);
        }
        echo PHP_EOL;
        $returnValue = proc_close($this->process);
        if ($returnValue !== 0) {
            echo '命令执行失败，错误代码: ' . $returnValue;
            die;
        }
    }

    public function verifySql() : void
    {
        $phpPdo = extension_loaded("pdo");
        $color_red = "\033[0;31m";      // 红色
        $color_reset = "\033[0m";       // 重置颜色
        if ($phpPdo) {
            try {
                $servername = $this->devEnv['db_host'];
                $username = $this->devEnv['db_user'];
                $password = $this->devEnv['db_pass'];
                $dbname = $this->devEnv['db_name'];

                if(!$username || !$servername || !$password || !$dbname){
                    echo "$color_red 请在 `project.json` 中完善数据库信息$color_reset";
                    die;
                }

                $envCount = "APP_DEBUG = true" . PHP_EOL;
                $envCount .= "DB_TYPE = {$this->devEnv['db_type']}". PHP_EOL;
                $envCount .= "DB_HOST = {$this->devEnv['db_host']}". PHP_EOL;
                $envCount .= "DB_NAME = {$this->devEnv['db_name']}". PHP_EOL;
                $envCount .= "DB_PREFIX = xin_". PHP_EOL;
                $envCount .= "DB_USER = {$this->devEnv['db_user']}". PHP_EOL;
                $envCount .= "DB_PASS = {$this->devEnv['db_pass']}". PHP_EOL;
                $envCount .= "DB_PORT = {$this->devEnv['db_port']}". PHP_EOL;
                $envCount .= "DB_CHARSET = {$this->devEnv['db_charset']}" . PHP_EOL;
                $envCount .= "DEFAULT_LANG = zh-cn". PHP_EOL;
                $envCount .= "# 用于 Crud 代码生成目录 相对于 应用根目录位置". PHP_EOL;
                $envCount .= "WEB_PATH = ../xin-web". PHP_EOL;

                file_put_contents('./xin-admin/.env', $envCount );

                $this->connection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e){
                echo "$color_red 数据库连接失败: {$e->getMessage()} $color_reset";
                die;
            }
        }else {
            echo "$color_red Error: 请开启 php extend-pdo 扩展！ $color_reset";
            die;
        }

    }

    /**
     * 验证 PHP 环境和扩展
     * @return void
     */
    public function verifyPhp(): void
    {
        $havePhpV = phpversion();
        $pattern = '/(\d+\.\d+\.\d+)/';
        $color_red = "\033[0;31m";      // 红色
        $color_reset = "\033[0m";       // 重置颜色

        preg_match($pattern, $this->require['php'], $needPhpV);
        $needPhpV = $needPhpV[1] ?? $needPhpV[0];
        $this->version('PHP',$needPhpV,$havePhpV);

        $phpProc = function_exists('proc_open') && function_exists('proc_close') && function_exists('proc_get_status');
        if (!$phpProc) {
            echo "$color_red Error: 请开启 php proc_open proc_close proc_get_status 扩展！ $color_reset";
            die;
        }


    }

    /**
     * 验证 Composer
     * @return void
     */
    public function verifyComposer(): void
    {
        $pattern = '/(\d+\.\d+\.\d+)/';
        $this->process = proc_open('composer -v', [
            0 => ['pipe', 'r'], // 标准输入
            1 => ['pipe', 'w'], // 标准输出
            2 => ['pipe', 'w'], // 标准错误输出
        ], $pipes);

        // 读取和输出命令的输出
        $output = stream_get_contents($pipes[1]);

        // 关闭进程和管道
        fclose($pipes[0]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        proc_close($this->process);

        if (str_contains($output, 'Composer')) {
            // 提取版本信息
            preg_match('/version ([0-9]+\.[0-9]+\.[0-9]+)/', $output, $matches);
            $haveComposerV = $matches[1];
            preg_match($pattern, $this->require['composer'], $needComposerV);
            $needComposerV = $needComposerV[1] ?? $needComposerV[0];
            $this->version('Composer',$needComposerV,$haveComposerV);
        } else {
            echo "\033[31m Error: composer 未安装,请安装 {$this->require['composer']} 或以上的 composer 之后重试！ \033[0m";
            die;
        }

    }

    /**
     * 验证 Node Js
     * @return void
     */
    public function verifyNode(): void
    {
        $pattern = '/(\d+\.\d+\.\d+)/';
        $this->process = proc_open('node -v', [
            0 => ['pipe', 'r'], // 标准输入
            1 => ['pipe', 'w'], // 标准输出
            2 => ['pipe', 'w'], // 标准错误输出
        ], $pipes);

        // 读取和输出命令的输出
        $output = stream_get_contents($pipes[1]);

        // 关闭进程和管道
        fclose($pipes[0]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        proc_close($this->process);

        if (str_contains($output, 'v')) {
            // 提取版本信息
            preg_match($pattern, $output, $haveNodeV);
            $haveNodeV = $haveNodeV[1] ?? $haveNodeV[0];
            preg_match($pattern, $this->require['nodejs'], $needNodeV);
            $needNodeV = $needNodeV[1] ?? $needNodeV[0];
            $this->version('Node Js',$needNodeV,$haveNodeV);
        } else {
            echo "\033[31mError: Node.js 未安装,请安装 {$this->require['nodejs']} 或以上的Node js 之后重试！ \033[0m";
            die;
        }
    }

    /**
     * 验证版本
     * @param string $name 名称
     * @param string $need 需要版本号
     * @param string $have 已有版本号
     * @return void
     */
    public function version(string $name, string $need, string $have): void
    {
        $color_red = "\033[0;31m";      // 红色
        $color_green = "\033[0;32m";    // 绿色
        $color_yellow = "\033[0;33m";   // 黄色
        $color_reset = "\033[0m";       // 重置颜色

        if(version_compare($have,$need) == -1){
            echo $color_yellow . str_pad($name, 12, ' ') . $color_reset . str_pad($have, 12) . str_pad($need, 12) . PHP_EOL;
            echo PHP_EOL;
            echo "$color_red Error: $name 版本过低 , 请升级之后重试！ $color_reset";
            die;
        }else {
            echo $color_green . str_pad($name, 12, ' ') . $color_reset . str_pad($have, 12) . str_pad($need, 12) . PHP_EOL;
        }
    }


    /**
     * 格式化输出
     * @param string $text
     * @param bool $group
     * @return void
     */
    public function format(string $text = '', bool $group = false): void
    {
        if($text != ''){
            $text = ' '.$text.' ';
        }
        $totalWidth = 50; // 总宽度
        if($group){
            $textLength = mb_strwidth($text);
            $leftPadding = (int)(($totalWidth - $textLength) / 2);
            $rightPadding = $totalWidth - $textLength - $leftPadding;

            $centeredText = str_pad($text, $textLength + $leftPadding, '-', STR_PAD_LEFT);
            $centeredText = str_pad($centeredText, $textLength + $leftPadding + $rightPadding, '-');

            echo $centeredText . PHP_EOL;
        }else {
            $text = "\033[32m$text\033[0m";
            $textLength = mb_strwidth($text) ;
            $leftPadding = (int)(($totalWidth - $textLength) / 2) + 4;
            $rightPadding = $totalWidth - $textLength - $leftPadding + 7;

            $centeredText = str_pad($text, $textLength + $leftPadding, ' ', STR_PAD_LEFT);
            $centeredText = str_pad($centeredText, $textLength + $leftPadding + $rightPadding, ' ');
            $centeredText = str_pad($centeredText, $textLength + $leftPadding + $rightPadding + 1, '-',STR_PAD_LEFT);
            $centeredText = str_pad($centeredText, $textLength + $leftPadding + $rightPadding + 2, '-');
            echo $centeredText . PHP_EOL;
        }

    }

    /**
     * 获取执行状态
     */
    public function getProcStatus(): bool
    {
        $status = proc_get_status($this->process);
        if ($status['running']) {
            $this->procStatus = 1;
            return true;
        } elseif ($this->procStatus === 1) {
            $this->procStatus = 0;
            if ($status['exitcode'] === 0) {
                echo 'success';
            } else {
                echo 'error';
            }
            return true;
        } else {
            return false;
        }
    }

    public function updateProgressBar($title,$progress): void
    {
        $barWidth = 40;
        $completedWidth = round($progress * $barWidth);
        $remainingWidth = $barWidth - $completedWidth;

        $bar = str_repeat('=', $completedWidth) . str_repeat(' ', $remainingWidth);

        echo sprintf("$title [%s]", $bar);
    }

    /**
     * 打印 LOGO
     * @return void
     */
    public function echoLogo(): void
    {
        echo "\033[0;32m" . "
 ██╗  ██╗   ╔██████╗   ██╗   ██╗ 
 ╚██╗██╔╝     ╚██║     ██ █╗ ██║ 
  ╚███╔╝       ██║     ██║ █ ██║ 
  ██╔██╗       ██║     ██║  █╗█║ 
 ██╔╝ ██╗   ╔██████╗   ██║   ██╗
 ╚═╝  ╚═╝   ╚══════╝   ╚═╝   ╚═╝ 
" . "\033[0m" . "\n";
        $this->format('',true);
    }

    /**
     * 帮助
     * @return void
     */
    public function help(): void
    {
        $color_green = "\033[0;32m";
        $color_reset = "\033[0m";
        echo $color_green . str_pad('php run install', 20, ' ') . $color_reset . '执行依赖安装' . PHP_EOL;
        echo PHP_EOL;
        echo $color_green . str_pad('php run dev', 20, ' ') . $color_reset . '运行开发服务' . PHP_EOL;
        echo PHP_EOL;
        echo $color_green . str_pad('php run produce', 20, ' ') . $color_reset . '部署打包' . PHP_EOL;
        echo PHP_EOL;
        echo $color_green . str_pad('php run i [-name]', 20, ' ') . $color_reset . '安装插件' . PHP_EOL;
        echo PHP_EOL;
    }

}