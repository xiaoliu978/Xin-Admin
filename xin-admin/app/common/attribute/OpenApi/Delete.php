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

use Attribute;
use OpenApi\Attributes as OAT;

#[Attribute(\Attribute::TARGET_METHOD)]
class Delete extends OAT\Delete
{

    /**
     * 删除
     * @param string|null $path 地址
     * @param string|null $operationId 接口唯一ID
     * @param array|null $tags 标签
     */
    public function __construct(?string $title = '删除', ?string $path = null, ?string $operationId = null, ?array $tags = null)
    {
        $requestBody = new OAT\RequestBody(
            description: '请求内容',
            content: new OAT\MediaType(
                mediaType: 'application/json',
                schema: new OAT\Schema(
                    schema: 'delete',
                    properties: [
                        new OAT\Property(property: 'ids',description: '删除的Ids', type: 'string' )
                    ]
                )
            )
        );
        $responses = [
            new OAT\Response(response: '200', description: '成功响应', content: [new OAT\JsonContent(ref: '#/components/schemas/requestSuccess')]),
            new OAT\Response(response: '400', description: '失败响应', content: [new OAT\JsonContent(ref: '#/components/schemas/requestError'),]),
            new OAT\Response(response: '403', description: '警告响应', content: [new OAT\JsonContent(ref: '#/components/schemas/requestWarn'),])
        ];
        parent::__construct($path, $operationId, summary: $title, requestBody: $requestBody, tags: $tags, responses: $responses);
    }

}