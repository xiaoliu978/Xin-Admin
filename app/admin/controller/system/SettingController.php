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
namespace app\admin\controller\system;

use app\admin\controller\Controller;
use app\admin\model\setting\SettingGroupModel as SettingGroupModel;
use app\admin\model\setting\SettingModel as SettingModel;
use app\admin\validate\system\Setting as SettingVal;
use app\common\attribute as XinAttr;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\response\Json;


class SettingController extends Controller
{

    protected array $searchField = [
        'group_id' => '='
    ];

    #[XinAttr\OpenApi\Post(title: '新增设置', path: '/admin.php/system.setting/add', operationId: 'setting_add', tags: ['系统设置'], bodyRef: '#/components/schemas/setting_model')]
    #[XinAttr\OpenApi\Put(title: '编辑设置', path: '/admin.php/system.setting/edit', operationId: 'setting_edit', tags: ['系统设置'], ref: '#/components/schemas/setting_model')]
    #[XinAttr\OpenApi\Delete(title: '删除设置', path: '/admin.php/system.setting/delete', operationId: 'setting_delete', tags: ['系统设置'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new SettingModel();
        $this->validate = new SettingVal();
    }

    /**
     * 基础控制器查询方法
     * @return Json
     * @throws DbException
     */
    #[XinAttr\OpenApi\Get(
        title: '获取设置列表',
        path: '/admin.php/system.setting/list',
        operationId: 'setting_list',
        tags: ['系统设置'],
        ref: '#/components/schemas/setting_model',
        params: [['group_id', '分组ID', 'int']]
    )]
    #[XinAttr\Auth('list')]
    #[XinAttr\Method('GET')]
    public function list(): Json
    {
        $group_id = $this->request->param('group_id');
        if (!$group_id) {
            return $this->warn('请选择设置分组');
        }
        $list = $this->model
            ->with($this->withModel)
            ->append(['defaultData'])
            ->where('group_id', '=', $group_id)
            ->order('sort', 'desc')
            ->select()
            ->toArray();
        return $this->success($list);
    }

    /**
     * 保存设置
     * @return Json
     */
    #[XinAttr\OpenApi\Post(
        title: '保存设置',
        path: '/admin.php/system.setting/saveSetting',
        operationId: 'setting_saveSetting',
        tags: ['系统设置'],
    )]
    #[XinAttr\Auth('add')]
    #[XinAttr\Method('POST')]
    public function saveSetting(): Json
    {
        $data = $this->request->param();
        if (!isset($data['group_id'])) {
            return $this->warn('请选择分组');
        }
        foreach ($data as $key => $value) {
            $setting = $this->model->where('group_id', $data['group_id'])->where('key', $key)->findOrEmpty();
            if ($setting->isEmpty()) {
                continue;
            }
            $setting->values = $value;
            $setting->save();
        }
        return $this->success('保存成功！');
    }

    /**
     * 新增分组
     * @return Json
     */
    #[XinAttr\OpenApi\Post(
        title: '新增分组',
        path: '/admin.php/system.setting/addGroup',
        operationId: 'setting_addGroup',
        tags: ['系统设置'],
    )]
    #[XinAttr\Auth('addGroup')]
    #[XinAttr\Method('POST')]
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
    #[XinAttr\OpenApi\Get(
        title: '查询设置分组',
        path: '/admin.php/system.setting/querySettingGroup',
        operationId: 'setting_querySettingGroup',
        tags: ['系统设置'],
    )]
    #[XinAttr\Auth('querySettingGroup')]
    #[XinAttr\Method('GET')]
    public function querySettingGroup(): Json
    {
        $settingGroupModel = new SettingGroupModel();
        $rootGroup = $settingGroupModel->field('id,key,title as label')->select()->toArray();
        return $this->success($rootGroup);
    }

}
