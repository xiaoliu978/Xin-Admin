<?php
namespace app\common\enum\ApiEnum;

enum ShowType: int {

    // 无状态响应
	case SILENT = 0;

    // 警告响应
    case WARN_MESSAGE = 1;

    // 失败响应
    case ERROR_MESSAGE = 2;

    // 通知响应
    case NOTIFICATION = 3;

    // 待处理响应
    case REDIRECT = 9;
    
}
