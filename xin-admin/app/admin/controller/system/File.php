<?php

namespace app\admin\controller\system;

use app\admin\model\file\File as FileModel;
use app\common\controller\AdminController as Controller;
use app\common\attribute\Auth;
use SplFileInfo;
use think\facade\Filesystem;
use think\response\Json;

#[Auth]
class File extends Controller
{

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new FileModel();
    }

    public function upload(): Json
    {
        // 获取表单上传文件 例如上传了001.jpg
        $putFile = request()->file('file');
        // 上传到本地服务器
        $filename = Filesystem::putFile('file', $putFile, 'md5');

        $file = new SplFileInfo(public_path().'storage/'.$filename);


        $data = [
            'size' => $file->getSize(),
            'user_id'   => (new Auth())->getAdminId(),
            'name'  => $putFile->getFileName(),
            'file_name' => $file->getFilename(),
            'type'  => $file->getExtension(),
            'url'   => request()->domain().'/storage/'.$filename
        ];


        if($this->model->saveFile($data,(new Auth())->getAdminId())){
            return $this->success('上传成功！',$data);
        }else {
            return $this->error($this->model->getErrorMsg());
        }



    }

}