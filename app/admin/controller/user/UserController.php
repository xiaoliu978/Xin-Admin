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
namespace app\admin\controller\user;

use app\admin\controller\Controller;
use app\admin\validate\User as UserVal;
use app\common\attribute as XinAttr;
use app\common\model\user\UserModel as UserModel;
use think\db\exception\DbException;
use think\response\Json;

#[XinAttr\OpenApi\Tag(name: "后台用户", description: "
    Controller： 后台用户 \n
    Author: 小刘同学 <2302563948@qq.com> \n
")]
class UserController extends Controller
{

    protected array $withModel = ['avatar'];

    protected string $authName = 'user';

    protected array $searchField = [];

    #[XinAttr\OpenApi\Get(
        title: '用户列表',
        path: '/admin.php/user.user/list',
        operationId: 'user_list',
        tags: ['后台用户'],
        ref: '#/components/schemas/user_model'
    )]
    #[XinAttr\OpenApi\Post(title: '新增用户', path: '/admin.php/user.user/add', operationId: 'user_add', tags: ['后台用户'], bodyRef: '#/components/schemas/user_model')]
    #[XinAttr\OpenApi\Put(title: '编辑用户', path: '/admin.php/user.user/edit', operationId: 'user_edit', tags: ['后台用户'], ref: '#/components/schemas/user_model')]
    #[XinAttr\OpenApi\Delete(title: '删除用户', path: '/admin.php/user.user/delete', operationId: 'user_delete', tags: ['后台用户'])]
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserModel();
        $this->validate = new UserVal();
    }

    /**
     * 搜索用户
     * @return Json
     * @throws DbException
     */
    #[XinAttr\OpenApi\Get(
        title: '搜索用户',
        path: '/admin.php/user.user/vagueSearch',
        operationId: 'user_vagueSearch',
        tags: ['后台用户'],
        ref: '#/components/schemas/user_model',
        params: [
            ['search', '搜索内容', 'search']
        ]
    )]
    #[XinAttr\Auth]
    #[XinAttr\Method('GET')]
    public function vagueSearch(): Json
    {
        $value = $this->request->param('search');
        if ($value) {
            $data = $this->model
                ->where('id|username|nickname|mobile', 'like', "%$value%")
                ->order('id', 'desc')
                ->paginate(10)
                ->toArray();
        } else {
            $data = $this->model
                ->order('id', 'desc')
                ->paginate(10)
                ->toArray();
        }
        return $this->success($data);
    }
}