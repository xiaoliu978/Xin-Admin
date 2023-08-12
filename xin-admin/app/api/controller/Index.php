<?php
namespace app\api\controller;

class Index extends Controller
{
    public function index()
    {
        return $this->success('ok',['abc'=> 1]);
    }

    public function hello($name = 'ThinkPHP8')
    {
        return 'hello,' . $name;
    }
}
