<?php

namespace app\admin\controller\file;

use app\common\attribute\Auth;
use app\common\attribute\Method;
use app\common\controller\Controller;
use app\admin\model\file\File as FileModel;
use app\common\library\storage\Driver as StorageDriver;
use Exception;
use think\db\exception\DbException;
use think\response\Json;

class File extends Controller
{
    public function initialize(): void
    {
        parent::initialize();
        $this->model = new FileModel();
    }

    protected array $searchField = [
        'group_id' => '=',
        'name' => 'like',
        'file_type' => '=',

    ];

    /**
     * 基础控制器查询方法
     * @return Json
     * @throws DbException
     */
    #[Auth('list'),Method('GET')]
    public function list(): Json
    {
        list($where, $paginate) = $this->buildSearch();
        $list = $this->model
            ->with($this->withModel)
            ->where($where)
            ->paginate($paginate)
            ->toArray();
        return $this->success('ok', $list);
    }

    /**
     * 基础控制器删除方法
     * @return Json
     * @throws Exception
     */
    #[Auth('delete'),Method('DELETE')]
    public function delete(): Json
    {
        $data = $this->request->param();
        if (!isset($data['ids'])) {
            return $this->error('请选择ID');
        }
        $delArr = explode(',', $data['ids']);
        // 验证文件数量
        if (count($delArr) > 15) {
            return $this->error('一次性最多删除15个文件');
        }
        // 存储配置信息
        $config = ['default' => 'local','engine' => [
            'local' => null
        ]];
        foreach ($delArr as $fileId) {
            // 获取文件详情
            $fileInfo = $this->model->find($fileId);
            // 实例化存储驱动
            $storage = new StorageDriver($config, $fileInfo['storage']);
            // 删除文件
            if (!$storage->delete($fileInfo['file_path'])) {
                return $this->error( '文件删除失败：' . $storage->getError());
            }
            // 标记为已删除
            $fileInfo->delete();
        }
        return $this->success('删除成功，删除了' . count($delArr) . '个文件数据');
    }
}