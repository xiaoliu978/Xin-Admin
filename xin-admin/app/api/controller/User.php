<?php

namespace app\api\controller;

use app\admin\model\file\File as UploadFileModel;
use app\api\model\User as UserModel;
use app\api\validate\User as UserVal;
use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\Controller;
use app\common\enum\FileType as FileTypeEnum;
use app\common\library\storage\Driver as StorageDriver;
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
use think\response\Json;

class User extends Controller
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
        $info = Auth::getUserInfo();
        // 获取权限
        $group = (new UserGroup)->where('id',$info['group_id'])->find();
        $access = [];
        foreach ($group->roles as $role) {
            $access[] =  $role->key;
        }
        // 获取一级菜单
        $menus = (new UserGroup)->with(['roles' => function($query){
            $query->where('type',0)->whereOr('type',1)->order('sort');
        }])->where('id',$info['group_id'])->find()->roles->toArray();
        $menus = $this->getTreeData($menus);

        return $this->success('ok',compact('info','access','menus'));
    }

    /**
     * 刷新 Token
     * @return Json
     * @throws Exception
     */
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

    /**
     * 退出登录
     * @return Json
     */
    #[Auth]
    public function logout(): Json
    {
        $user_id = Auth::getUserId();
        if($this->model->logout($user_id)){
            return $this->success('退出登录成功');
        } else {
            return $this->error($this->model->getErrorMsg());
        }
    }


    /**
     * 头像上传接口
     * @return Json
     * @throws Exception
     */
    public function upAvatar(): Json
    {
        // 实例化存储驱动
        $storage = new StorageDriver(['default' => 'local','engine' => [
            'local' => null
        ]]);
        // 设置上传文件的信息
        $storage->setUploadFile('file')
            ->setRootDirName('image')
            ->setValidationScene('image');
        // 执行文件上传
        if (!$storage->upload()) {
            return $this->error('图片上传失败：' . $storage->getError());
        }
        // 文件信息
        $fileInfo = $storage->getSaveFileInfo();
        // 添加文件库记录
        $model = new UploadFileModel;
        $user_id = Auth::getUserId();
        $model->add($fileInfo, FileTypeEnum::IMAGE->value,$user_id, 14, 20);
        // 图片上传成功
        return $this->success('图片上传成功',['fileInfo' => $model->toArray()]);
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
        $user = $this->model->where('id',Auth::getUserId())->find();
        $save = $user->allowField(['username', 'nickname', 'gender', 'avatar_id', 'mobile', 'email'])->save($data);
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
        $user_id = Auth::getUserId();
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
        $user_id = Auth::getUserId();
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