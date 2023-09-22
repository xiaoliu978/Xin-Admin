<?php
namespace app\admin\controller\content;

use app\common\controller\AdminController as Controller;
use app\admin\model\content\Content as ContentModel;
use app\admin\validate\content\Content as ContentVal;

class Content extends Controller
{

    protected array $searchField = [];

    protected string $authName = 'content.article';

    public function initialize(): void
    {
        parent::initialize();
        $this->model = new ContentModel();
        $this->validate = new ContentVal();
    }
}