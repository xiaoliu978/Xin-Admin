<?php

namespace app\admin\model\file;

use app\common\library\storage\Driver as StorageDriver;
use Exception;
use think\db\exception\DbException;
use app\common\model\file\File as FileModel;

class File extends FileModel
{
    /**
     * 批量移动文件分组
     * @param int $groupId
     * @param array $fileIds
     * @return bool
     */
    public function moveGroup(int $groupId, array $fileIds): bool
    {
        return static::update(['group_id' => $groupId], [['file_id', 'in', $fileIds]]);
    }

    /**
     * 添加文件库记录
     * @param array $data
     * @param int $fileType
     * @param $user_id
     * @param int $groupId
     * @param int $channel
     * @return bool|false
     */
    public function add(array $data, int $fileType,$user_id, int $groupId = 0, int $channel = 10): bool
    {
        return $this->save([
            'group_id' => $groupId > 0 ? (int)$groupId : 0,
            'channel' => $channel,
            'storage' => $data['storage'],
            'domain' => $data['domain'],
            'file_name' => $data['file_name'],
            'file_path' => $data['file_path'],
            'file_size' => $data['file_size'],
            'file_ext' => $data['file_ext'],
            'file_type' => $fileType,
            'uploader_id' => $user_id
        ]);
    }

    /**
     * 编辑记录
     * @param array $data
     * @return bool
     */
    public function edit(array $data): bool
    {
        return $this->allowField(['file_name', 'group_id'])->save($data) !== false;
    }
}