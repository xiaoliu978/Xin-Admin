<?php

namespace app\common\model\file;

use app\common\model\BaseModel;

class File extends BaseModel
{
    protected $key = 'file_id';


    public function saveFile(array $data,int $user_id): bool
    {
        try{
            $file = $this->where('file_name',$data['file_name'])->find();
            if($file){
                return true;
            }

            $fileGroup = new FileGroup();
            if(!isset($data['group_id'])){
                $group = $fileGroup->where('user_id',$user_id)->where('pid',0)->find();
                if(!$group){
                    $fileGroup->save([
                        'pid' => 0,
                        'user_id' => $user_id,
                        'name' => 'root'
                    ]);
                    $data['group_id'] = $fileGroup->id;
                }else {
                    $data['group_id'] = $group->id;
                }
            }

            $this->save($data);

            return true;
        }catch (\Exception $e){
            $this->setErrorMsg($e->getMessage());
            return false;
        }

    }


}