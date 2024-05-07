<?php

namespace app\admin\model\system;

use app\common\model\BaseModel;

class Setting extends BaseModel
{

    public function getOptionsAttr($value)
    {
        $data = [];
        $value = explode("\n",$value);
        foreach ($value as $item) {
            $item = explode('=',$item);
            if(count($item) < 2) {
                continue;
            }
            $data[] = [
                'label' => $item[0],
                'value' => $item[1]
            ];
        }
        return $data;
    }

    public function getPropsAttr($value)
    {
        $data = [];
        $value = explode("\n",$value);
        foreach ($value as $item) {
            $item = explode('=',$item);
            if(count($item) < 2) {
                continue;
            }
            if($item[1] === 'false') {
                $data[$item[0]] = false;
            }elseif ($item[1] === 'true') {
                $data[$item[0]] = true;
            }else {
                $data[$item[0]] = $item[1];
            }
        }
        return $data;
    }

    public function getDefaultDataAttr($value,$data)
    {
        return $data;
    }


}