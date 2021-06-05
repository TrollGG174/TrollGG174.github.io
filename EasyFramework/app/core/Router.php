<?php

namespace app\core;

use app\core\View;

class Router
{

    protected $params = [];
    protected $routes = [];

    public function setRoute()
    {
        $array = require ROUTES;
        foreach($array as $direct => $param)
        {
            $direct = '~^' . $direct . "$~";
            $this->routes[$direct] = $param;
        }
    }

    public function compareRoute()
    {
        $url = trim($_SERVER['REQUEST_URI'], '/');
        foreach($this->routes as $direct => $param)
        {
            if(preg_match($direct, $url, $matches))
            {
                $this->params = $param;
                return true;
            }
        }
        return false;
    }

    public static function reroute($address)
    {
        header('location:' . $address);
        exit;
    }

    public function initRoute()
    {
        $this->setRoute();
        if($this->compareRoute())
        {
            $way = 'app\controllers\\' . ucfirst($this->params['controller']) . 'Controller';
            if(file_exists($way . '.php'))
            {
                $action = $this->params['action'] . 'Action';
                if(method_exists($way, $action))
                {
                    $controller = new $way($this->params);
                    $controller->$action();
                }
                else
                   View::error404();
            }
            else
                View::error404();
        }
        else
            View::error404();
    }
}
?>