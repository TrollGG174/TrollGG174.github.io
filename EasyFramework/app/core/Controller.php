<?php

namespace app\core;

use app\core\View;
use app\core\Router;

abstract class Controller
{

    public $direct;
    public $view;
    public $model;
    public $router;
    public $check;

    public function __construct($direct)
    {
        $this->direct = $direct;
        if(!$this->secureUsers())
            View::error404();
        $this->view = new View($direct);
        $this->router = new Router($direct);
        $this->model = $this->getModel($direct['controller']);
    }

    public function getModel($model)
    {
        $way = MODELS . ucfirst($model) . 'Model';
        if(class_exists($way))
            return new $way;
    }

    public function secureUsers()
    {
        $this->check = require SECURITY . $this->direct['controller'] . 'security.php';
        
        if($this->secureCheck('all'))
            return true;

        elseif(isset($_SESSION['trusted']['id']) and $this->secureCheck('trusted'))
            return true;

        elseif(isset($_SESSION['admin']) and $this->secureCheck('admin'))
            return true;
          
        return false;
    }

    public function secureCheck($key)
    {
        return in_array($this->direct['action'], $this->check[$key]);
    }

}


?>