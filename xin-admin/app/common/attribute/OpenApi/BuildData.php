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
namespace app\common\attribute\OpenApi;

use OpenApi\Attributes as OAT;

trait BuildData
{

    /**
     * 响应体
     * @param array|null $response
     * @param string|null $ref
     * @return OAT\JsonContent|null
     */
    public function response(?array $response, ?string $ref): ?OAT\JsonContent
    {
        if($response) {
            $responseArr = $this->buildResponse($response);
            return new OAT\JsonContent( description: '响应体', properties: [
                new OAT\Property(property: 'data', properties: $responseArr)
            ], allOf: [new OAT\Schema('#/components/schemas/requestSuccess')]);
        }elseif ($ref) {
            return new OAT\JsonContent( properties: [
                new OAT\Property(property: 'data', properties: [
                    new OAT\Property(property: 'data', ref: $ref, description: '响应体')
                ])
            ], allOf: [new OAT\Schema('#/components/schemas/baseList')]);
        }else {
            return new OAT\JsonContent( ref: '#/components/schemas/requestSuccess', description: '响应体');
        }
    }

    /**
     * 构建响应内容
     * @param array $params
     * @return OAT\Property[]
     */
    public function buildResponse(array $params): array
    {
        return array_map(function ($item) {
            if(is_array($item) && count($item) == 3) {
                if(is_array($item[2])) {
                    return  new OAT\Property(
                        property: $item[0],
                        description: $item[1],
                        properties: $this->buildResponse($item[2]),
                        type: 'object');
                }
                if(is_string($item[2]) && count(explode('components/schemas', $item[2])) > 1) {
                    return new OAT\Property(
                        property: $item[0],
                        ref: $item[2],
                        description: $item[1],
                        type: 'object'
                    );
                }
                return new OAT\Property(property: $item[0] ,description: $item[1], type: $item[2]);
            }
            if($item instanceof OAT\Property) {
                return $item;
            }
            return null;
        },$params);
    }

    /**
     * 构建请求 params
     * @param array $params
     * @return OAT\Parameter[]
     */
    public function buildParams(array $params): array
    {
        return array_map(function ($item) {
            if(is_array($item) && count($item) == 3) {
                return new OAT\Parameter(parameter: $item[0] ,name: $item[2], description: $item[1], in: 'path');
            }
            if($item instanceof OAT\Parameter) {
                return $item;
            }
            return null;
        },$params);
    }

    /**
     * 构建请求 body
     * @param array $data
     * @return OAT\Property[]
     */
    public function buildData(array $data): array
    {
        return array_map(function ($item) {
            if(is_array($item) && count($item) == 3) {
                return new OAT\Property(property: $item[0] ,description: $item[1], type: $item[2]);
            }
            if($item instanceof OAT\Property) {
                return $item;
            }
            return null;
        },$data);
    }

}