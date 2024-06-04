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
namespace app\common\library\storage;

use think\Validate;

/**
 * 文件上传验证类
 * Class FileValidate
 * @package app\common\library\storage
 */
class FileValidate extends Validate
{
    // 验证规则
    protected $rule = [
        // 图片文件: jpg,jpeg,png,bmp,gif
        // 文件大小: 2MB = (1024 * 1024 * 2) = 2097152 字节
        'image' => 'filesize:2097152|fileExt:jpg,jpeg,png,bmp,gif,avif,webp',

        // 视频文件: mp4
        // 文件大小: 10MB = (1024 * 1024 * 10) = 10485760 字节
        'video' => 'filesize:10485760|fileExt:mp4,mov,wmv,flv,avl,webm,mkv',

        // 音频文件: mp3
        // 文件大小: 10MB = (1024 * 1024 * 10) = 10485760 字节
        'mp3' => 'filesize:10485760|fileExt:mp3,wma,wav,ape,flac,ogg,aac',

        // 压缩文件: zip
        // 文件大小: 10MB = (1024 * 1024 * 10) = 10485760 字节
        'zip' => 'filesize:10485760|fileExt:zip,rar',

        // 压缩文件: zip
        // 文件大小: 10MB = (1024 * 1024 * 10) = 10485760 字节
        'annex' => 'filesize:10485760',
    ];

    // 错误提示信息
    protected $message = [
        'image.filesize' => '图片文件大小不能超出2MB',
        'image.fileExt' => '图片文件扩展名有误',
        'video.filesize' => '视频文件大小不能超出10MB',
        'video.fileExt' => '视频文件扩展名有误',
        'mp3.filesize' => '音频文件大小不能超出10MB',
        'mp3.fileExt' => '音频文件扩展名有误',
        'zip.filesize' => '压缩文件大小不能超出10MB',
        'zip.fileExt' => '压缩文件扩展名有误',
        'annex.filesize' => '压缩文件大小不能超出10MB',
        'annex.fileExt' => '压缩文件扩展名有误',
    ];

    // 验证场景
    protected $scene = [
        'image' => ['image'],
        'video' => ['video'],
        'mp3' => ['mp3'],
        'zip' => ['zip'],
        'annex' => ['annex'],
    ];
}
