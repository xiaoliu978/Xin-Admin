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
namespace app\common\library\storage\engine;

use think\facade\Filesystem;
use app\common\library\storage\FileValidate;

/**
 * 本地文件驱动
 * Class Local
 * @package app\common\library\storage\drivers
 */
class Local extends Basics
{
    /**
     * 上传图片文件
     * @return bool
     */
    public function upload(): bool
    {
        // 验证文件类型
        if (!$this->validate()) {
            return false;
        }
        try {
            $filePath = $this->getSaveFileInfo()['file_path'];
            // 上传到本地服务器
            $sts = Filesystem::disk($this->disk)->putFileAs(
                $this->getFileHashRoute($filePath),
                $this->file,
                $this->getFileHashName($filePath)
            );
            return (bool)$sts;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 验证上传的文件
     * @return bool
     */
    private function validate(): bool
    {
        $FileValidate = new FileValidate;
        if (!$FileValidate->check([$this->validateRuleScene => $this->file])) {
            $this->error = $FileValidate->getError();
            return false;
        }
        return true;
    }

    /**
     * 删除文件
     * @param string $filePath
     * @return bool
     */
    public function delete(string $filePath): bool
    {
        // 文件所在目录
        $realPath = realpath(web_path() . "storage/{$filePath}");
        return $realPath === false || unlink($realPath);
    }
}
