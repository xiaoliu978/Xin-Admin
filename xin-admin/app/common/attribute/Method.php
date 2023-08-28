<?php

namespace app\common\attribute;

use app\common\library\RequestJson;
use Attribute;

/**
 * 请求注解类
 */
#[Attribute]
class Method
{
    use RequestJson;

    public function __construct(string $method)
    {
        if (!$method) {
            return;
        }
        $currentMethod = request()->method();

        if ($method == $currentMethod) {
            return;
        }
        $this->error('请求方式错误，请检查！', [], 200, 'throw');
    }

}