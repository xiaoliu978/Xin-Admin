<?php

namespace app\api\controller;

use app\api\model\User as UserModel;
use app\api\validate\User as UserVal;
use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\ApiController;
use app\common\library\Token;
use app\common\model\file\File as FileModel;
use app\common\model\user\UserGroup;
use app\common\model\user\UserMoneyLog;
use Exception;
use SplFileInfo;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Filesystem;
use think\Model;
use think\response\Json;

class User extends ApiController
{

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new UserModel();
        $this->validate = new UserVal();
    }

    /**
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    #[Auth,Method('GET')]
    public function getUserInfo(): Json
    {
        $info = (new Auth)->getUserInfo();
        // 获取权限
        $group = (new UserGroup)->where('id',$info['group_id'])->find();
        $access = [];
        foreach ($group->roles as $role) {
            $access[] =  $role->key;
        }

        // 获取一级菜单
        $menus = (new UserGroup)->with(['roles' => function($query){
            $query->where('type',0)->order('sort');
        }])->where('id',$info['group_id'])->find()->roles->toArray();

        // 获取子菜单
        $childrenMenus = (new UserGroup)->with(['roles' => function($query){
            $query->where('type',1)->order('sort');
        }])->where('id',$info['group_id'])->find()->roles->toArray();

        foreach ($menus as &$role) {
            $this->childrenNode($role, $childrenMenus);
        }

        return $this->success('ok',compact('info','access','menus'));
    }

    /**
     * @param $role
     * @param $menus
     * @return void
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function childrenNode(&$role, $menus): void
    {
        $childNode = [];

        foreach($menus as &$item){
            if($item['pid'] == $role['id']){
                $this->childrenNode($item,$menus);
                $childNode[] = $item;
            }
        }
        if(!count($childNode)) return;

        $role['children'] = $childNode;
    }


    public function refreshToken(): Json
    {
        $token =  $this->request->header('Authorization');
        $reToken = $this->request->header('Refreshtoken');
        if($this->request->isPost() && $reToken){
            $Token = new Token;
            $Token->delete($token);
            $user_id = $Token->get($reToken)['user_id'];
            $token =  md5(random_bytes(10));
            $Token->set($token,'user',$user_id);
            return $this->success('ok',compact('token'));
        }else {
            return $this->error('请先登录！',[],403);
        }
    }

    #[Auth]
    public function logout(): Json
    {
        $user_id = (new Auth())->getUserId();
        if($this->model->logout($user_id)){
            return $this->success('退出登录成功');
        } else {
            return $this->error($this->model->getErrorMsg());
        }
    }


    /**
     * 上传头像
     * @return Json
     */
    #[Auth]
    public function upAvatar(): Json
    {
        $putFile = request()->file('file');
        // 上传到本地服务器
        $filename = Filesystem::putFile('file', $putFile, 'md5');
        $file = new SplFileInfo(public_path().'storage/'.$filename);

        $data = [
            'size' => $file->getSize(),
            'user_id'   => (new Auth())->getUserId(),
            'name'  => $putFile->getFileName(),
            'file_name' => $file->getFilename(),
            'type'  => $file->getExtension(),
            'url'   => request()->domain().'/storage/'.$filename
        ];

        $fileModel = new FileModel();

        if($fileModel->saveFile($data,(new Auth())->getUserId())){
            return $this->success('上传成功！',$data);
        }else {
            return $this->error($this->model->getErrorMsg());
        }
    }


    /**
     * 设置用户信息
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    #[Auth]
    public function setUserInfo(): Json
    {
        $data = $this->request->post();
        $result = $this->validate->scene('set')->check($data);
        if(!$result){
            return $this->warn($this->validate->getError());
        }
        $user = $this->model->where('id',(new Auth())->getUserId())->find();
        $save = $user->allowField(['username', 'nickname', 'gender', 'avatar', 'mobile', 'email'])->save($data);
        if($save){
            return $this->success('更新成功');
        }
        return $this->error('更新失败');
    }


    /**
     * 设置密码
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function setPassword(): Json
    {
        $data = $this->request->post();
        $result = $this->validate->scene('set_pwd')->check($data);
        if(!$result){
            return $this->warn($this->validate->getError());
        }
        $user_id = (new Auth())->getUserId();
        $user = $this->model->where('id',$user_id)->find();
        if($user->save([
            'password' => password_hash($data['newPassword'],PASSWORD_DEFAULT)
        ])){
            return $this->success('更新成功');
        }
        return $this->error('更新失败');
    }

    /**
     * 获取用户余额记录
     * @return Json
     * @throws DbException
     */
    public function getMoneyLog(): Json
    {
        $user_id = (new Auth)->getUserId();
        $params = $this->request->get();
        $paginate = [
            'list_rows' => $params['pageSize'] ?? 10,
            'page' => $params['current'] ?? 1,
        ];
        $list = (new UserMoneyLog)
            ->where('user_id',$user_id)
            ->paginate($paginate)
            ->toArray();
        return $this->success('ok', $list);
    }

}