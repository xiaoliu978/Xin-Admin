<?php

namespace app\common\model\user;

use app\common\model\BaseModel;
use app\common\model\User;
use think\model\relation\BelongsTo;

class UserMoneyLog extends BaseModel
{


    protected $updateTime = false;

    /**
     * 关联会员记录表
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id','id');
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