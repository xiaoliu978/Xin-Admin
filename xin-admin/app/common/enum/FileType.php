<?php
declare (strict_types = 1);

namespace app\common\enum;


/**
 * 枚举类：文件类型
 * Class FileType
 * @package app\common\enum\goods
 */
enum FileType: int
{
    // 图片
    case IMAGE = 10;

    // 附件
    case ANNEX = 20;

    // 视频
    case VIDEO = 30;

    // 压缩包
    case ZIP = 40;

    //音频
    case MP3 = 50;

    /**
     * 获取枚举类型值
     * @return array
     */
    public static function data(): array
    {
        return [
            self::IMAGE->value => [
                'name' => '图片',
                'value' => self::IMAGE,
                'preview_path' => ''
            ],
            self::ANNEX->value => [
                'name' => '附件',
                'value' => self::ANNEX,
                'preview_path' => 'assets/annex.png',
            ],
            self::VIDEO->value => [
                'name' => '视频',
                'value' => self::VIDEO,
                'preview_path' => 'assets/video.png',
            ],
            self::ZIP->value => [
                'name' => '压缩包',
                'value' => self::ZIP,
                'preview_path' => 'assets/zip.png',
            ],
            self::MP3->value => [
                'name' => '音频',
                'value' => self::MP3,
                'preview_path' => 'assets/mp3.png',
            ],
        ];
    }

}
