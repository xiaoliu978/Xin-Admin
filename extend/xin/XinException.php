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
namespace xin;

class XinException extends \Exception
{


    public mixed $data;

    public function __construct($code = 0, $data = '')
    {
        $this->code    = $code;
        $this->data    = $data;
        $this->buildMessage($code);
        parent::__construct($this->message, $code);
    }

    private function buildMessage($code): void
    {
        switch ($code) {
            case 10001:
                $this->setMessage('程序基础错误');
                break;
            case 10002:
                $this->setMessage('');
                break;
            default:
                $this->setMessage('默认错误');
        }
    }


    /**
     * @param string $message
     * @return void
     */
    private function setMessage(string $message): void
    {
        $this->message = $message;
    }

}