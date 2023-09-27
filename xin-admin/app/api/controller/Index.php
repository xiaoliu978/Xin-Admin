<?php
namespace app\api\controller;

use app\common\attribute\Method;
use app\common\controller\ApiController as Controller;
use app\api\model\User as UserModel;
use app\api\validate\User as UserVal;
use think\response\Json;

class Index extends Controller
{

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserModel();
        $this->validate = new UserVal();
    }

    /**
     * 获取系统基本信息
     * @return Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function index()
    {
        $layout = [
            'navTheme' => 'light',
            'colorPrimary' => '#1890ff',
            'layout' => 'top',
            'contentWidth' => 'Fluid',
            'fixedHeader' => true,
            'token' => [
                'pageContainer' => [
                    'paddingBlockPageContainerContent' => 0,
                    'paddingInlinePageContainerContent' => 0
                ]
            ],
            "fixSiderbar" => true,
            "splitMenus" => false,
            "siderMenuType" => "sub"
        ];
        $menus = [
            [
                'name' => '首页',
                'path' => '/',
                'key' =>  'index',
                'icon' => 'HomeOutlined'
            ],
            [
                'name' => '文章中心',
                'key' => 'app',
                'path' => '/',
                'icon' => 'AppstoreOutlined'
            ],
            [
                'name' => '下载中心',
                'key' => 'SubMenu',
                'path' => '/',
                'icon'=> 'SettingOutlined',
                'children' => [
                    [
                        'name' => '电脑软件',
                        'path' => '/',
                        'key' => 'Item 1',
                    ],
                    [
                        'name' => 'windows 系统',
                        'path' => '/',
                        'key' => 'Item 2',
                    ],
                    [
                        'name' => 'app 应用',
                        'path' => '/',
                        'key' => 'Item 3',
                    ],
                ]
            ]
        ];



        $web_setting = get_setting('web');
        return $this->success('ok',compact('layout','web_setting', 'menus'));
    }

    /**
     * 用户登录
     * @return Json
     */
    #[Method('POST')]
    public function login(): Json
    {
        $data = $this->request->post();

        // 账号密码登录
        if(isset($data['loginType']) && $data['loginType'] === 'account') {
            // 规则验证
            $result = $this->validate->scene('account')->check($data);
            if(!$result){
                return $this->warn($this->validate->getError());
            }

            $data = $this->model->login($data['username'],$data['password']);
            if($data) {
                return $this->success('ok',$data);
            }
            return $this->error($this->model->getErrorMsg());
        }

        // 手机号登录
        if(isset($data['loginType']) && $data['loginType'] === 'phone') {
            return $this->warn('暂未开通手机号登录！');
        }

        return $this->warn('请选择登录方式！');
    }


    /**
     * 用户注册
     * @return Json
     */
    #[Method('POST')]
    public function register(): Json
    {
        $data = $this->request->post();
        // 账号密码登录

        // 规则验证
        $result = $this->validate->scene('reg')->check($data);
        if(!$result){
            return $this->warn($this->validate->getError());
        }

        $data = $this->model->register($data);
        if($data) {
            return $this->success('ok',$data);
        }
        return $this->error($this->model->getErrorMsg());

    }
}
