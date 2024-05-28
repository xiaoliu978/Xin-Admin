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
use app\common\model\file\FileModel;
use app\common\model\user\UserMoneyLogModel as MoneyLogModel;
use think\model\relation\HasOne;
use OpenApi\Attributes as OAT;

/**
 * 用户模型
 */
#[OAT\Schema(schema: 'user_model',properties: [
    new OAT\Property(property: 'id', description: 'ID', type: 'int'),
    new OAT\Property(property: 'username', description: '用户名', type: 'string'),
    new OAT\Property(property: 'nickname', description: '昵称', type: 'string'),
    new OAT\Property(property: 'mobile', description: '手机号', type: 'string'),
    new OAT\Property(property: 'email', description: '邮箱', type: 'string'),
    new OAT\Property(property: 'gender', description: '性别', type: 'string'),
    new OAT\Property(property: 'birthday', description: '生日', type: 'string'),
    new OAT\Property(property: 'money', description: '用户余额', type: 'float'),
    new OAT\Property(property: 'score', description: '用户积分', type: 'float'),
    new OAT\Property(property: 'motto', description: '签名', type: 'string'),
    new OAT\Property(property: 'status', description: '状态', type: 'string'),
    new OAT\Property(property: 'group_id', description: '分组ID', type: 'string'),
    new OAT\Property(property: 'avatar_id', description: '头像ID', type: 'int'),
    new OAT\Property(property: 'create_time', description: '创建时间', type: 'string'),
    new OAT\Property(property: 'update_time', description: '修改时间', type: 'string'),
])]
class UserModel extends BaseModel
{
    protected $table = 'xin_user';

    protected $hidden = [
        'password', 'create_time', 'update_time', 'status'
    ];

    protected $schema = [
        'id' => 'int',
        'mobile' => 'varchar',
        'username' => 'varchar',
        'email' => 'varchar',
        'password' => 'varchar',
        'nickname' => 'varchar',
        'avatar_id' => 'int',
        'gender' => 'char',
        'birthday' => 'date',
        'group_id' => 'int',
        'money' => 'decimal',
        'score' => 'decimal',
        'motto' => 'varchar',
        'status' => 'char',
        'create_time' => 'int',
        'update_time' => 'int'
    ];
    /**
     * 关联用户头像表
     * @return HasOne
     */
    public function avatar(): HasOne
    {
        return $this->hasOne(FileModel::class, 'file_id', 'avatar_id')
            ->bind(['avatar_url' => 'preview_url']);
    }


    /**
     * 累积用户的余额
     * @param int $userId 用户ID
     * @param float $money 累计的积分
     * @param string $describe 积分描述
     * @param int $scene 积分变动类型
     * @param array $data
     * @return mixed
     */
    public static function setIncMoney(int $userId, float $money, string $describe, int $scene, array $data = []): mixed
    {
        // 新增余额变动记录
        MoneyLogModel::add($userId, $scene, $money, $describe, $data);
        // 更新用户可用积分
        return (new static)->setInc($userId, 'money', $money);
    }

    /**
     * 累减用户的余额
     * @param int $userId 用户ID
     * @param float $money 累计的积分
     * @param string $describe 积分描述
     * @param int $scene 积分变动类型
     * @param array $data
     * @return mixed
     */
    public static function setDecMoney(int $userId, float $money, string $describe, int $scene, array $data = []): mixed
    {
        // 新增余额变动记录
        MoneyLogModel::add($userId, $scene, -$money, $describe, $data);
        // 更新用户可用积分
        return (new static)->setDec($userId, 'money', $money);
    }
}
