<?php

namespace app\admin\controller\system;

use app\admin\model\system\SettingGroup as SettingGroupModel;
use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\AdminController;
use app\admin\model\system\Setting as SettingModel;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\response\Json;
use app\admin\validate\system\Setting as SettingVal;

class Setting extends AdminController
{

    protected array $searchField = [
        'group_id' => '='
    ];

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new SettingModel();
        $this->validate = new SettingVal();
    }


    /**
     * 新增分组
     * @return Json
     */
    #[Auth('addGroup'),Method('POST')]
    public function addGroup(): Json
    {
        $params = $this->request->param();
        if (!$this->validate->scene('addGroup')->check($params)) {
            return $this->error($this->validate->getError());
        }
        $settingGroupModel = new SettingGroupModel();
        $settingGroupModel->save($params);
        return $this->success('ok');
    }

    /**
     * 查询设置分组
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    #[Auth('querySettingGroup'),Method('GET')]
    public function querySettingGroup(): Json
    {
        $settingGroupModel = new SettingGroupModel();
        $rootGroup = $settingGroupModel->field('id,key,title as label')->select()->toArray();
        return $this->success('ok',$rootGroup);
    }

}
