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
        return $this->success('ok',$setting);
    }


}