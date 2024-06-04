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
namespace app\common\model;

use OpenApi\Attributes as OAT;

/**
 * 验证码模型
 */
#[OAT\Schema(schema: 'verification_code_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'type', description: '类型', type: 'string'),
    new OAT\Property(property: 'code', description: '验证码', type: 'string'),
    new OAT\Property(property: 'status', description: '状态0：未发送 1：已发送 2：已验证', type: 'int'),
    new OAT\Property(property: 'interval', description: '有效期', type: 'string'),
    new OAT\Property(property: 'data', description: '接收方', type: 'string'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
])]
class VerificationCodeModel extends BaseModel
{
    protected $autoWriteTimestamp = true;

    protected $table = 'xin_verification_code';

    protected $schema = [
        'id' => 'int',
        'type' => 'varchar',
        'code' => 'int',
        'status' => 'int',
        'interval' => 'int',
        'data' => 'varchar',
        'create_time' => 'int',
    ];

}