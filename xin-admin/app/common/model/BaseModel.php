<?php

namespace app\common\model;

use think\Model;

class BaseModel extends Model
{
    /**
     * 错误信息
     */
    private string $errorMsg = '';

    public function getErrorMsg()
    {
        return $this->errorMsg;
    }

    public function setErrorMsg($str = '')
    {
        return $this->errorMsg = $str;
    }
}