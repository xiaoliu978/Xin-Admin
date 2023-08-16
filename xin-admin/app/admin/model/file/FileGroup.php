<?php

namespace app\admin\model\file;

use app\common\model\BaseModel;

class FileGroup extends  BaseModel
{
    protected $key = 'id';
    protected $field = ['id','pid','name','user_id','create_time','update_time'];
}