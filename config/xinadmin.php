<?php
// +----------------------------------------------------------------------
// | XinAdmin设置
// +----------------------------------------------------------------------

return [
    'token'             => [
        // 默认驱动方式
        'default' => 'mysql',
        // 加密key
        'key'     => 'C5LziFeF2lNIOn4cMgZr17x80vHWAjwD',
        // 加密方式
        'algo'    => 'ripemd160',
        // 驱动
        'stores'  => [
            'mysql' => [
                'type'   => 'Mysql',
                // 留空表示使用默认的 Mysql 数据库，也可以填写其他数据库连接配置的`name`
                'name'   => '',
                // 存储token的表名
                'table'  => 'token',
                // 默认 token 有效时间
                'expire' => 2592000,
            ],
            'redis' => [
                'type'       => 'Redis',
                'host'       => '127.0.0.1',
                'port'       => 6379,
                'password'   => '',
                'select'     => false,
                'timeout'    => 0,
                'expire'     => 0,
                'persistent' => false,
                'userprefix' => 'xin:',
            ]
        ]
    ],
];
