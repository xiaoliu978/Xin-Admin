<?php

namespace app\admin\controller\system;

use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\AdminController;
use app\admin\model\system\Setting as SettingModel;
use think\response\Json;

class Setting extends AdminController
{
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new SettingModel();
    }

    #[Auth('list'),Method('GET')]
    public function list(): Json
    {
        $setting = $this->model->select()->toArray();
        $intType = 1;
        $floatType = 1.33;
        $stringType = '这是一串字符串';
        $arrayType = [
          'key' => '值'
        ];
        $array = array('a',1,231);
        $booleanType = false;
        return $this->success('ok',$setting);
    }


}