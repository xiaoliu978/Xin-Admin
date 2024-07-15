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
namespace app\common\model\user;

use app\common\model\BaseModel;
use think\model\relation\BelongsTo;
use OpenApi\Attributes as OAT;

/**
 * 用户余额记录模型
 */
#[OAT\Schema(schema: 'user_money_log_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'user_id', description: '用户id', type: 'int'),
    new OAT\Property(property: 'scene', description: '余额变动场景', type: 'string'),
    new OAT\Property(property: 'money', description: '变动金额', type: 'int'),
    new OAT\Property(property: 'describe', description: '描述/说明', type: 'string'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
])]
class UserMoneyLogModel extends BaseModel
{
    protected $table = 'xin_user_money_log';

    protected $updateTime = false;

    /**
     * 关联会员记录表
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(UserModel::class,'user_id','id');
    }

    /**
     * 新增记录
     * @param int $userId 用户ID
     * @param float $money 变动金额
     * @param int $scene 记录类型
     * @param string $describe 记录描述
     * @param array $data 数据
     */
    public static function add(int $userId, int $scene, float $money,string $describe, array $data)
    {
        $model = new static;
        $model->save(array_merge([
            'user_id' => $userId,
            'scene' => $scene,
            'money' => $money,
            'describe' => $describe,
        ],$data));
    }
}