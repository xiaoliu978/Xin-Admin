<?php

namespace app\admin\middleware;


class Auth
{
    public function handle($request, \Closure $next)
    {


        return $next($request);
    }
}