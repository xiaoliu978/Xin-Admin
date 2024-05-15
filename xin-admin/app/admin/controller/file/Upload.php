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
namespace app\admin\controller\file;

use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\Controller;
use app\common\enum\FileType as FileTypeEnum;
use app\common\library\storage\Driver as StorageDriver;
use app\admin\model\file\File as UploadFileModel;
use Exception;
use think\response\Json;

class Upload extends Controller
{
    private string|array $config;

    protected string $authName = 'file.upload';

    /**
     * 构造方法
     */
    public function initialize(): void
    {
        parent::initialize();
        // 存储配置信息
        $this->config = ['default' => 'local','engine' => [
            'local' => null
        ]];
    }

    /**
     * 图片上传接口
     * @param int $groupId 分组ID
     * @return Json
     * @throws Exception
     */
    #[Auth('image')]
    public function image(int $groupId = 0): Json
    {
        // 实例化存储驱动
        $storage = new StorageDriver($this->config);
        // 设置上传文件的信息
        $storage->setUploadFile('file')
            ->setRootDirName('image')
            ->setValidationScene('image');
        // 执行文件上传
        if (!$storage->upload()) {
            return $this->error('图片上传失败：' . $storage->getError());
        }
        // 文件信息
        $fileInfo = $storage->getSaveFileInfo();
        // 添加文件库记录
        $model = new UploadFileModel;
        $user_id = Auth::getAdminId();
        $model->add($fileInfo, FileTypeEnum::IMAGE->value,$user_id, $groupId);
        // 图片上传成功
        return $this->success('图片上传成功',['fileInfo' => $model->toArray()]);
    }

    /**
     * 视频上传接口
     * @param int $groupId 分组ID
     * @return Json
     * @throws Exception
     */
    #[Auth('video')]
    public function video(int $groupId = 0): Json
    {
        // 实例化存储驱动
        $storage = new StorageDriver($this->config);
        // 设置上传文件的信息
        $storage->setUploadFile('file')
            ->setRootDirName('video')
            ->setValidationScene('video');
        // 执行文件上传
        if (!$storage->upload()) {
            return $this->error('视频上传失败：' . $storage->getError());
        }
        // 文件信息
        $fileInfo = $storage->getSaveFileInfo();
        // 添加文件库记录
        $model = new UploadFileModel;
        $user_id = Auth::getAdminId();
        $model->add($fileInfo, FileTypeEnum::VIDEO->value,$user_id, $groupId);
        // 图片上传成功
        return $this->success('视频上传成功',['fileInfo' => $model->toArray()]);
    }

    /**
     * 压缩文件上传接口
     * @param int $groupId 分组ID
     * @return Json
     * @throws Exception
     */
    #[Auth('zip')]
    public function zip(int $groupId = 0): Json
    {
        // 实例化存储驱动
        $storage = new StorageDriver($this->config);
        // 设置上传文件的信息
        $storage->setUploadFile('file')
            ->setRootDirName('zip')
            ->setValidationScene('zip');
        // 执行文件上传
        if (!$storage->upload()) {
            return $this->error('压缩包上传失败：' . $storage->getError());
        }
        // 文件信息
        $fileInfo = $storage->getSaveFileInfo();
        // 添加文件库记录
        $model = new UploadFileModel;
        $user_id = Auth::getAdminId();
        $model->add($fileInfo, FileTypeEnum::ZIP->value,$user_id, $groupId);
        // 图片上传成功
        return $this->success('压缩包传成功',['fileInfo' => $model->toArray()]);
    }

    /**
     * 音频文件上传接口
     * @param int $groupId 分组ID
     * @return Json
     * @throws Exception
     */
    #[Auth('mp3')]
    public function mp3(int $groupId = 0): Json
    {
        // 实例化存储驱动
        $storage = new StorageDriver($this->config);
        // 设置上传文件的信息
        $storage->setUploadFile('file')
            ->setRootDirName('mp3')
            ->setValidationScene('mp3');
        // 执行文件上传
        if (!$storage->upload()) {
            return $this->error('音频文件上传失败：' . $storage->getError());
        }
        // 文件信息
        $fileInfo = $storage->getSaveFileInfo();
        // 添加文件库记录
        $model = new UploadFileModel;
        $user_id = Auth::getAdminId();
        $model->add($fileInfo, FileTypeEnum::MP3->value,$user_id, $groupId);
        // 图片上传成功
        return $this->success('音频文件传成功',['fileInfo' => $model->toArray()]);
    }

    /**
     * 视频上传接口
     * @param int $groupId 分组ID
     * @return Json
     * @throws Exception
     */
    #[Auth('annex')]
    public function annex(int $groupId = 0): Json
    {
        // 实例化存储驱动
        $storage = new StorageDriver($this->config);
        // 设置上传文件的信息
        $storage->setUploadFile('file')
            ->setRootDirName('annex')
            ->setValidationScene('annex');
        // 执行文件上传
        if (!$storage->upload()) {
            return $this->error('文件上传失败：' . $storage->getError());
        }
        // 文件信息
        $fileInfo = $storage->getSaveFileInfo();
        // 添加文件库记录
        $model = new UploadFileModel;
        $user_id = Auth::getAdminId();
        $model->add($fileInfo, FileTypeEnum::ANNEX->value,$user_id, $groupId);
        // 图片上传成功
        return $this->success('文件传成功',['fileInfo' => $model->toArray()]);
    }

}