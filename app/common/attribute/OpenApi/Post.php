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
class Post extends OAT\Post
{

    use BuildData;

    /**
     * @param string|null $title
     * @param string|null $description 描述
     * @param string|null $path 地址
     * @param string|null $operationId 接口唯一ID
     * @param array|null $tags 标签
     * @param string|null $bodyRef
     * @param string|null $responseRef
     * @param array|null $body 请求body
     * @param array|null $response 响应内容
     * @param array|null $required 必填项
     */
    public function __construct(
        ?string $title = '新增',
        ?string $description = null,
        ?string $path = null,
        ?string $operationId = null,
        ?array  $tags = null,
        ?string $bodyRef = '',
        ?string $responseRef = '',
        ?array  $body = [],
        ?array  $response = [],
        ?array  $required = [],
    )
    {
        $contents = $this->response($response, $responseRef);

        $requestBody = null;
        if ($body) {
            $requestBody = new OAT\RequestBody(
                description: '请求内容',
                content: new OAT\MediaType(
                    mediaType: 'application/json',
                    schema: new OAT\Schema(
                        required: $required,
                        properties: $this->buildData($body)
                    )
                )
            );
        } elseif ($bodyRef) {
            $requestBody = new OAT\RequestBody(
                description: '请求内容',
                content: new OAT\MediaType(
                    mediaType: 'application/json',
                    schema: new OAT\Schema($bodyRef)
                )
            );
        }


        $responses = [
            new OAT\Response(response: '200', description: '成功响应', content: [$contents]),
            new OAT\Response(response: '400', description: '失败响应', content: [new OAT\JsonContent(ref: '#/components/schemas/requestError'),]),
            new OAT\Response(response: '403', description: '警告响应', content: [new OAT\JsonContent(ref: '#/components/schemas/requestWarn'),])
        ];
        parent::__construct(
            path: $path,
            operationId: $operationId,
            description: $description,
            summary: $title,
            requestBody: $requestBody,
            tags: $tags,
            responses: $responses);
    }


}