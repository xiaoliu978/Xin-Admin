<?php
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
