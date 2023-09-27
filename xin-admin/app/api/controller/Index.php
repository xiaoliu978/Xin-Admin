<?php
namespace app\api\controller;

use app\common\controller\ApiController as Controller;


class Index extends Controller
{
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

    public function hello($name = 'ThinkPHP8')
    {
        return 'hello,' . $name;
    }
}
