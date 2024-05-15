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
namespace app\admin\model;

use app\common\model\BaseModel;
use think\model\concern\SoftDelete;
/**
 * Model
 */
class TestTable extends BaseModel
{

    use SoftDelete;
    protected $deleteTime = 'delete_time';
    protected $table = 'xin_test';
}
