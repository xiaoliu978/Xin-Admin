<?php

return [
    // 默认磁盘
    'default' => 'public',
    // 磁盘列表
    'disks'   => [
        // 公共磁盘，所有人可读
        'public' => [
            // 磁盘类型
            'type'       => 'local',
            // 磁盘路径
            'root'       => app()->getRootPath() . 'public/storage',
            // 磁盘路径对应的外部URL路径
            'url'        => '/storage',
            // 可见性
            'visibility' => 'public',
        ],
        // 私有磁盘，权限读取
        'data' => [
            // 磁盘类型
            'type'       => 'local',
            // 磁盘路径
            'root'       => app()->getRootPath() . 'storage',
        ],
    ],

];
