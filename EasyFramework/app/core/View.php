<?php

namespace app\core;

class View
{

    public $layout = 'default';
    public $direct;
    public $way;

    public function __construct($direct)
    {
		$this->direct = $direct;
        $this->way = $direct['controller'].'View'.'/'.$direct['action'];
	}

    public function render($title, $vars = [])
    {
        extract($vars);
        if(file_exists(APP . '/views/' . $this->way . '.php'))
        {
            ob_start();
            require APP . '/views/' . $this->way . '.php';
            $content = ob_get_clean();
            require APP . '/views/layouts/' . $this->layout . '.php';
        }
        else
        {
            echo 'View error';
        }
    }

    public static function error404()
    {
        require ERROR; 
        exit;
    }

}


?>