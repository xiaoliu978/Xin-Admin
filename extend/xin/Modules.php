<?php

namespace xin;

class Modules
{

    protected string $baseUrl =  '';

    protected string $installDir = '';

    protected string $ebakDir = '';

    protected string $modulesDir = '';


    public function __construct(string $uid)
    {
        $this->installDir = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'modules' . DIRECTORY_SEPARATOR;
        $this->ebakDir    = $this->installDir . 'ebak' . DIRECTORY_SEPARATOR;
        echo $this->ebakDir;
        if (!is_dir($this->installDir)) {
            mkdir($this->installDir, 0755, true);
        }
        if (!is_dir($this->ebakDir)) {
            mkdir($this->ebakDir, 0755, true);
        }

        if ($uid) {
            $this->uid        = $uid;
            $this->modulesDir = $this->installDir . $uid . DIRECTORY_SEPARATOR;
            if (!is_dir($this->modulesDir)) {
                mkdir($this->modulesDir, 0755, true);
            }
            $this->install();
        }
    }

    public function install()
    {



    }



}